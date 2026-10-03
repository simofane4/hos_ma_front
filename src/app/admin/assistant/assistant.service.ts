import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Assistant, AssistantCreateRequest, AssistantUpdateRequest, PaginatedAssistantList } from "./assistant.model";

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
  getAllAssistants(): void {
    this.subs.sink = this.httpClient.get<PaginatedAssistantList>(this.API_URL).subscribe(
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

  addAssistant(assistant: AssistantCreateRequest): Observable<any> {
    this.dialogData = assistant;
    const formData = new FormData();
    
    Object.keys(assistant).forEach(key => {
      const value = assistant[key as keyof AssistantCreateRequest];
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

  updateAssistant(assistant: AssistantUpdateRequest & { id: number }): Observable<any> {
    this.dialogData = assistant;
    const formData = new FormData();
    
    Object.keys(assistant).forEach(key => {
      const value = assistant[key as keyof typeof assistant];
      if (value !== undefined && value !== null && key !== 'id') {
        if (key === 'img' && value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.httpClient.put(`${this.API_URL}${assistant.id}/`, formData);
  }

  deleteAssistant(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getAssistant(id: number): Observable<Assistant> {
    return this.httpClient.get<Assistant>(`${this.API_URL}${id}/`);
  }
}