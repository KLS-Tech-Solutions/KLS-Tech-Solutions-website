import type { ReactNode } from "react";

import Breadcrumbs, { type Crumb } from "@/components/common/Breadcrumbs";
import Reveal from "@/components/common/Reveal";
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
  /** Buttons or supplementary content below the description. */
  children?: ReactNode;
  className?: string;
}

/**
 * Shared hero for every interior page.
 *
 * The old version stamped a 128px decorative logo at the top of four separate
 * page heroes — duplicated markup that repeated the navbar and became the
 * largest above-the-fold paint on those routes. Interior heroes now lead with
 * the H1, which is both better for LCP and clearer for search engines.
 */
const PageHero = ({
  eyebrow,
  title,
  description,
  badge,
  breadcrumbs,
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

      <div className="max-w-3xl">
        {badge && <Reveal className="mb-5">{badge}</Reveal>}
        {eyebrow && (
          <Reveal delay={40}>
            <p className="eyebrow mb-4">{eyebrow}</p>
          </Reveal>
        )}

        <Reveal delay={80}>
          <h1 className="heading-display text-foreground">{title}</h1>
        </Reveal>

        {description && (
          <Reveal delay={140}>
            <p className="body-large mt-6">{description}</p>
          </Reveal>
        )}

        {children && <Reveal delay={200}>{children}</Reveal>}
      </div>
    </div>
  </header>
);

export default PageHero;
