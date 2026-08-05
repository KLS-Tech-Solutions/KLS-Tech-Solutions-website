/**
 * Products page content.
 *
 * The Smart Water Monitor is genuinely in research and development. Every
 * status line below says so plainly — no launch dates, availability claims,
 * pricing or customer numbers are stated, because none are verified.
 */

import { Bell, Droplets, Gauge, Shield, Smartphone, type LucideIcon } from "lucide-react";

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
