import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { trackPageView } from "@/lib/analytics";

/**
 * Reports a GA4 page view on every client-side route change.
 *
 * Why this is needed: gtag.js fires exactly one page_view, on the initial
 * document load. This site is a single-page app, so every navigation after
 * that happens without a page load. Without this component Google Analytics
 * would record one pageview per session and show a 100% bounce rate,
 * regardless of how much of the site someone actually read.
 *
 * Two details that are easy to get wrong:
 *
 *  - The first render is skipped. gtag('config') in index.html has already
 *    reported the landing page, so sending one here too double-counts it.
 *
 *  - The send is deferred by a frame plus a short delay. Page titles are set
 *    by react-helmet-async in its own effect, and the order of that effect
 *    relative to this one is not guaranteed. Reading document.title
 *    immediately can therefore attach the PREVIOUS page's title to the new
 *    page's view.
 */
const TITLE_SETTLE_MS = 120;

const RouteAnalytics = () => {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      trackPageView(`${pathname}${search}`);
    }, TITLE_SETTLE_MS);

    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

export default RouteAnalytics;
