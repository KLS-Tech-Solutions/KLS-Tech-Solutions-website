import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Pill from "@/components/common/Pill";
import Reveal from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { company } from "@/config/site";
import { coreServices } from "@/content/services";
import { useRotatingIndex } from "@/hooks/useRotatingIndex";
import { cn } from "@/lib/utils";

/**
 * Home page hero.
 *
 * The H1 is the LCP element and is plain text with no webfont-dependent
 * layout shift — nothing above it competes for the first paint. The ambient
 * glow and grid are decorative, GPU-composited, and hidden from assistive
 * technology.
 *
 * The service line above the H1 rotates through the four pillars, and the
 * matching card in the stack lights up in step with it. Both read from the
 * same index, so the two halves of the hero can never disagree about which
 * service is on screen. The rotation stops for prefers-reduced-motion users
 * and while the tab is hidden — see useRotatingIndex.
 */
const HomeHero = () => {
  const activeIndex = useRotatingIndex(coreServices.length);
  const activePillar = coreServices[activeIndex];

  return (
    <section className="relative flex min-h-[92dvh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-6 md:pt-32 lg:px-8">
      {/* ---- Ambient background (decorative) ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-surface" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(75%_65%_at_50%_35%,#000_10%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[min(1100px,110%)] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px] motion-safe:animate-aurora"
      />

      <div className="container-wide relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Copy ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <Pill icon={Sparkles} tone="accent">
                {company.stage} — building in the open
              </Pill>
            </Reveal>

            <Reveal delay={60}>
              {/* Rotating service line. The height is reserved by the taller of
                  the two lines it can occupy, so nothing below it shifts as the
                  label changes. */}
              <p className="eyebrow mt-6 flex min-h-[1.75rem] flex-wrap items-center gap-x-2 gap-y-1">
                <span>We engineer</span>
                <span
                  // Keying on the id restarts the fade for each service.
                  key={activePillar.id}
                  className="text-gradient motion-safe:animate-fade-in"
                >
                  {activePillar.title}
                </span>
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="heading-display mt-4 text-foreground">
                Smart Living, <span className="text-gradient">Engineered</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="body-large mt-6 max-w-2xl">
                We design and develop intelligent IoT systems, enterprise SaaS platforms and
                AI-powered business applications, with enterprise-grade security at the core — and
                train the next generation of engineers through KLS Academy. From concept to
                deployment, engineered with precision.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                  <Link to="/products">
                    Explore our IoT products
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  <Link to="/solutions">Build a custom solution</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                Security designed in from day one — not added before launch.
              </p>
            </Reveal>
          </div>

          {/* ---- Pillar stack ---- */}
          {/* Presented as cards rather than a stock illustration: it puts real
              content above the fold and avoids shipping a large hero image.
              The card matching the rotating label above is highlighted. */}
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {coreServices.map((pillar, index) => {
                const active = index === activeIndex;

                return (
                  <Reveal as="li" key={pillar.id} variant="right" delay={200 + index * 90}>
                    <div
                      className={cn(
                        "group flex gap-4 rounded-2xl border p-5 shadow-xs backdrop-blur-sm",
                        "transition-all duration-500 ease-out-expo",
                        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
                        active
                          ? "border-primary/35 bg-card shadow-card"
                          : "border-border bg-card/70",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
                          "transition-all duration-500 ease-out-expo group-hover:scale-105",
                          active
                            ? "bg-gradient-brand text-primary-foreground ring-transparent"
                            : "bg-primary/10 text-primary ring-primary/15",
                        )}
                      >
                        <pillar.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-base font-semibold text-foreground">{pillar.title}</h2>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {/* The one-line summary where present: the full service
                              copy belongs in the services grid, not the hero. */}
                          {pillar.summary ?? pillar.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
