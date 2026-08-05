import { z } from "zod";

/**
 * Contact form schema.
 *
 * The field names and optionality here mirror ContactFormData in
 * services/contactService.ts exactly, so the POST body sent to
 * /api/contact/submit is byte-identical to what the backend already accepts.
 * Validation is additive — it rejects bad input earlier, it does not change
 * the contract.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address, e.g. name@company.com."),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be 20 characters or fewer.")
    // Digits, spaces and the usual separators. Permissive by design: overly
    // strict phone validation rejects legitimate international formats.
    .regex(/^[\d\s()+-]*$/, "Phone number can only contain digits, spaces and + ( ) -")
    .optional()
    .or(z.literal("")),

  company: z.string().trim().max(120, "Company name must be 120 characters or fewer.").optional(),

  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject (at least 3 characters).")
    .max(150, "Subject must be 150 characters or fewer."),

  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more — at least 10 characters.")
    .max(4000, "Message must be 4000 characters or fewer."),

  /**
   * Honeypot. Hidden from real users via CSS and aria-hidden; automated form
   * fillers populate every field they find, so a non-empty value here is a
   * strong bot signal. Submissions are dropped client-side rather than sent.
   */
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
