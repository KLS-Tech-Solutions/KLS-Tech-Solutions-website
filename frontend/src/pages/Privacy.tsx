import { AlertTriangle } from "lucide-react";

import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";
import { pageMeta } from "@/config/seo";
import { company, contactInfo } from "@/config/site";

/**
 * Privacy Policy.
 *
 * IMPORTANT: this is a good-faith template describing only the data the site
 * actually collects today — the six contact-form fields, standard server logs,
 * and Google Analytics 4 (property G-9BLPF7SCZK, added 22 Aug 2026). It is not
 * legal advice and has not been reviewed by a lawyer. Have it reviewed before
 * publishing, and update it again whenever the site starts collecting anything
 * new (additional trackers, accounts, payments).
 *
 * Note on consent: sections 4 and 7 rely on legitimate interest for analytics
 * and point users to browser-level opt-outs. That is a common posture, but it
 * is NOT sufficient under the EU ePrivacy Directive or UK PECR, which require
 * opt-in consent before analytics cookies are set. If the site targets or
 * attracts EU/UK visitors, a consent banner is needed and the tag must be
 * gated behind it.
 */
const sections: LegalSection[] = [
  {
    heading: "1. Introduction",
    body: [
      `${company.name} ("we", "us", "our") operates this website. This policy explains what personal information we collect through it, why we collect it, how we use it, and what choices you have.`,
      "We collect the minimum information needed to respond to your enquiry. We do not sell personal information.",
    ],
  },
  {
    heading: "2. Information you give us",
    body: [
      "When you submit our contact form, we collect the information you enter into it:",
    ],
    bullets: [
      "Your name (required)",
      "Your email address (required)",
      "The subject of your enquiry (required)",
      "Your message (required)",
      "Your phone number (optional)",
      "Your company name (optional)",
    ],
  },
  {
    heading: "3. Information collected automatically",
    body: [
      "Like most websites, our hosting infrastructure records standard technical information when you visit, such as your IP address, browser type, the pages you request and the time of the request. This information is used to operate and secure the site, and to diagnose faults.",
    ],
  },
  {
    heading: "4. Analytics and cookies",
    body: [
      "We use Google Analytics 4 to understand how the site is used — which pages people read, how they arrived, and where they leave. This helps us decide what to improve.",
      "Google Analytics sets cookies in your browser and collects information about your visit, including:",
    ],
    bullets: [
      "Pages viewed and the order you viewed them in",
      "Approximate location, derived from your IP address (city level, not precise)",
      "Device type, browser and operating system",
      "How you reached the site, such as a search engine or a link",
      "A randomly generated identifier used to recognise returning visits",
    ],
  },
  {
    heading: "5. How to opt out of analytics",
    body: [
      "You can prevent Google Analytics from collecting your data in several ways: install Google's official browser opt-out add-on, block analytics cookies in your browser settings, enable your browser's tracking protection, or use any standard content blocker. None of these will stop the rest of the site working.",
      "Google provides its own explanation of how it handles this data in its privacy policy and in its 'How Google uses information from sites that use our services' page.",
    ],
  },
  {
    heading: "6. How we use your information",
    body: ["We use the information described above only to:"],
    bullets: [
      "Respond to the enquiry you sent us",
      "Continue a conversation you have started with us",
      "Understand how the site is used, so we can improve it",
      "Operate, secure, maintain and improve this website",
      "Comply with any legal obligation that applies to us",
    ],
  },
  {
    heading: "7. Legal basis for processing",
    body: [
      "Where data protection law requires a legal basis, we rely on your consent when you choose to submit the contact form, and on our legitimate interest in operating a secure and functional website for the technical information described in section 3.",
      "For the analytics described in section 4, we rely on legitimate interest in understanding how our website performs. If you are in a jurisdiction that requires prior consent for analytics cookies, you can block them using any of the methods in section 5.",
    ],
  },
  {
    heading: "8. Sharing your information",
    body: [
      "We do not sell, rent or trade your personal information.",
      "We share it only with service providers who help us operate the website and deliver email — for example our hosting provider, our email delivery service, and Google as our analytics provider — and only to the extent needed to perform those functions. We may also disclose information where we are legally required to do so.",
      "Google processes analytics data on servers that may be located outside your country, including in the United States.",
    ],
  },
  {
    heading: "9. How long we keep it",
    body: [
      "We keep contact enquiries for as long as needed to handle the enquiry and any follow-up conversation, and to keep a record of our correspondence. When information is no longer needed for those purposes, we delete it.",
    ],
  },
  {
    heading: "10. Security",
    body: [
      "Information you submit is transmitted over an encrypted connection and access to it is limited to people who need it in order to respond to you. No method of transmission or storage is completely secure, so while we take reasonable measures to protect your information we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "11. Your rights",
    body: [
      "Depending on where you live, you may have the right to request access to the personal information we hold about you, ask us to correct it, ask us to delete it, object to how we use it, or withdraw consent you have given.",
      `To make any of these requests, contact us at ${contactInfo.email}. We will respond within the timeframe required by applicable law.`,
    ],
  },
  {
    heading: "12. Children",
    body: [
      "This website is not directed at children, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
    ],
  },
  {
    heading: "13. External links",
    body: [
      "Our website links to external services such as our Instagram profile. Those services have their own privacy policies, and this policy does not apply to them. We encourage you to read the policy of any site you visit.",
    ],
  },
  {
    heading: "14. Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we will revise the 'last updated' date at the top of this page. Please review it periodically.",
    ],
  },
  {
    heading: "15. Contact us",
    body: [
      `If you have questions about this policy or about how we handle your information, contact us by email at ${contactInfo.email}, by phone on ${contactInfo.phone}, or by post at ${contactInfo.location}.`,
    ],
  },
];

const Privacy = () => (
  <LegalPage
    meta={pageMeta.privacy}
    title="Privacy Policy"
    intro="How we collect, use, store and protect the information you share with us through this website."
    lastUpdated="22 August 2026"
    sections={sections}
    notice={
      <div className="mb-10 flex gap-3 rounded-2xl border border-brand-lime/30 bg-brand-lime/10 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Template pending legal review. </span>
          This policy describes the data this website actually collects today, but it has not been
          reviewed by a qualified lawyer. Have it checked against the laws that apply to your
          business before relying on it, and remove this notice once it has been approved.
        </p>
      </div>
    }
  />
);

export default Privacy;
