
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CATALOGUES } from './catalogue/catalogue.config';

/**
 * Route segments served by the shared catalogue component.
 *
 * Derived from the config so the sidebar, the routes and the component cannot
 * drift apart: an endpoint added to `CATALOGUES` is routable immediately.
 */
const CATALOGUE_ROUTES = Object.keys(CATALOGUES);



const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'cabinet',
    loadChildren: () =>
    import('./cabinet/cabinet.module').then((m) => m.CabinetModule)
  },
  {
    path:'doctor',
    loadChildren: () =>
    import('./doctor/doctor.module').then((m) => m.DoctorModule)
  },
  {
    path:'assistants',
    loadChildren: () =>
    import('./assistant/assistant.module').then((m) => m.AssistantModule)
  },
  {
    path:'users',
    loadChildren: () =>
    import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path:'patients',
    loadChildren: () =>
    import('./patient/patient.module').then((m) => m.PatientModule)
  },
  // The four catalogue screens share one component and pick their endpoint from
  // the route's `data.slug`, so adding one is a route plus a config entry.
  ...CATALOGUE_ROUTES.map((slug) => ({
    path: slug,
    loadChildren: () =>
      import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
    data: { slug },
  })),
  {
    path:'patient-files',
    loadChildren: () =>
    import('./patient-file/patient-file.module').then((m) => m.PatientFileModule)
  },
  {
    path:'ordonnances',
    loadChildren: () =>
    import('./ordonnance/ordonnance.module').then((m) => m.OrdonnanceModule)
  },
  {
    path:'invoices',
    loadChildren: () =>
    import('./invoice/invoice.module').then((m) => m.InvoiceModule)
  },
  {
    path:'appointments',
    loadChildren: () =>
    import('./appointment/appointment.module').then((m) => m.AppointmentModule)
  },
  {
    path:'me',
    loadChildren: () =>
    import('./me/me.module').then((m) => m.MeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AdminRoutingModule {}
