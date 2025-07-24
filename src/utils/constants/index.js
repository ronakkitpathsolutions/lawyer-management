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
  { id: 20, name: 'LTR: Highly Skilled/Professional', value: 'ltr_highly_skilled_professional' },
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
  { id: 11, name: 'Business Visa (Employment - 1 Year)', value: 'business_visa_employment_1_year' },
  { id: 12, name: 'Retirement Visa (1 Year)', value: 'retirement_visa_1_year' },
  { id: 13, name: 'Non-Immigrant OA Visa', value: 'non_immigrant_oa_visa' },
  { id: 14, name: 'Elite Visa', value: 'elite_visa' },
  { id: 15, name: 'DTV', value: 'dtv' },
  { id: 16, name: 'LTR: Wealthy Pensioner', value: 'ltr_wealthy_pensioner' },
  { id: 17, name: 'LTR: Wealthy Citizen', value: 'ltr_wealthy_citizen' },
  { id: 18, name: 'LTR: Highly Skilled/Professional', value: 'ltr_highly_skilled_professional' },
  { id: 19, name: 'LTR: Work from Thailand Professional', value: 'ltr_work_from_thailand_professional' }
];

export const EXISTING_VISA_MAP = EXISTING_VISA.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const WISHED_VISA_MAP = WISHED_VISA.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const TYPE_OF_TRANSACTION_TEXTS = [
  'buy',
  'sell',
  'rental',
  'usufruct',
  'mortgage',
  'subdivision',
  'consolidation',
  'servitude',
  'other',
];

export const TYPE_OF_TRANSACTION_OPTIONS = [
  { id: 1, name: 'Buy', value: 'buy' },
  { id: 2, name: 'Sell', value: 'sell' },
  { id: 3, name: 'Rental', value: 'rental' },
  { id: 4, name: 'Usufruct', value: 'usufruct' },
  { id: 5, name: 'Mortgage', value: 'mortgage' },
  { id: 6, name: 'Subdivision', value: 'subdivision' },
  { id: 7, name: 'Consolidation', value: 'consolidation' },
  { id: 8, name: 'Servitude', value: 'servitude' },
  { id: 9, name: 'Other', value: 'other' },
];

export const TYPE_OF_PROPERTY_TEXTS = [
  'house_and_land_freehold',
  'house_and_land_leasehold',
  'condominium_freehold',
  'condominium_leasehold',
  'empty_land',
];

export const INTENDED_CLOSING_DATE_TEXTS = [
  'on_or_before',
  'after',
  'only_on',
];

export const HANDOVER_DATE_TEXTS = [
  'on_or_before',
  'at_closing',
  'after_closing',
];

export const ACCEPTABLE_PAYMENT_METHODS_TEXTS = [
  'cashiers_check_recommended',
  'cash_transfer',
  'personal_check',
  'cash',
  'other',
];

export const PLACE_OF_PAYMENT_TEXTS = ['thailand', 'other'];

export const PROPERTY_CONDITION_TEXTS = [
  'new',
  'good_working',
  'as_seen',
  'sometimes_items_to_be_repaired',
];

export const FURNITURE_INCLUDED_TEXTS = [
  'not_furniture_included',
  'specific_furniture_included',
  'all_furniture_included',
  'selected_furniture_included',
  'all_furniture_except_personal_items',
];

export const COST_SHARING_TEXTS = [
  'buyer_only',
  'seller_only',
  'lessee_only',
  'lessor_only',
  'mortgagor_only',
  'mortgagee_only',
  'usufructuary_only',
  'owner_only',
  'dominant_owner_only',
  'servient_owner_only',
  'share_50_50',
];

export const HOUSE_TITLE_TEXTS = [
  'building_permit',
  'official_house_sale_and_purchase_agreement',
];

export const LAND_TITLE_TEXTS = [
  'land_title_deed',
  'certificate_of_utilization',
];

export const DECLARED_LAND_OFFICE_PRICE_TEXTS = [
  'actual_price',
  'lowest_possible_price',
  'mediocre_price',
];

