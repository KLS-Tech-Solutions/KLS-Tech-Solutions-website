import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Reveal from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaBannerProps {
  title: string;
  description: string;
  /** Primary action. */
  primaryLabel: string;
  primaryHref: string;
  /** Optional secondary action. */
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

/**
 * Closing call-to-action.
 *
 * Five pages previously ended with near-identical hand-written CTA sections
 * that had drifted apart in spacing and button sizing. They now share this
 * one component, so the closing beat is consistent site-wide.
 */
const CtaBanner = ({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CtaBannerProps) => (
  <section className={cn("section-padding", className)}>
    <div className="container-narrow">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-card px-6 py-14 text-center shadow-card sm:px-12 md:py-20">
          {/* Decorative brand wash behind the copy. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[min(700px,90%)] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="heading-section text-foreground">{title}</h2>
            <p className="body-large mt-4">{description}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <Link to={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>

              {secondaryLabel && secondaryHref && (
                <Button asChild variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  <Link to={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CtaBanner;
