import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { SelectionModel } from "@angular/cdk/collections";
import { forkJoin, fromEvent, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PatientService } from "../../../patient/patient.service";
import { Gender, Patient, PatientFilters } from "../../../patient/patient.model";
import {
  Cabinet,
  PaginatedCabinetList,
} from "../../cabinet/cabinets/cabinet.model";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";

@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.sass"],
})
export class PatientsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    "select",
    "img",
    "name",
    "cin",
    "cabinet",
    "gender",
    "age",
    "phone",
    "date",
    "actions",
  ];

  dataSource: PatientsDataSource | null = null;
  selection = new SelectionModel<Patient>(true, []);
  deleting = false;

  readonly genders: Gender[] = ["Male", "Female"];
  cabinets: Cabinet[] = [];
  genderFilter: Gender | "" = "";
  cabinetFilter: number | "" = "";
  hasFilters = false;

  constructor(
    public dialog: MatDialog,
    private patientService: PatientService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new PatientsDataSource(
      this.patientService,
      this.paginator,
      this.sort
    );

    this.subs.sink = fromEvent<Event>(
      this.filter.nativeElement,
      "keyup"
    ).subscribe(() => {
      this.dataSource.search = this.filter.nativeElement.value;
    });

    // Each page is a fresh set of objects from the API, so a selection made on
    // one page would otherwise point at rows that are no longer on screen.
    this.subs.sink = this.paginator.page.subscribe(() =>
      this.selection.clear()
    );

    // An admin sees every cabinet, so the filter and the table need real names
    // rather than bare ids. Staff ignore this: the endpoint hides other
    // cabinets anyway.
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
    this.dataSource.gender = this.genderFilter || undefined;
    this.dataSource.cabinet =
      this.cabinetFilter === "" ? undefined : Number(this.cabinetFilter);
    this.hasFilters = !!(this.genderFilter || this.cabinetFilter !== "");
    // A narrower result set invalidates the current offset.
    this.paginator.pageIndex = 0;
    this.selection.clear();
    this.dataSource.reload();
  }

  clearFilters(): void {
    this.genderFilter = "";
    this.cabinetFilter = "";
    this.onFilterChange();
  }

  refresh(): void {
    this.dataSource.reload();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { patient: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.selection.clear();
        this.dataSource.reload();
        this.showNotification("snackbar-success", "Patient added successfully");
      }
    });
  }

  editCall(row: Patient): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { patient: row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.showNotification("snackbar-success", "Patient updated successfully");
      }
    });
  }

  deleteItem(row: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.selection.clear();
        this.dataSource.reload();
        this.showNotification("snackbar-danger", "Patient deleted successfully");
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.currentRows.length;
    return numSelected === numRows && numRows > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.currentRows.forEach((row) => this.selection.select(row));
    }
  }

  /**
   * Deletes every selected row through the API.
   *
   * The endpoint takes one id at a time, so the calls run in parallel and the
   * table reloads once they settle: dropping rows locally first would hide the
   * rows the server refused.
   */
  removeSelectedRows(): void {
    const targets = this.selection.selected.slice();
    if (!targets.length || this.deleting) {
      return;
    }
    this.deleting = true;

    const requests = targets.map((row) =>
      this.patientService.deletePatient(row.id).pipe(catchError(() => of(null)))
    );

    this.subs.sink = forkJoin(requests).subscribe((responses) => {
      const failed = responses.filter((r) => r === null).length;
      this.deleting = false;
      this.selection.clear();
      this.dataSource.reload();

      if (failed) {
        this.showNotification(
          "snackbar-danger",
          `${targets.length - failed} deleted, ${failed} failed`
        );
      } else {
        this.showNotification(
          "snackbar-danger",
          `${targets.length} patient(s) deleted`
        );
      }
    });
  }

  showNotification(colorName: string, text: string) {
    this.snackBar.open(text, "", {
      duration: 3000,
      panelClass: colorName,
    });
  }
}

export class PatientsDataSource extends PagedDataSource<Patient, PatientFilters> {
  /** Optional server-side filters driven by the dropdowns above the table. */
  gender?: Gender;
  cabinet?: number;

  constructor(
    private readonly patientService: PatientService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): PatientFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      gender: this.gender,
      cabinet: this.cabinet,
      // The endpoint sorts on its own field names, not on the column ids.
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}${
            SORT_FIELDS[active] || active
          }`
        : undefined,
    };
  }

  protected fetchPage(query: PatientFilters): Observable<Page<Patient>> {
    return this.patientService
      .getPatientsPage(query)
      .pipe(map((page) => page));
  }
}

/** Column id -> backend `ordering` field. */
const SORT_FIELDS: Record<string, string> = {
  name: "lastname",
  age: "age",
  date: "created_at",
};