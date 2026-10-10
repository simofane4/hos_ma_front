import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  Appointment,
  AppointmentFilters,
  AppointmentRequest,
  AppointmentUpdateRequest,
  PaginatedAppointmentList,
} from "./appointment.model";

@Injectable()
export class AppointmentService {
  private readonly API_URL = `${environment.restUrl}/api/appointments/`;

  constructor(private httpClient: HttpClient) {}

  /**
   * One page of appointments, filtered and sorted by the server.
   *
   * The endpoint rejects overlapping slots inside a cabinet, so the screen has to
   * show which day and cabinet a row occupies rather than treating it as a free
   * standing record.
   */
  getPage(filters: AppointmentFilters = {}): Observable<PaginatedAppointmentList> {
    return this.httpClient.get<PaginatedAppointmentList>(this.API_URL, {
      params: this.toParams(filters),
    });
  }

  addAppointment(appointment: AppointmentRequest): Observable<any> {
    return this.httpClient.post(this.API_URL, appointment);
  }

  updateAppointment(
    appointment: AppointmentUpdateRequest & { id: number }
  ): Observable<any> {
    const { id, ...payload } = appointment;
    return this.httpClient.patch(`${this.API_URL}${id}/`, payload);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}${id}/`);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.API_URL}${id}/`);
  }

  private toParams(filters: AppointmentFilters): HttpParams {
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