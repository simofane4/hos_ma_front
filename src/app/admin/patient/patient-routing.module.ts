import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { PatientsComponent } from "./patients/patients.component";

const routes: Routes = [
  {
    path: "",
    component: PatientsComponent,
  },
  {
    path: "**",
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}