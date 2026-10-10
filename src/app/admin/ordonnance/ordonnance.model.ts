/** A medicine line inside `/api/ordonnances/`, as returned for reading. */
export interface OrdonnanceMedicament {
  id: number;
  medicament: number;
  /** Denormalised by the endpoint so the table needs no extra request. */
  medicament_name: string;
  dosage: string | null;
  duration: string | null;
}

/**
 * A medicine line as sent when writing.
 *
 * The endpoint takes a write-only `medicaments` list of medicament ids and reads
 * the result back as `medicaments_list`, so the two are deliberately separate.
 */
export interface OrdonnanceMedicamentInput {
  medicament: number;
  dosage?: string;
  duration?: string;
}

/** One row of `/api/ordonnances/`. */
export interface Ordonnance {
  id: number;
  cabinet: number;
  /** Id of the appointment the prescription was written for. */
  appointment: number | null;
  acte_demander: number | null;
  acte_fait: number | null;
  description: string | null;
  /** Write-only; always `[]` on a read. */
  medicaments: number[];
  /** The stored medicine lines. */
  medicaments_list: OrdonnanceMedicament[];
  created_at: string;
  updated_at: string;
}

export interface OrdonnanceRequest {
  /** Only sent by an admin; staff get their cabinet from the token. */
  cabinet?: number;
  appointment?: number | null;
  acte_demander?: number | null;
  acte_fait?: number | null;
  description?: string;
  medicaments?: OrdonnanceMedicamentInput[];
}

export interface OrdonnanceUpdateRequest extends Partial<OrdonnanceRequest> {}

export interface OrdonnanceFilters {
  page?: number;
  page_size?: number;
  /** Free text over the description and the patient's last name. */
  search?: string;
  cabinet?: number;
  /** Backend field: created_at. */
  ordering?: string;
}

export interface PaginatedOrdonnanceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Ordonnance[];
}