import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { isExternalNav, mainNav, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Site header — a floating "Dynamic Island" pill.
 *
 * The header is a fixed, transparent shell; the visible surface is the rounded
 * pill inside it, which uses the same `glass` token as the previous bar, so
 * colours, blur and borders still come from the design system. On scroll the
 * pill tightens (height, horizontal padding, radius and shadow) rather than
 * changing colour, which is what gives it the island feel. On mobile the pill
 * expands downward into a single rounded panel instead of a full-width sheet.
 *
 * Navigation data, active-state logic and routing are unchanged. Items marked
 * `external` (KLS Academy, which lives on its own subdomain) render as plain
 * anchors so the router does not treat the absolute URL as a route.
 */
const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /** Shrink the island once the user scrolls past the hero edge. */
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

  const isActive = (item: NavItem) => {
    if (isExternalNav(item)) return false;
    return item.href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.href);
  };

  /**
   * One renderer for both menus: external items become anchors, internal ones
   * stay router links, so neither list can drift from the other.
   */
  const navLink = (item: NavItem, className: string, children: ReactNode) => {
    const active = isActive(item);
    const shared = {
      className,
      "aria-current": active ? ("page" as const) : undefined,
    };

    return isExternalNav(item) ? (
      <a href={item.href} {...shared}>
        {children}
      </a>
    ) : (
      <Link to={item.href} {...shared}>
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 lg:px-8">
      <div
        className={cn(
          "container-wide transition-all duration-500 ease-out-expo",
          scrolled || mobileMenuOpen ? "pt-2 sm:pt-2.5" : "pt-3 sm:pt-4",
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "glass mx-auto border shadow-soft transition-all duration-500 ease-out-expo",
            // The pill morphs into a rounded panel while the mobile menu is open.
            mobileMenuOpen ? "rounded-3xl" : "rounded-full",
            scrolled || mobileMenuOpen
              ? "max-w-6xl px-3 shadow-card sm:px-4"
              : "max-w-7xl px-4 sm:px-5",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-3 transition-all duration-500 ease-out-expo",
              scrolled ? "h-14 lg:h-[3.75rem]" : "h-16 lg:h-[4.25rem]",
            )}
          >
            <Logo size={scrolled ? "sm" : "md"} className="min-w-0" />

            {/* ---- Desktop navigation ---- */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {mainNav.map((item) => {
                const active = isActive(item);

                return (
                  <li key={item.href}>
                    {navLink(
                      item,
                      cn(
                        // Padding tightens at lg and relaxes at xl: with five
                        // nav items plus the logo and CTA, the pill would
                        // otherwise crowd on a 1024px screen.
                        "relative inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ease-out-expo xl:px-3.5",
                        active
                          ? "bg-accent/70 text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      ),
                      <>
                        {item.label}
                        {/* Active indicator — decorative; state is on aria-current. */}
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gradient-brand xl:inset-x-3.5"
                          />
                        )}
                      </>,
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ---- Desktop actions ---- */}
            <div className="hidden shrink-0 items-center lg:flex">
              <Button
                asChild
                variant="hero"
                size={scrolled ? "sm" : "default"}
                className="whitespace-nowrap rounded-full"
              >
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* ---- Mobile menu ---- */}
          {/* Rendered inside the island so it reads as the pill expanding. */}
          <div
            id="mobile-menu"
            hidden={!mobileMenuOpen}
            className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-[hsl(var(--glass-border))] pb-3 pt-3 lg:hidden"
          >
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActive(item);

                return (
                  <li key={item.href}>
                    {navLink(
                      item,
                      cn(
                        "block rounded-2xl px-4 py-3 transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent active:bg-accent",
                      ),
                      <>
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.description && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </>,
                    )}
                  </li>
                );
              })}

              <li className="px-1 pt-3">
                <Button asChild variant="hero" size="lg" className="w-full rounded-full">
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
