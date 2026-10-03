export interface Specialite {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface SpecialiteRequest {
  name: string;
  description?: string;
}

export interface PaginatedSpecialiteList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Specialite[];
}