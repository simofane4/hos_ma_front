import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { PatientFileRoutingModule } from "./patient-file-routing.module";
import { PatientFilesComponent } from "./patient-files/patient-files.component";
import { DeleteDialogComponent } from "./patient-files/dialogs/delete/delete.component";
import { FormDialogComponent } from "./patient-files/dialogs/form-dialog/form-dialog.component";
import { PatientFileService } from "./patient-file.service";
import { PatientService } from "../../patient/patient.service";

@NgModule({
  declarations: [PatientFilesComponent, DeleteDialogComponent, FormDialogComponent],
  imports: [
    PatientFileRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  // The upload dialog resolves a patient through the shared patient service.
  providers: [PatientFileService, PatientService],
})
export class PatientFileModule {}