import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  PatientFile,
  PatientFileFilters,
  PaginatedPatientFileList,
} from "./patient-file.model";

/** The endpoint rejects anything above this, so the picker warns before the upload. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

@Injectable()
export class PatientFileService {
  private readonly API_URL = `${environment.restUrl}/api/patient-files/`;

  constructor(private httpClient: HttpClient) {}

  /** One page of documents, filtered and sorted by the server. */
  getPage(filters: PatientFileFilters = {}): Observable<PaginatedPatientFileList> {
    return this.httpClient.get<PaginatedPatientFileList>(this.API_URL, {
      params: this.toParams(filters),
    });
  }

  /**
   * Uploads a document.
   *
   * The endpoint only reads multipart or form-encoded bodies, so the payload is
   * always sent as `FormData` rather than JSON.
   */
  addPatientFile(patient: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("patient", String(patient));
    formData.append("file", file, file.name);
    return this.httpClient.post(this.API_URL, formData);
  }

  /** Replaces the document attached to an existing row. */
  updatePatientFile(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.patch(`${this.API_URL}${id}/`, formData);
  }

  deletePatientFile(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getPatientFile(id: number): Observable<PatientFile> {
    return this.httpClient.get<PatientFile>(`${this.API_URL}${id}/`);
  }

  private toParams(filters: PatientFileFilters): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== "") {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}