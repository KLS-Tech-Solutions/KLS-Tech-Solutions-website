/**
 * Services / Solutions page content.
 *
 * Every industry, capability and process step below is carried over verbatim
 * in substance from the previous Solutions page. Wording has been tightened
 * for readability and keyword placement only — no capability has been added,
 * removed or overstated.
 *
 * The `intent` fields exist for answer-engine optimisation: each service block
 * answers "what is it / why does it matter / who needs it" in complete
 * sentences, so an assistant can quote one without surrounding context.
 */

import {
  Building2,
  Cloud,
  Cpu,
  Factory,
  GraduationCap,
  Home,
  Settings,
  Shield,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface CoreService {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /**
   * One-line version of the description, used where space is tight (the hero
   * pillar stack). Falls back to `description` when absent.
   */
  summary?: string;
  /** Key highlights, rendered as card bullets. */
  bullets?: readonly string[];
}

/**
 * The three services the company offers.
 *
 * This is the single source for the home hero pillar stack, the home "What We
 * Do" grid and the Services page overview, so those three surfaces can never
 * drift apart. Anything service-specific (industries, capabilities, process)
 * stays below.
 *
 * Secure system architecture used to sit here as a fourth card, but it isn't a
 * service you buy on its own — it's how all three are built. It now lives in
 * `capabilities` (as "Security Architecture") and is stated as a standing
 * commitment on the Services page, so nothing about it was lost.
 *
 * Every entry carries exactly six bullets. That keeps the three cards the same
 * height at every breakpoint without needing a fixed height, which would clip
 * on small screens.
 */
export const coreServices: readonly CoreService[] = [
  {
    id: "iot-product-engineering",
    icon: Cpu,
    title: "IoT Product Engineering",
    summary:
      "Custom hardware and firmware for connected devices — from sensors to gateways, designed for reliability and scale.",
    description:
      "Design and develop intelligent IoT hardware and embedded systems tailored for industrial, commercial, and consumer applications. From custom PCB design and firmware development to cloud connectivity and device management, we build secure, scalable, and production-ready connected solutions.",
    bullets: [
      "Custom PCB Design",
      "Embedded Firmware",
      "Sensor Integration",
      "Device Management",
      "Cloud Connectivity",
      "Production-Ready Builds",
    ],
  },
  {
    id: "enterprise-saas-ai",
    icon: Cloud,
    title: "Enterprise SaaS & AI Solutions",
    summary:
      "Cloud-native SaaS platforms and AI-powered business applications, built for startups and enterprises.",
    description:
      "We build secure, scalable, cloud-native SaaS platforms and AI-powered business applications for startups and enterprises. Our expertise includes multi-tenant SaaS architecture, workflow automation, enterprise dashboards, REST APIs, AI integrations, and intelligent business solutions powered by Generative AI and Agentic AI.",
    bullets: [
      "Enterprise SaaS Platforms",
      "Multi-tenant Architecture",
      "AI Business Automation",
      "FastAPI & Next.js Development",
      "Cloud Deployment",
      "API Integrations",
    ],
  },
  {
    id: "learning-virtual-internships",
    icon: GraduationCap,
    title: "Learning & Verified Virtual Internships",
    summary:
      "KLS Academy runs open-source virtual internships with real projects and QR-verified certificates.",
    description:
      "KLS Academy provides industry-focused virtual internship programs built around open-source work, designed to help students gain practical experience through real-world projects. Interns contribute to public repositories they can point an employer at, with structured learning, GitHub-based submissions, mentor reviews, LinkedIn engagement, and QR-verified digital certificates that evidence authentic industry experience.",
    bullets: [
      "Open Source Contributions",
      "Full Stack Python",
      "Web Development",
      "Cyber Security",
      "Generative AI & Agentic AI",
      "QR Verified Certificates",
    ],
  },
] as const;

export interface Industry {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: readonly string[];
  /** Who this is for — surfaced beneath the card for AEO. */
  audience: string;
}

export const industries: readonly Industry[] = [
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial",
    description:
      "Manufacturing automation, predictive maintenance, process monitoring, and industrial IoT infrastructure.",
    bullets: ["Factory floor monitoring", "Equipment health tracking", "Production analytics"],
    audience: "Manufacturers and plant operators who need visibility into equipment and processes.",
  },
  {
    id: "residential",
    icon: Home,
    title: "Residential",
    description:
      "Smart home systems with local-first control, privacy-focused architecture, and seamless integration.",
    bullets: ["Home automation hubs", "Energy management", "Security & monitoring"],
    audience: "Builders and homeowners who want smart systems that keep working without the cloud.",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial",
    description:
      "Building management, occupancy optimization, and enterprise-grade infrastructure solutions.",
    bullets: ["Building automation", "HVAC optimization", "Access control systems"],
    audience: "Facility and property teams managing multi-tenant or multi-site buildings.",
  },
] as const;

