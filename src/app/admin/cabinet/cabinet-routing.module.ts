import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from "./../authentication/page404/page404.component";
import { CabinetsComponent } from './cabinets/cabinets.component';

const routes: Routes = [


  {
    path:"cabinet",
    component: CabinetsComponent
  },
  {
    path: "**",
    component: Page404Component
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
