import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 dark:bg-black/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <nav className="container-narrow mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo - Enhanced background light effect with increased glow and shadows */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/kls-logo-nobg.png" 
            alt="KLS Solutions Logo" 
            className="h-32 w-auto drop-shadow-lg transition-all duration-300"
            style={{ 
              filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 30px rgba(6, 182, 212, 0.4))'
            }}
          />
          <span className="text-lg font-semibold text-white dark:text-white drop-shadow-md">
            KLS Tech Solutions
          </span>
        </Link>

        {/* Desktop Navigation - Updated text colors for contrast on dark glass */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                location.pathname === link.href
                  ? "text-white dark:text-white bg-primary/20 backdrop-blur-sm"
                  : "text-white/90 dark:text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle - Updated for glass background */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md text-white dark:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Applied glass effect to match header */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/80 dark:bg-black/80 backdrop-blur-md md:hidden animate-fade-in">
          <div className="container-narrow mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-medium transition-colors rounded-md",
                  location.pathname === link.href
                    ? "text-white dark:text-white bg-primary/20 backdrop-blur-sm"
                    : "text-white/90 dark:text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
