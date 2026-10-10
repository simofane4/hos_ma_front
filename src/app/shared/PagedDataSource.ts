import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";

/** The slice of a DRF paginated response the table actually needs. */
export interface Page<T> {
  count: number;
  results: T[];
}

/**
 * DataSource for a table backed by a *server-paged* endpoint.
 *
 * The endpoints cap `page_size` at 200 and the admin lists run to several
 * hundred rows, so paging, searching and sorting are pushed to the server
 * instead of slicing a downloaded array. The material table still gets an
 * ordinary `DataSource`: it receives the rows of the current page and the
 * paginator is bound to {@link total}.
 *
 * Subclasses implement {@link buildQuery} to translate the table state into
 * query parameters and {@link fetchPage} to issue the request.
 */
export abstract class PagedDataSource<T, Q> extends DataSource<T> {
  /** Row count reported by the server, for `[length]` on the paginator. */
  total = 0;
  loading = true;
  /** Set when the last request failed, so the table can explain itself. */
  failed = false;

  private readonly rows$ = new BehaviorSubject<T[]>([]);
  private readonly search$ = new BehaviorSubject<string>("");
  private readonly reload$ = new BehaviorSubject<number>(0);
  private connected = false;

  constructor(
    protected readonly paginator: MatPaginator,
    protected readonly sort: MatSort
  ) {
    super();
  }

  /** Maps the current table state onto the endpoint's query parameters. */
  protected abstract buildQuery(): Q;

  /** Issues the request for a query built by {@link buildQuery}. */
  protected abstract fetchPage(query: Q): Observable<Page<T>>;

  get search(): string {
    return this.search$.value;
  }

  /** Rows of the page currently rendered, for bulk selection. */
  get currentRows(): T[] {
    return this.rows$.value;
  }

  set search(value: string) {
    // A new term makes the current offset meaningless, so start over.
    this.paginator.pageIndex = 0;
    this.search$.next(value);
  }

  /** Re-runs the current query, e.g. after a create or a delete. */
  reload(): void {
    this.reload$.next(this.reload$.value + 1);
  }

  connect(): Observable<T[]> {
    if (!this.connected) {
      this.connected = true;
      combineLatest([
        // `MatPaginator.page` also fires when only the page size changes, and
        // `pageSize` itself is a plain number rather than an observable.
        this.paginator.page.pipe(startWith(null)),
        this.sort.sortChange.pipe(startWith(null)),
        this.search$.pipe(
          startWith(""),
          debounceTime(300),
          distinctUntilChanged()
        ),
        this.reload$.pipe(startWith(null)),
      ])
        .pipe(
          map(() => this.buildQuery()),
          switchMap((query) => {
            this.loading = true;
            this.failed = false;
            return this.fetchPage(query).pipe(
              map((page) => {
                this.total = page.count;
                return page.results;
              }),
              catchError(() => {
                this.failed = true;
                this.total = 0;
                return of([] as T[]);
              }),
              finalize(() => (this.loading = false))
            );
          })
        )
        .subscribe((rows) => this.rows$.next(rows));
    }
    return this.rows$.asObservable();
  }

  disconnect(): void {
    // The pipeline lives on the shared subjects, so it survives reconnection.
  }
}