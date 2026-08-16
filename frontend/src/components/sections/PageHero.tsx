import type { ReactNode } from "react";

import Breadcrumbs, { type Crumb } from "@/components/common/Breadcrumbs";
import Reveal from "@/components/common/Reveal";
import HeroVisual, { type HeroVisualVariant } from "@/components/sections/HeroVisual";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  /** Small uppercase label above the H1. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Status chip or similar, rendered above the eyebrow. */
  badge?: ReactNode;
  /** Breadcrumb trail beneath Home. */
  breadcrumbs?: Crumb[];
  /**
   * Decorative artwork for the right column, chosen per page. Omit it and the
   * hero falls back to a single centred-left column.
   */
  visual?: HeroVisualVariant;
  /** Buttons or supplementary content below the description. */
  children?: ReactNode;
  className?: string;
}

/**
 * Shared hero for every interior page.
 *
 * Two things changed here after seeing it rendered:
 *
 *  1. The title used `.heading-display`, which is sized for the full-width
 *     home hero. On an interior page it wrapped to four lines and pushed the
 *     description below the fold. It now uses `.heading-page`.
 *
 *  2. Copy was capped at `max-w-3xl` inside a 6xl container with nothing
 *     beside it, leaving the right half of every page empty on desktop. The
 *     hero is now a 12-column grid: copy on the left, a page-specific visual
 *     on the right from `lg` up.
 *
 * The right column is decorative. It carries no information that isn't
 * already in the copy, so it is hidden from assistive technology and dropped
 * entirely below `lg` rather than stacked — on a phone it would only push the
 * real content further down.
 */
const PageHero = ({
  eyebrow,
  title,
  description,
  badge,
  breadcrumbs,
  visual,
  children,
  className,
}: PageHeroProps) => (
  <header
    className={cn(
      "relative overflow-hidden border-b border-border bg-gradient-surface",
      "px-5 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8",
      className,
    )}
  >
    {/* Ambient brand wash. Decorative only, hidden from assistive tech. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_100%)]"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
    />

    <div className="container-narrow relative">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---- Copy ---- */}
        <div className={cn(visual ? "lg:col-span-7" : "max-w-3xl lg:col-span-12")}>
          {badge && <Reveal className="mb-5">{badge}</Reveal>}

          {eyebrow && (
            <Reveal delay={40}>
              <p className="eyebrow mb-4">{eyebrow}</p>
            </Reveal>
          )}

          <Reveal delay={80}>
            <h1 className="heading-page text-foreground">{title}</h1>
          </Reveal>

          {description && (
            <Reveal delay={140}>
              <p className="body-large mt-6 max-w-2xl">{description}</p>
            </Reveal>
          )}

          {children && <Reveal delay={200}>{children}</Reveal>}
        </div>

        {/* ---- Visual ---- */}
        {visual && (
          <Reveal variant="right" delay={220} className="hidden lg:col-span-5 lg:block">
            <HeroVisual variant={visual} />
          </Reveal>
        )}
      </div>
    </div>
  </header>
);

export default PageHero;
