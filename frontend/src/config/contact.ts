/**
 * Centralized contact information for KLS Tech Solutions
 * This is the single source of truth for all contact details across the application.
 */

export const contactInfo = {
  phone: "+91 99861 87448",
  email: "klstechsolutions2025@gmail.com",
  instagram: "klstechsolutions",
  location: "Bengaluru, KA, Bharat",
} as const;

/**
 * Helper functions for contact links
 */
export const contactLinks = {
  phone: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
  email: `mailto:${contactInfo.email}`,
  instagram: `https://instagram.com/${contactInfo.instagram}`,
} as const;
