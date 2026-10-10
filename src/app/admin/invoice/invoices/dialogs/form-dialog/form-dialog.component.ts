import { Component, Inject, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { apiErrorMessage } from "src/app/core/api-error";
import { AppointmentService } from "../../../../appointment/appointment.service";
import { Appointment } from "../../../../appointment/appointment.model";
import { PatientService } from "../../../../../patient/patient.service";
import { Patient } from "../../../../../patient/patient.model";
import { Invoice } from "../../../invoice.model";
import { InvoiceService } from "../../../invoice.service";

@Component({
  selector: "app-invoice-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  form: FormGroup;
  invoice: Partial<Invoice>;
  /** Candidate appointments, loaded once the patient is narrowed down. */
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invoiceService: InvoiceService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.invoice = data.invoice || {};
    this.dialogTitle = this.action === "edit" ? `Edit Invoice #${this.invoice.id}` : "New Invoice";
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.action === "edit" && this.invoice.appointment) {
      this.loadAppointments(this.invoice.appointment);
    }
  }

  private createForm(): FormGroup {
    // `date` arrives as an ISO timestamp; the input needs `yyyy-MM-dd` only.
    const date = this.invoice.date ? String(this.invoice.date).slice(0, 10) : "";

    return this.fb.group(
      {
        id: [this.invoice.id],
        patient: [null],
        patientLabel: [this.invoice.patient_name || ""],
        appointment: [this.invoice.appointment, Validators.required],
        date: [date, Validators.required],
        amount: [
          this.invoice.amount,
          [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        payed: [this.invoice.payed ?? false],
      },
      { updateOn: "submit" }
    );
  }

  /**
   * Type-ahead over patients.
   *
   * Invoices hang off an appointment rather than a patient, so picking a patient
   * narrows the appointments that can actually be billed.
   */
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

  /** Loads the patient's appointments, preferring the one already chosen. */
  private loadAppointments(preferredId: number | null, patientId?: number): void {
    const id = patientId ?? this.form.get("patient")?.value;
    if (!id) {
      return;
    }
    this.appointmentService
      .getPage({ patient: Number(id), page_size: 50 })
      .subscribe({
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
    const day = String(appointment.date).slice(0, 10);
    return `${day} ${appointment.start}-${appointment.end}`;
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
    // Only used to narrow the appointment list.
    delete value.patient;
    delete value.patientLabel;

    const request =
      this.action === "edit"
        ? this.invoiceService.updateInvoice({ ...value, id: this.invoice.id })
        : this.invoiceService.addInvoice(value);

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