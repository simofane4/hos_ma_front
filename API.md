# API Reference - Suivi Cabinet

Complete API endpoint documentation with request/response examples.

## Base URL

```
Development:  http://localhost:8000/api/
Production:   https://api.yourdomain.com/api/
```

## Authentication

All endpoints require JWT Bearer token (except login):

```bash
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## Common Response Format

### Success (2xx)

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@clinic.local",
  "created_at": "2026-10-02T10:00:00Z",
  "updated_at": "2026-10-02T10:00:00Z"
}
```

### Error (4xx, 5xx)

```json
{
  "error": {
    "status": 400,
    "code": "validation_error",
    "detail": "Invalid input",
    "fields": {
      "email": ["Email already in use"],
      "phone": ["Phone already registered"]
    }
  }
}
```

## Authentication Endpoints

### POST /api/auth/token/

Obtain JWT tokens using username and password.

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor1",
    "password": "password123"
  }'
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Errors:**
- `401 Unauthorized`: Invalid credentials

---

### POST /api/auth/token/refresh/

Refresh an expired access token using a refresh token.

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "eyJ0eXAi..."}'
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

---

### POST /api/auth/token/verify/

Verify if a token is valid.

**Request:**
```bash
curl -X POST http://localhost:8000/api/auth/token/verify/ \
  -H "Content-Type: application/json" \
  -d '{"token": "eyJ0eXAi..."}'
```

**Response (200 OK):**
```json
{}
```

**Errors:**
- `401 Unauthorized`: Invalid/expired token

---

### GET /api/auth/me/

Get current authenticated user's profile including role and cabinet.

**Request:**
```bash
curl http://localhost:8000/api/auth/me/ \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "id": 5,
  "username": "doctor1",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john@clinic.local",
  "is_active": true,
  "role": "doctor",
  "cabinet_id": 1
}
```

---

## Doctor Endpoints

### GET /api/doctors/

List doctors in current user's cabinet (or all if admin).

**Query Parameters:**
- `cabinet={id}` - Filter by cabinet
- `specialiste={id}` - Filter by specialty
- `gender={Male|Female}` - Filter by gender
- `search={text}` - Search by name, username, inp, phone
- `page={n}` - Pagination (default 1, page size 50)

**Request:**
```bash
curl "http://localhost:8000/api/doctors/?specialiste=3&gender=Male&page=1" \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 5,
  "next": "http://localhost:8000/api/doctors/?page=2",
  "previous": null,
  "results": [
    {
      "id": 2,
      "user": {
        "id": 5,
        "username": "doctor1",
        "first_name": "John",
        "last_name": "Smith",
        "email": "john@clinic.local",
        "is_active": true,
        "role": "doctor",
        "cabinet_id": 1
      },
      "cabinet": 1,
      "cabinet_name": "Main Clinic",
      "img": "http://.../doctor/default.png",
      "inp": "INP00001",
      "gender": "Male",
      "phone": "+212 6 12 34 56 78",
      "address": "123 Doctor Street",
      "specialiste": 3,
      "specialiste_name": "Cardiology",
      "created_at": "2026-10-02T09:00:00Z",
      "updated_at": "2026-10-02T09:00:00Z"
    }
  ]
}
```

**Permissions:**
- `IsCabinetStaff`: Doctors and assistants can list

---

### POST /api/doctors/

Create a new doctor with user account (ADMIN ONLY).

**Request:**
```bash
curl -X POST http://localhost:8000/api/doctors/ \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newdoctor",
    "password": "SecurePass123!",
    "email": "newdoc@clinic.local",
    "first_name": "Jane",
    "last_name": "Doe",
    "cabinet": 1,
    "specialiste": 3,
    "inp": "INP00010",
    "gender": "Female",
    "phone": "+212 6 99 88 77 66",
    "address": "456 Medical Ave"
  }'
```

**Response (201 Created):**
```json
{
  "id": 3,
  "user": {...},
  "cabinet": 1,
  "specialiste": 3,
  "inp": "INP00010",
  "gender": "Female",
  "phone": "+212 6 99 88 77 66",
  "created_at": "2026-10-02T10:30:00Z",
  "updated_at": "2026-10-02T10:30:00Z"
}
```

**Errors:**
- `400 Bad Request`: Validation errors (duplicate phone/inp, weak password, etc)
- `403 Forbidden`: User is not an admin

