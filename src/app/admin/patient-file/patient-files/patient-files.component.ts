import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { PatientFile, PatientFileFilters } from "../patient-file.model";
import { PatientFileService } from "../patient-file.service";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

@Component({
  selector: "app-patient-files",
  templateUrl: "./patient-files.component.html",
  styleUrls: ["./patient-files.component.sass"],
})
export class PatientFilesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = ["id", "patient", "file", "uploaded_at", "actions"];

  dataSource: PatientFilesDataSource | null = null;

  constructor(
    public dialog: MatDialog,
    private patientFileService: PatientFileService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new PatientFilesDataSource(
      this.patientFileService,
      this.paginator,
      this.sort
    );

    this.subs.sink = fromEvent<Event>(
      this.filter.nativeElement,
      "keyup"
    ).subscribe(() => {
      this.dataSource.search = this.filter.nativeElement.value;
    });
  }

  refresh(): void {
    this.dataSource.reload();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { patientFile: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Document uploaded successfully");
      }
    });
  }

  /** Swaps the stored file for a new upload, keeping the same row. */
  replaceFile(row: PatientFile): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { patientFile: row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Document replaced successfully");
      }
    });
  }

  deleteItem(row: PatientFile): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-danger", "Document deleted successfully");
      }
    });
  }

  /** Label for the owning patient; falls back to the id if it has no name. */
  patientLabel(row: PatientFile): string {
    const name = row.patient_name?.trim();
    return name ? `${name} (#${row.patient})` : `#${row.patient}`;
  }

  /** The endpoint stores an absolute URL; show just the file name. */
  fileName(row: PatientFile): string {
    const url = row.download_url || row.file || "";
    const parts = url.split("/");
    return parts[parts.length - 1] || url;
  }

  private notify(colorName: string, text: string): void {
    this.snackBar.open(text, "", { duration: 3000, panelClass: colorName });
  }
}

export class PatientFilesDataSource extends PagedDataSource<
  PatientFile,
  PatientFileFilters
> {
  constructor(
    private readonly patientFileService: PatientFileService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): PatientFileFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      // `uploaded_at` is the only field the endpoint will order by, and it is
      // already the column id, so no translation table is needed.
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}uploaded_at`
        : undefined,
    };
  }

  protected fetchPage(query: PatientFileFilters): Observable<Page<PatientFile>> {
    return this.patientFileService
      .getPage(query)
      .pipe(map((page) => page));
  }
}