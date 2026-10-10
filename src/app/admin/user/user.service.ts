import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AdminUser, PaginatedUserList, UserFilters } from "./user.model";

/**
 * Read-only directory of auth accounts.
 *
 * `/api/users/` is a `ReadOnlyModelViewSet`, so there are deliberately no
 * create/update/delete calls here: managing an account happens through the
 * doctor and assistant screens that own the profile.
 */
@Injectable()
export class UserService {
  private readonly API_URL = `${environment.restUrl}/api/users/`;

  constructor(private httpClient: HttpClient) {}

  /** One page of accounts, filtered and sorted by the server. */
  getUsers(filters: UserFilters = {}): Observable<PaginatedUserList> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });

    return this.httpClient.get<PaginatedUserList>(this.API_URL, { params });
  }

  getUser(id: number): Observable<AdminUser> {
    return this.httpClient.get<AdminUser>(`${this.API_URL}${id}/`);
  }
}