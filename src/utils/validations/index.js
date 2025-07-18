import { z } from "zod";
import { VALIDATION_MESSAGES as msg } from "../constants";

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

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(6, msg.minLength("new password", 6))
    .max(50, msg.maxLength("new password", 50)),
  confirmPassword: z
    .string()
    .trim()
    .min(1, msg.required("confirm password")),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: msg.passwordsDoNotMatch,
  path: ["confirmPassword"],
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
      date => {
        const now = new Date();
        const input = new Date(date);
        return input < now;
      },
      { message: "Date of birth must be in the past" }
    ),
  phone_number: z
    .string()
    .trim()
    .min(10, msg.minLength("phone number", 10))
    .max(15, msg.maxLength("phone number", 15))
    .regex(/^[+]?[1-9][\d]{0,15}$/, msg.invalid("phone number")),
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
    .min(10, msg.minLength("WhatsApp number", 10))
    .max(15, msg.maxLength("WhatsApp number", 15))
    .regex(/^[+]?[1-9][\d]{0,15}$/, msg.invalid("WhatsApp number"))
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
      errorMap: () => ({ message: msg.invalid("marital status") })
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