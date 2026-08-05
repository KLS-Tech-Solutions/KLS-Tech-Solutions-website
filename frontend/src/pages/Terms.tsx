import { AlertTriangle } from "lucide-react";

import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";
import { pageMeta } from "@/config/seo";
import { company, contactInfo } from "@/config/site";

/**
 * Terms of Service.
 *
 * IMPORTANT: this is a good-faith template covering ordinary use of an
 * informational company website. It is not legal advice and has not been
 * reviewed by a lawyer. Have it reviewed before publishing — particularly the
 * liability and governing-law sections, which vary significantly by
 * jurisdiction.
 */
const sections: LegalSection[] = [
  {
    heading: "1. Agreement to these terms",
    body: [
      `These terms govern your use of the ${company.name} website. By accessing or using this website, you agree to them. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: "2. About this website",
    body: [
      `This website provides information about ${company.name}, our engineering services and our products. It is informational: nothing on it constitutes a binding offer, a quotation, or a commitment to provide services.`,
    ],
  },
  {
    heading: "3. Product and development status",
    body: [
      "Products described on this website, including the Smart Water Monitor, are currently in the research and development phase. Descriptions of features, specifications and capabilities reflect our current development intentions and may change.",
      "Nothing on this site should be read as a promise that a product will be released, will be released by a particular date, or will include any specific feature.",
    ],
  },
  {
    heading: "4. Acceptable use",
    body: ["When using this website, you agree not to:"],
    bullets: [
      "Use it for any unlawful purpose or in breach of these terms",
      "Attempt to gain unauthorised access to any part of the site or its infrastructure",
      "Interfere with or disrupt the site, its servers, or its networks",
      "Use automated systems to extract data from the site in a way that imposes an unreasonable load",
      "Submit false, misleading, abusive or unlawful content through our contact form",
      "Use the contact form to send unsolicited commercial messages",
    ],
  },
  {
    heading: "5. Intellectual property",
    body: [
      `All content on this website — including text, graphics, logos, the ${company.name} name and mark, page design and source code — is owned by us or our licensors and is protected by intellectual property law.`,
      "You may view and print pages for your own reference. You may not reproduce, republish, distribute or create derivative works from our content for commercial purposes without our written permission.",
    ],
  },
  {
    heading: "6. Your submissions",
    body: [
      "Information you send us through the contact form is handled in line with our Privacy Policy. Please do not send confidential or proprietary information through the form. If you need to share sensitive material, contact us first so we can agree an appropriate arrangement.",
      "By submitting an enquiry you confirm that the information you provide is accurate and that you are entitled to share it.",
    ],
  },
  {
    heading: "7. External links",
    body: [
      "This website may link to third-party sites and services that we do not control. We provide those links for convenience only. We are not responsible for the content, policies or practices of any external site, and including a link does not imply endorsement.",
    ],
  },
  {
    heading: "8. Disclaimer",
    body: [
      "This website and its content are provided on an 'as is' and 'as available' basis. While we take care to keep the information accurate and current, we make no warranties of any kind, express or implied, about the completeness, accuracy, reliability or availability of the site or its content.",
      "We do not warrant that the site will be uninterrupted, timely, secure or error-free.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    body: [
      "To the fullest extent permitted by applicable law, we will not be liable for any indirect, incidental, special, consequential or punitive loss, or for any loss of profits, revenue, data or goodwill, arising out of your use of or inability to use this website.",
      "Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited.",
    ],
  },
  {
    heading: "10. Changes",
    body: [
      "We may modify this website or these terms at any time. Changes take effect when the revised terms are posted, and the 'last updated' date at the top of this page will be revised. Your continued use of the site after that point means you accept the updated terms.",
    ],
  },
  {
    heading: "11. Governing law",
    body: [
      `These terms are governed by the laws of India, and the courts of ${contactInfo.addressLocality}, ${contactInfo.addressRegion} will have jurisdiction over any dispute arising from them or from your use of this website.`,
    ],
  },
  {
    heading: "12. Contact",
    body: [
      `If you have questions about these terms, contact us at ${contactInfo.email} or on ${contactInfo.phone}.`,
    ],
  },
];

const Terms = () => (
  <LegalPage
    meta={pageMeta.terms}
    title="Terms of Service"
    intro="The terms and conditions that govern your use of this website and the information published on it."
    lastUpdated="5 August 2026"
    sections={sections}
    notice={
      <div className="mb-10 flex gap-3 rounded-2xl border border-brand-lime/30 bg-brand-lime/10 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Template pending legal review. </span>
          These terms cover ordinary use of an informational company website, but they have not been
          reviewed by a qualified lawyer. Have the liability and governing-law sections in
          particular checked before relying on them, and remove this notice once approved.
        </p>
      </div>
    }
  />
);

export default Terms;
