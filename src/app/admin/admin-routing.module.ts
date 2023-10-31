
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



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
    path:'cabinet',
    loadChildren: () =>
    import('./doctor/doctor.module').then((m) => m.DoctorModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class AdminRoutingModule {}
