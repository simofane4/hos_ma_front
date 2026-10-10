import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { apiErrorMessage } from "src/app/core/api-error";
import { AuthService } from "src/app/core/service/auth.service";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../../../cabinet/cabinets/cabinet.model";
import { CatalogueSpec } from "../../../catalogue.config";
import { CatalogueRequest, CatalogueRow } from "../../../catalogue.model";
import { CatalogueService } from "../../../catalogue.service";

/**
 * Create/edit form for any of the catalogue screens.
 *
 * Which fields appear is decided by the {@link CatalogueSpec}, so this one
 * component covers the four endpoints without four near-identical templates.
 */
@Component({
  selector: "app-catalogue-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  form: FormGroup;
  row: CatalogueRow;
  cabinets: Cabinet[] = [];
  loading = false;
  /**
   * An admin is not attached to a cabinet and therefore has to pick one.
   * Staff are locked to their own by the endpoint, so the field is hidden.
   */
  isAdmin = false;

  /** The catalogue this dialog was opened for. */
  get spec(): CatalogueSpec {
    return this.data.spec;
  }

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogueService: CatalogueService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.row = data.row || {};
    this.dialogTitle =
      this.action === "edit"
        ? this.existingLabel() || `Edit ${data.spec.singular}`
        : `New ${data.spec.singular}`;
    // Resolved before the form is built: the cabinet validator depends on it.
    this.isAdmin =
      data.spec.hasCabinet && this.authService.currentUserValue?.role === "admin";
    this.form = this.createForm();
  }

  ngOnInit(): void {
    // `isAdmin` already folds in `hasCabinet`, so this only fires when the
    // cabinet picker is actually rendered.
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
  }

  private existingLabel(): string {
    const label = this.row[this.data.spec.labelField];
    return label ? String(label) : "";
  }

  private createForm(): FormGroup {
    const spec: CatalogueSpec = this.data.spec;
    const label = this.row[spec.labelField];

    const controls: { [key: string]: any } = {
      [spec.labelField]: [label, [Validators.required, Validators.maxLength(255)]],
    };
    if (spec.hasDescription) {
      controls["description"] = [this.row.description, Validators.maxLength(2000)];
    }
    if (spec.hasCabinet) {
      controls["cabinet"] = [
        this.row.cabinet,
        this.isAdmin ? Validators.required : [],
      ];
    }

    return this.fb.group(controls, { updateOn: "submit" });
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

    const spec: CatalogueSpec = this.data.spec;
    const value = this.form.getRawValue() as CatalogueRequest;
    if (!this.isAdmin) {
      // Staff must not send a cabinet: the endpoint derives it from the token.
      delete value.cabinet;
    }

    const request =
      this.action === "edit"
        ? this.catalogueService.update(spec, { ...value, id: this.row.id })
        : this.catalogueService.create(spec, value);

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