---

### GET /api/doctors/{id}/

Get doctor details.

**Request:**
```bash
curl http://localhost:8000/api/doctors/2/ \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "id": 2,
  "user": {...},
  "cabinet": 1,
  "specialiste": 3,
  "inp": "INP00001",
  ...
}
```

---

### PATCH /api/doctors/{id}/

Partially update doctor info (ADMIN ONLY).

**Request:**
```bash
curl -X PATCH http://localhost:8000/api/doctors/2/ \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "updated@clinic.local",
    "phone": "+212 6 11 22 33 44"
  }'
```

**Response (200 OK):**
```json
{
  "id": 2,
  "user": {"email": "updated@clinic.local", ...},
  "phone": "+212 6 11 22 33 44",
  ...
}
```

---

### DELETE /api/doctors/{id}/

Delete doctor and associated user (ADMIN ONLY).

**Request:**
```bash
curl -X DELETE http://localhost:8000/api/doctors/2/ \
  -H "Authorization: Bearer <admin_token>"
```

**Response (204 No Content):**
```
(empty)
```

---

## Patient Endpoints

### GET /api/patients/

List patients in current user's cabinet.

**Query Parameters:**
- `cabinet={id}` - Filter by cabinet (admin only)
- `gender={Male|Female}` - Filter by gender
- `search={text}` - Search by firstname, lastname, cin, phone
- `page={n}` - Pagination

**Request:**
```bash
curl "http://localhost:8000/api/patients/?search=john&gender=Male" \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 25,
  "next": "http://localhost:8000/api/patients/?page=2",
  "previous": null,
  "results": [
    {
      "id": 10,
      "cabinet": 1,
      "cin": "PAT123456",
      "img": "http://.../patient/default.png",
      "firstname": "John",
      "lastname": "Patient",
      "gender": "Male",
      "age": 45,
      "phone": "+212 6 55 44 33 22",
      "address": "123 Patient Lane",
      "child": false,
      "created_at": "2026-09-01T08:00:00Z",
      "updated_at": "2026-09-01T08:00:00Z"
    }
  ]
}
```

---

### POST /api/patients/

Create a new patient.

**Request:**
```bash
curl -X POST http://localhost:8000/api/patients/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cabinet": 1,
    "cin": "PAT999888",
    "firstname": "Alice",
    "lastname": "Wonder",
    "gender": "Female",
    "age": 32,
    "phone": "+212 6 66 77 88 99",
    "address": "789 Wonder Street",
    "child": false
  }'
```

**Response (201 Created):**
```json
{
  "id": 11,
  "cabinet": 1,
  "cin": "PAT999888",
  "firstname": "Alice",
  "lastname": "Wonder",
  ...
}
```

**Errors:**
- `400 Bad Request`: Duplicate cin or phone for cabinet

---

### GET /api/patients/{id}/

Get patient details including file count.

**Request:**
```bash
curl http://localhost:8000/api/patients/10/ \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "id": 10,
  "cabinet": 1,
  "cin": "PAT123456",
  "firstname": "John",
  "lastname": "Patient",
  ...
}
```

---

### PATCH /api/patients/{id}/

Update patient info.

**Request:**
```bash
curl -X PATCH http://localhost:8000/api/patients/10/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Jonathan",
    "age": 46
  }'
```

**Response (200 OK):**
```json
{
  "id": 10,
  "firstname": "Jonathan",
  "age": 46,
  ...
}
```

---

### DELETE /api/patients/{id}/

Delete patient (cascades to appointments, invoices, files).

**Request:**
```bash
curl -X DELETE http://localhost:8000/api/patients/10/ \
  -H "Authorization: Bearer <token>"
```

**Response (204 No Content):**
```
(empty)
```

---

## Patient File Endpoints

Documents attached to a patient. A file inherits its cabinet from the patient, so
there is no cabinet to send.

### GET /api/patient-files/

List documents, scoped to the caller's cabinet (admins see every cabinet).

**Query Parameters:**
- `page={int}` - Page number
- `page_size={int}` - Items per page (max 200)
- `search={string}` - Matches the patient's names or the stored file name
- `patient={id}` - Filter to one patient
- `ordering={field}` - Only `uploaded_at` is orderable; prefix `-` to reverse

