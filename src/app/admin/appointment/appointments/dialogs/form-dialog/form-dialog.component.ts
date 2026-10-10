import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { apiErrorMessage } from "src/app/core/api-error";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientService } from "../../../../../patient/patient.service";
import { Patient } from "../../../../../patient/patient.model";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../../../cabinet/cabinets/cabinet.model";
import { Appointment } from "../../../appointment.model";
import { AppointmentService } from "../../../appointment.service";

@Component({
  selector: "app-appointment-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  form: FormGroup;
  appointment: Partial<Appointment>;
  cabinets: Cabinet[] = [];
  /** Results of the patient type-ahead. */
  patients: Patient[] = [];
  /** The picked patient, kept so the label can be shown when editing. */
  selectedPatient: Patient | null = null;
  loading = false;
  /**
   * An admin is not attached to a cabinet and therefore has to pick one. Staff
   * are locked to their own by the endpoint, so the field is hidden for them.
   */
  isAdmin = false;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.appointment = data.appointment || {};
    this.dialogTitle =
      this.action === "edit" ? "Edit Appointment" : "New Appointment";
    this.isAdmin = this.authService.currentUserValue?.role === "admin";
    this.form = this.createForm();

    if (this.appointment.patient) {
      // Preload the picker so an edit shows the patient's name, not just an id.
      this.selectedPatient = {
        id: this.appointment.patient,
        firstname: this.appointment.patient_name || "",
        lastname: "",
      } as Patient;
    }
  }

  ngOnInit(): void {
    // Staff are locked to their own cabinet, so only an admin needs the list.
    if (!this.isAdmin) {
      return;
    }
    this.httpClient
      .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
        params: { page_size: 200 },
      })
      .subscribe({
        next: (page) => (this.cabinets = page.results || []),
        error: () => (this.cabinets = []),
      });
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        id: [this.appointment.id],
        // The id goes in `patient`; `patientLabel` only backs the type-ahead
        // input, so it is stripped before the request is sent.
        patient: [this.appointment.patient, Validators.required],
        patientLabel: [this.appointment.patient_name || ""],
        cabinet: [
          this.appointment.cabinet,
          this.isAdmin ? Validators.required : [],
        ],
        date: [this.appointment.date, Validators.required],
        start: [this.appointment.start, Validators.required],
        end: [this.appointment.end, Validators.required],
        description: [this.appointment.description, Validators.maxLength(2000)],
        payed: [this.appointment.payed ?? false],
      },
      { updateOn: "submit" }
    );
  }

  /** Type-ahead lookup; `term` is what the user has typed so far. */
  onPatientSearch(term: string): void {
    const cabinet = this.form.get("cabinet")?.value;
    this.patientService
      .searchPatients(term, cabinet ?? undefined)
      .subscribe({
        next: (page) => (this.patients = page.results || []),
        error: () => (this.patients = []),
      });
  }

  /**
   * Stores the picked patient's id in the form.
   *
   * The endpoint requires the appointment and its patient to share a cabinet, so
   * an admin who changes patient after choosing a cabinet would otherwise get an
   * opaque rejection; the cabinet follows the patient instead.
   */
  onPatientSelected(patient: Patient): void {
    this.selectedPatient = patient;
    this.form.get("patient")?.setValue(patient.id);
    this.form.get("patientLabel")?.setValue(this.patientLabel(patient));
    if (this.isAdmin && patient.cabinet) {
      this.form.get("cabinet")?.setValue(patient.cabinet);
    }
  }

  /** Displayed in the picker; `firstname` alone would be ambiguous. */
  patientLabel(patient: Patient): string {
    return `${patient.firstname || ""} ${patient.lastname || ""}`.trim();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const value = this.form.getRawValue();
    delete value.id;
    delete value.patientLabel;
    // Staff must not send a cabinet: the endpoint derives it from the token.
    if (!this.isAdmin) {
      delete value.cabinet;
    }
    // An empty textarea would send "" where the column is nullable.
    if (!value.description) {
      value.description = undefined;
    }

    const request =
      this.action === "edit"
        ? this.appointmentService.updateAppointment({
            ...value,
            id: this.appointment.id,
          })
        : this.appointmentService.addAppointment(value);

    request.subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        // Overlapping slots and past dates are the common rejections, and the
        // endpoint explains which field was at fault.
        this.snackBar.open(apiErrorMessage(error), "Close", {
          duration: 6000,
          panelClass: "snackbar-danger",
        });
      }
    );
  }
}