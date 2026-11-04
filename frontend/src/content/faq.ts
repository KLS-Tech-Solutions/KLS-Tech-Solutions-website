/**
 * The company-wide FAQ, assembled for the /faq page.
 *
 * Nothing is written here. Every question is re-exported from the content
 * file that already owns it, so editing an answer on its own page updates
 * the FAQ page too and the two can never disagree.
 *
 * Grouping is by what a visitor is trying to find out, not by which page the
 * answer happens to live on.
 */

import { Building2, Cpu, GraduationCap, Wrench, type LucideIcon } from "lucide-react";

import { aboutFaqs } from "@/content/about";
import { homeFaqs } from "@/content/home";
import { academyFaqs, productFaqs } from "@/content/products";
import { servicesFaqs } from "@/content/services";

export interface FaqGroup {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  items: readonly { question: string; answer: string }[];
}

export const faqGroups: readonly FaqGroup[] = [
  {
    id: "company",
    icon: Building2,
    title: "About the company",
    description: "Who KLS Tech Solutions is, where we are, and how we work.",
    items: [...homeFaqs, ...aboutFaqs],
  },
  {
    id: "services",
    icon: Wrench,
    title: "Services & engagements",
    description: "What we build, how projects run, and how security is handled.",
    items: servicesFaqs,
  },
  {
    id: "academy",
    icon: GraduationCap,
    title: "KLS Academy",
    description: "Free learning, remote internships, reviews and certificates.",
    items: academyFaqs,
  },
  {
    id: "products",
    icon: Cpu,
    title: "Smart Water Monitor",
    description: "What the product does and where it currently stands.",
    items: productFaqs,
  },
] as const;

/** Flat list, used for the single FAQPage structured-data node. */
export const allFaqs = faqGroups.flatMap((group) => group.items);
