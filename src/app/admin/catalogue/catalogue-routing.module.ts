import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page404Component } from "../../authentication/page404/page404.component";
import { CataloguesComponent } from "./catalogues/catalogues.component";

/**
 * The catalogue is a single component mounted by four lazy routes
 * (`specialites`, `medicaments`, `actes-demandes`, `actes-faits`). Each of those
 * parents carries `data.slug`, which the component resolves to pick its spec.
 */
const routes: Routes = [
  {
    path: "",
    component: CataloguesComponent,
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
export class CatalogueRoutingModule {}