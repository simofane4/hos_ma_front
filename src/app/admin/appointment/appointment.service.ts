import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Appointment, AppointmentRequest, PaginatedAppointmentList } from "./appointment.model";

@Injectable()
export class AppointmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.restUrl}/api/appointments/`;
  
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Appointment[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllAppointments(params?: any): void {
    this.subs.sink = this.httpClient.get<PaginatedAppointmentList>(this.API_URL, { params }).subscribe(
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

  addAppointment(appointment: AppointmentRequest): Observable<any> {
    this.dialogData = appointment;
    return this.httpClient.post(this.API_URL, appointment);
  }

  updateAppointment(appointment: AppointmentRequest & { id: number }): Observable<any> {
    this.dialogData = appointment;
    return this.httpClient.put(`${this.API_URL}${appointment.id}/`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.API_URL}${id}/`);
  }
}