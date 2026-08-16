import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "@/components/common/Logo";
import { company, contactInfo, contactLinks, footerNav, isExternalNav } from "@/config/site";

/**
 * Site footer.
 *
 * The surface is the logo's own navy (--brand-navy, #04203F) rather than the
 * card white it used before, so the page closes on the brand mass and the
 * header/footer bookend each other. Because the navy is a fixed brand value
 * and not a theme token, the type on top of it is set in white alphas rather
 * than foreground/muted-foreground — those tokens are tuned for light
 * surfaces and would be unreadable here. Azure (the logo's highlight) carries
 * icons and hovers, which is the same relationship the two colours have in
 * the mark itself.
 *
 * Contact rows carry real icons and live links (tel:, mailto:), and the brand
 * column uses the shared Logo in its onDark variant — which now shows the same
 * full-colour mark as the header, on a white plate, rather than the flattened
 * white silhouette it used before.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  const contactRows = [
    { icon: Phone, label: contactInfo.phone, href: contactLinks.phone, external: false },
    { icon: Mail, label: contactInfo.email, href: contactLinks.email, external: false },
    {
      icon: Instagram,
      label: `@${contactInfo.instagram}`,
      href: contactLinks.instagram,
      external: true,
    },
  ];

  const linkClass =
    "rounded text-sm text-white/70 transition-colors hover:text-brand-azure focus-visible:ring-offset-brand-navy";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-navy text-white">
      {/* Ambient azure glow — the same treatment as the hero, decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[min(900px,120%)] -translate-x-1/2 rounded-full bg-brand-azure/10 blur-[110px]"
      />

      <div className="container-wide relative px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-4">
            <Logo size="lg" onDark />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {company.shortDescription} Based in {contactInfo.addressLocality},{" "}
              {contactInfo.addressRegion}.
            </p>

            <p className="mt-5 flex items-start gap-2.5 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-azure" aria-hidden="true" />
              <span>{contactInfo.location}</span>
            </p>
          </div>

          {/* ---- Link groups ---- */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:gap-6">
            {footerNav.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
                <h2
                  id={`footer-${group.title.toLowerCase()}`}
                  className="mb-4 text-sm font-semibold text-white"
                >
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    // KLS Academy lives on its own subdomain, so it needs a
                    // real anchor rather than a router link.
                    <li key={item.href}>
                      {isExternalNav(item) ? (
                        <a href={item.href} className={linkClass}>
                          {item.label}
                        </a>
                      ) : (
                        <Link to={item.href} className={linkClass}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm font-semibold text-white">Get in Touch</h2>

            <ul className="space-y-3">
              {contactRows.map((row) => (
                <li key={row.href}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-2.5 rounded text-sm text-white/70 transition-colors hover:text-brand-azure"
                  >
                    <row.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-azure transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="break-all">{row.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-white/60">
              We typically respond within {contactInfo.responseTime}.
            </p>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/70">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/60">Engineered with precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
