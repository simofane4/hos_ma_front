import { Cabinet } from './../../cabinet.model';
import { CabinetsService } from './../../cabinets.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  cabinetsForm: FormGroup;
  cabinet: Cabinet;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cabinetsService: CabinetsService,
    private fb: FormBuilder,

  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.cabinet.name;
      this.cabinet = data.cabinet;
    } else {
      this.dialogTitle = "New Cabinet";
      this.cabinet = {
        id: null,
        name: "",
        number: "",
        address: "",
        created_at: "",
        updated_at: "",
      };

    }
    this.cabinetsForm = this.createContactForm();
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
      id: [this.cabinet.id],
      name: [this.cabinet.name],
      number: [this.cabinet.number],
      address: [this.cabinet.address],
    });
  }
  submit() {
    // emppty stuff marebama khessni ndir hna chi7aja
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.action === "edit") {
      this.cabinetsService.updateCabinet(this.cabinetsForm.getRawValue());
    } else {
      this.cabinetsService.addCabinet(this.cabinetsForm.getRawValue());

    }

  }
}
