import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import FeatureCard from "@/components/common/FeatureCard";
import IconTile from "@/components/common/IconTile";
import Pill from "@/components/common/Pill";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Layout from "@/components/layout/Layout";
import CtaBanner from "@/components/sections/CtaBanner";
import ProductHero from "@/components/sections/ProductHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/config/seo";
import { assets } from "@/config/site";
import {
  academyDomains,
  academyFeatures,
  academyJourney,
  klsAcademy,
  productFeatures,
  smartWaterMonitor,
  technicalOverview,
} from "@/content/products";
import {
  breadcrumbSchema,
  educationalProgramSchema,
  productSchema,
  softwareApplicationSchema,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

/** Level badge colouring — one tone per difficulty, so the grid scans. */
const LEVEL_TONE: Record<string, string> = {
  Beginner: "border-brand-lime/35 bg-brand-lime/10 text-success",
  Intermediate: "border-primary/25 bg-primary/10 text-primary",
  Advanced: "border-brand-pinkInk/30 bg-brand-pink/10 text-brand-pinkInk",
};

const Products = () => (
  <Layout>
    <Seo {...pageMeta.products} />
    <JsonLd
      data={[
        breadcrumbSchema([{ name: "Products", path: "/products" }]),
        productSchema({
          name: smartWaterMonitor.name,
          description: smartWaterMonitor.entityDescription,
          image: assets.productImage,
          category: smartWaterMonitor.category,
        }),
        softwareApplicationSchema({
          name: klsAcademy.name,
          description: klsAcademy.entityDescription,
          url: klsAcademy.url,
          category: "EducationalApplication",
          licence: "https://opensource.org/licenses/MIT",
        }),
        // One node per internship stream, so each can surface on its own.
        ...academyDomains.map((domain) =>
          educationalProgramSchema({
            name: `${domain.name} Remote Internship`,
            description: domain.description,
            url: `${klsAcademy.url}/internships/${domain.slug}`,
            weeks: domain.weeks,
          }),
        ),
      ]}
    />

    <ProductHero
      products={[
        {
          id: "academy",
          badge: "Live now — free forever",
          name: klsAcademy.name,
          blurb: klsAcademy.summary,
          ctaLabel: "Visit KLS Academy",
          ctaHref: klsAcademy.url,
          ctaExternal: true,
          secondaryLabel: "What's included",
          secondaryHref: "#kls-academy",
        },
        {
          id: "swm",
          badge: `${smartWaterMonitor.status} — not yet available`,
          name: smartWaterMonitor.name,
          blurb: smartWaterMonitor.summary,
          ctaLabel: "Enquire about availability",
          ctaHref: "/contact",
          secondaryLabel: "See the specification",
          secondaryHref: "#smart-water-monitor",
        },
      ]}
    />

    {/* ---- KLS Academy -------------------------------------------------- */}
    <Section id="kls-academy" bordered>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        {/* Detail column */}
        <div className="lg:col-span-7">
          <Reveal>
            <Pill tone="accent" className="mb-5">
              Live now — free forever
            </Pill>
          </Reveal>

          <SectionHeader
            label="Learning Platform"
            title={klsAcademy.name}
            description={klsAcademy.summary}
            className="mb-10"
          />

          {/* Self-contained entity description — the paragraph an assistant
              lifts when asked what KLS Academy is. */}
          <Reveal>
            <p className="mb-10 rounded-2xl border border-border bg-muted/40 p-6 leading-relaxed text-muted-foreground">
              {klsAcademy.entityDescription}
            </p>
          </Reveal>

          <div className="space-y-7">
            {academyFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 70}>
                <div className="flex gap-4">
                  <IconTile icon={feature.icon} size="sm" />
                  <div className="min-w-0">
                    <h3 className="mb-1.5 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sticky spec panel */}
        <div className="lg:col-span-5">
          <Reveal variant="right" delay={100}>
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                <div className="relative overflow-hidden bg-brand-navy px-6 py-10 text-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-grid opacity-30"
                  />
                  <p className="relative text-5xl font-bold tracking-tight text-white">
                    {"₹"}0
                  </p>
                  <p className="relative mt-2 text-sm text-white/70">
                    No fee at any stage. No card details.
                  </p>
                </div>

                <dl className="divide-y divide-border p-6">
                  {[
                    { label: "Status", value: klsAcademy.status, highlight: true },
                    { label: "Price", value: klsAcademy.price },
                    { label: "Licence", value: klsAcademy.licence },
                    { label: "Format", value: klsAcademy.format },
                    { label: "Streams", value: `${academyDomains.length} domains` },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd
                        className={
                          row.highlight
                            ? "text-right text-sm font-semibold text-success"
                            : "text-right text-sm font-medium text-foreground"
                        }
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-border p-6 pt-5">
                  {/* The Academy is on its own subdomain, so this is a real
                      anchor rather than a router link. */}
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <a href={klsAcademy.url}>
                      Visit KLS Academy
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Sign up free and the study notes are yours immediately.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>

    {/* ---- Internship domains ------------------------------------------ */}
    <Section tone="card" bordered id="internship-domains">
      <SectionHeader
        label="Internship Streams"
        title="Six domains, each with its own notes and reviewed tasks"
        description="Every stream is fully remote and self-paced, with three technical tasks reviewed in writing by a KLS engineer."
        centered
      />

      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {academyDomains.map((domain, index) => (
          <Reveal key={domain.slug} delay={index * 70} className="h-full">
            <a
              href={`${klsAcademy.url}/internships/${domain.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 shadow-xs transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card sm:p-6"
            >
              <span
                className={cn(
                  "mb-4 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold",
                  LEVEL_TONE[domain.level],
                )}
              >
                {domain.level}
              </span>

              <h3 className="heading-card mb-2 text-foreground">{domain.name}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {domain.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>
                  {domain.weeks} weeks · {domain.tasks} tasks · Remote
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- How the Academy works --------------------------------------- */}
    <Section id="academy-process">
      <SectionHeader
        label="How It Works"
        title="From signing up to a verified certificate"
        description="None of these steps involve a payment, and nothing that should be judged by a person is automated."
        centered
      />
      <ProcessSteps steps={academyJourney} />
    </Section>

    {/* ---- Smart Water Monitor ----------------------------------------- */}
    <Section id="smart-water-monitor">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        {/* Detail column */}
        <div className="lg:col-span-7">
          <SectionHeader
            label="Flagship Product"
            title={smartWaterMonitor.name}
            description={smartWaterMonitor.summary}
            className="mb-10"
          />

          {/* Self-contained entity description — this is the paragraph an AI
              assistant lifts when asked what the product is. */}
          <Reveal>
            <p className="mb-10 rounded-2xl border border-border bg-muted/40 p-6 leading-relaxed text-muted-foreground">
              {smartWaterMonitor.entityDescription}
            </p>
          </Reveal>

          <div className="space-y-7">
            {productFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 70}>
                <div className="flex gap-4">
                  <IconTile icon={feature.icon} size="sm" />
                  <div className="min-w-0">
                    <h3 className="mb-1.5 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sticky spec panel */}
        <div className="lg:col-span-5">
          <Reveal variant="right" delay={100}>
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-card">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-grid opacity-50"
                  />
                  <img
                    src={assets.productImage}
                    alt={`Concept render of the ${smartWaterMonitor.name}, an IoT device for real-time water flow monitoring and automated valve control`}
                    width={775}
                    height={552}
                    loading="lazy"
                    decoding="async"
                    className="relative h-full w-full object-contain p-6"
                  />
                </div>

                <dl className="divide-y divide-border p-6">
                  {[
                    { label: "Status", value: smartWaterMonitor.status, highlight: true },
                    { label: "Target Market", value: smartWaterMonitor.targetMarket },
                    { label: "Architecture", value: smartWaterMonitor.architecture },
                    { label: "Category", value: smartWaterMonitor.category },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd
                        className={
                          row.highlight
                            ? "text-right text-sm font-semibold text-primary"
                            : "text-right text-sm font-medium text-foreground"
                        }
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-border p-6 pt-5">
                  <Button asChild variant="hero" size="lg" className="w-full">
                    <Link to="/contact">
                      Enquire about availability
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Currently in development — contact us to discuss timelines or partnerships.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>

    {/* ---- Technical overview ------------------------------------------ */}
    <Section tone="card" bordered>
      <SectionHeader
        label="Technical Overview"
        title="Built for reliability"
        description="Designed with industrial-grade components and proven technologies."
        centered
      />

      <div className="grid gap-6 md:grid-cols-3">
        {technicalOverview.map((item, index) => (
          <Reveal key={item.title} delay={index * 90} className="h-full">
            <FeatureCard icon={item.icon} title={item.title} description={item.description} />
          </Reveal>
        ))}
      </div>
    </Section>

        <CtaBanner
      title="Interested in our products?"
      description="KLS Academy is live and free to join today. The Smart Water Monitor is still in R&D — reach out to learn more about the timeline or discuss a partnership."
      primaryLabel="Contact our team"
      primaryHref="/contact"
      secondaryLabel="Explore our services"
      secondaryHref="/solutions"
    />
  </Layout>
);

export default Products;
