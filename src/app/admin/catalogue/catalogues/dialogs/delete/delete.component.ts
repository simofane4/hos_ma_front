import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { apiErrorMessage } from "src/app/core/api-error";
import { CatalogueSpec } from "../../../catalogue.config";
import { CatalogueRow } from "../../../catalogue.model";
import { CatalogueService } from "../../../catalogue.service";

@Component({
  selector: "app-catalogue-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent {
  loading = false;
  label: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogueService: CatalogueService,
    private snackBar: MatSnackBar
  ) {
    const spec: CatalogueSpec = data.spec;
    const row: CatalogueRow = data.row;
    this.label = String(row[spec.labelField] ?? "");
  }

  get spec(): CatalogueSpec {
    return this.data.spec;
  }

  get row(): CatalogueRow {
    return this.data.row;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.catalogueService.delete(this.spec, this.row.id).subscribe(
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