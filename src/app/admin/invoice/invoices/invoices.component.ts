import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { apiErrorMessage } from "src/app/core/api-error";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Invoice, InvoiceFilters } from "../invoice.model";
import { InvoiceService } from "../invoice.service";
import { DeleteDialogComponent } from "./dialogs/delete/delete.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.sass"],
})
export class InvoicesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = ["id", "patient", "date", "amount", "recipient", "payed", "actions"];

  dataSource: InvoicesDataSource | null = null;

  paidFilter: boolean | "" = "";
  /** Inclusive ISO dates; empty means unbounded. */
  fromFilter = "";
  toFilter = "";
  hasFilters = false;
  /** When true the table reads `/invoices/unpaid/` instead of the full list. */
  unpaidOnly = false;
  markingPaid = false;

  constructor(
    public dialog: MatDialog,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new InvoicesDataSource(
      this.invoiceService,
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

  onFilterChange(): void {
    this.dataSource.payed =
      this.paidFilter === "" ? undefined : this.paidFilter === true;
    this.dataSource.dateFrom = this.fromFilter || undefined;
    this.dataSource.dateTo = this.toFilter || undefined;
    this.hasFilters = !!(
      this.paidFilter !== "" || this.fromFilter || this.toFilter || this.unpaidOnly
    );
    // A narrower result set invalidates the current offset.
    this.paginator.pageIndex = 0;
    this.dataSource.reload();
  }

  clearFilters(): void {
    this.paidFilter = "";
    this.fromFilter = "";
    this.toFilter = "";
    this.unpaidOnly = false;
    this.onFilterChange();
  }

  /**
   * Switches between the full list and the endpoint's unpaid collection.
   *
   * `/invoices/unpaid/` is a separate route rather than a filter, so the
   * DataSource has to be told which one to read.
   */
  toggleUnpaid(): void {
    this.unpaidOnly = !this.unpaidOnly;
    // The two views disagree about `payed`, so reset it to avoid a contradictory
    // request (unpaid *and* paid).
    this.paidFilter = "";
    this.dataSource.unpaidOnly = this.unpaidOnly;
    this.onFilterChange();
  }

  refresh(): void {
    this.dataSource.reload();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { invoice: null, action: "add" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Invoice added successfully");
      }
    });
  }

  editCall(row: Invoice): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { invoice: row, action: "edit" },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-success", "Invoice updated successfully");
      }
    });
  }

  deleteItem(row: Invoice): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: row });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.reload();
        this.notify("snackbar-danger", "Invoice deleted successfully");
      }
    });
  }

  /** Settles a single invoice without opening the form. */
  markAsPaid(row: Invoice): void {
    if (this.markingPaid || row.payed) {
      return;
    }
    this.markingPaid = true;
    this.invoiceService.updateInvoice({ id: row.id, payed: true }).subscribe(
      () => {
        this.markingPaid = false;
        this.dataSource.reload();
        this.notify("snackbar-success", "Invoice marked as paid");
      },
      (error: HttpErrorResponse) => {
        this.markingPaid = false;
        this.snackBar.open(apiErrorMessage(error), "Close", {
          duration: 6000,
          panelClass: "snackbar-danger",
        });
      }
    );
  }

  private notify(colorName: string, text: string): void {
    this.snackBar.open(text, "", { duration: 3000, panelClass: colorName });
  }
}

export class InvoicesDataSource extends PagedDataSource<Invoice, InvoiceFilters> {
  /** Optional server-side filters driven by the controls above the table. */
  payed?: boolean;
  dateFrom?: string;
  dateTo?: string;

  constructor(
    private readonly invoiceService: InvoiceService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  /** Set by the component's "unpaid" toggle. */
  unpaidOnly = false;

  protected buildQuery(): InvoiceFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
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

  protected fetchPage(query: InvoiceFilters): Observable<Page<Invoice>> {
    return this.invoiceService
      .getPage(query, this.unpaidOnly)
      .pipe(map((page) => page));
  }
}

/**
 * Column id -> backend `ordering` field.
 *
 * The endpoint only accepts `date`, `amount` and `created_at`, so those are the
 * only sortable columns.
 */
const SORT_FIELDS: Record<string, string> = {
  date: "date",
  amount: "amount",
};