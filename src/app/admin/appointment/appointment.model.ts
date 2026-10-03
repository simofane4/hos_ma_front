export interface Appointment {
  id: number;
  patient: number;
  patient_name: string;
  cabinet: number;
  date: string;
  start: string;
  end: string;
  description: string;
  payed: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppointmentRequest {
  patient: number;
  cabinet: number;
  date: string;
  start: string;
  end: string;
  description?: string;
  payed?: boolean;
}

export interface PaginatedAppointmentList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Appointment[];
}