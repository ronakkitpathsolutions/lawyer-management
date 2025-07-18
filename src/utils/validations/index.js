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