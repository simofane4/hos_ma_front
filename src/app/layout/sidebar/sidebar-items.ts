import { RouteInfo } from "./sidebar.metadata";

/**
 * Navigation for every role area.
 *
 * A section is listed as `disabled: true` while its screen is still missing.
 * Disabled entries stay visible so the intended structure is obvious, but they
 * do not navigate. Flip the flag once the route and component land.
 *
 * Each entry maps to an endpoint that the backend already exposes, so the work
 * left per section is the Angular screen only:
 *
 *   cabinets        GET/POST/PATCH/DELETE /api/cabinets/
 *   specialites     GET/POST/PATCH/DELETE /api/specialites/
 *   doctors         GET/POST/PATCH/DELETE /api/doctors/
 *   assistants      GET/POST/PATCH/DELETE /api/assistants/
 *   users           GET                  /api/users/          (read only)
 *   patients        GET/POST/PATCH/DELETE /api/patients/
 *   patient-files   GET/POST/PATCH/DELETE /api/patient-files/
 *   appointments    GET/POST/PATCH/DELETE /api/appointments/   (no cancel action)
 *   actes-demandes  GET/POST/PATCH/DELETE /api/actes-demandes/
 *   actes-faits     GET/POST/PATCH/DELETE /api/actes-faits/
 *   medicaments     GET/POST/PATCH/DELETE /api/medicaments/
 *   ordonnances     GET/POST/PATCH/DELETE /api/ordonnances/
 *   invoices        GET/POST/PATCH + /api/invoices/unpaid/
 *   me              GET                  /api/auth/me/
 *
 * Cabinet scoping is enforced by the backend from the caller's token, so the
 * same path serves both the admin (all cabinets) and staff (own cabinet only).
 */

const ICON_TYPE = "material-icons-two-tone";

const ADMIN: string[] = ["admin"];
const DOCTOR: string[] = ["doctor"];
const ASSISTANT: string[] = ["assistant"];
const PATIENT: string[] = ["patient"];
const CABINET_STAFF: string[] = ["doctor", "assistant"];

interface LinkSpec {
  path: string;
  title: string;
  moduleName: string;
  icon: string;
  role: string[];
  disabled?: boolean;
}

function link(spec: LinkSpec): RouteInfo {
  return {
    path: spec.path,
    title: spec.title,
    moduleName: spec.moduleName,
    iconType: ICON_TYPE,
    icon: spec.icon,
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: spec.role,
    submenu: [],
    disabled: spec.disabled === true,
  };
}

function group(title: string, role: string[]): RouteInfo {
  return {
    path: "",
    title: title,
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: role,
    submenu: [],
  };
}

