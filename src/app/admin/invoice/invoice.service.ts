import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  Invoice,
  InvoiceFilters,
  InvoiceRequest,
  InvoiceUpdateRequest,
  PaginatedInvoiceList,
} from "./invoice.model";

@Injectable()
export class InvoiceService {
  private readonly API_URL = `${environment.restUrl}/api/invoices/`;

  constructor(private httpClient: HttpClient) {}

  /**
   * One page of invoices, filtered and sorted by the server.
   *
   * Pass `unpaidOnly` to hit `/invoices/unpaid/` instead, the endpoint's own
   * collection route for outstanding bills.
   */
  getPage(
    filters: InvoiceFilters = {},
    unpaidOnly = false
  ): Observable<PaginatedInvoiceList> {
    const url = unpaidOnly ? `${this.API_URL}unpaid/` : this.API_URL;
    return this.httpClient.get<PaginatedInvoiceList>(url, {
      params: this.toParams(filters),
    });
  }

  addInvoice(invoice: InvoiceRequest): Observable<any> {
    return this.httpClient.post(this.API_URL, invoice);
  }

  updateInvoice(invoice: InvoiceUpdateRequest & { id: number }): Observable<any> {
    const { id, ...payload } = invoice;
    return this.httpClient.patch(`${this.API_URL}${id}/`, payload);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.API_URL}${id}/`);
  }

  private toParams(filters: InvoiceFilters): HttpParams {
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