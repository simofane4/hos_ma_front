import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

@Component({
  selector: "app-patient-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  patientForm: FormGroup;
  patient: Partial<Patient>;
  cabinets: Cabinet[] = [];
  loading = false;
  /**
   * An admin is not attached to a cabinet and therefore has to pick one.
   * Staff are locked to their own by the endpoint, so the field is hidden.
   */
  isAdmin = false;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.patient = data.patient || {};
    this.dialogTitle =
      this.action === "edit"
        ? `${this.patient.firstname || ""} ${this.patient.lastname || ""}`.trim()
        : "New Patient";
    // Resolved before the form is built: the cabinet validator depends on it.
    this.isAdmin = this.authService.currentUserValue?.role === "admin";
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
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
        id: [this.patient.id],
        firstname: [
          this.patient.firstname,
          [Validators.required, Validators.maxLength(255)],
        ],
        lastname: [
          this.patient.lastname,
          [Validators.required, Validators.maxLength(255)],
        ],
        cin: [
          this.patient.cin,
          [Validators.required, Validators.maxLength(25)],
        ],
        gender: [this.patient.gender || "Male", Validators.required],
        age: [
          this.patient.age,
          // The API accepts 0..130 and treats the age as optional for a minor.
          [Validators.min(0), Validators.max(130)],
        ],
        phone: [
          this.patient.phone,
          [Validators.required, Validators.maxLength(25)],
        ],
        address: [this.patient.address, Validators.maxLength(500)],
        child: [this.patient.child || false],
        cabinet: [
          this.patient.cabinet,
          this.isAdmin ? Validators.required : [],
        ],
      },
      { updateOn: "submit" }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.patientForm.invalid || this.loading) {
      this.patientForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const value = this.patientForm.getRawValue();
    // Staff must not send a cabinet: the endpoint derives it from the token.
    if (!this.isAdmin) {
      delete value.cabinet;
    }

    const request =
      this.action === "edit"
        ? this.patientService.updatePatient(value)
        : this.patientService.addPatient(value);

    request.subscribe(
      () => {
        this.loading = false;
        this.dialogRef.close(1);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        // A cin/phone already used inside the same cabinet is the common
        // rejection; the API explains it per field, so pass the detail on.
        this.snackBar.open(apiErrorMessage(error), "Close", {
          duration: 6000,
          panelClass: "snackbar-danger",
        });
      }
    );
  }
}