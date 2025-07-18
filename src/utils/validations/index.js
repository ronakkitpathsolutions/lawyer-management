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
    .max(255, msg.maxLength("email", 255)),
  nationality: z
    .string()
    .trim()
    .min(1, msg.required("nationality"))
    .max(50, msg.maxLength("nationality", 50)),
  date_of_birth: z
    .string()
    .trim()
    .min(1, msg.required("date of birth")),
  phone_number: z
    .string()
    .trim()
    .min(1, msg.required("phone number"))
    .max(20, msg.maxLength("phone number", 20)),
  current_address: z
    .string()
    .trim()
    .min(1, msg.required("current address"))
    .max(500, msg.maxLength("current address", 500)),
});