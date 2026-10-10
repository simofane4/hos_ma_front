import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AuthService } from "src/app/core/service/auth.service";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../cabinet/cabinets/cabinet.model";
import { CATALOGUES, CatalogueSpec } from "../catalogue.config";
import {
  CatalogueFilters,
  CatalogueRow,
} from "../catalogue.model";
import { CatalogueService } from "../catalogue.service";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

/**
 * One list screen, reused by every catalogue in {@link CATALOGUES}.
 *
 * The active {@link CatalogueSpec} arrives through the route's `data`, so adding
 * a catalogue means adding a route and an entry in the config, not a component.
 */
@Component({
  selector: "app-catalogues",
  templateUrl: "./catalogues.component.html",
  styleUrls: ["./catalogues.component.sass"],
})
export class CataloguesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  spec!: CatalogueSpec;
  dataSource: CataloguesDataSource | null = null;

  cabinets: Cabinet[] = [];
  cabinetFilter: number | "" = "";
  hasFilters = false;

  /** An admin spans every clinic; staff see only their own. */
  isAdmin = false;

  /**
   * The cabinet dropdown is only useful to an admin. A doctor or assistant is
   * scoped to a single cabinet by the endpoint, so any other choice would come
   * back empty and read as a broken filter.
   */
  get canFilterByCabinet(): boolean {
    return this.spec.hasCabinet && this.isAdmin;
  }

  get displayedColumns(): string[] {
    const columns = ["label"];
    if (this.spec.hasDescription) {
      columns.push("description");
    }
    // Staff only ever see their own cabinet, so the column is pure noise.
    if (this.spec.hasCabinet && this.isAdmin) {
      columns.push("cabinet");
    }
    if (this.spec.hasTimestamps) {
      columns.push("date");
    }
    columns.push("actions");
    return columns;
  }

  /** Label of a row, whichever field the endpoint happens to use. */
  label(row: CatalogueRow): string {
    return String(row[this.spec.labelField] ?? "");
  }

  constructor(
    public dialog: MatDialog,
    private catalogueService: CatalogueService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.isAdmin = this.authService.currentUserValue?.role === "admin";
    this.spec = this.resolveSpec();

    this.dataSource = new CataloguesDataSource(
      this.catalogueService,
      this.spec,
      this.paginator,
      this.sort
    );

    this.subs.sink = fromEvent<Event>(
      this.filter.nativeElement,
      "keyup"
    ).subscribe(() => {
      this.dataSource.search = this.filter.nativeElement.value;
    });

    if (this.canFilterByCabinet) {
      // Admin only: staff are scoped to their own cabinet by the endpoint, so
      // the dropdown would only ever have one meaningful entry.
      this.subs.sink = this.httpClient
        .get<PaginatedCabinetList>(`${environment.restUrl}/api/cabinets/`, {
          params: { page_size: 200 },
        })
        .subscribe(
          (page) => (this.cabinets = page.results || []),
          () => (this.cabinets = [])
        );
    }
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
      data: { spec: this.spec, row: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", `${this.spec.singular} added successfully`);
      }
    });
  }

  editCall(row: CatalogueRow): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { spec: this.spec, row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", `${this.spec.singular} updated successfully`);
      }
    });
  }

  deleteItem(row: CatalogueRow): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { spec: this.spec, row },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-danger", `${this.spec.singular} deleted successfully`);
      }
    });
  }

  private resolveSpec(): CatalogueSpec {
    const slug = this.resolveSlug();
    const spec = CATALOGUES[slug];
    if (!spec) {
      // The route table and the config are edited together; a missing entry is a
      // programming error rather than something a user can trigger.
      throw new Error(`No catalogue registered for slug "${slug}"`);
    }
    return spec;
  }

  /**
   * The slug is declared on the lazy parent route. It normally reaches this
   * component through data inheritance, but walking the tree keeps it working if
   * the app ever switches to `paramsInheritanceStrategy: 'always'`.
   */
  private resolveSlug(): string {
    let route: ActivatedRoute = this.route;
    while (route) {
      const slug = route.snapshot.data["slug"];
      if (slug) {
        return slug;
      }
      route = route.parent;
    }
    return "";
  }

  private notify(colorName: string, text: string): void {
    this.snackBar.open(text, "", { duration: 3000, panelClass: colorName });
  }
}

export class CataloguesDataSource extends PagedDataSource<
  CatalogueRow,
  CatalogueFilters
> {
  /** Optional server-side filter driven by the cabinet dropdown. */
  cabinet?: number;

  constructor(
    private readonly catalogueService: CatalogueService,
    private readonly spec: CatalogueSpec,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): CatalogueFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      cabinet: this.cabinet,
      // The table's column ids are generic; the endpoint sorts on its own field
      // names, which differ per catalogue.
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}${this.sortField(active)}`
        : undefined,
    };
  }

  protected fetchPage(query: CatalogueFilters): Observable<Page<CatalogueRow>> {
    return this.catalogueService
      .getPage(this.spec, query)
      .pipe(map((page) => page));
  }

  private sortField(columnId: string): string {
    if (columnId === "label") {
      return this.spec.labelField;
    }
    return columnId === "date" ? "created_at" : columnId;
  }
}