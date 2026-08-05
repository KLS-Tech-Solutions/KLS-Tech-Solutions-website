import type { ReactNode } from "react";

import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import type { PageMeta } from "@/config/seo";
import { breadcrumbSchema } from "@/lib/schema";

export interface LegalSection {
  heading: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

interface LegalPageProps {
  meta: PageMeta;
  title: string;
  intro: string;
  /** Human-readable date this document was last revised. */
  lastUpdated: string;
  sections: LegalSection[];
  /** Rendered above the content — used for the legal-review notice. */
  notice?: ReactNode;
}

/**
 * Shared shell for Privacy Policy and Terms of Service.
 *
 * Both documents have identical structure, so they share one layout and differ
 * only in content. Prose styling comes from @tailwindcss/typography, which is
 * already a project dependency.
 */
const LegalPage = ({ meta, title, intro, lastUpdated, sections, notice }: LegalPageProps) => (
  <Layout>
    <Seo {...meta} />
    <JsonLd data={breadcrumbSchema([{ name: title, path: meta.path }])} />

    <PageHero
      eyebrow="Legal"
      title={title}
      description={intro}
      breadcrumbs={[{ name: title, path: meta.path }]}
    />

    <Section>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-8 text-sm text-muted-foreground">
            Last updated: <time>{lastUpdated}</time>
          </p>

          {notice}

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mb-4 leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  </Layout>
);

export default LegalPage;
