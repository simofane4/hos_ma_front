export interface UserSummary {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface Doctor {
  id: number;
  user: UserSummary;
  cabinet: number;
  cabinet_name: string;
  img: string | null;
  inp: string;
  gender: 'Female' | 'Male';
  phone: string;
  address: string | null;
  specialiste: number;
  specialiste_name: string;
  created_at: string;
  updated_at: string;
}

export interface DoctorCreateRequest {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  cabinet: number;
  img?: File;
  inp: string;
  gender: 'Female' | 'Male';
  phone: string;
  address?: string;
  specialiste: number;
}

export interface DoctorUpdateRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  cabinet?: number;
  img?: File;
  inp?: string;
  gender?: 'Female' | 'Male';
  phone?: string;
  address?: string;
  specialiste?: number;
}

export interface PaginatedDoctorList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Doctor[];
}

export class DoctorClass implements Doctor {
  id: number;
  user: UserSummary;
  cabinet: number;
  cabinet_name: string;
  img: string | null;
  inp: string;
  gender: 'Female' | 'Male';
  phone: string;
  address: string | null;
  specialiste: number;
  specialiste_name: string;
  created_at: string;
  updated_at: string;

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.user = data.user || { id: 0, username: '', email: '', first_name: '', last_name: '', role: '' };
    this.cabinet = data.cabinet || 0;
    this.cabinet_name = data.cabinet_name || '';
    this.img = data.img || null;
    this.inp = data.inp || '';
    this.gender = data.gender || 'Male';
    this.phone = data.phone || '';
    this.address = data.address || null;
    this.specialiste = data.specialiste || 0;
    this.specialiste_name = data.specialiste_name || '';
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }
}