/**
 * Single source of truth for company identity, navigation and contact data.
 *
 * Nothing in this file is invented — every value is carried over from the
 * existing site. Change a detail here and it updates everywhere: navigation,
 * footer, contact page, structured data and social metadata.
 */

/** Production origin. Used for canonical URLs, sitemap and Open Graph tags. */
export const SITE_URL = "https://klstechsolutions.com";

export const company = {
  /** Legal / display name, used in structured data and the <title> suffix. */
  name: "KLS Tech Solutions",
  legalName: "KLS Tech Solutions",
  tagline: "Smart Living, Engineered",
  /**
   * Plain-language entity description. Deliberately literal and self-contained
   * so answer engines and AI assistants can quote it accurately.
   */
  description:
    "KLS Tech Solutions is an engineering-first technology company based in Bengaluru, India. We design and develop intelligent IoT systems powered by AI, with enterprise-grade security built in from day one — from concept through to deployment.",
  shortDescription:
    "Engineering intelligent IoT systems with AI-driven capabilities and enterprise-grade security.",
  foundingLocation: "Bengaluru, Karnataka, India",
  /** Current company stage. Stated plainly rather than dressed up. */
  stage: "Research & Development",
} as const;

export const contactInfo = {
  phone: "+91 99861 87448",
  email: "klstechsolutions2025@gmail.com",
  instagram: "klstechsolutions",
  location: "Bengaluru, KA, Bharat",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  addressCountry: "IN",
  responseTime: "1-2 business days",
} as const;

export const contactLinks = {
  phone: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
  email: `mailto:${contactInfo.email}`,
  instagram: `https://instagram.com/${contactInfo.instagram}`,
} as const;

/** Brand asset paths, resolved from /public. */
export const assets = {
  /**
   * Full lockup including the "SOLUTIONS" wordmark, on a white plate.
   * Referenced by Organization structured data, which requires a crawlable
   * image that renders correctly on any background.
   */
  logo: "/kls-logo.png",
  /** Trimmed KLS letterform, used in the header and footer. */
  mark: "/kls-mark.png",
  ogImage: "/og-image.png",
  favicon: "/favicon.ico",
  productImage: "/model2.webp",
  productImageFallback: "/model2.jpeg",
} as const;

export interface NavItem {
  href: string;
  label: string;
  /** Short description surfaced in the mobile menu for extra context. */
  description?: string;
}

/**
 * Primary navigation.
 *
 * Note: the /solutions URL is preserved (it is already indexed and linked)
 * while the label reads "Services", which is how visitors search for it.
 * /services redirects here — see App.tsx.
 */
export const mainNav: NavItem[] = [
  { href: "/", label: "Home", description: "IoT engineering, AI and secure systems" },
  { href: "/solutions", label: "Services", description: "Custom IoT and automation engineering" },
  { href: "/products", label: "Products", description: "Smart Water Monitor and R&D pipeline" },
  { href: "/about", label: "About", description: "Our mission, values and team" },
];

/** Footer link groups. Kept separate so the footer can carry legal pages. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "What We Do",
    items: [
      { href: "/solutions", label: "Services & Solutions" },
      { href: "/products", label: "Products" },
      { href: "/solutions#capabilities", label: "Engineering Capabilities" },
      { href: "/solutions#process", label: "Our Process" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

/**
 * The three engineering pillars the company is built on. Referenced by the
 * home page, the services page and the Organization structured data.
 */
export const corePillars = [
  {
    id: "iot-product-engineering",
    title: "IoT Product Engineering",
    description:
      "Custom hardware and firmware development for connected devices. From sensors to gateways, designed for reliability and scale.",
  },
  {
    id: "ai-driven-intelligence",
    title: "AI-Driven Intelligence",
    description:
      "Machine learning models and intelligent automation that turn raw data into actionable insights and autonomous decisions.",
  },
  {
    id: "secure-system-architecture",
    title: "Secure System Architecture",
    description:
      "End-to-end security built in from day one. Encrypted communications, secure boot, and compliance-ready infrastructure.",
  },
] as const;
