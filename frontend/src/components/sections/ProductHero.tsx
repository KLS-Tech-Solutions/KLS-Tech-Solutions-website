import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import Breadcrumbs from "@/components/common/Breadcrumbs";
import Pill from "@/components/common/Pill";
import Reveal from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { useRotatingIndex } from "@/hooks/useRotatingIndex";
import { cn } from "@/lib/utils";

/**
 * Products page hero, rotating between the two products.
 *
 * Built from the same parts as PageHero — same background wash, same grid,
 * same breadcrumb placement — rather than a new layout, so the page still
 * matches every other interior page. What changes is that the headline,
 * status chip, blurb and call to action all swap together.
 *
 * Rotation reuses useRotatingIndex, which already pauses on a hidden tab and
 * holds at the first entry under prefers-reduced-motion. That matters here:
 * an auto-advancing headline is motion, and a reduced-motion visitor sees
 * KLS Academy and nothing moving.
 *
 * The H1 keeps a stable prefix ("Our products.") and only the product name
 * swaps, so there is always one coherent heading for search engines and the
 * accessibility tree rather than a sentence that rewrites itself.
 */

export interface HeroProduct {
  id: string;
  /** Short status chip above the heading. */
  badge: string;
  name: string;
  blurb: string;
  ctaLabel: string;
  ctaHref: string;
  /** External links render as <a>; internal ones as router links. */
  ctaExternal?: boolean;
  secondaryLabel: string;
  /** In-page anchor for the matching section. */
  secondaryHref: string;
}

interface ProductHeroProps {
  products: readonly HeroProduct[];
}

const ProductHero = ({ products }: ProductHeroProps) => {
  const index = useRotatingIndex(products.length, 5200);
  const active = products[index];

  return (
    <header className="relative overflow-hidden border-b border-border bg-gradient-surface px-5 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8">
      {/* Ambient wash, matching PageHero exactly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-narrow relative">
        <Breadcrumbs items={[{ name: "Products", path: "/products" }]} />

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Our Products</p>
            </Reveal>

            {/*
              Height is reserved for the taller of the two states so the page
              does not jump as the product changes. Keying on the product id
              restarts the fade.
            */}
            <div className="min-h-[19rem] sm:min-h-[17rem] lg:min-h-[19rem]">
              <Reveal delay={60}>
                <div key={active.id} className="motion-safe:animate-fade-in">
                  <Pill tone="accent" className="mb-5">
                    {active.badge}
                  </Pill>

                  <h1 className="heading-page text-foreground">
                    Our products.{" "}
                    <span className="text-gradient-hero">{active.name}</span>
                  </h1>

                  <p className="body-large mt-5 max-w-2xl">{active.blurb}</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                  {active.ctaExternal ? (
                    <a href={active.ctaHref}>
                      {active.ctaLabel}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link to={active.ctaHref}>
                      {active.ctaLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </Button>
                <Button asChild variant="heroOutline" size="lg" className="w-full sm:w-auto">
                  <a href={active.secondaryHref}>{active.secondaryLabel}</a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- Product switcher ---- */}
          {/* Also the rotation indicator: whichever product is on screen is
              the highlighted row. Clicking jumps to its section. */}
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {products.map((product, i) => {
                const isActive = i === index;

                return (
                  <Reveal as="li" key={product.id} variant="right" delay={180 + i * 90}>
                    <a
                      href={product.secondaryHref}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border p-4 shadow-xs backdrop-blur-sm sm:p-5",
                        "transition-all duration-500 ease-out-expo",
                        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
                        isActive
                          ? "border-primary/35 bg-card shadow-card"
                          : "border-border bg-card/70",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 ring-inset",
                          "transition-all duration-500 ease-out-expo",
                          isActive
                            ? "bg-gradient-brand text-primary-foreground ring-transparent"
                            : "bg-primary/10 text-primary ring-primary/15",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.9375rem] font-semibold text-foreground">
                          {product.name}
                        </span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {product.badge}
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductHero;
