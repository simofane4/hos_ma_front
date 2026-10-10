/**
 * The admin screens for specialities, medicaments, requested acts and performed
 * acts are the same list-and-form over four endpoints that share one shape: an
 * id, a single label, an optional description, and -- except for the global
 * speciality catalogue -- an owning cabinet.
 *
 * Rather than copy the table and both dialogs four times, one component is driven
 * by a {@link CatalogueSpec}. Anything that does *not* fit this shape gets its own
 * screen instead: appointments, invoices, ordonnances and patient files all carry
 * relations the table has to render.
 */

/** Field holding the row's main label, as named by the backend. */
export type CatalogueLabelField = "name" | "title";

export interface CatalogueSpec {
  /** Route segment, e.g. `specialites`. */
  slug: string;
  /** Path under `/api/`, e.g. `/specialites/`. */
  endpoint: string;
  /** Plural heading shown above the table. */
  title: string;
  /** Singular noun for buttons and dialog titles, e.g. `Speciality`. */
  singular: string;
  /** Which field the backend calls the row's label. */
  labelField: CatalogueLabelField;
  /** Whether the endpoint accepts a free-text description. */
  hasDescription: boolean;
  /**
   * Whether rows belong to a cabinet. When true an admin has to pick one (an
   * admin has no cabinet of its own) and staff must not send one at all, since
   * the endpoint derives it from the token.
   */
  hasCabinet: boolean;
  /** Whether the endpoint exposes `created_at`. Specialities do not. */
  hasTimestamps: boolean;
  /** Hint for the search box. */
  searchHint: string;
}

export const CATALOGUES: { [slug: string]: CatalogueSpec } = {
  specialites: {
    slug: "specialites",
    endpoint: "/specialites/",
    title: "Specialities",
    singular: "Speciality",
    labelField: "name",
    hasDescription: false,
    hasCabinet: false,
    hasTimestamps: false,
    searchHint: "Search speciality",
  },
  medicaments: {
    slug: "medicaments",
    endpoint: "/medicaments/",
    title: "Medicaments",
    singular: "Medicament",
    labelField: "name",
    hasDescription: true,
    hasCabinet: true,
    hasTimestamps: true,
    searchHint: "Search medicament",
  },
  "actes-demandes": {
    slug: "actes-demandes",
    endpoint: "/actes-demandes/",
    title: "Requested Acts",
    singular: "Requested Act",
    labelField: "title",
    hasDescription: true,
    hasCabinet: true,
    hasTimestamps: true,
    searchHint: "Search act",
  },
  "actes-faits": {
    slug: "actes-faits",
    endpoint: "/actes-faits/",
    title: "Performed Acts",
    singular: "Performed Act",
    labelField: "title",
    hasDescription: true,
    hasCabinet: true,
    hasTimestamps: true,
    searchHint: "Search act",
  },
};