import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { organizationSchema, websiteSchema } from "@/lib/schema";

import Index from "./pages/Index";

/**
 * Routes are code-split so a visitor landing on the home page does not
 * download the contact form, its validation schema, or any other route.
 * Home itself is imported eagerly — it is the most common entry point, and
 * lazy-loading it would add a needless round trip to the critical path.
 */
const Solutions = lazy(() => import("./pages/Solutions"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/** Minimal viewport-height placeholder shown while a route chunk loads. */
const RouteFallback = () => (
  <div className="flex min-h-dvh items-center justify-center" role="status" aria-live="polite">
    <span className="sr-only">Loading page</span>
    <span
      className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
      aria-hidden="true"
    />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <BrowserRouter>
          {/* Organization and WebSite schema are site-wide, so they are
              emitted once here rather than repeated on every page. */}
          <JsonLd data={[organizationSchema(), websiteSchema()]} />

          <ScrollToTop />

          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solutions" element={<Solutions />} />
              {/* "Services" is the label used in navigation; this alias keeps
                  the friendlier URL working while consolidating ranking
                  signals onto the canonical /solutions path. */}
              <Route path="/services" element={<Navigate to="/solutions" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Keep every custom route above this catch-all. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
