import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Two defects from the previous implementation are fixed here:
 *
 *  1. The logo rendered at h-32 (128px) inside an h-16 (64px) header, so it
 *     overflowed by 64px and sat on top of page content on every route. The
 *     Logo component now scales to the header.
 *
 *  2. The header was hard-coded `bg-black/80 text-white`, leaving a black bar
 *     floating over the page. It now uses the glass token and reads from the
 *     design system like everything else.
 */
const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /** Solidify the header once the user scrolls past the hero edge. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Close the menu whenever the route changes. */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /** Escape closes the menu and returns focus to the toggle. */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    // Prevent the page behind the overlay from scrolling.
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
        scrolled || mobileMenuOpen
          ? "glass border-b shadow-soft"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main navigation" className="container-wide px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo size="md" className="min-w-0" />

          {/* ---- Desktop navigation ---- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {/* Active indicator — decorative; state is on aria-current. */}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ---- Desktop actions ---- */}
          <div className="hidden items-center lg:flex">
            <Button asChild variant="hero" size="default">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* ---- Mobile actions ---- */}
          <div className="flex items-center lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ---- Mobile menu ---- */}
      <div
        id="mobile-menu"
        hidden={!mobileMenuOpen}
        className="glass max-h-[calc(100dvh-4rem)] overflow-y-auto border-t lg:hidden"
      >
        <ul className="container-wide space-y-1 px-5 py-4 sm:px-6">
          {mainNav.map((link) => {
            const active = isActive(link.href);

            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent active:bg-accent",
                  )}
                >
                  <span className="text-sm font-medium">{link.label}</span>
                  {link.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {link.description}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}

          <li className="pt-3">
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
