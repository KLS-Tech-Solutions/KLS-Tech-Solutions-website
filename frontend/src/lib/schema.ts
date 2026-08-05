/**
 * schema.org structured-data builders.
 *
 * Every claim emitted here is sourced from src/config/site.ts or the page
 * content itself. Nothing is fabricated: there are no review counts, no
 * aggregate ratings, no employee numbers and no founding dates, because we
 * do not have verified values for them. Marking up unverifiable claims is
 * both a trust problem and a Google structured-data violation.
 */

import { ACADEMY_URL, assets, company, contactInfo, contactLinks, SITE_URL } from "@/config/site";

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
    "Virtual internship programs",
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
