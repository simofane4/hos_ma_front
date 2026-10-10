import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { OrdonnancesComponent } from "./ordonnances/ordonnances.component";

const routes: Routes = [
  {
    path: "",
    component: OrdonnancesComponent,
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
export class OrdonnanceRoutingModule {}