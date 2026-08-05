import { Eye, Target } from "lucide-react";

import IconTile from "@/components/common/IconTile";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import Layout from "@/components/layout/Layout";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import { pageMeta } from "@/config/seo";
import { company } from "@/config/site";
import { aboutFaqs, mission, teamFacts, teamNarrative, values, vision } from "@/content/about";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/schema";

const About = () => (
  <Layout>
    <Seo {...pageMeta.about} />
    <JsonLd data={[breadcrumbSchema([{ name: "About", path: "/about" }]), aboutPageSchema()]} />

    <PageHero
      eyebrow="About Us"
      title="Engineering-first, by design"
      description="We're an engineering-first company focused on building intelligent systems that solve real problems. No hype, no buzzwords — just solid engineering and practical innovation."
      breadcrumbs={[{ name: "About", path: "/about" }]}
    />

    {/* ---- Entity statement -------------------------------------------- */}
    <Section tone="muted">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="body-large">{company.description}</p>
      </Reveal>
    </Section>

    {/* ---- Mission & Vision -------------------------------------------- */}
    <Section bordered>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {[
          { icon: Target, ...mission },
          { icon: Eye, ...vision },
        ].map((item, index) => (
          <Reveal key={item.title} delay={index * 100}>
            <article className="h-full rounded-2xl border border-border bg-card p-8 shadow-xs transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card sm:p-10">
              <IconTile icon={item.icon} size="lg" solid={index === 0} className="mb-6" />
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Values ------------------------------------------------------ */}
    <Section tone="card" bordered>
      <SectionHeader
        label="Our Values"
        title="Engineering principles"
        description="The core beliefs that guide how we work and what we build."
        centered
      />

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.id} delay={index * 90} className="h-full">
            <article className="flex h-full flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card">
              <IconTile icon={value.icon} size="lg" className="mb-5" />
              <h3 className="heading-card mb-2.5 text-foreground">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ---- Team -------------------------------------------------------- */}
    <Section id="team">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            label="Our Team"
            title="Engineers building for engineers"
            className="mb-6"
          />
          <Reveal delay={80}>
            {teamNarrative.map((paragraph) => (
              <p key={paragraph} className="mb-5 leading-relaxed text-muted-foreground last:mb-0">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Qualitative facts only — no invented headcounts or project totals. */}
        <Reveal variant="right" delay={120}>
          <dl className="grid grid-cols-2 gap-4">
            {teamFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-xs transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
              >
                <dt className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd>
                  <span className="block text-2xl font-bold text-foreground">{fact.value}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{fact.detail}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 rounded-2xl border border-border bg-gradient-card p-6 text-center shadow-xs">
            <p className="font-semibold text-foreground">Engineering-First Culture</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We solve problems with technology, not marketing.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>

    {/* ---- FAQ --------------------------------------------------------- */}
    <FaqSection
      items={aboutFaqs}
      label="About FAQ"
      title="More about who we are"
      description="Our background, our approach, and what engineering-first means in practice."
    />

    <CtaBanner
      title="Want to learn more?"
      description="We're always open to conversations about technology, partnerships, or potential collaborations."
      primaryLabel="Get in touch"
      primaryHref="/contact"
      secondaryLabel="See what we build"
      secondaryHref="/solutions"
    />
  </Layout>
);

export default About;
