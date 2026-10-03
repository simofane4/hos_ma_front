import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Medicament, MedicamentRequest, PaginatedMedicamentList } from "./medicament.model";

@Injectable()
export class MedicamentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/medicaments/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Medicament[]> = new BehaviorSubject<Medicament[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Medicament[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllMedicaments(): void {
    this.subs.sink = this.httpClient.get<PaginatedMedicamentList>(this.API_URL).subscribe(
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

  addMedicament(medicament: MedicamentRequest): Observable<any> {
    this.dialogData = medicament;
    return this.httpClient.post(this.API_URL, medicament);
  }

  updateMedicament(medicament: MedicamentRequest & { id: number }): Observable<any> {
    this.dialogData = medicament;
    return this.httpClient.put(`${this.API_URL}${medicament.id}/`, medicament);
  }

  deleteMedicament(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getMedicament(id: number): Observable<Medicament> {
    return this.httpClient.get<Medicament>(`${this.API_URL}${id}/`);
  }
}