export interface Capability {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const capabilities: readonly Capability[] = [
  {
    id: "hardware-design",
    icon: Cpu,
    title: "Hardware Design",
    description:
      "Custom PCB design, sensor integration, power management, and enclosure engineering. From prototype to production-ready designs.",
  },
  {
    id: "firmware-development",
    icon: Settings,
    title: "Firmware Development",
    description:
      "Embedded systems programming, RTOS implementation, OTA updates, and secure bootloader development.",
  },
  {
    id: "cloud-infrastructure",
    icon: Workflow,
    title: "Cloud Infrastructure",
    description:
      "Scalable backend architecture, real-time data pipelines, API development, and multi-tenant platforms.",
  },
  {
    id: "security-architecture",
    icon: Shield,
    title: "Security Architecture",
    description:
      "End-to-end encryption, certificate management, secure provisioning, and compliance engineering.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your requirements, constraints, and goals.",
  },
  {
    step: "02",
    title: "Design",
    description: "Architecture planning, component selection, and prototyping.",
  },
  {
    step: "03",
    title: "Development",
    description: "Hardware, firmware, and software development with iterative testing.",
  },
  {
    step: "04",
    title: "Deployment",
    description: "Production support, documentation, and ongoing maintenance.",
  },
] as const;

/**
 * FAQ answers are written to stand alone. Each opens by restating the
 * question as a statement, which is what both featured snippets and AI
 * assistants extract cleanly.
 */
export const servicesFaqs = [
  {
    question: "What does KLS Tech Solutions actually build?",
    answer:
      "KLS Tech Solutions builds custom IoT and automation systems across the full stack: hardware design, embedded firmware, cloud infrastructure, and the security architecture that ties them together. We work on industrial monitoring, residential smart home systems, and commercial building management — designing, developing and deploying each system to the client's specific requirements rather than fitting them to an off-the-shelf platform.",
  },
  {
    question: "Do you handle both hardware and software, or just one?",
    answer:
      "We handle every layer of the stack. That includes custom PCB design, sensor integration, power management and enclosure engineering on the hardware side; embedded programming, RTOS implementation, OTA updates and secure bootloaders in firmware; and scalable backend architecture, real-time data pipelines and API development in the cloud. Cross-functional coverage means the hardware and software are designed against each other rather than integrated after the fact.",
  },
  {
    question: "Who needs custom IoT engineering rather than an off-the-shelf product?",
    answer:
      "Custom engineering makes sense when an existing product cannot meet your constraints — unusual sensing requirements, a specific security or compliance posture, integration with legacy equipment, or a need to own the system rather than rent it. Organisations in manufacturing, property management and residential construction typically reach this point when off-the-shelf platforms force compromises on data ownership, reliability, or long-term cost.",
  },
  {
    question: "How does the engagement process work?",
    answer:
      "There are four stages. Discovery establishes your requirements, constraints and goals. Design covers architecture planning, component selection and prototyping. Development delivers the hardware, firmware and software with iterative testing throughout. Deployment provides production support, documentation and ongoing maintenance. Each stage produces something reviewable, so you are never waiting until the end to see progress.",
  },
  {
    question: "How is security handled in the systems you build?",
    answer:
      "Security is designed in from the first architecture decision rather than added before launch, and it applies to all three services rather than being sold separately. In practice that means end-to-end encryption, certificate management, secure provisioning and compliance engineering as standard parts of the build — alongside secure boot and encrypted communications at the device level. We treat security as a foundation because retrofitting it into a deployed fleet of devices is significantly harder and less effective.",
  },
  {
    question: "What is a verified virtual internship at KLS Academy?",
    answer:
      "A verified virtual internship at KLS Academy is a remote, industry-focused program built around open-source work. Interns contribute to public repositories on real projects rather than throwaway exercises, so the work stays visible to future employers. Each program includes structured learning, GitHub-based project submissions, mentor reviews and LinkedIn engagement, and finishes with a QR-verified digital certificate that anyone can scan to confirm the experience is genuine. Tracks cover Full Stack Python, Web Development, Cyber Security, Generative AI and Agentic AI.",
  },
  {
    question: "Where is KLS Tech Solutions based, and who do you work with?",
    answer:
      "KLS Tech Solutions is based in Bengaluru, Karnataka, India. We partner with organisations across industrial, residential and commercial sectors to design, develop and deploy tailored IoT and automation solutions, from initial concept through to production.",
  },
] as const;
