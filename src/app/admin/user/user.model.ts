/** Role reported by `/api/users/`; `null` for a superuser with no profile. */
export type UserRole = "admin" | "doctor" | "assistant" | null;

export interface AdminUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  role: UserRole;
  /** `null` for admins, who are not attached to a single cabinet. */
  cabinet_id: number | null;
}

export interface UserFilters {
  page?: number;
  page_size?: number;
  /** Free text over username, first_name, last_name and email. */
  search?: string;
  /** Backend field: id | username | first_name | last_name | email | is_active. */
  ordering?: string;
}

export interface PaginatedUserList {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
}