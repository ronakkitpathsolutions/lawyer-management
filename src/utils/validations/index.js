import { z } from "zod";
import {
  ACCEPTABLE_PAYMENT_METHODS_TEXTS,
  COST_SHARING_TEXTS,
  DECLARED_LAND_OFFICE_PRICE_TEXTS,
  FURNITURE_INCLUDED_TEXTS,
  HOUSE_TITLE_TEXTS,
  LAND_TITLE_TEXTS,
  VALIDATION_MESSAGES as msg,
  PLACE_OF_PAYMENT_TEXTS,
  PROPERTY_CONDITION_TEXTS,
  PROPERTY_MESSAGES,
  TYPE_OF_PROPERTY_TEXTS,
  TYPE_OF_TRANSACTION_TEXTS,
  HANDOVER_DATE_TEXTS,
  INTENDED_CLOSING_DATE_TEXTS,
} from "../constants";
import { isValidPhoneNumber } from "react-phone-number-input";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, msg.required("email"))
    .email(msg.invalid("email"))
    .max(255, msg.maxLength("email", 255)),
  password: z.string().trim().min(1, msg.required("password")),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, msg.required("email"))
    .email(msg.invalid("email"))
    .max(255, msg.maxLength("email", 255)),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, msg.minLength("new password", 6))
      .max(50, msg.maxLength("new password", 50)),
    confirmPassword: z.string().trim().min(1, msg.required("confirm password")),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: msg.passwordsDoNotMatch,
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, msg.required("name"))
    .max(100, msg.maxLength("name", 100)),
  email: z
    .string()
    .trim()
    .min(1, msg.required("email"))
    .email(msg.invalid("email"))
    .max(255, msg.maxLength("email", 255)),
  phone_number: z
    .string()
    .trim()
    .min(1, msg.required("phone number"))
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export const clientPersonalInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, msg.required("name"))
    .max(100, msg.maxLength("name", 100)),
  family_name: z
    .string()
    .trim()
    .min(1, msg.required("family name"))
    .max(100, msg.maxLength("family name", 100)),
  email: z
    .string()
    .trim()
    .min(1, msg.required("email"))
    .email(msg.invalid("email"))
    .max(150, msg.maxLength("email", 150)),
  nationality: z
    .string()
    .trim()
    .min(1, msg.required("nationality"))
    .max(50, msg.maxLength("nationality", 50)),
  date_of_birth: z
    .string()
    .trim()
    .min(1, msg.required("date of birth"))
    .refine(
      (date) => {
        const now = new Date();
        const input = new Date(date);
        return input < now;
      },
      { message: "Date of birth must be in the past" }
    ),
  phone_number: z
    .string()
    .trim()
    .min(1, msg.minLength("phone number", 10))
    .refine(isValidPhoneNumber, { message: msg.invalid("phone number") }),
  current_address: z
    .string()
    .trim()
    .min(1, msg.required("current address"))
    .max(500, msg.maxLength("current address", 500)),
});

export const clientFullInformationSchema = clientPersonalInfoSchema.extend({
  id: z.string().or(z.number()).optional(),
  passport_number: z
    .string()
    .trim()
    .regex(/^[A-Z0-9]+$/, msg.invalid("passport number"))
    .min(6, msg.minLength("passport number", 6))
    .max(20, msg.maxLength("passport number", 20))
    .optional()
    .or(z.literal("")),

  age: z
    .number({ invalid_type_error: msg.invalid("age") })
    .min(18, "Age must be at least 18")
    .max(120, "Age must be at most 120")
    .optional(),

  address_in_thailand: z
    .string()
    .trim()
    .max(500, msg.maxLength("address in Thailand", 500))
    .optional(),

  whatsapp: z
    .string()
    .trim()
    .min(1, msg.minLength("phone number", 10))
    .refine(isValidPhoneNumber, { message: msg.invalid("phone number") })
    .optional()
    .or(z.literal("")),

  line: z
    .string()
    .trim()
    .min(3, msg.minLength("Line ID", 3))
    .max(50, msg.maxLength("Line ID", 50))
    .optional()
    .or(z.literal("")),

  marital_status: z
    .enum(["single", "married", "common_law", "divorced", "widowed"], {
      errorMap: () => ({ message: msg.invalid("marital status") }),
    })
    .optional()
    .or(z.literal("")),

  father_name: z
    .string()
    .trim()
    .min(2, msg.minLength("father name", 2))
    .max(100, msg.maxLength("father name", 100))
    .optional()
    .or(z.literal("")),

  mother_name: z
    .string()
    .trim()
    .min(2, msg.minLength("mother name", 2))
    .max(100, msg.maxLength("mother name", 100))
    .optional()
    .or(z.literal("")),

  married_to_thai_and_registered: z
    .boolean({ invalid_type_error: "Must be true or false" })
    .optional(),

  has_yellow_or_pink_card: z
    .boolean({ invalid_type_error: "Must be true or false" })
    .optional(),

  has_bought_property_in_thailand: z
    .boolean({ invalid_type_error: "Must be true or false" })
    .optional(),

  is_active: z
    .boolean({ invalid_type_error: "Must be true or false" })
    .default(true),
});

