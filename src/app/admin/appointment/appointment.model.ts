/** One row of `/api/appointments/`. */
export interface Appointment {
  id: number;
  /** Id of the patient the slot belongs to. */
  patient: number;
  /** Denormalised by the endpoint so the table needs no extra request. */
  patient_name: string;
  cabinet: number;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  /** Inclusive slot start, `HH:MM:SS`. */
  start: string;
  /** Inclusive slot end, `HH:MM:SS`. */
  end: string;
  description: string | null;
  payed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppointmentRequest {
  patient: number;
  /** Only sent by an admin; staff get their cabinet from the token. */
  cabinet?: number;
  date: string;
  start: string;
  end: string;
  description?: string;
  payed?: boolean;
}

export interface AppointmentUpdateRequest extends Partial<AppointmentRequest> {}

export interface AppointmentFilters {
  page?: number;
  page_size?: number;
  /** Free text over the patient's names and the description. */
  search?: string;
  cabinet?: number;
  patient?: number;
  date?: string;
  payed?: boolean;
  /** Inclusive lower bound on `date`. */
  date_from?: string;
  /** Inclusive upper bound on `date`. */
  date_to?: string;
  /** Backend field: date | start | created_at. */
  ordering?: string;
}

export interface PaginatedAppointmentList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Appointment[];
}