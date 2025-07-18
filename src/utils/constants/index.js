
import dayjs from "dayjs";
import { capitalize } from "../helper";

export const DASHBOARD_HEADER_HEIGHT = "60px";
export const DASHBOARD_FOOTER_HEIGHT = "40px";

export const DASHBOARD_LAYOUT_CALC = {
  base: `calc(100dvh - (${DASHBOARD_HEADER_HEIGHT} + ${DASHBOARD_FOOTER_HEIGHT} + 32px))`,
};

export const APP_TITLE = "Lawyer Dashboard";
export const LOCAL_STORAGE_KEY = "lawyer-dashboard";
export const CACHED_URL_LOCAL_STORAGE_KEY = "cached-redirect-url";

export const BASE_URL =
  typeof window !== "undefined"
    ? window?.location?.origin
    : "http://localhost:3000";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

export const AUTH_MESSAGES = {
  login: "Login successful.",
  invalidLogin: "Invalid credentials.",
  forgotPassword: "Reset password link sent to your email.",
  resetPassword: "Your password has been reset successfully.",
  createPassword: "Password created successfully.",
  logout: "You have been logged out.",
  session: "Your session has been expired.",
  emailVerificationSent: "Verification email sent. Check inbox.",
  verificationLinkExpired: "Verification link has expired.",
};

export const ERROR_MESSAGES = {
  400: "Invalid request. Please try again.",
  401: "Please log in to continue.",
  403: "Access denied.",
  404: "The content does not exist.",
  408: "Request took too long. Try again.",
  422: "Invalid input. Please try again.",
  500: "Oops! Something went wrong. Try later.",
  502: "Connection issue. Try later.",
  503: "Service is down. Try later.",
  504: "Server took too long. Try again.",
  common: "Oops! Something went wrong. Try later.",
};

export const VALIDATION_MESSAGES = {
  required: (field) => `${capitalize(field)} is required.`,
  minLength: (field, length) =>
    `${capitalize(field)} must be at least ${length} characters.`,
  maxLength: (field, length) =>
    `${capitalize(field)} must be at most ${length} characters.`,
  invalid: (field) => `Invalid ${field}.`,
  passwordUppercase: "Password must contain uppercase letters.",
  passwordLowercase: "Password must contain lowercase letters.",
  passwordNumber: "Password must contain numbers.",
  passwordSpecialChar: "Password must contain special characters.",
  passwordsDoNotMatch: "Passwords do not match.",
};

export const PLACEHOLDER_MESSAGES = {
  default: (field) => `Enter your ${field}`,
  common: (field) => `Enter ${field}`,
  select: (field) => `Select ${field}`,
  filter: (field) => `Filter by ${field}`,
  search: "Search here...",
};

export const DATE_FORMAT = {
  date: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
  dateTime: (date) => (date ? dayjs(date).format("YYYY-MM-DD h:mm A") : "-"),
};

export const ACTION_MESSAGES = {
  update: (field) => `${capitalize(field)} updated successfully.`,
  delete: (field) => `${capitalize(field)} deleted successfully.`,
  deactivated: (field) => `${capitalize(field)} deactivated successfully.`,
  activated: (field) => `${capitalize(field)} activated successfully.`,
  add: (field) => `${capitalize(field)} added successfully.`,
  sync: (field) => `${capitalize(field)} synced successfully.`,
  invite: "Invitation sent successfully.",
};

export const STATUS_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

