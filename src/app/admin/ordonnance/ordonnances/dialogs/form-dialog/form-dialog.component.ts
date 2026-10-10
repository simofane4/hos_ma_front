import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { apiErrorMessage } from "src/app/core/api-error";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientService } from "../../../../../patient/patient.service";
import { Patient } from "../../../../../patient/patient.model";
import { CATALOGUES } from "../../../../catalogue/catalogue.config";
import { CatalogueRow } from "../../../../catalogue/catalogue.model";
import { CatalogueService } from "../../../../catalogue/catalogue.service";
import { AppointmentService } from "../../../../appointment/appointment.service";
import { Appointment } from "../../../../appointment/appointment.model";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../../../cabinet/cabinets/cabinet.model";
import { Ordonnance, OrdonnanceMedicamentInput } from "../../../ordonnance.model";
import { OrdonnanceService } from "../../../ordonnance.service";

@Component({
  selector: "app-ordonnance-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  form: FormGroup;
  ordonnance: Partial<Ordonnance>;
  cabinets: Cabinet[] = [];
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  /** Medicament options for the current cabinet. */
  medicaments: CatalogueRow[] = [];
  loading = false;
  /**
   * An admin is not attached to a cabinet and therefore has to pick one. Staff
   * are locked to their own by the endpoint, so the field is hidden for them.
   */
  isAdmin = false;

  private readonly medicamentSpec = CATALOGUES["medicaments"];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordonnanceService: OrdonnanceService,
    private catalogueService: CatalogueService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.ordonnance = data.ordonnance || {};
    this.dialogTitle =
      this.action === "edit"
        ? `Edit Prescription #${this.ordonnance.id}`
        : "New Prescription";
    this.isAdmin = this.authService.currentUserValue?.role === "admin";
    this.form = this.createForm();
  }

  ngOnInit(): void {
    // Staff are locked to their own cabinet, so only an admin needs the list.
    if (this.isAdmin) {
      this.httpClient
        .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
          params: { page_size: 200 },
        })
        .subscribe({
          next: (page) => (this.cabinets = page.results || []),
          error: () => (this.cabinets = []),
        });
    }

    this.loadMedicaments();

    if (this.ordonnance.appointment) {
      this.loadAppointments(null, this.appointmentId);
    }
  }

  /** The prescription is always tied to an appointment; remember which patient. */
  private get appointmentId(): number | null {
    return this.ordonnance.appointment ?? null;
  }

  get lines(): FormArray {
    return this.form.get("medicaments") as FormArray;
  }

  private createForm(): FormGroup {
    const form = this.fb.group(
      {
        id: [this.ordonnance.id],
        // The appointment drives the cabinet, so it is the one required field.
        appointment: [this.ordonnance.appointment, Validators.required],
        patientLabel: [""],
        cabinet: [
          this.ordonnance.cabinet,
          this.isAdmin ? Validators.required : [],
        ],
        description: [this.ordonnance.description, Validators.maxLength(2000)],
        medicaments: this.fb.array([]),
      },
      { updateOn: "submit" }
    );

    const stored = this.ordonnance.medicaments_list || [];
    stored.forEach((line) => this.addLine(line.medicament, line.dosage, line.duration));

    return form;
  }

  /** One medicine line; `medicament` is the id, the rest is free text. */
  addLine(medicament?: number, dosage?: string, duration?: string): void {
    this.lines.push(
      this.fb.group({
        medicament: [medicament ?? null, Validators.required],
        dosage: [dosage || ""],
        duration: [duration || ""],
      })
    );
  }

  removeLine(index: number): void {
    this.lines.removeAt(index);
  }

  private loadMedicaments(): void {
    const cabinet = this.form.get("cabinet")?.value;
    this.catalogueService
      .getPage(this.medicamentSpec, {
        page_size: 200,
        cabinet: cabinet ?? undefined,
      })
      .subscribe({
        next: (page) => (this.medicaments = page.results || []),
        error: () => (this.medicaments = []),
      });
  }

  onMedicamentSearch(term: string): void {
    const cabinet = this.form.get("cabinet")?.value;
    this.catalogueService
      .getPage(this.medicamentSpec, {
        page_size: 20,
        search: term || undefined,
        cabinet: cabinet ?? undefined,
      })
      .subscribe({
        next: (page) => (this.medicaments = page.results || []),
        error: () => (this.medicaments = []),
      });
  }

  medicamentName(id: number): string {
    const found = this.medicaments.find((m) => m.id === id);
    return found ? String(found.name ?? "") : `#${id}`;
  }

  onPatientSearch(term: string): void {
    this.patientService.searchPatients(term).subscribe({
      next: (page) => (this.patients = page.results || []),
      error: () => (this.patients = []),
    });
  }

  onPatientSelected(patient: Patient): void {
    this.form.get("patientLabel")?.setValue(
      `${patient.firstname || ""} ${patient.lastname || ""}`.trim()
    );
    this.loadAppointments(null, patient.id);
  }

  /**
   * Loads the appointments that can be prescribed for, preferring the one the
   * prescription already points at.
   *
   * The endpoint rejects a prescription whose appointment belongs to a different
   * cabinet, so the candidate list is scoped to the caller's cabinet.
   */
  private loadAppointments(preferredId: number | null, patientId?: number): void {
    const filters: any = { page_size: 50 };
    if (patientId) {
      filters.patient = patientId;
    } else {
      const cabinet = this.form.get("cabinet")?.value;
      if (cabinet) {
        filters.cabinet = cabinet;
      }
    }

    this.appointmentService.getPage(filters).subscribe({
      next: (page) => {
        this.appointments = page.results || [];
        if (preferredId) {
          this.form.get("appointment")?.setValue(preferredId);
        }
      },
      error: () => (this.appointments = []),
    });
  }

  appointmentLabel(appointment: Appointment): string {
    return `${appointment.date} ${appointment.start}-${appointment.end} (${
      appointment.patient_name || ""
    })`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      this.lines.markAllAsTouched();
      return;
    }
    this.loading = true;

    const value = this.form.getRawValue();
    delete value.id;
    delete value.patientLabel;

    if (!this.isAdmin) {
      // Staff must not send a cabinet: the endpoint derives it from the token.
      delete value.cabinet;
    }
    if (!value.description) {
      value.description = undefined;
    }

    const medicaments: OrdonnanceMedicamentInput[] = this.lines.controls.map(
      (control) => {
        const line = (control as FormGroup).getRawValue();
        const entry: OrdonnanceMedicamentInput = { medicament: line.medicament };
        if (line.dosage) {
          entry.dosage = line.dosage;
        }
        if (line.duration) {
          entry.duration = line.duration;
        }
        return entry;
      }
    );

    const request =
      this.action === "edit"
        ? this.ordonnanceService.updateOrdonnance({
            ...value,
            medicaments,
            id: this.ordonnance.id,
          })
        : this.ordonnanceService.addOrdonnance({ ...value, medicaments });

    request.subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.snackBar.open(apiErrorMessage(error), "Close", {
          duration: 6000,
          panelClass: "snackbar-danger",
        });
      }
    );
  }
}