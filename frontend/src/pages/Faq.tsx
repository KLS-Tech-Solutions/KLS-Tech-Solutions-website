import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import IconTile from "@/components/common/IconTile";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import Layout from "@/components/layout/Layout";
import CtaBanner from "@/components/sections/CtaBanner";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pageMeta } from "@/config/seo";
import { allFaqs, faqGroups } from "@/content/faq";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

/**
 * Company-wide FAQ.
 *
 * This page owns the FAQPage structured data for the whole site. The other
 * pages still show their own relevant questions, but with schema disabled —
 * declaring the same Q&A as FAQPage on several URLs is the duplication
 * Google's guidelines warn about, and it splits the signal.
 *
 * Concentrating it here also suits answer engines better: one indexable URL
 * carrying every question the company answers, grouped by intent.
 */
const Faq = () => (
  <Layout>
    <Seo {...pageMeta.faq} />
    <JsonLd data={[breadcrumbSchema([{ name: "FAQ", path: "/faq" }]), faqSchema(allFaqs)]} />

    <PageHero
      eyebrow="Frequently Asked Questions"
      title="Everything people ask us, in one place"
      description={`${allFaqs.length} questions covering the company, our engineering services, KLS Academy and the Smart Water Monitor.`}
      breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      visual="legal"
    />

    {/* ---- Jump links ---------------------------------------------------- */}
    {/* Four groups and nearly thirty answers is a long page; this gets a
        visitor to the right section without scrolling past the rest. */}
    <Section tone="muted">
      <Reveal>
        <nav aria-label="FAQ sections" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {faqGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
            >
              <IconTile icon={group.icon} size="sm" className="mb-4" />
              <span className="mb-1 font-semibold text-foreground">{group.title}</span>
              <span className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {group.description}
              </span>
              <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                {group.items.length} questions
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </nav>
      </Reveal>
    </Section>

    {/* ---- Groups -------------------------------------------------------- */}
    {faqGroups.map((group, groupIndex) => (
      <Section
        key={group.id}
        id={group.id}
        bordered
        tone={groupIndex % 2 === 1 ? "card" : "default"}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sticky heading, so the section stays identifiable while reading. */}
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-28">
              <IconTile icon={group.icon} size="lg" className="mb-5" />
              <h2 className="heading-section text-foreground">{group.title}</h2>
              <p className="body-large mt-3">{group.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {group.items.length} questions
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {group.items.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`${group.id}-${index}`}
                    className="overflow-hidden rounded-xl border border-border bg-background px-5 shadow-xs transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </Section>
    ))}

    {/* ---- Still stuck --------------------------------------------------- */}
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="heading-section text-foreground">Still have a question?</h2>
        <p className="body-large mt-4">
          If your question is not answered above, send it to us directly. We typically respond
          within 1-2 business days.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Ask us directly
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </Section>

    <CtaBanner
      title="Ready to start something?"
      description="Join KLS Academy free, or talk to us about an IoT, SaaS or AI project."
      primaryLabel="Talk to our team"
      primaryHref="/contact"
      secondaryLabel="See our products"
      secondaryHref="/products"
    />
  </Layout>
);

export default Faq;
