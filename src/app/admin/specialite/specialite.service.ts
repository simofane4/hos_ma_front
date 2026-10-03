import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Specialite, SpecialiteRequest, PaginatedSpecialiteList } from "./specialite.model";

@Injectable()
export class SpecialiteService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/specialites/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Specialite[]> = new BehaviorSubject<Specialite[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Specialite[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllSpecialites(): void {
    this.subs.sink = this.httpClient.get<PaginatedSpecialiteList>(this.API_URL).subscribe(
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

  addSpecialite(specialite: SpecialiteRequest): Observable<any> {
    this.dialogData = specialite;
    return this.httpClient.post(this.API_URL, specialite);
  }

  updateSpecialite(specialite: SpecialiteRequest & { id: string }): Observable<any> {
    this.dialogData = specialite;
    return this.httpClient.put(`${this.API_URL}${specialite.id}/`, specialite);
  }

  deleteSpecialite(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getSpecialite(id: string): Observable<Specialite> {
    return this.httpClient.get<Specialite>(`${this.API_URL}${id}/`);
  }
}