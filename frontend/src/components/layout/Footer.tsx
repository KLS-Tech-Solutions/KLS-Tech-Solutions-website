import { Link } from "react-router-dom";
import { contactInfo, contactLinks } from "@/config/contact";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-narrow mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/kls-logo-footer.jpg" 
                alt="KLS Solutions Footer Logo" 
                className="h-32 w-auto"
              />
              <span className="text-lg font-semibold text-foreground">
                KLS Tech Solutions
              </span>
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Engineering intelligent systems for smart living. We design and develop 
              IoT solutions with AI-driven capabilities and enterprise-grade security.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/solutions", label: "Solutions" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a 
                  href={contactLinks.phone} 
                  className="transition-colors hover:text-primary"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a 
                  href={contactLinks.email} 
                  className="transition-colors hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a 
                  href={contactLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  @{contactInfo.instagram}
                </a>
              </li>
              <li className="text-muted-foreground">
                {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KLS Tech Solutions. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
