/**
 * Per-route search metadata.
 *
 * Titles are written to lead with the search intent and close with the brand.
 * Descriptions stay inside the ~155 character window Google renders, and each
 * one states what the page contains rather than repeating the tagline.
 */

import { company } from "./site";

export interface PageMeta {
  /** Rendered as "<title> | KLS Tech Solutions" unless titleOverride is set. */
  title: string;
  description: string;
  /** Path only, no origin — the Seo component resolves the canonical URL. */
  path: string;
  keywords?: string[];
  /** Use the full string verbatim as <title>, skipping the brand suffix. */
  titleOverride?: string;
  /** Exclude from search indexes (used for 404). */
  noIndex?: boolean;
}

export const TITLE_SUFFIX = company.name;

export const pageMeta = {
  home: {
    titleOverride: `${company.name} | IoT Product Engineering, AI & Secure Systems`,
    title: "IoT Product Engineering, AI & Secure Systems",
    description:
      "KLS Tech Solutions engineers intelligent IoT systems in Bengaluru — custom hardware and firmware, AI-driven automation, and security built in from day one.",
    path: "/",
    keywords: [
      "IoT product engineering",
      "IoT development company Bengaluru",
      "AI automation",
      "embedded firmware development",
      "secure IoT architecture",
      "smart water monitoring",
    ],
  },
  solutions: {
    title: "IoT & Automation Services for Industry, Home and Commercial",
    description:
      "Custom IoT engineering services: hardware design, firmware development, cloud infrastructure and security architecture for industrial, residential and commercial systems.",
    path: "/solutions",
    keywords: [
      "custom IoT solutions",
      "industrial automation services",
      "home automation engineering",
      "building management IoT",
      "PCB and firmware development",
      "IoT cloud infrastructure",
    ],
  },
  products: {
    title: "Smart Water Monitor — Intelligent Water Management IoT",
    description:
      "The KLS Smart Water Monitor delivers real-time consumption analytics, AI-powered leak detection and automated valve control. Currently in research and development.",
    path: "/products",
    keywords: [
      "smart water monitor",
      "IoT water management",
      "AI leak detection",
      "automated valve control",
      "water consumption analytics",
    ],
  },
  about: {
    title: "About Us — Engineering-First IoT Company in Bengaluru",
    description:
      "KLS Tech Solutions is an engineering-first team building secure, intelligent IoT systems. Learn our mission, vision, principles and how we approach technical work.",
    path: "/about",
    keywords: [
      "about KLS Tech Solutions",
      "IoT engineering team Bengaluru",
      "engineering-first technology company",
    ],
  },
  contact: {
    title: "Contact Us — Discuss Your IoT or Automation Project",
    description:
      "Get in touch with KLS Tech Solutions about an IoT, automation or embedded systems project. Based in Bengaluru; we typically reply within 1-2 business days.",
    path: "/contact",
    keywords: ["contact KLS Tech Solutions", "IoT consultation Bengaluru", "IoT project enquiry"],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How KLS Tech Solutions collects, uses, stores and protects the personal information you submit through this website.",
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service",
    description:
      "The terms and conditions governing your use of the KLS Tech Solutions website and the information published on it.",
    path: "/terms",
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist or has been moved.",
    path: "/404",
    noIndex: true,
  },
} satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof pageMeta;
