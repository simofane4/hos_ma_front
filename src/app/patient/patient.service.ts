import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Patient, PatientRequest, PaginatedPatientList } from "./patient.model";

@Injectable()
export class PatientService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/patients/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Patient[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPatients(params?: any): void {
    this.subs.sink = this.httpClient.get<PaginatedPatientList>(this.API_URL, { params }).subscribe(
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

  addPatient(patient: PatientRequest): Observable<any> {
    this.dialogData = patient;
    return this.httpClient.post(this.API_URL, patient);
  }

  updatePatient(patient: PatientRequest & { id: number }): Observable<any> {
    this.dialogData = patient;
    return this.httpClient.put(`${this.API_URL}${patient.id}/`, patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getPatient(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.API_URL}${id}/`);
  }
}