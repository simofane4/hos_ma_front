import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Ordonnance, OrdonnanceRequest, PaginatedOrdonnanceList } from "./ordonnance.model";

@Injectable()
export class OrdonnanceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/ordonnances/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Ordonnance[]> = new BehaviorSubject<Ordonnance[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Ordonnance[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllOrdonnances(): void {
    this.subs.sink = this.httpClient.get<PaginatedOrdonnanceList>(this.API_URL).subscribe(
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

  addOrdonnance(ordonnance: OrdonnanceRequest): Observable<any> {
    this.dialogData = ordonnance;
    return this.httpClient.post(this.API_URL, ordonnance);
  }

  updateOrdonnance(ordonnance: OrdonnanceRequest & { id: number }): Observable<any> {
    this.dialogData = ordonnance;
    return this.httpClient.put(`${this.API_URL}${ordonnance.id}/`, ordonnance);
  }

  deleteOrdonnance(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getOrdonnance(id: number): Observable<Ordonnance> {
    return this.httpClient.get<Ordonnance>(`${this.API_URL}${id}/`);
  }
}