/** One row of `/api/patient-files/`. */
export interface PatientFile {
  id: number;
  /** Id of the patient the document is attached to. */
  patient: number;
  /** Patient's full name, resolved by the endpoint. */
  patient_name: string;
  /** Absolute URL of the stored file, as returned by the endpoint. */
  file: string;
  uploaded_at: string;
  /**
   * Always `null`: the endpoint has no uploader column and deliberately leaves
   * the field out of its schema, so there is nothing truthful to show here.
   */
  uploaded_by: string | null;
  /** Absolute URL built by the endpoint for downloading the file. */
  download_url: string;
}

export interface PatientFileFilters {
  page?: number;
  page_size?: number;
  /** Free text over the patient's names and the stored file name. */
  search?: string;
  patient?: number;
  /** Backend field: uploaded_at. */
  ordering?: string;
}

export interface PaginatedPatientFileList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PatientFile[];
}