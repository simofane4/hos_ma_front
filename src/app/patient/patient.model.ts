export interface Patient {
  id: number;
  cabinet: number;
  firstname: string;
  lastname: string;
  cin: string;
  gender: 'Female' | 'Male';
  phone: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
  child: boolean;
  created_at: string;
  updated_at: string;
}

export interface PatientRequest {
  cabinet: number;
  firstname: string;
  lastname: string;
  cin: string;
  gender: 'Female' | 'Male';
  phone: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
  child?: boolean;
}

export interface PaginatedPatientList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Patient[];
}