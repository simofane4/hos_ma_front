export interface Medicament {
  id: number;
  cabinet: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface MedicamentRequest {
  cabinet: number;
  name: string;
  description?: string;
}

export interface PaginatedMedicamentList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Medicament[];
}