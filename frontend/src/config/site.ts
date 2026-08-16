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
    "KLS Tech Solutions is an engineering-first technology company based in Bengaluru, India. We design and develop intelligent IoT systems, enterprise SaaS platforms and AI-powered business applications, with enterprise-grade security built in from day one — from concept through to deployment. Through KLS Academy we also run verified virtual internship programs for students.",
  shortDescription:
    "Engineering intelligent IoT systems, enterprise SaaS and AI solutions with enterprise-grade security — plus verified virtual internships through KLS Academy.",
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

/**
 * KLS Academy — the virtual internship and learning platform.
 *
 * It lives on its own subdomain rather than a route in this app, so every
 * link to it is a plain anchor. It opens in the same tab: it is our own
 * property, not a third-party destination.
 */
export const ACADEMY_URL = "https://academy.klstechsolutions.in";

export interface NavItem {
  href: string;
  label: string;
  /** Short description surfaced in the mobile menu for extra context. */
  description?: string;
  /**
   * True when href points outside this SPA. External items render as <a>
   * rather than a router <Link>, which would otherwise treat the absolute
   * URL as a relative path.
   */
  external?: boolean;
}

/** Single predicate so every consumer decides <a> vs <Link> the same way. */
export const isExternalNav = (item: NavItem) => item.external === true;

/**
 * Primary navigation.
 *
 * Note: the /solutions URL is preserved (it is already indexed and linked)
 * while the label reads "Services", which is how visitors search for it.
 * /services redirects here — see App.tsx.
 */
export const mainNav: NavItem[] = [
  { href: "/", label: "Home", description: "IoT engineering, SaaS, AI and secure systems" },
  { href: "/about", label: "About", description: "Our mission, values and team" },
  { href: "/solutions", label: "Services", description: "Custom IoT, SaaS and AI engineering" },
  { href: "/products", label: "Products", description: "Smart Water Monitor and R&D pipeline" },
  {
    href: ACADEMY_URL,
    label: "Academy",
    description: "Open-source virtual internships and learning",
    external: true,
  },
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
      { href: ACADEMY_URL, label: "Academy", external: true },
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
 * The three services the company offers, in the form the Organization
 * structured data consumes. The rendered pages read from `coreServices` in
 * content/services.ts — the ids match so the two stay traceable to each other.
 *
 * Security architecture is deliberately absent: it isn't a separate service,
 * it's how all three are built, and it is covered by `knowsAbout` below.
 */
export const corePillars = [
  {
    id: "iot-product-engineering",
    title: "IoT Product Engineering",
    description:
      "Intelligent IoT hardware and embedded systems for industrial, commercial and consumer applications — custom PCB design, firmware, cloud connectivity and device management.",
  },
  {
    id: "enterprise-saas-ai",
    title: "Enterprise SaaS & AI Solutions",
    description:
      "Secure, scalable cloud-native SaaS platforms and AI-powered business applications: multi-tenant architecture, workflow automation, REST APIs and Generative and Agentic AI integrations.",
  },
  {
    id: "learning-virtual-internships",
    title: "Learning & Verified Virtual Internships",
    description:
      "KLS Academy runs open-source virtual internship programs with real-world projects, mentor reviews and QR-verified digital certificates.",
  },
] as const;