export const PROPERTY_MESSAGES = {
  CLIENT_ID: {
    REQUIRED: 'Client ID is required',
    INVALID: 'Client ID must be a valid integer',
    NOT_FOUND: 'Client not found',
  },
  AGENT_NAME: {
    REQUIRED: 'Agent name is required',
    TOO_SHORT: 'Agent name must be at least 2 characters long',
    TOO_LONG: 'Agent name must not exceed 100 characters',
    INVALID: 'Agent name contains invalid characters',
  },
  BROKER_COMPANY: {
    REQUIRED: 'Broker company is required',
    TOO_SHORT: 'Broker company must be at least 2 characters long',
    TOO_LONG: 'Broker company must not exceed 100 characters',
    INVALID: 'Broker company contains invalid characters',
  },
  TRANSACTION_TYPE: {
    REQUIRED: 'Transaction type is required',
    INVALID: 'Transaction type must be one of: buy, sell, rent',
  },
  PROPERTY_TYPE: {
    REQUIRED: 'Property type is required',
    INVALID: 'Property type must be one of: house, condo, land, commercial',
  },
  RESERVATION_DATE: {
    REQUIRED: 'Reservation date is required',
    INVALID: 'Reservation date must be a valid date',
  },
  INTENDED_CLOSING_DATE: {
    REQUIRED: 'Intended closing date is required',
    INVALID: 'Intended closing date is invalid',
  },
  INTENDED_CLOSING_DATE_SPECIFIC: {
    REQUIRED: 'Intended closing date (specific) is required',
    INVALID: 'Intended closing date (specific) must be a valid date',
  },
  HANDOVER_DATE: {
    REQUIRED: 'Handover date is required',
    INVALID: 'Handover date must be a valid date',
  },
  PROPERTY_NAME: {
    REQUIRED: 'Property name is required',
    TOO_SHORT: 'Property name must be at least 2 characters long',
    TOO_LONG: 'Property name must not exceed 100 characters',
    INVALID: 'Property name contains invalid characters',
  },
  SELLING_PRICE: {
    REQUIRED: 'Selling price is required',
    INVALID: 'Selling price must be a valid number',
    MUST_BE_POSITIVE: 'Selling price must be a positive number',
  },
  DEPOSIT: {
    REQUIRED: 'Deposit amount is required',
    INVALID: 'Deposit must be a valid number',
    MUST_BE_POSITIVE: 'Deposit must be a positive number',
  },
  INTERMEDIARY_PAYMENT: {
    REQUIRED: 'Intermediary payment is required',
    INVALID: 'Intermediary payment must be a valid number',
    MUST_BE_POSITIVE: 'Intermediary payment must be a positive number',
  },
  CLOSING_PAYMENT: {
    REQUIRED: 'Closing payment is required',
    INVALID: 'Closing payment must be a valid number',
    MUST_BE_POSITIVE: 'Closing payment must be a positive number',
  },
  ACCEPTABLE_METHOD_OF_PAYMENT: {
    REQUIRED: 'Acceptable method of payment is required',
    INVALID:
      'Acceptable method of payment must be one of: direct_transfer, bank_transfer, cash',
  },
  PLACE_OF_PAYMENT: {
    REQUIRED: 'Place of payment is required',
    TOO_SHORT: 'Place of payment must be at least 2 characters long',
    TOO_LONG: 'Place of payment must not exceed 100 characters',
    INVALID: 'Place of payment contains invalid characters',
  },
  PROPERTY_CONDITION: {
    REQUIRED: 'Property condition is required',
    INVALID:
      'Property condition must be one of: new, good, needs_renovation, poor',
  },
  HOUSE_WARRANTY: {
    REQUIRED: 'House warranty is required',
    INVALID: 'House warranty must be a boolean value (true/false)',
  },
  FURNITURE_INCLUDED: {
    REQUIRED: 'Furniture included status is required',
    INVALID: 'Furniture included must be one of: yes, no, negotiable',
  },
  // cost sharing
  TRANSFER_FEE: {
    REQUIRED: 'Transfer fee is required',
    INVALID: 'Transfer fee must be a valid number',
    MUST_BE_POSITIVE: 'Transfer fee must be a positive number',
  },
  WITHHOLDING_TAX: {
    REQUIRED: 'Withholding tax is required',
    INVALID: 'Withholding tax must be a valid number',
    MUST_BE_POSITIVE: 'Withholding tax must be a positive number',
  },
  BUSINESS_TAX: {
    REQUIRED: 'Business tax is required',
    INVALID: 'Business tax must be a valid number',
    MUST_BE_POSITIVE: 'Business tax must be a positive number',
  },
  LEASE_REGISTRATION_FEE: {
    REQUIRED: 'Lease registration fee is required',
    INVALID: 'Lease registration fee must be a valid number',
    MUST_BE_POSITIVE: 'Lease registration fee must be a positive number',
  },
  MORTGAGE_FEE: {
    REQUIRED: 'Mortgage fee is required',
    INVALID: 'Mortgage fee must be a valid number',
    MUST_BE_POSITIVE: 'Mortgage fee must be a positive number',
  },
  USUFRUCT_REGISTRATION_FEE: {
    REQUIRED: 'Usufruct registration fee is required',
    INVALID: 'Usufruct registration fee must be a valid number',
    MUST_BE_POSITIVE: 'Usufruct registration fee must be a positive number',
  },
  SERVITUDE_REGISTRATION_FEE: {
    REQUIRED: 'Servitude registration fee is required',
    INVALID: 'Servitude registration fee must be a valid number',
    MUST_BE_POSITIVE: 'Servitude registration fee must be a positive number',
  },
  DECLARED_LAND_OFFICE_PRICE: {
    REQUIRED: 'Declared land office price is required',
    INVALID: 'Declared land office price must be a valid number',
    MUST_BE_POSITIVE: 'Declared land office price must be a positive number',
  },
  // documentation attachment
  LAND_TITLE: {
    REQUIRED: 'Land title is required',
    INVALID: 'Land title must be a valid URL',
    TOO_LONG: 'Land title URL must not exceed 500 characters',
  },
  LAND_TITLE_DOCUMENT: {
    REQUIRED: 'Land title document is required',
    INVALID: 'Land title document must be a valid URL',
    TOO_LONG: 'Land title document URL must not exceed 500 characters',
  },
  HOUSE_TITLE: {
    REQUIRED: 'House title is required',
    INVALID: 'House title must be a valid URL',
    TOO_LONG: 'House title URL must not exceed 500 characters',
  },
  HOUSE_TITLE_DOCUMENT: {
    REQUIRED: 'House title document is required',
    INVALID: 'House title document must be a valid URL',
    TOO_LONG: 'House title document URL must not exceed 500 characters',
  },
  HOUSE_REGISTRATION_BOOK: {
    REQUIRED: 'House registration book is required',
    INVALID: 'House registration book must be a valid URL',
    TOO_LONG: 'House registration book URL must not exceed 500 characters',
  },
  LAND_LEASE_AGREEMENT: {
    REQUIRED: 'Land lease agreement is required',
    INVALID: 'Land lease agreement must be a valid URL',
    TOO_LONG: 'Land lease agreement URL must not exceed 500 characters',
  },
  GENERAL: {
    NOT_FOUND: 'Property record not found',
    ALREADY_EXISTS: 'Property record already exists',
    CREATION_FAILED: 'Failed to create property record',
    UPDATE_FAILED: 'Failed to update property record',
    DELETE_FAILED: 'Failed to delete property record',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden - Admin access required',
  },
}

