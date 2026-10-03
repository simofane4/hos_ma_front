import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Invoice, InvoiceRequest, PaginatedInvoiceList } from "./invoice.model";

@Injectable()
export class InvoiceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/invoices/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Invoice[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllInvoices(params?: any): void {
    this.subs.sink = this.httpClient.get<PaginatedInvoiceList>(this.API_URL, { params }).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.results);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  getUnpaidInvoices(): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.API_URL}unpaid/`);
  }

  addInvoice(invoice: InvoiceRequest): Observable<any> {
    this.dialogData = invoice;
    return this.httpClient.post(this.API_URL, invoice);
  }

  updateInvoice(invoice: InvoiceRequest & { id: number }): Observable<any> {
    this.dialogData = invoice;
    return this.httpClient.put(`${this.API_URL}${invoice.id}/`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.API_URL}${id}/`);
  }
}