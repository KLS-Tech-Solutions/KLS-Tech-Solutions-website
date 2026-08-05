import { AlertTriangle } from "lucide-react";

import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";
import { pageMeta } from "@/config/seo";
import { company, contactInfo } from "@/config/site";

/**
 * Privacy Policy.
 *
 * IMPORTANT: this is a good-faith template describing only the data the site
 * actually collects today — the six contact-form fields and standard server
 * logs. It is not legal advice and has not been reviewed by a lawyer. Have it
 * reviewed before publishing, and update it whenever the site starts
 * collecting anything new (analytics, cookies, accounts, payments).
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
      "We store your theme preference (light or dark) so the site remembers how you like to view it. This is kept in your browser and is not used to identify you.",
    ],
  },
  {
    heading: "4. How we use your information",
    body: ["We use the information described above only to:"],
    bullets: [
      "Respond to the enquiry you sent us",
      "Continue a conversation you have started with us",
      "Operate, secure, maintain and improve this website",
      "Comply with any legal obligation that applies to us",
    ],
  },
  {
    heading: "5. Legal basis for processing",
    body: [
      "Where data protection law requires a legal basis, we rely on your consent when you choose to submit the contact form, and on our legitimate interest in operating a secure and functional website for the technical information described in section 3.",
    ],
  },
  {
    heading: "6. Sharing your information",
    body: [
      "We do not sell, rent or trade your personal information.",
      "We share it only with service providers who help us operate the website and deliver email — for example our hosting provider and our email delivery service — and only to the extent needed to perform those functions. We may also disclose information where we are legally required to do so.",
    ],
  },
  {
    heading: "7. How long we keep it",
    body: [
      "We keep contact enquiries for as long as needed to handle the enquiry and any follow-up conversation, and to keep a record of our correspondence. When information is no longer needed for those purposes, we delete it.",
    ],
  },
  {
    heading: "8. Security",
    body: [
      "Information you submit is transmitted over an encrypted connection and access to it is limited to people who need it in order to respond to you. No method of transmission or storage is completely secure, so while we take reasonable measures to protect your information we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "9. Your rights",
    body: [
      "Depending on where you live, you may have the right to request access to the personal information we hold about you, ask us to correct it, ask us to delete it, object to how we use it, or withdraw consent you have given.",
      `To make any of these requests, contact us at ${contactInfo.email}. We will respond within the timeframe required by applicable law.`,
    ],
  },
  {
    heading: "10. Children",
    body: [
      "This website is not directed at children, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
    ],
  },
  {
    heading: "11. External links",
    body: [
      "Our website links to external services such as our Instagram profile. Those services have their own privacy policies, and this policy does not apply to them. We encourage you to read the policy of any site you visit.",
    ],
  },
  {
    heading: "12. Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we will revise the 'last updated' date at the top of this page. Please review it periodically.",
    ],
  },
  {
    heading: "13. Contact us",
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
    lastUpdated="5 August 2026"
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
