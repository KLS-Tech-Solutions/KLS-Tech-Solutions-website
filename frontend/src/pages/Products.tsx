import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import FeatureCard from "@/components/common/FeatureCard";
import IconTile from "@/components/common/IconTile";
import Pill from "@/components/common/Pill";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Layout from "@/components/layout/Layout";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/config/seo";
import { assets } from "@/config/site";
import {
  productFaqs,
  productFeatures,
  smartWaterMonitor,
  technicalOverview,
} from "@/content/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

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
      ]}
    />

    <PageHero
      badge={
        <Pill icon={Zap} tone="accent">
          R&amp;D Phase — not yet available for purchase
        </Pill>
      }
      eyebrow="Our Products"
      title="Intelligent IoT products, engineered for the real world"
      description="Designed for reliability, security, and real-world impact. Our product line is currently in the research and development phase."
      breadcrumbs={[{ name: "Products", path: "/products" }]}
    />

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

    {/* ---- FAQ --------------------------------------------------------- */}
    <FaqSection
      items={productFaqs}
      label="Product FAQ"
      title="Questions about the Smart Water Monitor"
      description="What it does, how it works, and where it currently stands."
      tone="muted"
    />

    <CtaBanner
      title="Interested in our products?"
      description="We're currently in the R&D phase. Reach out to learn more about our development timeline or discuss potential partnerships."
      primaryLabel="Contact our team"
      primaryHref="/contact"
      secondaryLabel="Explore our services"
      secondaryHref="/solutions"
    />
  </Layout>
);

export default Products;
