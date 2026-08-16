import { ArrowRight, ChevronRight, Droplets, Zap } from "lucide-react";
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
import HomeHero from "@/components/sections/HomeHero";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/config/seo";
import { company } from "@/config/site";
import { expertiseAreas, homeFaqs, solutionAreas, whyChooseUs } from "@/content/home";
import { smartWaterMonitor } from "@/content/products";
import { coreServices, industries, processSteps } from "@/content/services";
import { cn } from "@/lib/utils";

const Index = () => (
  <Layout>
    <Seo {...pageMeta.home} />

    <HomeHero />

    {/* ---- Who we are -------------------------------------------------- */}
    {/* A single plain-language entity paragraph, placed high on the page.
        This is the block AI assistants and answer engines quote when asked
        "what is KLS Tech Solutions", so it is written to stand alone. */}
    <Section tone="muted" bordered>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-3">About the company</p>
            <h2 className="heading-section text-foreground">
              An engineering-first technology company in Bengaluru
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <p className="body-large">{company.description}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We're not a marketing company that builds tech. We're engineers who solve real
              problems — which means being straightforward about what's possible, and building
              systems that are still maintainable years after they ship.
            </p>
            <Button asChild variant="link" size="lg" className="mt-4 px-0">
              <Link to="/about">
                Read more about how we work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>

    {/* ---- Services ---------------------------------------------------- */}
    <Section id="services">
      <SectionHeader
        label="What We Do"
        title="Engineering excellence across three pillars"
        description="We bring together IoT hardware, enterprise SaaS and AI platforms, and open-source virtual internships through KLS Academy — with security architecture underpinning all three."
        centered
      />

      {/* Mirrors the Services page grid exactly: same breakpoints, same
          equal-height behaviour, same card component. The two pages read
          from coreServices, so they cannot fall out of step. */}
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, index) => (
          <Reveal
            key={service.id}
            delay={index * 90}
            className={cn(
              "h-full",
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

      <Reveal delay={280} className="mt-10 text-center">
        <Button asChild variant="heroOutline" size="lg">
          <Link to="/solutions">
            See all engineering services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </Reveal>
    </Section>

    {/* ---- Why KLS ----------------------------------------------------- */}
    <Section tone="card" bordered>
      <SectionHeader
        label="Why KLS Tech Solutions"
        title="An engineering-first mindset"
        description="We're not a marketing company that builds tech. We're engineers who solve real problems."
        centered
      />

      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, index) => (
          <Reveal
            key={item.number}
            delay={index * 90}
            className={cn(
              "h-full",
              index === whyChooseUs.length - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card sm:p-7">
              {/* Oversized step number as a watermark. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-bold text-primary/[0.07] transition-colors duration-300 group-hover:text-primary/[0.12]"
              >
                {item.number}
              </span>

              <div className="relative">
                <span className="inline-flex h-10 items-center rounded-full border border-primary/25 bg-primary/10 px-3 text-sm font-semibold text-primary">
                  {item.number}
                </span>
                <h3 className="heading-card mt-5 text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Technology expertise ---------------------------------------- */}
    <Section id="expertise">
      <SectionHeader
        label="Technology Expertise"
        title="Every layer of the stack, in one team"
        description="From embedded firmware running on the device to the cloud platform it reports into — and the security architecture that connects them."
        centered
      />

      {/* Same padding, radius, border and hover as FeatureCard so this grid
          reads as part of the same family rather than a one-off. */}
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {expertiseAreas.map((area, index) => (
          <Reveal key={area.id} delay={index * 80} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card sm:p-6">
              <IconTile icon={area.icon} className="mb-5" />
              <h3 className="heading-card mb-4 line-clamp-2 text-foreground">{area.title}</h3>
              <ul className="space-y-2.5">
                {area.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Industries -------------------------------------------------- */}
    <Section tone="muted" bordered id="industries">
      <SectionHeader
        label="Industries We Serve"
        title="Tailored for your sector"
        description="Our engineering expertise spans multiple industries, with solutions designed for each sector's unique challenges."
        centered
      />

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
            <FeatureCard
              icon={industry.icon}
              title={industry.title}
              description={industry.description}
              bullets={industry.bullets}
            />
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Product highlight ------------------------------------------- */}
    <Section id="smart-water-monitor">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="left">
          <Pill icon={Zap} tone="accent" className="mb-5">
            Under Research &amp; Development
          </Pill>

          <p className="eyebrow mb-3">Flagship Product</p>
          <h2 className="heading-section text-foreground">{smartWaterMonitor.name}</h2>

          <p className="body-large mt-5">
            Our flagship IoT solution for intelligent water management. Real-time monitoring,
            predictive leak detection, and automated flow control — all secured by end-to-end
            encryption.
          </p>

          <ul className="mt-8 space-y-3.5">
            {smartWaterMonitor.highlights.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <ChevronRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </span>
                <span className="text-[0.9375rem]">{feature}</span>
              </li>
            ))}
          </ul>

          <Button asChild variant="hero" size="lg" className="mt-9">
            <Link to="/products">
              Explore the Smart Water Monitor
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-8 shadow-card sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid opacity-50"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
              />

              <div className="relative flex aspect-square items-center justify-center">
                <Droplets className="h-28 w-28 text-primary sm:h-32 sm:w-32" aria-hidden="true" />
              </div>
            </div>

            {/* Spec chips, floating over the panel edge. */}
            <dl className="absolute -bottom-5 left-6 right-6 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card/90 p-3 shadow-card backdrop-blur-md">
              {[
                { label: "Status", value: smartWaterMonitor.status },
                { label: "Market", value: smartWaterMonitor.targetMarket },
                { label: "Architecture", value: smartWaterMonitor.architecture },
              ].map((spec) => (
                <div key={spec.label} className="min-w-0 px-1 text-center">
                  <dt className="truncate text-[0.6875rem] uppercase tracking-wide text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="mt-0.5 truncate text-xs font-semibold text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>

    {/* ---- Custom solutions -------------------------------------------- */}
    <Section tone="card" bordered className="pt-28 md:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
          {solutionAreas.map((area, index) => (
            <Reveal
              key={area.id}
              delay={index * 90}
              className={index === 2 ? "sm:col-span-2" : undefined}
            >
              <div className="h-full rounded-2xl border border-border bg-background p-6 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card">
                <IconTile icon={area.icon} size="sm" className="mb-4" />
                <h3 className="mb-1.5 font-semibold text-foreground">{area.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeader
            label="Custom Solutions"
            title="Tailored engineering for your needs"
            description="From industrial automation to smart home systems, we partner with you to design, develop, and deploy solutions that fit your exact requirements."
            className="mb-8"
          />
          <Reveal delay={120}>
            <Button asChild variant="hero" size="lg">
              <Link to="/solutions">
                Explore custom IoT solutions
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>

    {/* ---- Process ----------------------------------------------------- */}
    <Section id="process">
      <SectionHeader
        label="Our Process"
        title="How we work"
        description="A structured approach to delivering reliable, scalable solutions — with something reviewable at every stage."
        centered
      />
      <ProcessSteps steps={processSteps} />
    </Section>

    {/* ---- FAQ --------------------------------------------------------- */}
    <FaqSection
      items={homeFaqs}
      label="Common Questions"
      title="What people ask about KLS Tech Solutions"
      description="Straight answers about who we are, what we build, and where we are today."
    />

    <CtaBanner
      title="Let's build something intelligent"
      description="Ready to bring your IoT vision to life? We're here to help you design, develop, and deploy systems that make a difference."
      primaryLabel="Start a conversation"
      primaryHref="/contact"
      secondaryLabel="Browse our services"
      secondaryHref="/solutions"
    />
  </Layout>
);

export default Index;