export const TYPE_OF_TRANSACTION_MAP = TYPE_OF_TRANSACTION_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const TYPE_OF_PROPERTY_OPTIONS = [
  { id: 1, name: 'House and Land (Freehold)', value: 'house_and_land_freehold' },
  { id: 2, name: 'House and Land (Leasehold)', value: 'house_and_land_leasehold' },
  { id: 3, name: 'Condominium (Freehold)', value: 'condominium_freehold' },
  { id: 4, name: 'Condominium (Leasehold)', value: 'condominium_leasehold' },
  { id: 5, name: 'Empty Land', value: 'empty_land' },
];

export const TYPE_OF_PROPERTY_MAP = TYPE_OF_PROPERTY_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const INTENDED_CLOSING_DATE_OPTIONS = [
  { id: 1, name: 'On or Before', value: 'on_or_before' },
  { id: 2, name: 'After', value: 'after' },
  { id: 3, name: 'Only on', value: 'only_on' }
];

export const INTENDED_CLOSING_DATE_MAP = INTENDED_CLOSING_DATE_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const HANDOVER_DATE_OPTIONS = [
  { id: 1, name: 'At Closing', value: 'at_closing' },
  { id: 2, name: 'After Closing', value: 'after_closing' },
];

export const HANDOVER_DATE_MAP = HANDOVER_DATE_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const ACCEPTABLE_PAYMENT_METHODS_OPTIONS = [
  { id: 1, name: 'Cashier\'s Check Recommended', value: 'cashiers_check_recommended' },
  { id: 2, name: 'Cash Transfer', value: 'cash_transfer' },
  { id: 3, name: 'Personal Check', value: 'personal_check' },
  { id: 4, name: 'Cash', value: 'cash' },
  { id: 5, name: 'Other', value: 'other' },
];

