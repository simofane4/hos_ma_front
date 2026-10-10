import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { apiErrorMessage } from "src/app/core/api-error";
import { Ordonnance } from "../../../ordonnance.model";
import { OrdonnanceService } from "../../../ordonnance.service";

@Component({
  selector: "app-ordonnance-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ordonnance,
    private ordonnanceService: OrdonnanceService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.ordonnanceService.deleteOrdonnance(this.data.id).subscribe(
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