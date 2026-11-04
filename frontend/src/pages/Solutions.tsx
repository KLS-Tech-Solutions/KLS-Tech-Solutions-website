import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import FeatureCard from "@/components/common/FeatureCard";
import IconTile from "@/components/common/IconTile";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Layout from "@/components/layout/Layout";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/config/seo";
import {
  capabilities,
  coreServices,
  industries,
  processSteps,
  servicesFaqs,
} from "@/content/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Services & Solutions.
 *
 * Navigation labels this page "Services" because that is the term visitors
 * search for, while the /solutions URL is preserved so existing links and
 * indexing are not broken. /services redirects here — see App.tsx.
 */
const Solutions = () => (
  <Layout>
    <Seo {...pageMeta.solutions} />
    <JsonLd
      data={[
        breadcrumbSchema([{ name: "Services", path: "/solutions" }]),
        // One Service node per core service, so search and answer engines can
        // see the SaaS, AI and Academy offerings alongside the IoT work.
        ...coreServices.map((service) =>
          serviceSchema({
            name: service.title,
            description: service.description,
            offerings: service.bullets ? [...service.bullets] : undefined,
          }),
        ),
        // One Service node per industry, each describing what we actually
        // deliver for that sector.
        ...industries.map((industry) =>
          serviceSchema({
            name: `${industry.title} IoT & Automation Engineering`,
            description: industry.description,
            offerings: [...industry.bullets],
          }),
        ),
        serviceSchema({
          name: "Custom IoT Product Engineering",
          description:
            "End-to-end IoT engineering covering hardware design, firmware development, cloud infrastructure and security architecture.",
          offerings: capabilities.map((capability) => capability.title),
        }),
      ]}
    />

    <PageHero
      eyebrow="Services & Solutions"
      title="Custom IoT and automation engineering, end to end"
      description="We partner with organizations to design, develop, and deploy tailored IoT and automation solutions. From concept to production, engineered for your specific requirements."
      breadcrumbs={[{ name: "Services", path: "/solutions" }]}
      visual="services"
    >
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
          <Link to="/contact">
            Discuss your project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="heroOutline" size="lg" className="w-full sm:w-auto">
          <a href="#capabilities">See our capabilities</a>
        </Button>
      </div>
    </PageHero>

    {/* ---- What this service is ---------------------------------------- */}
    {/* Answer-engine block: states plainly what the service is, why it
        matters and who it is for, in complete self-contained sentences. */}
    <Section tone="muted">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="heading-section text-foreground">
              What is custom IoT engineering, and who needs it?
            </h2>
          </Reveal>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <Reveal delay={80}>
            <p className="body-large">
              Custom IoT engineering is the design and delivery of a connected system built around
              your requirements rather than assembled from an off-the-shelf platform. It spans the
              physical device, the firmware running on it, the cloud service it reports into, and
              the security architecture connecting all three.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              It matters because the constraints that make a project hard — unusual sensing
              requirements, a specific compliance posture, integration with equipment already on
              site, or the need to own rather than rent your infrastructure — are exactly the
              constraints generic platforms handle badly.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Organizations across manufacturing, property management and residential construction
              typically reach this point when an existing product forces a compromise they can't
              accept on data ownership, reliability or long-term cost.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>

    {/* ---- Services ---------------------------------------------------- */}
    {/* The same three services shown on the home page, rendered from the same
        source so the two pages cannot describe them differently. */}
    <Section id="services" bordered>
      <SectionHeader
        label="What We Do"
        title="Three services, one engineering team"
        description="IoT products, enterprise SaaS and AI platforms, and open-source remote internships through KLS Academy — built by the same people, to the same standard."
        centered
      />

      {/* One column on mobile, two on tablet, three from lg. `items-stretch`
          plus h-full on the card keeps all three the same height on every
          row, so the cards line up regardless of copy length. */}
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, index) => (
          <Reveal
            key={service.id}
            delay={index * 90}
            className={cn(
              "h-full",
              // With three cards in a two-column tablet grid the last one is
              // orphaned; centring it avoids a lopsided gap.
              index === coreServices.length - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <FeatureCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              bullets={service.bullets}
            />
          </Reveal>
        ))}
      </div>

      {/* Security is no longer a fourth card because it isn't bought
          separately — it underpins all three. Stated once, plainly. */}
      <Reveal delay={320}>
        <p className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-3 rounded-2xl border border-border bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground sm:items-center sm:text-center">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground">Security underpins all three. </span>
            Encrypted communications, secure boot and compliance-ready infrastructure are built into
            every engagement from day one — never added before launch.
          </span>
        </p>
      </Reveal>
    </Section>

    {/* ---- Industries -------------------------------------------------- */}
    <Section id="industries" tone="muted" bordered>
      <SectionHeader
        label="Industries We Serve"
        title="Tailored for your sector"
        description="Our engineering expertise spans across multiple industries, with solutions designed for each sector's unique challenges."
        centered
      />

      {/* Same breakpoints as the services grid above and the home page, so
          every card row on the site behaves identically. */}
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <Reveal
            key={industry.id}
            delay={index * 90}
            className={cn(
              "h-full",
              index === industries.length - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <div className="flex h-full flex-col">
              <FeatureCard
                icon={industry.icon}
                title={industry.title}
                description={industry.description}
                bullets={industry.bullets}
                className="flex-1"
              />
              <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Who it's for: </span>
                {industry.audience}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Capabilities ------------------------------------------------ */}
    <Section id="capabilities" tone="card" bordered>
      <SectionHeader
        label="Our Capabilities"
        title="End-to-end engineering"
        description="From hardware design to cloud infrastructure, we handle every layer of the stack."
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.id} delay={index * 80}>
            <div className="flex gap-5">
              <IconTile icon={capability.icon} size="lg" />
              <div className="min-w-0">
                <h3 className="heading-card mb-2 text-foreground">{capability.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{capability.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Process ----------------------------------------------------- */}
    <Section id="process">
      <SectionHeader
        label="Our Process"
        title="How we work"
        description="A structured approach to delivering reliable, scalable solutions. Each stage produces something reviewable, so you are never waiting until the end to see progress."
        centered
      />
      <ProcessSteps steps={processSteps} />
    </Section>

    {/* ---- FAQ --------------------------------------------------------- */}
    <FaqSection
      items={servicesFaqs}
      label="Service FAQ"
      title="Questions about working with us"
      description="What we build, how we work, and how engagements are structured."
      withSchema={false}
    />

    <CtaBanner
      title="Let's discuss your project"
      description="Have a specific challenge in mind? We'd love to hear about it. Schedule a consultation to explore how we can help."
      primaryLabel="Start a conversation"
      primaryHref="/contact"
      secondaryLabel="See our products"
      secondaryHref="/products"
    />
  </Layout>
);

export default Solutions;
