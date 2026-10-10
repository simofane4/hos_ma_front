/**
 * Row shape shared by the four catalogue endpoints. Every field is optional
 * because each one exposes a different subset: `/specialites/` is just
 * `{ id, name }`, while the three cabinet-owned ones add `cabinet`,
 * `description` and the timestamps.
 */
export interface CatalogueRow {
  id: number;
  /** Owning cabinet, absent on the global speciality catalogue. */
  cabinet?: number | null;
  name?: string;
  title?: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CatalogueRequest {
  name?: string;
  title?: string;
  description?: string;
  /** Only sent by an admin; staff get their cabinet from the token. */
  cabinet?: number;
}

export interface CatalogueFilters {
  page?: number;
  page_size?: number;
  /** Free text over the label and description. */
  search?: string;
  cabinet?: number;
  /** Backend field: the label field, or `created_at`. */
  ordering?: string;
}

export interface PaginatedCatalogueList {
  count: number;
  next: string | null;
  previous: string | null;
  results: CatalogueRow[];
}