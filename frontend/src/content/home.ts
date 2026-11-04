/**
 * Home page content.
 *
 * All items are carried over from the previous home page. The "why choose us"
 * points and value statements are the company's own stated principles — no
 * client counts, project totals, years-in-business or awards appear anywhere,
 * because none of those are verified facts about the company today.
 */

import { Cpu, Factory, Lock, Radio, Settings, Shield, Wrench, type LucideIcon } from "lucide-react";

export interface HomeFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Custom solution areas highlighted on the home page. */
export const solutionAreas: readonly HomeFeature[] = [
  {
    id: "industrial-automation",
    icon: Factory,
    title: "Industrial Automation",
    description: "Factory monitoring, predictive maintenance, process optimization.",
  },
  {
    id: "home-automation",
    icon: Settings,
    title: "Home Automation",
    description: "Smart home systems with local control and cloud connectivity.",
  },
  {
    id: "secure-infrastructure",
    icon: Shield,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security for critical systems and sensitive data.",
  },
] as const;

/** Why work with KLS — the company's stated differentiators. */
export const whyChooseUs = [
  {
    number: "01",
    title: "Technical Depth",
    description:
      "From embedded firmware to cloud architecture, we understand every layer of the stack.",
  },
  {
    number: "02",
    title: "Security by Design",
    description: "Security isn't an afterthought. It's built into every component from day one.",
  },
  {
    number: "03",
    title: "Long-term Thinking",
    description: "We design systems that scale and evolve. No shortcuts, no technical debt.",
  },
] as const;

/**
 * Technology expertise, grouped by layer.
 *
 * These are the disciplines already described across the existing Solutions
 * and Products pages, gathered into one view. They describe areas of work,
 * not certifications or vendor partnerships.
 */
export const expertiseAreas = [
  {
    id: "embedded",
    icon: Cpu,
    title: "Embedded & Hardware",
    items: ["Custom PCB design", "Sensor integration", "Power management", "Enclosure engineering"],
  },
  {
    id: "firmware",
    icon: Wrench,
    title: "Firmware & Devices",
    items: ["Embedded programming", "RTOS implementation", "OTA updates", "Secure bootloaders"],
  },
  {
    id: "connectivity",
    icon: Radio,
    title: "Connectivity & Cloud",
    items: [
      "Real-time data pipelines",
      "Scalable backend architecture",
      "API development",
      "Multi-tenant platforms",
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "Security & Compliance",
    items: [
      "End-to-end encryption",
      "Certificate management",
      "Secure provisioning",
      "Compliance engineering",
    ],
  },
] as const;

export const homeFaqs = [
  {
    question: "What is KLS Tech Solutions?",
    answer:
      "KLS Tech Solutions is an engineering-first technology company based in Bengaluru, India. We design and develop intelligent IoT systems, enterprise SaaS platforms and AI-powered business applications, with enterprise-grade security built in from day one — covering hardware, firmware, cloud infrastructure and security architecture from concept through to deployment. Through KLS Academy we also run verified remote internship programs for students.",
  },
  {
    question: "What services does KLS Tech Solutions offer?",
    answer:
      "We offer three core services. IoT product engineering covers custom hardware, embedded systems and firmware for connected devices, from sensors to gateways. Enterprise SaaS and AI solutions cover cloud-native multi-tenant platforms, workflow automation, REST APIs and applications powered by Generative AI and Agentic AI. Learning and verified remote internships are delivered through KLS Academy, built around open-source projects with mentor reviews and QR-verified certificates. Secure system architecture — encrypted communications, secure boot and compliance-ready infrastructure — is not sold separately; it underpins all three. We deliver these as custom solutions for industrial, residential, commercial and enterprise clients.",
  },
  {
    question: "Where is KLS Tech Solutions located?",
    answer:
      "KLS Tech Solutions is based in Bengaluru, Karnataka, India. You can reach the team by phone on +91 99861 87448 or by email at klstechsolutions2025@gmail.com.",
  },
  {
    question: "What stage is the company at?",
    answer:
      "KLS Tech Solutions is currently in its research and development phase. Our flagship product, the Smart Water Monitor, is under active development and is not yet commercially available. We are open to conversations about custom engineering work, partnerships and collaborations during this period.",
  },
  {
    question: "What makes KLS Tech Solutions different from other IoT companies?",
    answer:
      "We describe ourselves as engineering-first: we are engineers solving problems rather than a marketing company that builds technology. In practice that means three commitments — technical depth across every layer from embedded firmware to cloud architecture, security designed in from day one rather than added later, and long-term thinking that avoids shortcuts and accumulated technical debt.",
  },
] as const;
