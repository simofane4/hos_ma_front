import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { apiErrorMessage } from "src/app/core/api-error";
import { AssistantService } from "../../../assistant.service";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../../../cabinet/cabinets/cabinet.model";

@Component({
  selector: "app-assistant-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  assistantForm: FormGroup;
  assistant: any;
  cabinets: Cabinet[] = [];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public assistantService: AssistantService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.assistant = data.assistant || {};
    this.dialogTitle =
      this.action === "edit"
        ? `${this.assistant.user?.first_name || ""} ${
            this.assistant.user?.last_name || ""
          }`.trim()
        : "New Assistant";
    this.assistantForm = this.createForm();
  }

  ngOnInit(): void {
    // The cabinet is a real foreign key, so offer the list instead of asking
    // the admin to type an id.
    this.httpClient
      .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
        params: { page_size: 100 },
      })
      .subscribe({
        next: (page) => (this.cabinets = page.results || []),
        error: () => (this.cabinets = []),
      });
  }

  private createForm(): FormGroup {
    const isEdit = this.action === "edit";
    return this.fb.group(
      {
        id: [this.assistant.id],
        username: [
          { value: this.assistant.user?.username, disabled: isEdit },
          [Validators.required, Validators.maxLength(150)],
        ],
        password: [
          "",
          // The API enforces a minimum of 8 characters on create only.
          isEdit ? [] : [Validators.required, Validators.minLength(8)],
        ],
        email: [
          this.assistant.user?.email,
          [Validators.required, Validators.email],
        ],
        first_name: [
          this.assistant.user?.first_name,
          [Validators.required, Validators.maxLength(150)],
        ],
        last_name: [
          this.assistant.user?.last_name,
          [Validators.required, Validators.maxLength(150)],
        ],
        cabinet: [this.assistant.cabinet, Validators.required],
        cin: [this.assistant.cin, Validators.maxLength(25)],
        gender: [this.assistant.gender || "Male", Validators.required],
        phone: [
          this.assistant.phone,
          [Validators.required, Validators.maxLength(30)],
        ],
        address: [this.assistant.address, Validators.maxLength(500)],
      },
      // `password` is cleared on edit, so ignore it there rather than
      // demanding the admin retype it.
      { updateOn: "submit" }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    if (this.assistantForm.invalid || this.loading) {
      this.assistantForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const value = this.assistantForm.getRawValue();

    if (this.action === "edit") {
      delete value.username;
      delete value.password;
    }

    const request =
      this.action === "edit"
        ? this.assistantService.updateAssistant(value)
        : this.assistantService.addAssistant(value);

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