import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import Pill from "@/components/common/Pill";
import Reveal from "@/components/common/Reveal";
import HeroDevice from "@/components/sections/HeroDevice";
import { Button } from "@/components/ui/button";
import { company } from "@/config/site";
import { coreServices } from "@/content/services";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

/**
 * Home page hero.
 *
 * The H1 is the LCP element and is plain static text — nothing above it
 * competes for the first paint, and it is deliberately NOT the animated
 * element. Search engines and the accessibility tree both read a stable
 * "Smart Living, Engineered"; the motion lives on the line above it.
 *
 * That line already rotated through the three services on a timer. It now
 * types each one out instead, with a caret, and the service cards beneath
 * highlight from the same index — so the typed word and the highlighted card
 * can never disagree. The device panel plays the brand film independently;
 * syncing a 10-second film to a typing cycle would mean cutting one of them
 * to fit the other.
 *
 * The device replaces the pillar-card stack that used to sit here. The cards
 * were not dropped: they moved to a compact row beneath the fold line, where
 * they still carry the same three service descriptions.
 *
 * Both the typewriter and the scene rotation stop under
 * prefers-reduced-motion, and the typed line's height is reserved for two
 * lines of text so a long service name cannot reflow the page mid-keystroke.
 */
const HomeHero = () => {
  // Memoised so the typewriter effect is not torn down on every render.
  const serviceNames = useMemo(() => coreServices.map((s) => s.title), []);

  const { text, wordIndex, isAnimating } = useTypewriter({ words: serviceNames });

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8">
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
      {/* Hero-only pink wash, warming the right side behind the device. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[min(620px,70%)] rounded-full bg-brand-pink/10 blur-[110px]"
      />

      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- Copy ---- */}
          <div className="lg:col-span-6">
            <Reveal>
              <Pill icon={Sparkles} tone="accent">
                {company.stage} — building in the open
              </Pill>
            </Reveal>

            <Reveal delay={60}>
              {/*
                Typed service line. Height is reserved for two lines at every
                breakpoint: the text length changes on every keystroke, and an
                unreserved line would reflow the H1 below it continuously.
              */}
              <p className="eyebrow mt-6 flex min-h-[3.5rem] flex-wrap items-start gap-x-2 gap-y-1 sm:min-h-[2.25rem]">
                <span className="shrink-0">We engineer</span>
                <span className="text-gradient-hero">
                  {text}
                  {isAnimating && <span className="type-caret" aria-hidden="true" />}
                </span>
                {/* The typed text is decorative duplication — the same three
                    services are listed in full further down the page — so it
                    is announced once, completely, rather than letter by
                    letter. */}
                <span className="sr-only">
                  {serviceNames.join(", ")}
                </span>
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="heading-display mt-3 text-foreground">
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

          {/* ---- Device panel ---- */}
          <Reveal variant="right" delay={200} className="lg:col-span-6">
            <HeroDevice className="mx-auto max-w-[560px]" />
          </Reveal>
        </div>

        {/* ---- Service strip ---- */}
        {/* The pillar cards that previously filled the right column. Same
            three services, same copy, compacted into a row so they support
            the device rather than compete with it. */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
          {coreServices.map((pillar, index) => {
            const active = index === wordIndex;

            return (
              <Reveal
                as="li"
                key={pillar.id}
                delay={320 + index * 90}
                className={cn("h-full", index === coreServices.length - 1 && "sm:col-span-2 lg:col-span-1")}
              >
                <div
                  className={cn(
                    "flex h-full gap-3.5 rounded-2xl border p-4 shadow-xs backdrop-blur-sm sm:gap-4 sm:p-5",
                    "transition-all duration-500 ease-out-expo",
                    "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
                    active ? "border-primary/35 bg-card shadow-card" : "border-border bg-card/70",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset sm:h-11 sm:w-11",
                      "transition-all duration-500 ease-out-expo",
                      active
                        ? "bg-gradient-brand text-primary-foreground ring-transparent"
                        : "bg-primary/10 text-primary ring-primary/15",
                    )}
                  >
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-[0.9375rem] font-semibold text-foreground sm:text-base">
                      {pillar.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {pillar.summary ?? pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HomeHero;
