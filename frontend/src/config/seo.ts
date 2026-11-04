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
    titleOverride: `${company.name} | IoT Engineering, Enterprise SaaS, AI Solutions & KLS Academy`,
    title: "IoT Engineering, Enterprise SaaS, AI Solutions & KLS Academy",
    description:
      "KLS Tech Solutions builds IoT products, enterprise SaaS platforms and AI solutions in Bengaluru — plus verified remote internships through KLS Academy.",
    path: "/",
    keywords: [
      "IoT product engineering",
      "IoT development company Bengaluru",
      "Enterprise SaaS Development",
      "AI Solutions",
      "FastAPI Development",
      "Next.js Development",
      "IoT Solutions",
      "AI automation",
      "embedded firmware development",
      "secure IoT architecture",
      "smart water monitoring",
      "Remote Internship",
      "KLS Academy",
      "Full Stack Python Internship",
      "Cyber Security Internship",
      "Generative AI Internship",
      "Agentic AI Internship",
    ],
  },
  solutions: {
    title: "IoT, Enterprise SaaS & AI Engineering Services",
    description:
      "Custom engineering services: IoT hardware and firmware, enterprise SaaS platforms, AI solutions, cloud infrastructure and security architecture — built end to end.",
    path: "/solutions",
    keywords: [
      "custom IoT solutions",
      "IoT Solutions",
      "Enterprise SaaS Development",
      "AI Solutions",
      "FastAPI Development",
      "Next.js Development",
      "multi-tenant SaaS architecture",
      "AI business automation",
      "industrial automation services",
      "home automation engineering",
      "building management IoT",
      "PCB and firmware development",
      "IoT cloud infrastructure",
    ],
  },
  products: {
    title: "Our Products — KLS Academy & the Smart Water Monitor",
    description:
      "KLS Academy is a free, open-source platform for remote internships with engineer-reviewed projects and QR-verified certificates. The Smart Water Monitor is our IoT water management system, in R&D.",
    path: "/products",
    keywords: [
      "KLS Academy",
      "free remote internship with certificate",
      "open source internship platform",
      "engineer reviewed internship projects",
      "QR verified certificate",
      "smart water monitor",
      "IoT water management",
      "AI leak detection",
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
  faq: {
    title: "FAQ — Questions About KLS Tech Solutions & KLS Academy",
    description:
      "Answers about KLS Tech Solutions: our IoT, SaaS and AI engineering services, how projects run, the Smart Water Monitor, and KLS Academy's free remote internships and verified certificates.",
    path: "/faq",
    keywords: [
      "KLS Tech Solutions FAQ",
      "KLS Academy questions",
      "free remote internship FAQ",
      "IoT engineering questions",
      "verified certificate how it works",
    ],
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