export const ACCEPTABLE_PAYMENT_METHODS_MAP = ACCEPTABLE_PAYMENT_METHODS_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const PLACE_OF_PAYMENT_OPTIONS = [
  { id: 1, name: 'Thailand', value: 'thailand' },
  { id: 2, name: 'Other', value: 'other' },
];

export const PLACE_OF_PAYMENT_MAP = PLACE_OF_PAYMENT_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const PROPERTY_CONDITION_OPTIONS = [
  { id: 1, name: 'New', value: 'new' },
  { id: 2, name: 'Good Working', value: 'good_working' },
  { id: 3, name: 'As Seen', value: 'as_seen' },
  { id: 4, name: 'Sometimes Items to be Repaired', value: 'sometimes_items_to_be_repaired' },
];

export const PROPERTY_CONDITION_MAP = PROPERTY_CONDITION_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const FURNITURE_INCLUDED_OPTIONS = [
  { id: 1, name: 'Not Furniture Included', value: 'not_furniture_included' },
  { id: 2, name: 'Specific Furniture Included', value: 'specific_furniture_included' },
  { id: 3, name: 'All Furniture Included', value: 'all_furniture_included' },
  { id: 4, name: 'Selected Furniture Included', value: 'selected_furniture_included' },
  { id: 5, name: 'All Furniture Except Personal Items', value: 'all_furniture_except_personal_items' },
];

export const FURNITURE_INCLUDED_MAP = FURNITURE_INCLUDED_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const COST_SHARING_OPTIONS = [
  { id: 1, name: 'Buyer Only', value: 'buyer_only' },
  { id: 2, name: 'Seller Only', value: 'seller_only' },
  { id: 3, name: 'Lessee Only', value: 'lessee_only' },
  { id: 4, name: 'Lessor Only', value: 'lessor_only' },
  { id: 5, name: 'Mortgagor Only', value: 'mortgagor_only' },
  { id: 6, name: 'Mortgagee Only', value: 'mortgagee_only' },
  { id: 7, name: 'Usufructuary Only', value: 'usufructuary_only' },
  { id: 8, name: 'Owner Only', value: 'owner_only' },
  { id: 9, name: 'Dominant Owner Only', value: 'dominant_owner_only' },
  { id: 10, name: 'Servient Owner Only', value: 'servient_owner_only' },
  { id: 11, name: 'Share (50/50)', value: 'share_50_50' },
];

export const COST_SHARING_MAP = COST_SHARING_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const HOUSE_TITLE_OPTIONS = [
  { id: 1, name: 'Building Permit', value: 'building_permit' },
  { id: 2, name: 'Official House Sale and Purchase Agreement', value: 'official_house_sale_and_purchase_agreement' },
];

