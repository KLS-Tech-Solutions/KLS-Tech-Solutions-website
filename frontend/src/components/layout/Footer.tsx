import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "@/components/common/Logo";
import { company, contactInfo, contactLinks, footerNav } from "@/config/site";

/**
 * Site footer.
 *
 * Contact rows carry real icons and live links (tel:, mailto:) instead of the
 * previous plain text list, and the brand column uses the shared Logo rather
 * than the 128px JPEG-with-baked-background that was here before.
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

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-4">
            <Logo size="lg" />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {company.shortDescription} Based in {contactInfo.addressLocality},{" "}
              {contactInfo.addressRegion}.
            </p>

            <p className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{contactInfo.location}</span>
            </p>
          </div>

          {/* ---- Link groups ---- */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:gap-6">
            {footerNav.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
                <h2
                  id={`footer-${group.title.toLowerCase()}`}
                  className="mb-4 text-sm font-semibold text-foreground"
                >
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="rounded text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Get in Touch</h2>

            <ul className="space-y-3">
              {contactRows.map((row) => (
                <li key={row.href}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-2.5 rounded text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <row.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="break-all">{row.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              We typically respond within {contactInfo.responseTime}.
            </p>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Engineered with precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
