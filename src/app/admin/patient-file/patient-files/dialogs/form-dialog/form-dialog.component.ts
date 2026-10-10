import { Component, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { apiErrorMessage } from "src/app/core/api-error";
import { PatientService } from "../../../../../patient/patient.service";
import { Patient } from "../../../../../patient/patient.model";
import { PatientFile } from "../../../patient-file.model";
import {
  MAX_UPLOAD_BYTES,
  PatientFileService,
} from "../../../patient-file.service";

/**
 * Upload a new document, or replace the file on an existing row.
 *
 * Replacing keeps the same row so any reference to it survives; the patient
 * cannot be changed afterwards because the endpoint derives the cabinet from it.
 */
@Component({
  selector: "app-patient-file-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  form: FormGroup;
  patientFile: Partial<PatientFile>;
  patients: Patient[] = [];
  loading = false;
  /** Human readable size of the picked file, shown next to the input. */
  fileSize = "";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientFileService: PatientFileService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.patientFile = data.patientFile || {};
    this.dialogTitle =
      this.action === "edit" ? "Replace Document" : "Upload Document";
    this.form = this.fb.group(
      {
        patient: [
          this.patientFile.patient,
          this.action === "edit" ? [] : Validators.required,
        ],
        patientLabel: [""],
        file: [null, Validators.required],
      },
      { updateOn: "submit" }
    );
  }

  onPatientSearch(term: string): void {
    this.patientService.searchPatients(term).subscribe({
      next: (page) => (this.patients = page.results || []),
      error: () => (this.patients = []),
    });
  }

  onPatientSelected(patient: Patient): void {
    this.form.get("patient")?.setValue(patient.id);
    this.form.get("patientLabel")?.setValue(
      `${patient.firstname || ""} ${patient.lastname || ""}`.trim()
    );
  }

  onFilePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;
    this.form.get("file")?.setValue(file);
    this.fileSize = file ? this.formatSize(file.size) : "";

    if (file && file.size > MAX_UPLOAD_BYTES) {
      // Caught here so an oversized pick never becomes a rejected request.
      this.form.get("file")?.setErrors({ tooLarge: true });
    }
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    const file: File = this.form.get("file").value;
    this.loading = true;

    const request =
      this.action === "edit"
        ? this.patientFileService.updatePatientFile(this.patientFile.id, file)
        : this.patientFileService.addPatientFile(
            this.form.get("patient").value,
            file
          );

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