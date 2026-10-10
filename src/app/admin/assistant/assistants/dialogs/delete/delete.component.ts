import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { AssistantService } from "../../../assistant.service";
import { Assistant } from "../../../assistant.model";
import { apiErrorMessage } from "src/app/core/api-error";

@Component({
  selector: "app-assistant-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent {
  loading = false;
  name: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assistant,
    public assistantService: AssistantService,
    private snackBar: MatSnackBar
  ) {
    this.name = `${data.user?.first_name || ""} ${
      data.user?.last_name || ""
    }`.trim();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.assistantService.deleteAssistant(this.data.id).subscribe(
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