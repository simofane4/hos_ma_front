import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CatalogueSpec } from "./catalogue.config";
import {
  CatalogueFilters,
  CatalogueRequest,
  CatalogueRow,
  PaginatedCatalogueList,
} from "./catalogue.model";

/**
 * CRUD for the four catalogue endpoints.
 *
 * The endpoint is supplied per call rather than injected, because one service
 * instance backs every catalogue screen; see {@link CatalogueSpec}.
 */
@Injectable()
export class CatalogueService {
  constructor(private httpClient: HttpClient) {}

  private url(spec: CatalogueSpec, id?: number): string {
    const base = `${environment.restUrl}/api${spec.endpoint}`;
    return id === undefined ? base : `${base}${id}/`;
  }

  /**
   * One page of rows, filtered and sorted by the server.
   *
   * Server paging rather than a downloaded array: `page_size` is capped at 200
   * and the performed-acts list is expected to grow well past that.
   */
  getPage(
    spec: CatalogueSpec,
    filters: CatalogueFilters = {}
  ): Observable<PaginatedCatalogueList> {
    return this.httpClient.get<PaginatedCatalogueList>(this.url(spec), {
      params: this.toParams(filters),
    });
  }

  create(spec: CatalogueSpec, payload: CatalogueRequest): Observable<any> {
    return this.httpClient.post(this.url(spec), payload);
  }

  update(
    spec: CatalogueSpec,
    payload: CatalogueRequest & { id: number }
  ): Observable<any> {
    const { id, ...body } = payload;
    return this.httpClient.patch(this.url(spec, id), body);
  }

  delete(spec: CatalogueSpec, id: number): Observable<any> {
    return this.httpClient.delete(this.url(spec, id));
  }

  private toParams(filters: CatalogueFilters): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}