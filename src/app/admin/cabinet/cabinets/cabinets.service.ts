import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Cabinet, CabinetRequest, PaginatedCabinetList } from "./cabinet.model";

@Injectable()
export class CabinetsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/cabinets/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Cabinet[]> = new BehaviorSubject<Cabinet[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Cabinet[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCabinets(): void {
    this.subs.sink = this.httpClient.get<PaginatedCabinetList>(this.API_URL).subscribe(
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

  addCabinet(cabinet: CabinetRequest): Observable<any> {
    this.dialogData = cabinet;
    return this.httpClient.post(this.API_URL, cabinet);
  }

  updateCabinet(cabinet: CabinetRequest & { id: number }): Observable<any> {
    this.dialogData = cabinet;
    return this.httpClient.put(`${this.API_URL}${cabinet.id}/`, cabinet);
  }

  deleteCabinet(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getCabinet(id: number): Observable<Cabinet> {
    return this.httpClient.get<Cabinet>(`${this.API_URL}${id}/`);
  }
}
