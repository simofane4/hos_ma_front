import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { BehaviorSubject, fromEvent, forkJoin, merge, Observable, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { AssistantService } from "../assistant.service";
import { Assistant } from "../assistant.model";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-assistants",
  templateUrl: "./assistants.component.html",
  styleUrls: ["./assistants.component.sass"],
})
export class AssistantsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    "select",
    "img",
    "name",
    "cabinet",
    "cin",
    "gender",
    "mobile",
    "email",
    "date",
    "actions",
  ];

  exampleDatabase: AssistantService | null;
  dataSource: AssistantsDataSource | null;
  selection = new SelectionModel<Assistant>(true, []);
  index: number;
  id: number;
  assistant: Assistant | null;
  deleting = false;

  constructor(
    public dialog: MatDialog,
    public assistantService: AssistantService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        assistant: this.assistant,
        action: "add",
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // The service holds the created row, so push it in and re-sort.
        this.exampleDatabase.dataChange.value.unshift(
          this.assistantService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          "snackbar-success",
          "Assistant added successfully",
          "bottom",
          "center"
        );
      }
    });
  }

  editCall(row: Assistant) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        assistant: row,
        action: "edit",
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // Re-read rather than trusting the local copy: the API is the source
        // of truth for cabinet_name and the user fields it derives.
        this.assistantService.getAssistant(this.id).subscribe((updated) => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.id === this.id
          );
          if (foundIndex > -1) {
            this.exampleDatabase.dataChange.value[foundIndex] = updated;
            this.refreshTable();
          }
          this.showNotification(
            "snackbar-success",
            "Assistant updated successfully",
            "bottom",
            "center"
          );
        });
      }
    });
  }

  deleteItem(row: Assistant) {
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        if (foundIndex > -1) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        }
        this.selection.clear();
        this.refreshTable();
        this.showNotification(
          "snackbar-danger",
          "Assistant deleted successfully",
          "bottom",
          "center"
        );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows && numRows > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }

  /**
   * Deletes every selected row through the API.
   *
   * The endpoint only accepts one id at a time, so the calls run in parallel and
   * the table is reloaded once they settle -- dropping rows locally first would
   * hide rows that the server rejected.
   */
  removeSelectedRows() {
    const targets = this.selection.selected.slice();
    if (!targets.length || this.deleting) {
      return;
    }
    this.deleting = true;

    const requests = targets.map((row) =>
      this.assistantService.deleteAssistant(row.id).pipe(catchError(() => of(null)))
    );

    this.subs.sink = forkJoin(requests)
      .pipe(
        finalize(() => {
          this.deleting = false;
        })
      )
      .subscribe((responses) => {
        const failed = responses.filter((r) => r === null).length;
        this.selection.clear();
        this.loadData();

        if (failed) {
          this.showNotification(
            "snackbar-danger",
            `${targets.length - failed} deleted, ${failed} failed`,
            "bottom",
            "center"
          );
        } else {
          this.showNotification(
            "snackbar-danger",
            `${targets.length} assistant(s) deleted`,
            "bottom",
            "center"
          );
        }
      });
  }

  public loadData() {
    this.selection.clear();
    // Reuse the injected service: a second instance would carry its own
    // BehaviorSubject, so the table and the dialog would stop sharing state.
    this.exampleDatabase = this.assistantService;
    this.dataSource = new AssistantsDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class AssistantsDataSource extends DataSource<Assistant> {
  filterChange = new BehaviorSubject("");
  filteredData: Assistant[] = [];
  renderedData: Assistant[] = [];

  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  constructor(
    public exampleDatabase: AssistantService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Assistant[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllAssistants();
    return merge(...displayDataChanges).pipe(
      map(() => {
        const term = this.filter.toLowerCase().trim();
        this.filteredData = this.exampleDatabase.data.filter((assistant) => {
          const searchStr = (
            assistant.user?.first_name +
            " " +
            assistant.user?.last_name +
            " " +
            assistant.user?.username +
            " " +
            assistant.user?.email +
            " " +
            assistant.cabinet_name +
            " " +
            (assistant.cin || "") +
            " " +
            assistant.phone
          ).toLowerCase();
          return searchStr.indexOf(term) !== -1;
        });

        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Assistant[]): Assistant[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "name":
          [propertyA, propertyB] = [
            `${a.user?.first_name} ${a.user?.last_name}`,
            `${b.user?.first_name} ${b.user?.last_name}`,
          ];
          break;
        case "email":
          [propertyA, propertyB] = [a.user?.email, b.user?.email];
          break;
        case "date":
          [propertyA, propertyB] = [a.created_at, b.created_at];
          break;
        case "gender":
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case "phone":
          [propertyA, propertyB] = [a.phone, b.phone];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}