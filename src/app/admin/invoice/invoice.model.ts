/**
 * One row of `/api/invoices/`.
 *
 * An invoice has no cabinet of its own: it belongs to one through its
 * appointment, which is why there is no `cabinet` field here and why the
 * endpoint derives the cabinet from the appointment when creating.
 */
export interface Invoice {
  id: number;
  /** Id of the appointment the invoice bills. */
  appointment: number;
  /** Denormalised by the endpoint so the table needs no extra request. */
  patient_name: string;
  date: string;
  /** Id of the `auth_user` the invoice was issued to. */
  recipient: number;
  recipient_username: string;
  amount: string;
  payed: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceRequest {
  appointment: number;
  date: string;
  amount: string;
  payed?: boolean;
}

export interface InvoiceUpdateRequest extends Partial<InvoiceRequest> {}

export interface InvoiceFilters {
  page?: number;
  page_size?: number;
  /** Free text over the patient's first and last name. */
  search?: string;
  appointment?: number;
  payed?: boolean;
  amount?: string;
  /** Inclusive lower bound on `date`. */
  date_from?: string;
  /** Inclusive upper bound on `date`. */
  date_to?: string;
  /** Backend field: date | amount | created_at. */
  ordering?: string;
}

export interface PaginatedInvoiceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Invoice[];
}