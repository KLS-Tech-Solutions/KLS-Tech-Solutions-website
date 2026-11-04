/**
 * schema.org structured-data builders.
 *
 * Every claim emitted here is sourced from src/config/site.ts or the page
 * content itself. Nothing is fabricated: there are no review counts, no
 * aggregate ratings, no employee numbers and no founding dates, because we
 * do not have verified values for them. Marking up unverifiable claims is
 * both a trust problem and a Google structured-data violation.
 */

import {
  ACADEMY_URL,
  assets,
  company,
  contactInfo,
  contactLinks,
  corePillars,
  SITE_URL,
} from "@/config/site";

type Schema = Record<string, unknown>;

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Stable @id for the organisation, referenced by every other node. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absolute(assets.logo),
    caption: `${company.name} logo`,
  },
  image: absolute(assets.ogImage),
  description: company.description,
  slogan: company.tagline,
  email: contactInfo.email,
  telephone: contactInfo.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: contactInfo.addressLocality,
    addressRegion: contactInfo.addressRegion,
    addressCountry: contactInfo.addressCountry,
  },
  sameAs: [contactLinks.instagram, ACADEMY_URL],
  knowsAbout: [
    "Internet of Things",
    "Embedded systems engineering",
    "Firmware development",
    "Machine learning",
    "Industrial automation",
    "Home automation",
    "IoT security architecture",
    "Enterprise SaaS development",
    "Multi-tenant SaaS architecture",
    "AI solutions",
    "Generative AI",
    "Agentic AI",
    "FastAPI development",
    "Next.js development",
    "Remote internship programs",
    "Full stack Python",
    "Cyber security",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: contactInfo.email,
    telephone: contactInfo.phone,
    areaServed: "IN",
    availableLanguage: ["en"],
  },
});

/**
 * LocalBusiness markup, as a ProfessionalService.
 *
 * Organization alone tells Google what the company is; it does not say the
 * company serves a place. This node is what surfaces KLS for searches like
 * "IoT development company Bengaluru" and in local packs.
 *
 * Deliberately omitted: openingHours, geo coordinates, priceRange and
 * aggregateRating. We have no verified values for any of them, and Google
 * treats invented local data as a trust signal in the wrong direction.
 */
export const localBusinessSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: company.name,
  description: company.description,
  url: SITE_URL,
  image: absolute(assets.ogImage),
  logo: absolute(assets.logo),
  email: contactInfo.email,
  telephone: contactInfo.phone,
  parentOrganization: { "@id": ORG_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: contactInfo.addressLocality,
    addressRegion: contactInfo.addressRegion,
    addressCountry: contactInfo.addressCountry,
  },
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "State", name: "Karnataka" },
    { "@type": "Country", name: "India" },
  ],
  knowsLanguage: ["en"],
  sameAs: [contactLinks.instagram],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering services",
    itemListElement: corePillars.map((pillar) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: pillar.title,
        description: pillar.description,
      },
    })),
  },
});

export const websiteSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: company.name,
  description: company.shortDescription,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
});

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/** Home is prepended automatically; pass only the trail beneath it. */
export const breadcrumbSchema = (trail: BreadcrumbEntry[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: absolute(entry.path),
  })),
});

export interface ServiceSchemaInput {
  name: string;
  description: string;
  /** Individual offerings listed under this service. */
  offerings?: string[];
}

export const serviceSchema = ({ name, description, offerings }: ServiceSchemaInput): Schema => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "India" },
  serviceType: name,
  ...(offerings?.length
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${name} capabilities`,
          itemListElement: offerings.map((offering) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: offering },
          })),
        },
      }
    : {}),
});

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string;
  category: string;
}

/**
 * Product markup for the Smart Water Monitor.
 *
 * availability is PreOrder because the product is genuinely in R&D. We
 * deliberately omit price and review markup — inventing either would be
 * dishonest and would risk a manual action.
 */
export const productSchema = ({
  name,
  description,
  image,
  category,
}: ProductSchemaInput): Schema => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name,
  description,
  image: absolute(image),
  category,
  brand: { "@type": "Brand", name: company.name },
  manufacturer: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    seller: { "@id": ORG_ID },
    url: absolute("/contact"),
  },
});

export interface SoftwareApplicationSchemaInput {
  name: string;
  description: string;
  url: string;
  category: string;
  /** SPDX or OSI licence URL. */
  licence?: string;
}

/**
 * SoftwareApplication markup for KLS Academy.
 *
 * The zero-price offer is the single most valuable claim here — "free
 * internship with certificate" is a high-intent query, and price: 0 with a
 * currency is what lets Google state it. It is a verifiable fact: the Academy
 * charges nothing at any stage.
 *
 * No aggregateRating, no review count, no download numbers — none are
 * published, so none are marked up.
 */
export const softwareApplicationSchema = ({
  name,
  description,
  url,
  category,
  licence,
}: SoftwareApplicationSchemaInput): Schema => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url,
  applicationCategory: category,
  operatingSystem: "Web browser",
  publisher: { "@id": ORG_ID },
  ...(licence ? { license: licence, isAccessibleForFree: true } : {}),
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url,
  },
});

export interface EducationalProgramSchemaInput {
  name: string;
  description: string;
  url: string;
  /** Programme length in weeks. */
  weeks: number;
}

/**
 * EducationalOccupationalProgram markup, one node per internship stream.
 *
 * This is the correct type for an internship — more specific than Course, and
 * it lets the duration, the remote delivery mode and the zero fee all be
 * stated explicitly rather than inferred from prose.
 */
export const educationalProgramSchema = ({
  name,
  description,
  url,
  weeks,
}: EducationalProgramSchemaInput): Schema => ({
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name,
  description,
  url,
  programType: "Internship",
  educationalProgramMode: "online",
  timeToComplete: `P${weeks}W`,
  provider: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    category: "Free",
  },
});

export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqSchema = (entries: FaqEntry[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entries.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

export const contactPageSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absolute("/contact"),
  name: `Contact ${company.name}`,
  description: `Contact ${company.name} about IoT, automation and embedded systems projects.`,
  about: { "@id": ORG_ID },
  mainEntity: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.name,
    email: contactInfo.email,
    telephone: contactInfo.phone,
  },
});

export const aboutPageSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: absolute("/about"),
  name: `About ${company.name}`,
  description: company.description,
  mainEntity: { "@id": ORG_ID },
});
