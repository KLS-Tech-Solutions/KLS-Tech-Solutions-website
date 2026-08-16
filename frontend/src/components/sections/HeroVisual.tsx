import {
  Boxes,
  Check,
  Cloud,
  Cpu,
  Droplets,
  GraduationCap,
  MessageSquare,
  ScrollText,
  Send,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Decorative hero artwork for interior pages.
 *
 * Interior heroes previously ran a single column of copy across a 6xl
 * container, which left the whole right-hand side of every page empty on
 * desktop. Each page now gets a visual tuned to its own subject.
 *
 * Three constraints shaped these:
 *
 *  - No images. Everything is markup plus CSS, so there is nothing extra to
 *    download, nothing to lazy-load, and no layout shift.
 *  - Everything is `aria-hidden`. These illustrate the copy beside them
 *    rather than adding information, so announcing them would be noise.
 *  - Every animation is behind `motion-safe:`. Reduced-motion users get the
 *    same composition, held still.
 *
 * They render from `lg` up. Below that the copy already fills the width, and
 * a decorative panel would just push the real content further down.
 */

export type HeroVisualVariant = "services" | "products" | "about" | "contact" | "legal";

/* ------------------------------------------------------------------ */
/* Shared shell                                                        */
/* ------------------------------------------------------------------ */

interface FrameProps {
  children: React.ReactNode;
  className?: string;
}

/** Glass panel with the brand glow behind it, shared by every variant. */
const Frame = ({ children, className }: FrameProps) => (
  <div className={cn("relative", className)}>
    {/* Glow sits behind the panel and bleeds past its edges. */}
    <div
      className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-primary/10 blur-3xl"
      aria-hidden="true"
    />

    <div className="relative motion-safe:animate-float">
      <div className="glass overflow-hidden rounded-3xl border shadow-elevated">{children}</div>
    </div>
  </div>
);

/** Small caption bar used at the top of most panels. */
const PanelHeader = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div className="flex items-center gap-2.5 border-b border-border/70 px-5 py-3.5">
    <Icon className="h-4 w-4 text-primary" />
    <span className="text-xs font-semibold tracking-wide text-foreground">{label}</span>

    {/* Live dot — the one thing that says "this is a running system". */}
    <span className="relative ml-auto flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 motion-safe:animate-ping-ring" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/* Services — the three-service stack, with a pulse travelling the spine */
/* ------------------------------------------------------------------ */

const SERVICE_ROWS: { icon: LucideIcon; title: string; meta: string }[] = [
  { icon: Cpu, title: "IoT Product Engineering", meta: "Hardware · Firmware · Edge" },
  { icon: Cloud, title: "Enterprise SaaS & AI", meta: "Multi-tenant · Agentic AI" },
  { icon: GraduationCap, title: "Verified Internships", meta: "Open source · QR verified" },
];

const ServicesVisual = () => (
  <Frame>
    <PanelHeader icon={Boxes} label="Service stack" />

    <div className="relative px-5 py-6">
      {/* Spine connecting the three rows, with a pulse running down it. */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-[2.6rem] top-10 w-px bg-gradient-to-b from-transparent via-border to-transparent"
      >
        <span
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-glow motion-safe:animate-travel-y"
          style={{ ["--travel-distance" as string]: "150px" }}
        />
      </div>

      <ul className="relative space-y-3">
        {SERVICE_ROWS.map((row, index) => (
          <li
            key={row.title}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card/80 p-3.5 motion-safe:animate-fade-up"
            style={{ animationDelay: `${index * 140}ms`, animationFillMode: "backwards" }}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
              <row.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.8125rem] font-semibold text-foreground">
                {row.title}
              </span>
              <span className="block truncate text-[0.6875rem] text-muted-foreground">
                {row.meta}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Security is the base every service sits on — shown literally. */}
      <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-primary/20 bg-primary/[0.07] px-3.5 py-3">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[0.6875rem] font-medium text-foreground">
          Security architecture underpins all three
        </span>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* Products — a telemetry readout for the Smart Water Monitor           */
/* ------------------------------------------------------------------ */

const ProductsVisual = () => (
  <Frame>
    <PanelHeader icon={Droplets} label="Smart Water Monitor" />

    <div className="px-5 py-6">
      {/* Flow trace. The path draws itself once on mount. */}
      <div className="relative h-28 overflow-hidden rounded-2xl border border-border bg-card/80 p-3">
        <svg viewBox="0 0 300 90" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kls-flow-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0,70 C25,70 30,38 52,38 C74,38 78,58 100,58 C122,58 128,22 150,22 C172,22 176,52 198,52 C220,52 226,30 248,30 C270,30 278,46 300,46 L300,90 L0,90 Z"
            fill="url(#kls-flow-fill)"
          />
          <path
            d="M0,70 C25,70 30,38 52,38 C74,38 78,58 100,58 C122,58 128,22 150,22 C172,22 176,52 198,52 C220,52 226,30 248,30 C270,30 278,46 300,46"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1000"
            className="motion-safe:animate-draw-line"
          />
        </svg>

        <span className="absolute right-3 top-3 rounded-md bg-card px-1.5 py-0.5 text-[0.625rem] font-medium text-muted-foreground shadow-xs">
          flow rate
        </span>
      </div>

      {/* Reads as instrumentation without asserting any real measurement. */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: "Leak check", value: "Active" },
          { label: "Valve", value: "Auto" },
          { label: "Link", value: "Secure" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card/80 px-2.5 py-3 text-center motion-safe:animate-fade-up"
            style={{ animationDelay: `${300 + index * 120}ms`, animationFillMode: "backwards" }}
          >
            <span className="block text-[0.625rem] uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </span>
            <span className="mt-1 block text-xs font-semibold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[0.625rem] text-muted-foreground">
        Illustrative — product is in R&amp;D
      </p>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* About — the three engineering principles, radiating out              */
/* ------------------------------------------------------------------ */

const PRINCIPLES = ["Technical Excellence", "Security First", "Honest Engineering"];

const AboutVisual = () => (
  <Frame>
    <div className="px-6 py-8">
      {/* Pulsing core, standing in for the engineering-first centre. */}
      <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
        <span className="absolute h-full w-full rounded-full bg-primary/20 motion-safe:animate-ping-ring" />
        <span
          className="absolute h-full w-full rounded-full bg-primary/15 motion-safe:animate-ping-ring"
          style={{ animationDelay: "1.2s" }}
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
          <span className="text-lg font-bold tracking-tight">KLS</span>
        </span>
      </div>

      <ul className="space-y-2.5">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-3.5 py-2.5 motion-safe:animate-fade-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "backwards" }}
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[0.8125rem] font-medium text-foreground">{principle}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-center text-[0.6875rem] leading-relaxed text-muted-foreground">
        Engineers solving problems — not marketing built around technology.
      </p>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* Contact — what happens after you hit send                            */
/* ------------------------------------------------------------------ */

/**
 * Deliberately not a mock contact form: the real form sits directly below
 * this on the page, and showing a fake one above it looks like a bug. This
 * shows the process instead, which the copy only mentions in passing.
 */
const CONTACT_STEPS: { icon: LucideIcon; title: string; meta: string }[] = [
  { icon: Send, title: "You send the details", meta: "Project, timeline, constraints" },
  { icon: MessageSquare, title: "An engineer reads it", meta: "Not a sales queue" },
  { icon: Check, title: "You get a straight answer", meta: "Within 1–2 business days" },
];

const ContactVisual = () => (
  <Frame>
    <PanelHeader icon={MessageSquare} label="What happens next" />

    <div className="relative px-5 py-6">
      {/* Spine linking the steps, matching the services panel. */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-[2.6rem] top-10 w-px bg-gradient-to-b from-transparent via-border to-transparent"
      >
        <span
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-glow motion-safe:animate-travel-y"
          style={{ ["--travel-distance" as string]: "150px" }}
        />
      </div>

      <ol className="relative space-y-3">
        {CONTACT_STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex items-center gap-3.5 rounded-2xl border border-border bg-card/80 p-3.5 motion-safe:animate-fade-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "backwards" }}
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
              <step.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.8125rem] font-semibold text-foreground">
                {step.title}
              </span>
              <span className="block truncate text-[0.6875rem] text-muted-foreground">
                {step.meta}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-primary/20 bg-primary/[0.07] px-3.5 py-3">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 motion-safe:animate-ping-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-[0.6875rem] font-medium text-foreground">
          Bengaluru, India — currently taking on new projects
        </span>
      </div>
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */
/* Legal — a plain document. Deliberately the quietest of the set.      */
/* ------------------------------------------------------------------ */

const LegalVisual = () => (
  <Frame>
    <PanelHeader icon={ScrollText} label="Document" />

    <div className="space-y-4 px-5 py-6">
      {[3, 4, 2].map((lines, section) => (
        <div
          key={section}
          className="space-y-2 motion-safe:animate-fade-up"
          style={{ animationDelay: `${section * 150}ms`, animationFillMode: "backwards" }}
        >
          <div className="h-2 w-1/3 rounded-full bg-primary/30" />
          {Array.from({ length: lines }).map((_, line) => (
            <div
              key={line}
              className="h-1.5 rounded-full bg-muted-foreground/20"
              style={{ width: `${94 - line * 11}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  </Frame>
);

/* ------------------------------------------------------------------ */

const VARIANTS: Record<HeroVisualVariant, React.ComponentType> = {
  services: ServicesVisual,
  products: ProductsVisual,
  about: AboutVisual,
  contact: ContactVisual,
  legal: LegalVisual,
};

interface HeroVisualProps {
  variant: HeroVisualVariant;
  className?: string;
}

const HeroVisual = ({ variant, className }: HeroVisualProps) => {
  const Visual = VARIANTS[variant];

  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <Visual />
    </div>
  );
};

export default HeroVisual;
