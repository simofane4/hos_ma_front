import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { AssistantRoutingModule } from './assistant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientService } from '../patient/patient.service';
import { AppointmentService } from '../admin/appointment/appointment.service';
import { InvoiceService } from '../admin/invoice/invoice.service';
import { CatalogueService } from '../admin/catalogue/catalogue.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    AssistantRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  // The dashboard reads its figures through the same services the screens behind
  // it use, so a count and its list can never disagree.
  providers: [
    PatientService,
    AppointmentService,
    InvoiceService,
    CatalogueService,
  ],
})
export class AssistantModule {}