export const HOUSE_TITLE_MAP = HOUSE_TITLE_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const LAND_TITLE_OPTIONS = [
  { id: 1, name: 'Land Title Deed', value: 'land_title_deed' },
  { id: 2, name: 'Certificate of Utilization', value: 'certificate_of_utilization' },
];

export const LAND_TITLE_MAP = LAND_TITLE_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const DECLARED_LAND_OFFICE_PRICE_OPTIONS = [
  { id: 1, name: 'Actual Price', value: 'actual_price' },
  { id: 2, name: 'Lowest Possible Price', value: 'lowest_possible_price' },
  { id: 3, name: 'Mediocre Price', value: 'mediocre_price' },
];

export const DECLARED_LAND_OFFICE_PRICE_MAP = DECLARED_LAND_OFFICE_PRICE_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const YES_NO_OPTIONS = [
  { id: 1, name: 'Yes', value: 'yes' },
  { id: 2, name: 'No', value: 'no' },
];

export const YES_NO_MAP = YES_NO_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

// Specific cost sharing options for different types of fees
export const BUYER_SELLER_COST_OPTIONS = [
  { id: 1, name: 'Buyer Only', value: 'buyer_only' },
  { id: 2, name: 'Seller Only', value: 'seller_only' },
  { id: 3, name: 'Share (50/50)', value: 'share_50_50' },
];

export const BUYER_SELLER_COST_MAP = BUYER_SELLER_COST_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const LESSEE_LESSOR_COST_OPTIONS = [
  { id: 1, name: 'Lessee Only', value: 'lessee_only' },
  { id: 2, name: 'Lessor Only', value: 'lessor_only' },
  { id: 3, name: 'Share (50/50)', value: 'share_50_50' },
];

export const LESSEE_LESSOR_COST_MAP = LESSEE_LESSOR_COST_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const MORTGAGOR_MORTGAGEE_COST_OPTIONS = [
  { id: 1, name: 'Mortgagor Only', value: 'mortgagor_only' },
  { id: 2, name: 'Mortgagee Only', value: 'mortgagee_only' },
  { id: 3, name: 'Share (50/50)', value: 'share_50_50' },
];

export const MORTGAGOR_MORTGAGEE_COST_MAP = MORTGAGOR_MORTGAGEE_COST_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const USUFRUCTUARY_OWNER_COST_OPTIONS = [
  { id: 1, name: 'Usufructuary Only', value: 'usufructuary_only' },
  { id: 2, name: 'Owner Only', value: 'owner_only' },
  { id: 3, name: 'Share (50/50)', value: 'share_50_50' },
];

export const USUFRUCTUARY_OWNER_COST_MAP = USUFRUCTUARY_OWNER_COST_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

export const SERVITUDE_COST_OPTIONS = [
  { id: 1, name: 'Dominant Owner Only', value: 'dominant_owner_only' },
  { id: 2, name: 'Servient Owner Only', value: 'servient_owner_only' },
  { id: 3, name: 'Share (50/50)', value: 'share_50_50' },
];

export const SERVITUDE_COST_MAP = SERVITUDE_COST_OPTIONS.reduce((acc, item) => {
  acc[item.value] = item.name;
  return acc;
}, {});

// Breadcrumb related constants
export const BREADCRUMB_LABELS = {
  DASHBOARD: "Dashboard",
  CLIENTS: "Clients",
  CLIENT_DETAILS: "Client Details",
  EDIT_CLIENT: "Edit Client",
  PROFILE: "Profile",
  PERSONAL_INFORMATION: "Personal Information",
  PROPERTY_INFORMATION: "Property Information",
  VISA_INFORMATION: "Visa Information"
};

// Route patterns for breadcrumb matching
export const ROUTE_PATTERNS = {
  DASHBOARD: "/dashboard",
  CLIENTS: "/clients",
  CLIENT_DETAIL: "/clients/:id",
  CLIENT_EDIT: "/clients/edit/:id",
  PROFILE: "/profile"
};