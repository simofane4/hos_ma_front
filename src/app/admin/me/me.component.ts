import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { apiErrorMessage } from "src/app/core/api-error";
import { AuthProfile, AuthService } from "src/app/core/service/auth.service";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../cabinet/cabinets/cabinet.model";

/**
 * Read-only view of the signed-in account.
 *
 * `/api/auth/me/` answers GET only, so nothing here is editable: a PATCH is
 * rejected with 405. Changes to names or e-mail belong to the Users screen.
 */
@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.sass"],
})
export class MeComponent implements OnInit {
  profile: AuthProfile | null = null;
  loading = true;
  failed = false;

  /** The endpoint only returns `cabinet_id`, so the label is resolved here. */
  cabinet: Cabinet | null = null;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.failed = false;
    this.authService.getProfile().subscribe(
      (profile) => {
        this.profile = profile;
        this.loading = false;
        this.resolveCabinet(profile.cabinet_id);
      },
      (error) => {
        this.loading = false;
        this.failed = true;
        this.snackBar.open(apiErrorMessage(error), "Close", {
          duration: 6000,
          panelClass: "snackbar-danger",
        });
      }
    );
  }

  private resolveCabinet(cabinetId: number): void {
    if (!cabinetId) {
      // An admin is not attached to a cabinet.
      this.cabinet = null;
      return;
    }
    this.httpClient
      .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
        params: { page_size: 200 },
      })
      .subscribe({
        next: (page) => {
          this.cabinet =
            (page.results || []).find((c) => c.id === cabinetId) || null;
        },
        // A missing label is cosmetic, so it is not surfaced as an error.
        error: () => (this.cabinet = null),
      });
  }

  cabinetLabel(): string {
    if (!this.profile || !this.profile.cabinet_id) {
      return "All cabinets";
    }
    return this.cabinet
      ? `${this.cabinet.name} (${this.cabinet.number})`
      : `#${this.profile.cabinet_id}`;
  }

  fullName(): string {
    if (!this.profile) {
      return "";
    }
    return `${this.profile.first_name || ""} ${this.profile.last_name || ""}`.trim();
  }
}