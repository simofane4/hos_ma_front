import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DoctorService } from "../../doctor.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { apiErrorMessage } from "src/app/core/api-error";
import { Doctor, DoctorClass } from "./../../doctor.model";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  doctorForm: FormGroup;
  doctor: Doctor;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public doctorService: DoctorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.doctor.id;
      this.doctor = data.doctor;
    } else {
      this.dialogTitle = "New Doctor";
      this.doctor = new DoctorClass({});
    }
    this.doctorForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.doctor.id],
      username: [this.doctor.user?.username],
      email: [this.doctor.user?.email],
      first_name: [this.doctor.user?.first_name],
      last_name: [this.doctor.user?.last_name],
      password: [''],
      inp: [this.doctor.inp],
      gender: [this.doctor.gender],
      phone: [this.doctor.phone],
      address: [this.doctor.address],
      specialiste: [this.doctor.specialiste],
      cabinet: [this.doctor.cabinet],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.doctorForm.invalid || this.loading) {
      return;
    }
    this.loading = true;

    const value = this.doctorForm.getRawValue();
    const request =
      this.action === "edit"
        ? this.doctorService.updateDoctor(value)
        : this.doctorService.addDoctor(value);

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
