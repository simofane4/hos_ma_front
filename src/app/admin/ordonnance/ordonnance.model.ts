export interface OrdonnanceMedicament {
  id: number;
  medicament: number;
  medicament_name: string;
  dosage: string;
  duration: string;
}

export interface OrdonnanceMedicamentRequest {
  medicament: number;
  dosage: string;
  duration: string;
}

export interface Ordonnance {
  id: number;
  cabinet: number;
  appointment: number;
  acte_demander: number | null;
  acte_fait: number | null;
  description: string;
  medicaments: number[];
  medicaments_list: OrdonnanceMedicament[];
  created_at: string;
  updated_at: string;
}

export interface OrdonnanceRequest {
  appointment: number;
  acte_demander?: number;
  acte_fait?: number;
  description: string;
}

export interface PaginatedOrdonnanceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Ordonnance[];
}