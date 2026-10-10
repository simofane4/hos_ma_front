import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { apiErrorMessage } from "src/app/core/api-error";
import { Assistant, AssistantCreateRequest, AssistantUpdateRequest, PaginatedAssistantList } from "./assistant.model";

export interface AssistantFilters {
  cabinet?: number;
  gender?: 'Male' | 'Female';
  search?: string;
  page?: number;
}

@Injectable()
export class AssistantService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/assistants/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Assistant[]> = new BehaviorSubject<Assistant[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Assistant[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllAssistants(filters?: AssistantFilters): void {
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
      .get<PaginatedAssistantList>(this.API_URL, { params })
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

  addAssistant(
    assistant: AssistantCreateRequest
  ): Observable<any> {
    this.dialogData = assistant;
    const { img, ...fields } = assistant;

    // `img` is an image upload, so the payload has to be multipart whenever
    // a file was picked; otherwise the documented JSON body is enough.
    return this.httpClient.post(
      this.API_URL,
      img instanceof File ? this.toFormData(fields, img) : fields
    );
  }

  updateAssistant(
    assistant: AssistantUpdateRequest & { id: number }
  ): Observable<any> {
    const { id, img, ...payload } = assistant;
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

  deleteAssistant(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getAssistant(id: number): Observable<Assistant> {
    return this.httpClient.get<Assistant>(`${this.API_URL}${id}/`);
  }
}