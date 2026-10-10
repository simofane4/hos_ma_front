import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../cabinet/cabinets/cabinet.model";
import { Appointment, AppointmentFilters } from "../appointment.model";
import { AppointmentService } from "../appointment.service";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.sass"],
})
export class AppointmentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = ["patient", "date", "time", "cabinet", "description", "payed", "actions"];

  dataSource: AppointmentsDataSource | null = null;

  cabinets: Cabinet[] = [];
  cabinetFilter: number | "" = "";
  paidFilter: boolean | "" = "";
  /** Inclusive ISO dates; empty means unbounded. */
  fromFilter = "";
  toFilter = "";
  hasFilters = false;

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new AppointmentsDataSource(
      this.appointmentService,
      this.paginator,
      this.sort
    );

    this.subs.sink = fromEvent<Event>(
      this.filter.nativeElement,
      "keyup"
    ).subscribe(() => {
      this.dataSource.search = this.filter.nativeElement.value;
    });

    this.subs.sink = this.httpClient
      .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
        params: { page_size: 200 },
      })
      .subscribe(
        (page) => (this.cabinets = page.results || []),
        () => (this.cabinets = [])
      );
  }

  onFilterChange(): void {
    this.dataSource.cabinet =
      this.cabinetFilter === "" ? undefined : Number(this.cabinetFilter);
    this.dataSource.payed =
      this.paidFilter === "" ? undefined : this.paidFilter === true;
    this.dataSource.dateFrom = this.fromFilter || undefined;
    this.dataSource.dateTo = this.toFilter || undefined;
    this.hasFilters = !!(
      this.cabinetFilter !== "" ||
      this.paidFilter !== "" ||
      this.fromFilter ||
      this.toFilter
    );
    // A narrower result set invalidates the current offset.
    this.paginator.pageIndex = 0;
    this.dataSource.reload();
  }

  clearFilters(): void {
    this.cabinetFilter = "";
    this.paidFilter = "";
    this.fromFilter = "";
    this.toFilter = "";
    this.onFilterChange();
  }

  refresh(): void {
    this.dataSource.reload();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { appointment: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Appointment added successfully");
      }
    });
  }

  editCall(row: Appointment): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { appointment: row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Appointment updated successfully");
      }
    });
  }

  deleteItem(row: Appointment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-danger", "Appointment deleted successfully");
      }
    });
  }

  private notify(colorName: string, text: string): void {
    this.snackBar.open(text, "", { duration: 3000, panelClass: colorName });
  }
}

export class AppointmentsDataSource extends PagedDataSource<
  Appointment,
  AppointmentFilters
> {
  /** Optional server-side filters driven by the controls above the table. */
  cabinet?: number;
  payed?: boolean;
  dateFrom?: string;
  dateTo?: string;

  constructor(
    private readonly appointmentService: AppointmentService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): AppointmentFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      cabinet: this.cabinet,
      payed: this.payed,
      date_from: this.dateFrom,
      date_to: this.dateTo,
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}${
            SORT_FIELDS[active] || active
          }`
        : undefined,
    };
  }

  protected fetchPage(query: AppointmentFilters): Observable<Page<Appointment>> {
    return this.appointmentService
      .getPage(query)
      .pipe(map((page) => page));
  }
}

/**
 * Column id -> backend `ordering` field.
 *
 * The endpoint only accepts `date`, `start` and `created_at`, so those are the
 * only sortable columns: anything else here would be silently dropped by the
 * server's OrderingFilter.
 */
const SORT_FIELDS: Record<string, string> = {
  time: "start",
  date: "date",
};