export const EXISTING_VISA = [
  { id: 1, name: 'Entry Stamp (30 Day)', value: 'entry_stamp_30_day' },
  { id: 2, name: 'Entry Stamp (60 Day)', value: 'entry_stamp_60_day' },
  { id: 3, name: 'Tourist Visa (60 Day)', value: 'tourist_visa_60_day' },
  { id: 4, name: 'Non-Immigrant O Visa (3 Month)', value: 'non_immigrant_o_visa_3_month' },
  { id: 5, name: 'Married to Thai Visa', value: 'married_to_thai_visa' },
  { id: 6, name: 'Thai Child Visa', value: 'thai_child_visa' },
  { id: 7, name: 'Student Visa (Language School)', value: 'student_visa_language_school' },
  { id: 8, name: 'Student Visa (School or University)', value: 'student_visa_school_or_university' },
  { id: 9, name: 'Retirement Visa', value: 'retirement_visa' },
  { id: 10, name: 'Guardian Visa', value: 'guardian_visa' },
  { id: 11, name: 'Dependent Visa', value: 'dependent_visa' },
  { id: 12, name: 'Non-Immigrant B Visa (3 Month)', value: 'non_immigrant_b_visa_3_month' },
  { id: 13, name: 'Business Visa (Employment – 1 Year)', value: 'business_visa_employment_1_year' },
  { id: 14, name: 'Retirement Visa (1 Year)', value: 'retirement_visa_1_year' },
  { id: 15, name: 'Non-Immigrant OA Visa', value: 'non_immigrant_oa_visa' },
  { id: 16, name: 'Elite Visa', value: 'elite_visa' },
  { id: 17, name: 'DTV', value: 'dtv' },
  { id: 18, name: 'LTR: Wealthy Pensioner', value: 'ltr_wealthy_pensioner' },
  { id: 19, name: 'LTR: Wealthy Citizen', value: 'ltr_wealthy_citizen' },
  { id: 20, name: 'LTR: Highly Skilled Professional', value: 'ltr_highly_skilled_professional' },
  { id: 21, name: 'LTR: Work from Thailand Professional', value: 'ltr_work_from_thailand_professional' }
];

export const WISHED_VISA = [
  { id: 1, name: 'Renew the Existing One', value: 'renew_the_existing_one' },
  { id: 2, name: 'Non-Immigrant O Visa (3 Month)', value: 'non_immigrant_o_visa_3_month' },
  { id: 3, name: 'Married to Thai Visa', value: 'married_to_thai_visa' },
  { id: 4, name: 'Thai Child Visa', value: 'thai_child_visa' },
  { id: 5, name: 'Student Visa (Language School)', value: 'student_visa_language_school' },
  { id: 6, name: 'Student Visa (School or University)', value: 'student_visa_school_or_university' },
  { id: 7, name: 'Retirement Visa', value: 'retirement_visa' },
  { id: 8, name: 'Guardian Visa', value: 'guardian_visa' },
  { id: 9, name: 'Dependent Visa', value: 'dependent_visa' },
  { id: 10, name: 'Non-Immigrant B Visa (3 Month)', value: 'non_immigrant_b_visa_3_month' },
  { id: 11, name: 'Business Visa (Employment – 1 Year)', value: 'business_visa_employment_1_year' },
  { id: 12, name: 'Retirement Visa (1 Year)', value: 'retirement_visa_1_year' },
  { id: 13, name: 'Non-Immigrant OA Visa', value: 'non_immigrant_oa_visa' },
  { id: 14, name: 'Elite Visa', value: 'elite_visa' },
  { id: 15, name: 'DTV', value: 'dtv' },
  { id: 16, name: 'LTR: Wealthy Pensioner', value: 'ltr_wealthy_pensioner' },
  { id: 17, name: 'LTR: Wealthy Citizen', value: 'ltr_wealthy_citizen' },
  { id: 18, name: 'LTR: Highly Skilled Professional', value: 'ltr_highly_skilled_professional' },
  { id: 19, name: 'LTR: Work from Thailand Professional', value: 'ltr_work_from_thailand_professional' }
];

export const EXISTING_VISA_MAP = EXISTING_VISA.reduce((acc, visa) => {
  acc[visa.value] = visa.name;
  return acc;
}, {});

export const WISHED_VISA_MAP = WISHED_VISA.reduce((acc, visa) => {
  acc[visa.value] = visa.name;
  return acc;
}, {});