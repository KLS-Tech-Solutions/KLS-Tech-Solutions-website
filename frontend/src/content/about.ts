/**
 * About page content.
 *
 * Mission, vision, values and team narrative are reproduced from the previous
 * About page. The "team" section deliberately makes no claim about headcount,
 * founding year or named individuals beyond what the site already stated.
 */

import { CheckCircle2, Compass, ShieldCheck, type LucideIcon } from "lucide-react";

export const mission = {
  title: "Our Mission",
  body: "To engineer intelligent systems that make everyday infrastructure smarter, more efficient, and more secure. We believe technology should work reliably in the background, solving problems without adding complexity.",
} as const;

export const vision = {
  title: "Our Vision",
  body: "A world where IoT systems are secure by default, intelligent by design, and accessible to everyone. We're building the foundation for the next generation of connected infrastructure.",
} as const;

export interface Value {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: readonly Value[] = [
  {
    id: "technical-excellence",
    icon: Compass,
    title: "Technical Excellence",
    description:
      "We don't cut corners. Every system we build is designed for reliability, maintainability, and long-term performance.",
  },
  {
    id: "security-first",
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Security isn't a feature — it's a foundation. We build secure systems from the ground up, not as an afterthought.",
  },
  {
    id: "honest-engineering",
    icon: CheckCircle2,
    title: "Honest Engineering",
    description:
      "We're transparent about what's possible and what isn't. No overpromising, no marketing fluff — just honest assessments.",
  },
] as const;

export const teamNarrative = [
  "We're a small, focused team of engineers with deep experience in embedded systems, cloud architecture, and machine learning. We've built systems for industries ranging from consumer electronics to industrial automation.",
  "Our backgrounds span hardware design, firmware development, backend engineering, and security research. This cross-functional expertise allows us to tackle complex problems that span the entire stack.",
] as const;

/**
 * Qualitative facts about the company. These are descriptive labels, not
 * metrics — there are no fabricated numbers here.
 */
export const teamFacts = [
  { label: "Team", value: "Small", detail: "Focused team" },
  { label: "Stage", value: "R&D", detail: "Active development" },
  { label: "Base", value: "Bengaluru", detail: "Karnataka, India" },
  { label: "Approach", value: "Full-stack", detail: "Hardware to cloud" },
] as const;

export const aboutFaqs = [
  {
    question: "Who are KLS Tech Solutions?",
    answer:
      "KLS Tech Solutions is an engineering-first technology company in Bengaluru, India, focused on building intelligent systems that solve real problems. The team is small and cross-functional, with backgrounds spanning hardware design, firmware development, backend engineering and security research.",
  },
  {
    question: "What is the company's mission?",
    answer:
      "To engineer intelligent systems that make everyday infrastructure smarter, more efficient, and more secure. The underlying belief is that technology should work reliably in the background, solving problems without adding complexity for the people who depend on it.",
  },
  {
    question: "What does 'engineering-first' mean in practice?",
    answer:
      "It means the company is run by engineers solving technical problems rather than by marketing built around technology. Practically, it shows up as three commitments: not cutting corners on reliability and maintainability, treating security as a foundation rather than a feature, and being transparent about what is and isn't possible instead of overpromising.",
  },
  {
    question: "What experience does the team have?",
    answer:
      "The team has deep experience in embedded systems, cloud architecture and machine learning, and has built systems for industries ranging from consumer electronics to industrial automation. Individual backgrounds cover hardware design, firmware development, backend engineering and security research, which allows the team to work on problems that span the entire stack rather than a single layer.",
  },
] as const;
