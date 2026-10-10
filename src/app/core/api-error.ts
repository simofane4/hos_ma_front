import { HttpErrorResponse } from '@angular/common/http';

export interface ApiError {
  status: number;
  code: string;
  detail: string;
  fields?: { [field: string]: string[] };
}

/**
 * Normalizes the backend error envelope documented in API.md:
 * `{ "error": { "status": 400, "code": "validation_error", "detail": "...", "fields": {...} } }`
 * and falls back to the raw DRF payload when the envelope is absent.
 */
export function parseApiError(err: HttpErrorResponse): ApiError {
  const body: any = err?.error;

  if (body && body.error) {
    return {
      status: body.error.status ?? err.status,
      code: body.error.code ?? '',
      detail: body.error.detail ?? '',
      fields: body.error.fields,
    };
  }

  if (typeof body === 'string' && body.length > 0) {
    return { status: err.status, code: '', detail: body };
  }

  return { status: err?.status ?? 0, code: '', detail: err?.message ?? '' };
}

/** Human readable one-liner for a failed request. */
export function apiErrorMessage(err: HttpErrorResponse): string {
  const { status, code, detail, fields } = parseApiError(err);

  if (fields) {
    const messages = Object.keys(fields).reduce((acc: string[], field) => {
      const list = [].concat(fields[field] || []);
      return acc.concat(list.map((message) => `${field}: ${message}`));
    }, []);
    if (messages.length > 0) {
      return messages.join(' | ');
    }
  }

  return detail || code || `Request failed with status ${status}`;
}