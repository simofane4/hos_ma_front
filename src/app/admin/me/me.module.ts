import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { MeRoutingModule } from "./me-routing.module";
import { MeComponent } from "./me.component";

@NgModule({
  declarations: [MeComponent],
  imports: [
    MeRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  // `AuthService` is a root singleton, so the profile is shared with the guard.
})
export class MeModule {}