import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { apiErrorMessage } from "src/app/core/api-error";
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
  getAllCabinets(search?: string): void {
    this.isTblLoading = true;
    this.subs.sink = this.httpClient
      .get<PaginatedCabinetList>(this.API_URL, {
        params: search ? { search } : {},
      })
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.results);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(apiErrorMessage(error));
        }
      );
  }

  addCabinet(cabinet: CabinetRequest): Observable<any> {
    this.dialogData = cabinet;
    return this.httpClient.post(this.API_URL, cabinet);
  }

  updateCabinet(
    cabinet: Partial<CabinetRequest> & { id: number }
  ): Observable<any> {
    const { id, ...payload } = cabinet;
    this.dialogData = { ...payload, id };
    return this.httpClient.patch(`${this.API_URL}${id}/`, payload);
  }

  deleteCabinet(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getCabinet(id: number): Observable<Cabinet> {
    return this.httpClient.get<Cabinet>(`${this.API_URL}${id}/`);
  }
}
