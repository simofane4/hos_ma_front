import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../user.service";
import { AdminUser, PaginatedUserList, UserFilters } from "../user.model";
import { Page, PagedDataSource } from "src/app/shared/PagedDataSource";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.sass"],
})
export class UsersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "name",
    "username",
    "email",
    "role",
    "cabinet",
    "status",
  ];

  dataSource: UsersDataSource | null = null;

  constructor(private userService: UserService) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService, this.paginator, this.sort);

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

  /**
   * Role as a readable label.
   *
   * The API returns `null` for an account with no doctor/assistant profile.
   * Such an account is a superuser, which the API itself treats as an admin,
   * so it is labelled the same way rather than showing a bare "null".
   */
  roleLabel(user: AdminUser): string {
    return user.role || "admin";
  }
}

export class UsersDataSource extends PagedDataSource<AdminUser, UserFilters> {
  constructor(
    private readonly userService: UserService,
    paginator: MatPaginator,
    sort: MatSort
  ) {
    super(paginator, sort);
  }

  protected buildQuery(): UserFilters {
    const active = this.sort.active;
    return {
      page: this.paginator.pageIndex + 1,
      page_size: this.paginator.pageSize,
      search: this.search.trim() || undefined,
      // The endpoint sorts on its own field names, not on the column ids.
      ordering: active
        ? `${this.sort.direction === "desc" ? "-" : ""}${SORT_FIELDS[active] || active}`
        : undefined,
    };
  }

  protected fetchPage(query: UserFilters): Observable<Page<AdminUser>> {
    return this.userService
      .getUsers(query)
      .pipe(map((page: PaginatedUserList) => page));
  }
}

/** Column id -> backend `ordering` field. */
const SORT_FIELDS: Record<string, string> = {
  name: "last_name",
  username: "username",
  email: "email",
  status: "is_active",
};