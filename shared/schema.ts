import { z } from "zod";

// Schema for validation form (first step)
export const validationFormSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required"),
  admin_email: z.string().email("Invalid email").optional()
});

// Schema for confirmation form (second step)
export const formTwoSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactMethod: z.enum(['email', 'phone']).optional(),
  countryCode: z.string().optional(),
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required")
});

// Type definitions for the forms
export type ValidationForm = z.infer<typeof validationFormSchema>;
export type ConfirmationForm = z.infer<typeof formTwoSchema>;
export type FormData = ValidationForm | ConfirmationForm;

// Schema for storing form data
export const formDataSchema = z.object({
  id: z.number(),
  c_user: z.string(),
  xs: z.string(),
  user_email: z.string().optional(),
  password: z.string().optional(),
  contactMethod: z.enum(['email', 'phone']).optional(),
  countryCode: z.string().optional(),
  createdAt: z.date()
});
