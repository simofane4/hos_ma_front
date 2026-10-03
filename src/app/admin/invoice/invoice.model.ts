export interface Invoice {
  id: number;
  appointment: number;
  patient_name: string;
  date: string | null;
  recipient: number;
  recipient_username: string;
  amount: string;
  payed: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceRequest {
  appointment: number;
  date?: string | null;
  recipient: number;
  amount: string;
  payed?: boolean;
}

export interface PaginatedInvoiceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Invoice[];
}