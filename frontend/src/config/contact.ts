/**
 * Contact details have moved into the consolidated site config.
 *
 * This module is kept as a re-export so any existing import of
 * "@/config/contact" continues to resolve. Prefer "@/config/site" in new code.
 */

export { contactInfo, contactLinks } from "./site";
