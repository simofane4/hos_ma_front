import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { InvoiceRoutingModule } from "./invoice-routing.module";
import { InvoicesComponent } from "./invoices/invoices.component";
import { DeleteDialogComponent } from "./invoices/dialogs/delete/delete.component";
import { FormDialogComponent } from "./invoices/dialogs/form-dialog/form-dialog.component";
import { InvoiceService } from "./invoice.service";
import { AppointmentService } from "../appointment/appointment.service";
import { PatientService } from "../../patient/patient.service";

@NgModule({
  declarations: [InvoicesComponent, DeleteDialogComponent, FormDialogComponent],
  imports: [
    InvoiceRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  // The form dialog bills an appointment belonging to a patient, so it needs
  // both of those services alongside its own.
  providers: [InvoiceService, AppointmentService, PatientService],
})
export class InvoiceModule {}