import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Doctor, DoctorCreateRequest, DoctorUpdateRequest, PaginatedDoctorList } from "./doctor.model";

@Injectable()
export class DoctorService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/doctors/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Doctor[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDoctors(): void {
    this.subs.sink = this.httpClient.get<PaginatedDoctorList>(this.API_URL).subscribe(
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

  addDoctor(doctor: DoctorCreateRequest): Observable<any> {
    this.dialogData = doctor;
    const formData = new FormData();
    
    Object.keys(doctor).forEach(key => {
      const value = doctor[key as keyof DoctorCreateRequest];
      if (value !== undefined && value !== null) {
        if (key === 'img' && value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.httpClient.post(this.API_URL, formData);
  }

  updateDoctor(doctor: DoctorUpdateRequest & { id: number }): Observable<any> {
    this.dialogData = doctor;
    const formData = new FormData();
    
    Object.keys(doctor).forEach(key => {
      const value = doctor[key as keyof typeof doctor];
      if (value !== undefined && value !== null && key !== 'id') {
        if (key === 'img' && value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.httpClient.put(`${this.API_URL}${doctor.id}/`, formData);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getDoctor(id: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.API_URL}${id}/`);
  }
}