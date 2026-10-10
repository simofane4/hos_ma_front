import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  Ordonnance,
  OrdonnanceFilters,
  OrdonnanceRequest,
  OrdonnanceUpdateRequest,
  PaginatedOrdonnanceList,
} from "./ordonnance.model";

@Injectable()
export class OrdonnanceService {
  private readonly API_URL = `${environment.restUrl}/api/ordonnances/`;

  constructor(private httpClient: HttpClient) {}

  /** One page of prescriptions, filtered and sorted by the server. */
  getPage(
    filters: OrdonnanceFilters = {}
  ): Observable<PaginatedOrdonnanceList> {
    return this.httpClient.get<PaginatedOrdonnanceList>(this.API_URL, {
      params: this.toParams(filters),
    });
  }

  addOrdonnance(ordonnance: OrdonnanceRequest): Observable<any> {
    return this.httpClient.post(this.API_URL, ordonnance);
  }

  updateOrdonnance(
    ordonnance: OrdonnanceUpdateRequest & { id: number }
  ): Observable<any> {
    const { id, ...payload } = ordonnance;
    return this.httpClient.patch(`${this.API_URL}${id}/`, payload);
  }

  deleteOrdonnance(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getOrdonnance(id: number): Observable<Ordonnance> {
    return this.httpClient.get<Ordonnance>(`${this.API_URL}${id}/`);
  }

  private toParams(filters: OrdonnanceFilters): HttpParams {
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