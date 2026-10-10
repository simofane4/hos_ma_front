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
import { Ordonnance, OrdonnanceFilters } from "../ordonnance.model";
import { OrdonnanceService } from "../ordonnance.service";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

@Component({
  selector: "app-ordonnances",
  templateUrl: "./ordonnances.component.html",
  styleUrls: ["./ordonnances.component.sass"],
})
export class OrdonnancesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = ["id", "description", "appointment", "medicines", "cabinet", "date", "actions"];

  dataSource: OrdonnancesDataSource | null = null;

  cabinets: Cabinet[] = [];
  cabinetFilter: number | "" = "";
  hasFilters = false;

  constructor(
    public dialog: MatDialog,
    private ordonnanceService: OrdonnanceService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new OrdonnancesDataSource(
      this.ordonnanceService,
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
    this.hasFilters = this.cabinetFilter !== "";
    // A narrower result set invalidates the current offset.
    this.paginator.pageIndex = 0;
    this.dataSource.reload();
  }

  clearFilters(): void {
    this.cabinetFilter = "";
    this.onFilterChange();
  }

  refresh(): void {
    this.dataSource.reload();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { ordonnance: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Prescription added successfully");
      }
    });
  }

  editCall(row: Ordonnance): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { ordonnance: row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Prescription updated successfully");
      }
    });
  }

  deleteItem(row: Ordonnance): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-danger", "Prescription deleted successfully");
      }
    });
  }

  /** "Paracétamol 500mg x3" style summary of the medicine lines. */
  medicineSummary(row: Ordonnance): string {
    const lines = row.medicaments_list || [];
    if (!lines.length) {
      return "-";
    }
    return lines
      .map((line) =>
        [
          line.medicament_name,
          line.dosage,
          line.duration ? `x ${line.duration}` : "",
        ]
          .filter(Boolean)
          .join(" ")
      )
      .join(", ");
  }

  private notify(colorName: string, text: string): void {
    this.snackBar.open(text, "", { duration: 3000, panelClass: colorName });
  }
}

export class OrdonnancesDataSource extends PagedDataSource<
  Ordonnance,
  OrdonnanceFilters
> {
  /** Optional server-side filter driven by the cabinet dropdown. */
  cabinet?: number;

  constructor(
    private readonly ordonnanceService: OrdonnanceService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): OrdonnanceFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      cabinet: this.cabinet,
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}${
            SORT_FIELDS[active] || active
          }`
        : undefined,
    };
  }

  protected fetchPage(query: OrdonnanceFilters): Observable<Page<Ordonnance>> {
    return this.ordonnanceService
      .getPage(query)
      .pipe(map((page) => page));
  }
}

/**
 * Column id -> backend `ordering` field.
 *
 * The endpoint only accepts `created_at`, so only the date column is sortable.
 */
const SORT_FIELDS: Record<string, string> = {
  date: "created_at",
};