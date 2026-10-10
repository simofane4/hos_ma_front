import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/core/service/auth.service";
import { PatientService } from "../../patient/patient.service";
import {
  Appointment,
  AppointmentFilters,
} from "../../admin/appointment/appointment.model";
import { AppointmentService } from "../../admin/appointment/appointment.service";
import { InvoiceService } from "../../admin/invoice/invoice.service";
import { CATALOGUES } from "../../admin/catalogue/catalogue.config";
import { CatalogueService } from "../../admin/catalogue/catalogue.service";

/**
 * Assistant home.
 *
 * The doctor and patient dashboards that ship with the template are static chart
 * demos, so this one is built from live data instead: every figure comes from an
 * endpoint the assistant's own cabinet already scopes, so the numbers cannot
 * drift from the lists behind them.
 */
@Component({
  selector: "app-assistant-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  /** Today as `YYYY-MM-DD` in the caller's own timezone. */
  readonly today: string;

  patientCount: number | null = null;
  todayAppointmentCount: number | null = null;
  unpaidInvoiceCount: number | null = null;
  requestedActCount: number | null = null;

  todayAppointments: Appointment[] = [];
  loading = true;

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private invoiceService: InvoiceService,
    private catalogueService: CatalogueService,
    private authService: AuthService
  ) {
    const now = new Date();
    this.today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
  }

  ngOnInit(): void {
    // `page_size=1` is enough to read `count`, so each figure costs one small
    // request instead of downloading a whole table.
    this.count(this.patientService.getPatientsPage({ page_size: 1 })).subscribe(
      (n) => (this.patientCount = n)
    );
    this.count(
      this.appointmentService.getPage({ ...this.todayRange(), page_size: 1 })
    ).subscribe((n) => (this.todayAppointmentCount = n));
    this.count(
      this.invoiceService.getPage({ payed: false, page_size: 1 })
    ).subscribe((n) => (this.unpaidInvoiceCount = n));
    this.count(
      this.catalogueService.getPage(CATALOGUES["actes-demandes"], { page_size: 1 })
    ).subscribe((n) => (this.requestedActCount = n));

    this.appointmentService
      .getPage({ ...this.todayRange(), page_size: 5, ordering: "start" })
      .pipe(
        map((page) => page.results || []),
        catchError(() => of([]))
      )
      .subscribe((rows) => {
        this.todayAppointments = rows;
        this.loading = false;
      });
  }

  /** Today's window; the endpoint matches it against the appointment's own date. */
  private todayRange(): AppointmentFilters {
    return { date_from: this.today, date_to: this.today };
  }

  /**
   * Reduces a paged response to its `count`. A failed request yields `null`, which
   * the template renders as "-" so a broken figure is never shown as a real zero.
   */
  private count(
    source: Observable<{ count: number }>
  ): Observable<number | null> {
    return source.pipe(
      map((page) => page.count),
      catchError(() => of(null))
    );
  }

  cabinetLabel(): string {
    const id = this.authService.currentUserValue?.cabinetId;
    return id ? `Cabinet #${id}` : "";
  }

  display(value: number | null): string {
    return value === null ? "-" : String(value);
  }

  trackById(_index: number, row: Appointment): number {
    return row.id;
  }
}