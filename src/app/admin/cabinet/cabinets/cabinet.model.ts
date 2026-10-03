export interface Cabinet {
  id: number;
  name: string;
  number: string;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface CabinetRequest {
  name: string;
  number: string;
  address?: string;
}

export interface PaginatedCabinetList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cabinet[];
}