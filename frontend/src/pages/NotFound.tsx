import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

import Reveal from "@/components/common/Reveal";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/config/seo";
import { isExternalNav, mainNav, type NavItem } from "@/config/site";

/** Suggested destinations: the main nav plus Contact, which lives in the header CTA. */
const suggestions: NavItem[] = [
  ...mainNav,
  { href: "/contact", label: "Contact", description: "Get in touch" },
];

const cardClass =
  "flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card";

/**
 * 404 page.
 *
 * The previous version logged every 404 to console.error, which surfaced as a
 * scary red error in production for what is ordinary user behaviour. It also
 * offered a single "back to home" button. This version gives the visitor
 * somewhere useful to go instead.
 */
const NotFound = () => (
  <Layout>
    <Seo {...pageMeta.notFound} />

    <section className="relative flex min-h-[80dvh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-surface" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]"
      />

      <div className="container-narrow relative text-center">
        <Reveal>
          <p className="heading-display text-gradient" aria-hidden="true">
            404
          </p>

          <h1 className="heading-section mt-4 text-foreground">Page not found</h1>

          <p className="body-large mx-auto mt-4 max-w-lg">
            The page you're looking for doesn't exist or has been moved. Here's where you might want
            to go instead.
          </p>
        </Reveal>

        {/* Useful destinations rather than a dead end. */}
        <Reveal delay={120}>
          <nav aria-label="Suggested pages" className="mx-auto mt-10 max-w-2xl">
            <ul className="grid gap-3 sm:grid-cols-2">
              {suggestions.map((item) => {
                const label = (
                  <>
                    <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">{item.label}</span>
                      {item.description && (
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </>
                );

                return (
                  <li key={item.href}>
                    {isExternalNav(item) ? (
                      <a href={item.href} className={cardClass}>
                        {label}
                      </a>
                    ) : (
                      <Link to={item.href} className={cardClass}>
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={180}>
          <Button asChild variant="hero" size="lg" className="mt-10">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  </Layout>
);

export default NotFound;