export const clientVisaSchema = z.object({
  existing_visa: z
    .string()
    .trim()
    .max(100, msg.maxLength("existing visa", 100))
    .optional()
    .or(z.literal("")),

  wished_visa: z
    .string()
    .trim()
    .min(1, msg.required("wished visa"))
    .max(100, msg.maxLength("wished visa", 100)),

  existing_visa_expiry: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (date) => {
        if (!date || date === "") return true;
        return !isNaN(Date.parse(date));
      },
      { message: msg.invalid("existing visa expiry date") }
    ),

  intended_departure_date: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (date) => {
        if (!date || date === "") return true;
        return !isNaN(Date.parse(date));
      },
      { message: msg.invalid("intended departure date") }
    ),

  latest_entry_date: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (date) => {
        if (!date || date === "") return true;
        return !isNaN(Date.parse(date));
      },
      { message: msg.invalid("latest entry date") }
    ),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, msg.required("current password")),
    newPassword: z
      .string()
      .trim()
      .min(6, msg.minLength("new password", 6))
      .max(50, msg.maxLength("new password", 50)),
    confirmPassword: z.string().trim().min(1, msg.required("confirm password")),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: msg.passwordsDoNotMatch,
    path: ["confirmPassword"],
  });

export const propertyValidationSchema = z
  .object({
    property_name: z
      .string()
      .min(1, PROPERTY_MESSAGES.PROPERTY_NAME?.REQUIRED)
      .min(2, PROPERTY_MESSAGES.PROPERTY_NAME?.TOO_SHORT)
      .max(100, PROPERTY_MESSAGES.PROPERTY_NAME?.TOO_LONG)
      .trim(),
    agent_name: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) => val === null || val === undefined || val.length >= 2,
        PROPERTY_MESSAGES.AGENT_NAME.TOO_SHORT
      )
      .refine(
        (val) => val === null || val === undefined || val.length <= 100,
        PROPERTY_MESSAGES.AGENT_NAME.TOO_LONG
      ),
    broker_company: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) => val === null || val === undefined || val.length >= 2,
        PROPERTY_MESSAGES.BROKER_COMPANY.TOO_SHORT
      )
      .refine(
        (val) => val === null || val === undefined || val.length <= 100,
        PROPERTY_MESSAGES.BROKER_COMPANY.TOO_LONG
      ),
    transaction_type: z
      .array(z.string())
      .optional()
      .nullable()
      .transform((val) => {
        if (!val || val.length === 0) return null;
        return val;
      })
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          val.every((item) => TYPE_OF_TRANSACTION_TEXTS.includes(item)),
        PROPERTY_MESSAGES.TRANSACTION_TYPE.INVALID
      ),
    property_type: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          TYPE_OF_PROPERTY_TEXTS.includes(val),
        PROPERTY_MESSAGES.PROPERTY_TYPE.INVALID
      ),
    reservation_date: z
      .string()
      .optional()
      .nullable()
      .transform((val) => {
        if (!val || val === "") return null;

        // Check if it's already in YYYY-MM-DD format
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          return val;
        }

        // Check if it's in DD-MM-YYYY format and convert
        if (/^\d{2}-\d{2}-\d{4}$/.test(val)) {
          const [day, month, year] = val.split("-");
          return `${year}-${month}-${day}`;
        }

        // Check if it's in DD/MM/YYYY format and convert
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          const [day, month, year] = val.split("/");
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }

        return val;
      })
      .refine(
        (val) => val === null || /^\d{4}-\d{2}-\d{2}$/.test(val),
        PROPERTY_MESSAGES.RESERVATION_DATE.INVALID
      ),
    intended_closing_date_specific: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => {
        if (!val || val === "") return null;

        // Check if it's already in YYYY-MM-DD format
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          return val;
        }

        // Check if it's in DD-MM-YYYY format and convert
        if (/^\d{2}-\d{2}-\d{4}$/.test(val)) {
          const [day, month, year] = val.split("-");
          return `${year}-${month}-${day}`;
        }

        // Check if it's in DD/MM/YYYY format and convert
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
          const [day, month, year] = val.split("/");
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }

        return val;
      })
      .refine(
        (val) => val === null || /^\d{4}-\d{2}-\d{2}$/.test(val),
        PROPERTY_MESSAGES.INTENDED_CLOSING_DATE.INVALID
      ),
    intended_closing_date: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          INTENDED_CLOSING_DATE_TEXTS.includes(val),
        PROPERTY_MESSAGES.INTENDED_CLOSING_DATE.INVALID
      ),
    handover_date: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          HANDOVER_DATE_TEXTS.includes(val),
        PROPERTY_MESSAGES.HANDOVER_DATE.INVALID
      ),
    warranty_term: z
      .string()
      .max(255, "Warranty term must not exceed 255 characters")
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val)),
    warranty_condition: z
      .string()
      .max(500, "Warranty condition must not exceed 500 characters")
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val)),
    selling_price: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string") {
          if (val === "" || val.trim() === "") return null;
          const parsed = parseFloat(val);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      })
      .pipe(
        z
          .number({
            invalid_type_error: PROPERTY_MESSAGES.SELLING_PRICE.INVALID,
          })
          .positive(PROPERTY_MESSAGES.SELLING_PRICE.MUST_BE_POSITIVE)
          .nullable()
      )
      .optional()
      .nullable(),
    deposit: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string") {
          if (val === "" || val.trim() === "") return null;
          const parsed = parseFloat(val);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      })
      .pipe(
        z
          .number({
            invalid_type_error: PROPERTY_MESSAGES.DEPOSIT.INVALID,
          })
          .positive(PROPERTY_MESSAGES.DEPOSIT.MUST_BE_POSITIVE)
          .nullable()
      )
      .optional()
      .nullable(),
    intermediary_payment: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string") {
          if (val === "" || val.trim() === "") return null;
          const parsed = parseFloat(val);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      })
      .pipe(
        z
          .number({
            invalid_type_error: PROPERTY_MESSAGES.INTERMEDIARY_PAYMENT.INVALID,
          })
          .positive(PROPERTY_MESSAGES.INTERMEDIARY_PAYMENT.MUST_BE_POSITIVE)
          .nullable()
      )
      .optional()
      .nullable(),
    closing_payment: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string") {
          if (val === "" || val.trim() === "") return null;
          const parsed = parseFloat(val);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      })
      .pipe(
        z
          .number({
            invalid_type_error: PROPERTY_MESSAGES.CLOSING_PAYMENT.INVALID,
          })
          .positive(PROPERTY_MESSAGES.CLOSING_PAYMENT.MUST_BE_POSITIVE)
          .nullable()
      )
      .optional()
      .nullable(),
    acceptable_method_of_payment: z
      .array(z.string())
      .optional()
      .nullable()
      .transform((val) => {
        if (!val || val.length === 0) return null;
        return val;
      })
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          val.every((item) => ACCEPTABLE_PAYMENT_METHODS_TEXTS.includes(item)),
        PROPERTY_MESSAGES.ACCEPTABLE_METHOD_OF_PAYMENT.INVALID
      ),
    place_of_payment: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          PLACE_OF_PAYMENT_TEXTS.includes(val),
        PROPERTY_MESSAGES.PLACE_OF_PAYMENT.INVALID
      ),
    property_condition: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          PROPERTY_CONDITION_TEXTS.includes(val),
        PROPERTY_MESSAGES.PROPERTY_CONDITION.INVALID
      ),
    house_warranty: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => {
        if (val === "" || val === null || val === undefined) return null;
        if (val === "yes" || val === true) return "yes";
        if (val === "no" || val === false) return "no";
        return val;
      }),
    furniture_included: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          FURNITURE_INCLUDED_TEXTS.includes(val),
        PROPERTY_MESSAGES.FURNITURE_INCLUDED.INVALID
      ),
    // Cost sharing fields
    transfer_fee: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.TRANSFER_FEE.INVALID
      ),
    withholding_tax: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.WITHHOLDING_TAX.INVALID
      ),
    business_tax: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.BUSINESS_TAX.INVALID
      ),
    lease_registration_fee: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.LEASE_REGISTRATION_FEE.INVALID
      ),
    mortgage_fee: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.MORTGAGE_FEE.INVALID
      ),
    usufruct_registration_fee: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.USUFRUCT_REGISTRATION_FEE.INVALID
      ),
    servitude_registration_fee: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || COST_SHARING_TEXTS.includes(val),
        PROPERTY_MESSAGES.SERVITUDE_REGISTRATION_FEE.INVALID
      ),
    declared_land_office_price: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null ||
          val === undefined ||
          DECLARED_LAND_OFFICE_PRICE_TEXTS.includes(val),
        PROPERTY_MESSAGES.DECLARED_LAND_OFFICE_PRICE.INVALID
      ),
    // Documentation attachment fields
    land_title: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || LAND_TITLE_TEXTS.includes(val),
        PROPERTY_MESSAGES.LAND_TITLE.INVALID
      ),
    house_title: z
      .string()
      .trim()
      .optional()
      .nullable()
      .transform((val) => (val === "" ? null : val))
      .refine(
        (val) =>
          val === null || val === undefined || HOUSE_TITLE_TEXTS.includes(val),
        PROPERTY_MESSAGES.HOUSE_TITLE.INVALID
      ),

    // File upload fields
    land_title_document: z
      .any()
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true; // Allow empty/null files
        if (typeof file === "string") return true; // Allow existing file URLs
        return file instanceof File; // Must be a File object if present
      }, "Land title document must be a valid file"),
    house_title_document: z
      .any()
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true; // Allow empty/null files
        if (typeof file === "string") return true; // Allow existing file URLs
        return file instanceof File; // Must be a File object if present
      }, "House title document must be a valid file"),
    house_registration_book: z
      .any()
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true; // Allow empty/null files
        if (typeof file === "string") return true; // Allow existing file URLs
        return file instanceof File; // Must be a File object if present
      }, "House registration book must be a valid file"),
    land_lease_agreement: z
      .any()
      .optional()
      .nullable()
      .refine((file) => {
        if (!file) return true; // Allow empty/null files
        if (typeof file === "string") return true; // Allow existing file URLs
        return file instanceof File; // Must be a File object if present
      }, "Land lease agreement must be a valid file"),
  })
  .refine(
    (data) => {
      // If house warranty is "yes", warranty_term and warranty_condition are required
      if (data.house_warranty === "yes") {
        return data.warranty_term && data.warranty_term.trim() !== "";
      }
      return true;
    },
    {
      message: "Warranty term is required",
      path: ["warranty_term"],
    }
  )
  .refine(
    (data) => {
      // If house warranty is "yes", warranty_condition is required
      if (data.house_warranty === "yes") {
        return data.warranty_condition && data.warranty_condition.trim() !== "";
      }
      return true;
    },
    {
      message: "Warranty condition is required",
      path: ["warranty_condition"],
    }
  )
  .refine(
    (data) => {
      // If land title is selected, land title document is required
      if (data.land_title && data.land_title.trim() !== "") {
        return (
          data.land_title_document !== null &&
          data.land_title_document !== undefined
        );
      }
      return true;
    },
    {
      message: PROPERTY_MESSAGES.LAND_TITLE_DOCUMENT.REQUIRED,
      path: ["land_title_document"],
    }
  )
  .refine(
    (data) => {
      // If land title document is uploaded, land title is required
      if (data.land_title_document && data.land_title_document !== null) {
        return data.land_title && data.land_title.trim() !== "";
      }
      return true;
    },
    {
      message: PROPERTY_MESSAGES.LAND_TITLE.REQUIRED,
      path: ["land_title"],
    }
  )
  .refine(
    (data) => {
      // If house title is selected, house title document is required
      if (data.house_title && data.house_title.trim() !== "") {
        return (
          data.house_title_document !== null &&
          data.house_title_document !== undefined
        );
      }
      return true;
    },
    {
      message: PROPERTY_MESSAGES.HOUSE_TITLE_DOCUMENT.REQUIRED,
      path: ["house_title_document"],
    }
  )
  .refine(
    (data) => {
      // If house title document is uploaded, house title is required
      if (data.house_title_document && data.house_title_document !== null) {
        return data.house_title && data.house_title.trim() !== "";
      }
      return true;
    },
    {
      message: PROPERTY_MESSAGES.HOUSE_TITLE.REQUIRED,
      path: ["house_title"],
    }
  )
  .refine(
    (data) => {
      // If intended closing date is selected, intended closing date specific is required
      if (data.intended_closing_date && data.intended_closing_date.trim() !== "") {
        return data.intended_closing_date_specific && data.intended_closing_date_specific.trim() !== "";
      }
      return true;
    },
    {
      message: PROPERTY_MESSAGES.INTENDED_CLOSING_DATE_SPECIFIC.REQUIRED,
      path: ["intended_closing_date_specific"],
    }
  );
