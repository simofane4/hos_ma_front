export type Gender = "Female" | "Male";

export interface Patient {
  id: number;
  cabinet: number;
  /** Sent by the API so the table can label a row without an extra lookup. */
  cabinet_name?: string;
  cin: string;
  img: string | null;
  firstname: string;
  lastname: string;
  gender: Gender;
  /** Nullable on the model: a minor may be recorded without an age. */
  age: number | null;
  phone: string;
  address: string | null;
  child: boolean;
  created_at: string;
  updated_at: string;
}

export interface PatientRequest {
  /**
   * Required when an admin creates a patient, because an admin has no cabinet
   * of its own. Staff may omit it: the backend locks them to their own.
   */
  cabinet?: number;
  cin: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  age?: number | null;
  phone: string;
  address?: string;
  child?: boolean;
  /** Optional upload; a File switches the request to multipart/form-data. */
  img?: File | string | null;
}

export type PatientUpdateRequest = Partial<PatientRequest>;

export interface PatientFilters {
  page?: number;
  page_size?: number;
  /** Free text over firstname, lastname, cin and phone. */
  search?: string;
  /** Backend field: lastname | firstname | age | created_at, `-` to reverse. */
  ordering?: string;
  cabinet?: number;
  gender?: Gender;
  child?: boolean;
  lastname?: string;
  firstname?: string;
  cin?: string;
  phone?: string;
}

export interface PaginatedPatientList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Patient[];
}