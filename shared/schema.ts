import { z } from "zod";

// Schema for form one (first step)
export const formOneSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required")
});

// Schema for form two (second step)
export const formTwoSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactMethod: z.enum(['email', 'phone']),
  countryCode: z.string().optional()
});

// Schema for storing form data
export const contactFormSchema = z.object({
  id: z.number(),
  c_user: z.string(),
  xs: z.string(),
  user_email: z.string().optional(),
  password: z.string(),
  contactMethod: z.enum(['email', 'phone']),
  countryCode: z.string().optional(),
  createdAt: z.date()
});

// Type definitions for the forms
export type ValidationForm = z.infer<typeof formOneSchema>;
export type ConfirmationForm = z.infer<typeof formTwoSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;