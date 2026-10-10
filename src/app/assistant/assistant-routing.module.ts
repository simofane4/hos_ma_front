import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './../authentication/page404/page404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CATALOGUES } from '../admin/catalogue/catalogue.config';

/**
 * Assistant area.
 *
 * Like the doctor area, these are the same role-adaptive components as the
 * admin's: an assistant is scoped to one cabinet by the endpoint, so the cabinet
 * pickers are hidden and the modules stay in `src/app/admin/` as the single
 * implementation rather than being duplicated here.
 *
 * Only the dashboard is declared directly, because it is assistant specific.
 */
const CATALOGUE_ROUTES = Object.keys(CATALOGUES);

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('../admin/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'patient-files',
    loadChildren: () =>
      import('../admin/patient-file/patient-file.module').then(
        (m) => m.PatientFileModule
      ),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('../admin/appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('../admin/invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'ordonnances',
    loadChildren: () =>
      import('../admin/ordonnance/ordonnance.module').then(
        (m) => m.OrdonnanceModule
      ),
  },
  {
    path: 'me',
    loadChildren: () => import('../admin/me/me.module').then((m) => m.MeModule),
  },
  // The four catalogue screens share one component and read their endpoint from
  // the route's `data.slug`, exactly as under `/admin` and `/doctor`.
  ...CATALOGUE_ROUTES.map((slug) => ({
    path: slug,
    loadChildren: () =>
      import('../admin/catalogue/catalogue.module').then((m) => m.CatalogueModule),
    data: { slug },
  })),
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantRoutingModule {}