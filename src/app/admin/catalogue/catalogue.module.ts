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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { CatalogueRoutingModule } from "./catalogue-routing.module";
import { CataloguesComponent } from "./catalogues/catalogues.component";
import { DeleteDialogComponent } from "./catalogues/dialogs/delete/delete.component";
import { FormDialogComponent } from "./catalogues/dialogs/form-dialog/form-dialog.component";
import { CatalogueService } from "./catalogue.service";

/**
 * Backs the four catalogue screens (specialities, medicaments, requested acts,
 * performed acts). Each route points the same component at a different
 * {@link CatalogueSpec} through its `data`.
 */
@NgModule({
  declarations: [CataloguesComponent, DeleteDialogComponent, FormDialogComponent],
  imports: [
    CatalogueRoutingModule,
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
    MatProgressSpinnerModule,
    SharedModule,
  ],
  providers: [CatalogueService],
})
export class CatalogueModule {}