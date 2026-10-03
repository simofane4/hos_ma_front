export interface UserSummary {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface Assistant {
  id: number;
  user: UserSummary;
  cabinet: number;
  cabinet_name: string;
  img: string | null;
  cin: string | null;
  gender: 'Female' | 'Male';
  phone: string;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssistantCreateRequest {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  cabinet: number;
  img?: File;
  cin?: string;
  gender: 'Female' | 'Male';
  phone: string;
  address?: string;
}

export interface AssistantUpdateRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  cabinet?: number;
  img?: File;
  cin?: string;
  gender?: 'Female' | 'Male';
  phone?: string;
  address?: string;
}

export interface PaginatedAssistantList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Assistant[];
}