export const ROUTES: RouteInfo[] = [
  // ------------------------------------------------------------------ admin
  group("MENUITEMS.MAIN.TEXT", ADMIN),
  link({
    path: "/admin/dashboard/main",
    title: "MENUITEMS.DASHBOARD.TEXT",
    moduleName: "dashboard",
    icon: "space_dashboard",
    role: ADMIN,
  }),
  link({
    path: "/admin/cabinet/cabinet",
    title: "MENUITEMS.CABINETS.TEXT",
    moduleName: "cabinet",
    icon: "apartment",
    role: ADMIN,
  }),
  link({
    path: "/admin/specialites",
    title: "MENUITEMS.SPECIALITES.TEXT",
    moduleName: "specialites",
    icon: "psychiatry",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/doctor/doctor",
    title: "MENUITEMS.DOCTORS.TEXT",
    moduleName: "doctor",
    icon: "medical_services",
    role: ADMIN,
  }),
  link({
    path: "/admin/assistants",
    title: "MENUITEMS.ASSISTANTS.TEXT",
    moduleName: "assistants",
    icon: "support_agent",
    role: ADMIN,
  }),
  link({
    path: "/admin/users",
    title: "MENUITEMS.USERS.TEXT",
    moduleName: "users",
    icon: "manage_accounts",
    role: ADMIN,
  }),
  link({
    path: "/admin/patients",
    title: "MENUITEMS.PATIENTS.TEXT",
    moduleName: "patients",
    icon: "personal_injury",
    role: ADMIN,
  }),
  link({
    path: "/admin/patient-files",
    title: "MENUITEMS.PATIENTFILES.TEXT",
    moduleName: "patient-files",
    icon: "folder_shared",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/appointments",
    title: "MENUITEMS.APPOINTMENTS.TEXT",
    moduleName: "appointments",
    icon: "event",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/actes-demandes",
    title: "MENUITEMS.ACTESDEMANDES.TEXT",
    moduleName: "actes-demandes",
    icon: "assignment",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/actes-faits",
    title: "MENUITEMS.ACTESFAITS.TEXT",
    moduleName: "actes-faits",
    icon: "task_alt",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/medicaments",
    title: "MENUITEMS.MEDICAMENTS.TEXT",
    moduleName: "medicaments",
    icon: "medication",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/ordonnances",
    title: "MENUITEMS.ORDONNANCES.TEXT",
    moduleName: "ordonnances",
    icon: "receipt_long",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/invoices",
    title: "MENUITEMS.INVOICES.TEXT",
    moduleName: "invoices",
    icon: "receipt",
    role: ADMIN,
    
  }),
  link({
    path: "/admin/me",
    title: "MENUITEMS.ME.TEXT",
    moduleName: "me",
    icon: "account_circle",
    role: ADMIN,
    
  }),

  // ----------------------------------------------------------------- doctor
  group("MENUITEMS.MAIN.TEXT", DOCTOR),
  link({
    path: "/doctor/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.DOCTOR-DASHBOARD",
    moduleName: "dashboard",
    icon: "space_dashboard",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/patients",
    title: "MENUITEMS.PATIENTS.TEXT",
    moduleName: "patients",
    icon: "personal_injury",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/patient-files",
    title: "MENUITEMS.PATIENTFILES.TEXT",
    moduleName: "patient-files",
    icon: "folder_shared",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/appointments",
    title: "MENUITEMS.APPOINTMENTS.TEXT",
    moduleName: "appointments",
    icon: "event",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/actes-demandes",
    title: "MENUITEMS.ACTESDEMANDES.TEXT",
    moduleName: "actes-demandes",
    icon: "assignment",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/actes-faits",
    title: "MENUITEMS.ACTESFAITS.TEXT",
    moduleName: "actes-faits",
    icon: "task_alt",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/medicaments",
    title: "MENUITEMS.MEDICAMENTS.TEXT",
    moduleName: "medicaments",
    icon: "medication",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/ordonnances",
    title: "MENUITEMS.ORDONNANCES.TEXT",
    moduleName: "ordonnances",
    icon: "receipt_long",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/invoices",
    title: "MENUITEMS.INVOICES.TEXT",
    moduleName: "invoices",
    icon: "receipt",
    role: DOCTOR,
  }),
  link({
    path: "/doctor/me",
    title: "MENUITEMS.ME.TEXT",
    moduleName: "me",
    icon: "account_circle",
    role: DOCTOR,
  }),

  // -------------------------------------------------------------- assistant
  group("MENUITEMS.MAIN.TEXT", ASSISTANT),
  link({
    path: "/assistant/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.ASSISTANT-DASHBOARD",
    moduleName: "dashboard",
    icon: "space_dashboard",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/patients",
    title: "MENUITEMS.PATIENTS.TEXT",
    moduleName: "patients",
    icon: "personal_injury",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/patient-files",
    title: "MENUITEMS.PATIENTFILES.TEXT",
    moduleName: "patient-files",
    icon: "folder_shared",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/appointments",
    title: "MENUITEMS.APPOINTMENTS.TEXT",
    moduleName: "appointments",
    icon: "event",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/actes-demandes",
    title: "MENUITEMS.ACTESDEMANDES.TEXT",
    moduleName: "actes-demandes",
    icon: "assignment",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/actes-faits",
    title: "MENUITEMS.ACTESFAITS.TEXT",
    moduleName: "actes-faits",
    icon: "task_alt",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/medicaments",
    title: "MENUITEMS.MEDICAMENTS.TEXT",
    moduleName: "medicaments",
    icon: "medication",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/ordonnances",
    title: "MENUITEMS.ORDONNANCES.TEXT",
    moduleName: "ordonnances",
    icon: "receipt_long",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/invoices",
    title: "MENUITEMS.INVOICES.TEXT",
    moduleName: "invoices",
    icon: "receipt",
    role: ASSISTANT,
  }),
  link({
    path: "/assistant/me",
    title: "MENUITEMS.ME.TEXT",
    moduleName: "me",
    icon: "account_circle",
    role: ASSISTANT,
  }),

  // ---------------------------------------------------------------- patient
  group("MENUITEMS.MAIN.TEXT", PATIENT),
  link({
    path: "/patient/dashboard",
    title: "MENUITEMS.DASHBOARD.LIST.PATIENT-DASHBOARD",
    moduleName: "dashboard",
    icon: "space_dashboard",
    role: PATIENT,
  }),
];
