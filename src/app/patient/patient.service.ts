import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {
  Patient,
  PatientFilters,
  PatientRequest,
  PatientUpdateRequest,
  PaginatedPatientList,
} from "./patient.model";

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

  /**
   * One page of patients, filtered and sorted by the server.
   *
   * The table is server-paged on purpose: the admin list is several hundred
   * rows and the endpoint caps `page_size` at 200, so fetching everything and
   * slicing it locally would silently truncate the list.
   */
  getPatientsPage(filters: PatientFilters = {}): Observable<PaginatedPatientList> {
    return this.httpClient.get<PaginatedPatientList>(this.API_URL, {
      params: this.toParams(filters),
    });
  }

  /**
   * Type-ahead lookup used by the pickers in the appointment, prescription,
   * invoice and patient-file forms.
   *
   * Searches on the server rather than filtering a downloaded list: an admin sees
   * every patient and the endpoint caps `page_size` at 200, so a client-side list
   * would silently omit most of them. `cabinet` narrows the search for a form that
   * already fixes the owning cabinet.
   */
  searchPatients(
    term: string,
    cabinet?: number,
    limit = 20
  ): Observable<PaginatedPatientList> {
    const filters: PatientFilters = { page_size: limit };
    const trimmed = (term || "").trim();
    if (trimmed) {
      filters.search = trimmed;
    }
    if (cabinet !== undefined && cabinet !== null) {
      filters.cabinet = cabinet;
    }
    return this.getPatientsPage(filters);
  }

  /** Loads the whole (paged) list into {@link dataChange} for simple consumers. */
  getAllPatients(filters: PatientFilters = {}): void {
    this.isTblLoading = true;
    this.subs.sink = this.getPatientsPage(filters).subscribe(
      (page) => {
        this.isTblLoading = false;
        this.dataChange.next(page.results);
      },
      () => (this.isTblLoading = false)
    );
  }

  addPatient(patient: PatientRequest): Observable<any> {
    const { img, ...fields } = patient;
    this.dialogData = patient;
    // `img` is an upload, so the payload becomes multipart when a file was
    // picked; otherwise the plain JSON body is enough.
    return this.httpClient.post(
      this.API_URL,
      img instanceof File ? this.toFormData(fields, img) : fields
    );
  }

  updatePatient(patient: PatientUpdateRequest & { id: number }): Observable<any> {
    const { id, img, ...payload } = patient;
    this.dialogData = { ...payload, id };

    return this.httpClient.patch(
      `${this.API_URL}${id}/`,
      img instanceof File ? this.toFormData(payload, img) : payload
    );
  }

  deletePatient(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getPatient(id: number): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.API_URL}${id}/`);
  }

  private toParams(filters: PatientFilters): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

  private toFormData(fields: Record<string, any>, img: File): FormData {
    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      const value = fields[key];
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    formData.append("img", img, img.name);
    return formData;
  }
}