**Response (200 OK):**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 16,
      "patient": 751,
      "patient_name": "Patient Test",
      "file": "http://localhost:8000/media/patient_documents/report.pdf",
      "uploaded_at": "2026-10-03T14:55:59+0000",
      "uploaded_by": null,
      "download_url": "http://localhost:8000/media/patient_documents/report.pdf"
    }
  ]
}
```

`patient_name` and `download_url` are read-only and resolved server side.
`uploaded_by` is always `null`: the uploader is not persisted, and the field is
kept only so the response shape stays stable.

### POST /api/patient-files/

Upload a document. **This endpoint only reads multipart or form-encoded bodies**,
so the payload must not be sent as JSON.

**Request:**
```bash
curl -X POST http://localhost:8000/api/patient-files/ \
  -H "Authorization: Bearer <token>" \
  -F "patient=751" \
  -F "file=@report.pdf"
```

**Constraints:**
- `file` is required and at most **5 MB** (`Le fichier depasse la taille maximale de 5 Mo.`)
- `patient` must belong to the caller's cabinet
- Staff omit the cabinet: it is forced from the token

**Response (201 Created):** the created object, as listed above.

**Errors:** `400` for an oversized file or a patient in another cabinet.

### PATCH /api/patient-files/{id}/

Replace the stored file of an existing row. Multipart, same `file` field. The
patient cannot be reassigned, so the cabinet a document lives in cannot change.

### DELETE /api/patient-files/{id}/

Delete the row and its stored file.

**Response (204 No Content):**
```
(empty)
```

---

## Appointment Endpoints

### GET /api/appointments/

List appointments for current user's cabinet.

**Query Parameters:**
- `date={YYYY-MM-DD}` - Filter by exact date
- `date_from={YYYY-MM-DD}` - Filter by date or later
- `date_to={YYYY-MM-DD}` - Filter by date or earlier
- `cabinet={id}` - Filter by cabinet (admins only; staff are scoped to their own)
- `patient={id}` - Filter by patient
- `payed={true|false}` - Filter by payment status
- `search={string}` - Matches the patient's names or the description
- `ordering={field}` - Sortable by `date`, `start`, `created_at`; prefix `-` to reverse
- `page={n}` - Pagination

Unknown query parameters are ignored rather than rejected, so a misspelled filter
returns the unfiltered list instead of an error.

**Request:**
```bash
curl "http://localhost:8000/api/appointments/?date_from=2026-10-15" \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 12,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "cabinet": 1,
      "patient": 10,
      "patient_name": "John Patient",
      "doctor": 2,
      "doctor_name": "Dr. Jane Smith",
      "start": "2026-10-15T09:00:00Z",
      "end": "2026-10-15T10:00:00Z",
      "reason": "Regular checkup",
      "status": "scheduled",
      "created_at": "2026-10-02T08:00:00Z",
      "updated_at": "2026-10-02T08:00:00Z"
    }
  ]
}
```

---

### POST /api/appointments/

Create a new appointment with automatic overlap detection.

**Request:**
```bash
curl -X POST http://localhost:8000/api/appointments/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "cabinet": 1,
    "patient": 10,
    "doctor": 2,
    "start": "2026-10-15T14:00:00Z",
    "end": "2026-10-15T15:00:00Z",
    "reason": "Cardiology consultation"
  }'
```

**Response (201 Created):**
```json
{
  "id": 2,
  "cabinet": 1,
  "patient": 10,
  "doctor": 2,
  "start": "2026-10-15T14:00:00Z",
  "end": "2026-10-15T15:00:00Z",
  "reason": "Cardiology consultation",
  "status": "scheduled",
  ...
}
```

**Errors:**
- `400 Bad Request`: Overlapping appointment exists
- `400 Bad Request`: Appointment in the past
- `400 Bad Request`: End time before start time

---

> **Not implemented:** there is no `POST /api/appointments/{id}/cancel/` endpoint.
> `AppointmentViewSet` has no extra `@action`, so the route 404s. Removing an
> appointment is a plain `DELETE /api/appointments/{id}/`. Do not call a cancel
> action from the UI until the backend grows one.

---

## Invoice Endpoints

### GET /api/invoices/

List invoices for current user's cabinet.

**Query Parameters:**
- `payed={true|false}` - Filter by payment status
- `start_date={YYYY-MM-DD}` - Filter by creation date
- `page={n}` - Pagination

**Request:**
```bash
curl "http://localhost:8000/api/invoices/?payed=false" \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "appointment": 10,
      "patient_name": "John Patient",
      "date": "2026-10-02T10:00:00Z",
      "recipient": 5,
      "recipient_username": "doctor1",
      "amount": "5000.00",
      "payed": false,
      "created_at": "2026-10-02T10:00:00Z",
      "updated_at": "2026-10-02T10:00:00Z"
    }
  ]
}
```

---

### GET /api/invoices/unpaid/

List only unpaid invoices.

**Request:**
```bash
curl http://localhost:8000/api/invoices/unpaid/ \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 3,
  "results": [...]
}
```

---

### POST /api/invoices/

Create a new invoice for an appointment.

**Request:**
```bash
curl -X POST http://localhost:8000/api/invoices/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment": 10,
    "amount": "5000.00",
    "payed": false
  }'
