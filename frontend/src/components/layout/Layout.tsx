import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Page shell: skip link, fixed header, main landmark, footer.
 *
 * The scroll-reveal observer is initialised once here rather than per section,
 * so a page with thirty animated blocks still creates exactly one observer.
 */
const Layout = ({ children }: LayoutProps) => {
  useScrollReveal();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Visible only on keyboard focus — lets keyboard and screen reader users
          jump straight past the navigation. */}
      <a
        href="#main-content"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-elevated"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* No top padding: each page opens with its own hero, which renders its
          own spacing beneath the fixed header. */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
