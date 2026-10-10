import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { apiErrorMessage } from "src/app/core/api-error";
import {
  Doctor,
  DoctorCreateRequest,
  DoctorUpdateRequest,
  PaginatedDoctorList,
} from "./doctor.model";

export interface DoctorFilters {
  cabinet?: number;
  specialiste?: number;
  gender?: 'Male' | 'Female';
  search?: string;
  page?: number;
}

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
  getAllDoctors(filters?: DoctorFilters): void {
    this.isTblLoading = true;
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, String(value));
        }
      });
    }

    this.subs.sink = this.httpClient
      .get<PaginatedDoctorList>(this.API_URL, { params })
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

  addDoctor(doctor: DoctorCreateRequest & { img?: File | string | null }): Observable<any> {
    this.dialogData = doctor;
    const { img, ...fields } = doctor;

    // `img` is an image upload, so the payload has to be multipart whenever
    // a file was picked; otherwise the documented JSON body is enough.
    return this.httpClient.post(
      this.API_URL,
      img instanceof File ? this.toFormData(fields, img) : fields
    );
  }

  updateDoctor(
    doctor: DoctorUpdateRequest & { id: number; img?: File | string | null }
  ): Observable<any> {
    const { id, img, ...payload } = doctor;
    this.dialogData = { ...payload, id };

    return this.httpClient.patch(
      `${this.API_URL}${id}/`,
      img instanceof File ? this.toFormData(payload, img) : payload
    );
  }

  private toFormData(fields: Record<string, any>, img: File): FormData {
    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      const value = fields[key];
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, String(value));
      }
    });
    formData.append('img', img, img.name);
    return formData;
  }

  deleteDoctor(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getDoctor(id: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.API_URL}${id}/`);
  }
}