```

**Response (201 Created):**
```json
{
  "id": 2,
  "appointment": 10,
  "patient_name": "John Patient",
  "amount": "5000.00",
  "payed": false,
  "recipient": 5,
  ...
}
```

**Notes:**
- If `recipient` not provided, defaults to current user
- Amount must be non-negative

---

### PATCH /api/invoices/{id}/

Mark invoice as paid or update other fields.

**Request:**
```bash
curl -X PATCH http://localhost:8000/api/invoices/1/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"payed": true}'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "payed": true,
  ...
}
```

---

## Prescription (Ordonnance) Endpoints

### GET /api/ordonnances/

List prescriptions in current user's cabinet.

**Query Parameters:**
- `appointment={id}` - Filter by appointment
- `page={n}` - Pagination

**Request:**
```bash
curl "http://localhost:8000/api/ordonnances/?appointment=10" \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "count": 2,
  "results": [
    {
      "id": 1,
      "appointment": 10,
      "notes": "Take one tablet twice daily for 10 days",
      "medicaments": [
        {
          "medicament": 3,
          "medicament_name": "Aspirin",
          "dosage": "500mg",
          "duration": "10 days"
        }
      ],
      "created_at": "2026-10-02T11:00:00Z",
      "updated_at": "2026-10-02T11:00:00Z"
    }
  ]
}
```

---

### POST /api/ordonnances/

Create a new prescription with medications.

**Request:**
```bash
curl -X POST http://localhost:8000/api/ordonnances/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment": 10,
    "notes": "Take one tablet twice daily for 10 days",
    "medicaments": [
      {
        "medicament": 3,
        "dosage": "500mg",
        "duration": "10 days"
      },
      {
        "medicament": 5,
        "dosage": "250mg",
        "duration": "5 days"
      }
    ]
  }'
```

**Response (201 Created):**
```json
{
  "id": 2,
  "appointment": 10,
  "notes": "Take one tablet twice daily for 10 days",
  "medicaments": [...]
}
```

---

## Health & Schema Endpoints

### GET /api/health/

Health check with database connectivity status.

**Request:**
```bash
curl http://localhost:8000/api/health/
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "database": "connected"
}
```

**Response (503 Service Unavailable):**
```json
{
  "status": "error",
  "database": "disconnected"
}
```

---

### GET /api/schema/

OpenAPI 3.0 schema in JSON format.

**Request:**
```bash
curl http://localhost:8000/api/schema/ | jq .
```

---

### GET /api/docs/

Interactive Swagger UI for API exploration.

Open in browser: http://localhost:8000/api/docs/

---

### GET /api/redoc/

ReDoc alternative documentation view.

Open in browser: http://localhost:8000/api/redoc/

---

## Pagination

All list endpoints support pagination with 50 items per page (max 200):

```bash
GET /api/patients/?page=2

Response:
{
  "count": 250,
  "next": "http://localhost:8000/api/patients/?page=3",
  "previous": "http://localhost:8000/api/patients/?page=1",
  "results": [...]
}
```

---

## Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `unauthorized` | 401 | Invalid or missing authentication |
| `permission_denied` | 403 | User doesn't have permission |
| `not_found` | 404 | Resource not found |
| `validation_error` | 400 | Invalid input data |
| `conflict` | 409 | Unique constraint violated |
| `server_error` | 500 | Internal server error |

---

For more architectural details, see [ARCHITECTURE.md](ARCHITECTURE.md).
