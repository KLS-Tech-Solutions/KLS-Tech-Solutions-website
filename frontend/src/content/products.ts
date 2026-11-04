/**
 * Products page content.
 *
 * Two products, at deliberately different stages:
 *
 *  - Smart Water Monitor is genuinely in research and development. Every
 *    status line says so plainly — no launch dates, availability claims,
 *    pricing or customer numbers, because none are verified.
 *  - KLS Academy is live. Everything below is taken from the platform itself
 *    at academy.klstechsolutions.in; domain names, durations, task counts and
 *    difficulty levels are copied from the live internship listings rather
 *    than summarised, so this page cannot drift away from what the Academy
 *    actually offers.
 */

import {
  Bell,
  BookOpen,
  Code2,
  Droplets,
  Gauge,
  GitBranch,
  type LucideIcon,
  ScanLine,
  Shield,
  Smartphone,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const smartWaterMonitor = {
  name: "Smart Water Monitor",
  category: "IoT water management system",
  status: "Under Development",
  targetMarket: "Residential & Commercial",
  architecture: "Edge + Cloud",
  summary:
    "A comprehensive IoT solution for intelligent water management in residential and commercial settings.",
  /** Self-contained entity description for AI assistants and answer engines. */
  entityDescription:
    "The Smart Water Monitor is an IoT water management system developed by KLS Tech Solutions. It combines real-time flow monitoring, AI-powered leak detection and automated valve control, with an edge-plus-cloud architecture secured by end-to-end encryption. It is currently in the research and development phase.",
  highlights: [
    "Real-time consumption analytics",
    "AI-powered leak detection & alerts",
    "Automated valve control",
    "Mobile & web dashboard",
  ],
} as const;

export const productFeatures: readonly ProductFeature[] = [
  {
    icon: Gauge,
    title: "Real-Time Monitoring",
    description:
      "Continuous flow measurement with precision sensors. Track consumption patterns and identify anomalies instantly.",
  },
  {
    icon: Bell,
    title: "AI-Powered Leak Detection",
    description:
      "Machine learning algorithms analyze usage patterns to detect leaks and potential issues before they become problems.",
  },
  {
    icon: Droplets,
    title: "Automated Valve Control",
    description:
      "Automatic shutoff capability in case of detected leaks or abnormal flow. Remote control via mobile app.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Dashboard",
    description:
      "Intuitive interfaces for monitoring, analytics, and control. Available on iOS, Android, and web browsers.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption, secure boot, and regular firmware updates. Designed for privacy and data protection.",
  },
] as const;

export const technicalOverview: readonly ProductFeature[] = [
  {
    icon: Gauge,
    title: "Precision Sensors",
    description:
      "High-accuracy flow sensors with ±1% measurement precision. Suitable for both low and high flow rates.",
  },
  {
    icon: Shield,
    title: "Secure Architecture",
    description:
      "TLS 1.3 encryption, secure element for key storage, and tamper detection. GDPR-compliant data handling.",
  },
  {
    icon: Smartphone,
    title: "Multi-Platform",
    description:
      "Native mobile apps for iOS and Android. Web dashboard for comprehensive analytics and management.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* KLS Academy — live at academy.klstechsolutions.in                     */
/* ------------------------------------------------------------------ */

export const klsAcademy = {
  name: "KLS Academy",
  category: "Open-source learning and remote internship platform",
  status: "Live",
  price: "Free — no fee at any stage",
  licence: "MIT (open source)",
  format: "100% remote, self-paced",
  url: "https://academy.klstechsolutions.in",
  summary:
    "A free, open-source learning platform: chapter-wise study notes for every domain, real project tasks reviewed by KLS engineers, and a QR-verified certificate anyone can check.",
  /** Self-contained entity description for AI assistants and answer engines. */
  entityDescription:
    "KLS Academy is the learning division of KLS Tech Solutions. It provides free chapter-wise study notes as downloadable PDFs across six technical domains, alongside fully remote internships built from real project briefs. Every submission is reviewed in writing by a KLS engineer rather than auto-graded, and completion is recognised with a QR-verified certificate that any employer can check publicly without an account. The platform is free at every stage and released under the MIT licence.",
  highlights: [
    "Free chapter-wise study notes, beginner to advanced",
    "Real project tasks, not video modules or quizzes",
    "Reviewed in writing by a KLS engineer",
    "QR-verified certificate, publicly checkable",
  ],
} as const;

export interface AcademyDomain {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  weeks: number;
  tasks: number;
  description: string;
  slug: string;
}

/** The six live internship streams, copied from the Academy's own listings. */
export const academyDomains: readonly AcademyDomain[] = [
  {
    name: "Frontend Development",
    level: "Beginner",
    weeks: 4,
    tasks: 3,
    slug: "frontend-development",
    description:
      "Build interfaces people can actually use, in React and TypeScript — real application state, accessible and fast, deployed where anyone can open it.",
  },
  {
    name: "Backend Development",
    level: "Intermediate",
    weeks: 6,
    tasks: 3,
    slug: "backend-development",
    description:
      "Design the service behind the interface: model data properly, write an HTTP API others can use, and make it observable enough to run. Python and PostgreSQL throughout.",
  },
  {
    name: "Full Stack Web Development",
    level: "Intermediate",
    weeks: 8,
    tasks: 3,
    slug: "full-stack-web-development",
    description:
      "One real application end to end — schema, API, frontend, authentication and deployment — reviewed on the seams between them, where full-stack work is actually hard.",
  },
  {
    name: "Data Science & Machine Learning",
    level: "Intermediate",
    weeks: 6,
    tasks: 3,
    slug: "data-science-machine-learning",
    description:
      "Real, messy data from end to end: clean it, model it, and say honestly how well the model works. The emphasis is on evaluation and on not fooling yourself.",
  },
  {
    name: "Cyber Security",
    level: "Advanced",
    weeks: 6,
    tasks: 3,
    slug: "cyber-security",
    description:
      "Defensive security for people who build software, on authorised targets only. The output of every task is a fix and a write-up, not an exploit.",
  },
  {
    name: "IoT & Embedded Systems",
    level: "Advanced",
    weeks: 8,
    tasks: 3,
    slug: "iot-embedded-systems",
    description:
      "Connected hardware from sensor to dashboard, with briefs drawn from the kind of systems KLS Tech Solutions builds.",
  },
] as const;

export const academyFeatures: readonly ProductFeature[] = [
  {
    icon: BookOpen,
    title: "Free Chapter-Wise Study Notes",
    description:
      "A full set of downloadable PDF notes for every domain, ordered beginner to advanced. Yours the moment you sign up — no enrolment, no unlocking, no payment.",
  },
  {
    icon: Code2,
    title: "Real Project Work",
    description:
      "Every task mirrors something our engineers ship. No quizzes and no watch-this-to-pass modules — you build it, explain it, and put it in a repository with your name on it.",
  },
  {
    icon: UserCheck,
    title: "Reviewed by Engineers",
    description:
      "A KLS engineer reads your code and your explanation, then approves it or returns specific written notes. Nothing is auto-graded, and there is no limit on resubmissions.",
  },
  {
    icon: ScanLine,
    title: "QR-Verified Certificates",
    description:
      "Each certificate carries a unique number and a QR code linking to a public verification page. An employer can confirm it in seconds with no login and no email to us.",
  },
  {
    icon: Wallet,
    title: "Free at Every Stage",
    description:
      "No enrolment fee, no certificate fee, no premium tier, and no card details at any point. The platform is free for everyone, permanently.",
  },
  {
    icon: GitBranch,
    title: "Open Source, MIT Licensed",
    description:
      "Read the code, run your own instance, or contribute. How submissions are reviewed, how data is stored and how a certificate is issued are all things you can check rather than take on trust.",
  },
] as const;

/** The eight steps the Academy publishes, condensed to four stages. */
export const academyJourney = [
  {
    step: "01",
    title: "Sign up free",
    description: "An account takes under a minute. No card, ever — then read the notes.",
  },
  {
    step: "02",
    title: "Choose a domain",
    description: "Pick a track and get a branded offer letter, generated instantly.",
  },
  {
    step: "03",
    title: "Build and submit",
    description: "Work through tasks written from real briefs, submitting via GitHub.",
  },
  {
    step: "04",
    title: "Get reviewed, get certified",
    description: "An engineer approves or returns notes. The certificate issues on approval.",
  },
] as const;

export const academyFaqs = [
  {
    question: "What is KLS Academy?",
    answer:
      "KLS Academy is the learning division of KLS Tech Solutions. It gives you free chapter-wise study notes as downloadable PDFs across six technical domains, then fully remote internships built from real project briefs. Every submission is reviewed in writing by a KLS engineer, and finishing earns a QR-verified certificate that any employer can check publicly.",
  },
  {
    question: "Is KLS Academy really free?",
    answer:
      "Yes, at every stage. There is no enrolment fee, no certificate fee, no premium tier, and we never ask for card or bank details. The platform itself is open source under the MIT licence, so you can read the code that runs it.",
  },
  {
    question: "Which domains can I do an internship in?",
    answer:
      "Six: Frontend Development, Backend Development, Full Stack Web Development, Data Science & Machine Learning, Cyber Security, and IoT & Embedded Systems. Each runs four to eight weeks, is self-paced, and has three reviewed technical tasks plus its own set of chapter-wise study notes.",
  },
  {
    question: "Do I have to enrol to get the study material?",
    answer:
      "No. The chapter-wise PDF notes for every domain are available the moment you sign up. You do not need to enrol in an internship, finish anything, or pay to read them — and they are yours to keep.",
  },
  {
    question: "How is the work assessed?",
    answer:
      "By a person, not a script. A KLS engineer reads your code and your written explanation, then either approves the task or returns specific notes on what to change. There is no limit on resubmissions and no penalty for one — the aim is to get the work right rather than to fail you.",
  },
  {
    question: "Can an employer verify my certificate?",
    answer:
      "Yes. Every certificate carries a unique number and a QR code linking to a public verification page. A recruiter can confirm it independently in seconds, without an account and without contacting us. Only certificates verifiable at academy.klstechsolutions.in were issued by KLS.",
  },
  {
    question: "Who can join KLS Academy?",
    answer:
      "Anyone aged 18 or over can register. A date of birth is requested because India's Digital Personal Data Protection Act, 2023 requires verifiable parental consent to process data belonging to under-18s, which the Academy does not collect.",
  },
] as const;

export const productFaqs = [
  {
    question: "What is the KLS Smart Water Monitor?",
    answer:
      "The Smart Water Monitor is an IoT system for intelligent water management in residential and commercial buildings. It measures water flow continuously using precision sensors, applies machine learning to usage patterns to detect leaks, and can automatically shut off supply through a controllable valve. Monitoring and control are available through mobile apps and a web dashboard.",
  },
  {
    question: "Is the Smart Water Monitor available to buy yet?",
    answer:
      "No. The Smart Water Monitor is currently in the research and development phase and is not yet available for purchase. If you would like to know more about the development timeline or discuss a potential partnership, you are welcome to contact us directly.",
  },
  {
    question: "How does the AI leak detection work?",
    answer:
      "Machine learning algorithms analyse the building's water usage patterns over time to establish what normal consumption looks like. When flow deviates from those learned patterns — a continuous slow draw overnight, for example, or an unexplained spike — the system flags it as a potential leak and issues an alert, with the aim of catching problems before they cause damage.",
  },
  {
    question: "How accurate is the flow measurement?",
    answer:
      "The system uses high-accuracy flow sensors rated at ±1% measurement precision, and is designed to work across both low and high flow rates so that small continuous leaks and large sudden draws are both captured reliably.",
  },
  {
    question: "How is the data secured?",
    answer:
      "The Smart Water Monitor uses TLS 1.3 encryption for data in transit, a secure element for cryptographic key storage, and tamper detection at the device level. Data handling is designed to be GDPR-compliant, and the device supports secure boot along with regular firmware updates so security fixes can be delivered over the product's lifetime.",
  },
  {
    question: "Who is the Smart Water Monitor designed for?",
    answer:
      "It is designed for both residential and commercial settings — households wanting visibility and protection against water damage, and commercial property operators who need consumption analytics and automated shutoff across a building. The architecture is edge-plus-cloud, so local control continues to function independently of the network connection.",
  },
] as const;
