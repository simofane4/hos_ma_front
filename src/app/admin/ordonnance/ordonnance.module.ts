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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { OrdonnanceRoutingModule } from "./ordonnance-routing.module";
import { OrdonnancesComponent } from "./ordonnances/ordonnances.component";
import { DeleteDialogComponent } from "./ordonnances/dialogs/delete/delete.component";
import { FormDialogComponent } from "./ordonnances/dialogs/form-dialog/form-dialog.component";
import { OrdonnanceService } from "./ordonnance.service";
import { CatalogueService } from "../catalogue/catalogue.service";
import { AppointmentService } from "../appointment/appointment.service";
import { PatientService } from "../../patient/patient.service";

@NgModule({
  declarations: [OrdonnancesComponent, DeleteDialogComponent, FormDialogComponent],
  imports: [
    OrdonnanceRoutingModule,
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
    MatProgressSpinnerModule,
    SharedModule,
  ],
  // The form picks a medicament through the shared catalogue service and an
  // appointment through the appointment service, so both come along.
  providers: [OrdonnanceService, CatalogueService, AppointmentService, PatientService],
})
export class OrdonnanceModule {}