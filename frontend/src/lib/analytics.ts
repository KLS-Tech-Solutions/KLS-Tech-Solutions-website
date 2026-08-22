/**
 * Google Analytics 4 helpers.
 *
 * The tag itself is loaded in index.html, which is also where the decision to
 * enable it is made (it is skipped on localhost). This module only wraps the
 * global `gtag` so application code never has to null-check it.
 *
 * Everything here is a no-op when analytics is disabled or the script has
 * been blocked, which is common — ad blockers block gtag.js routinely. Calls
 * must therefore never be relied on for application behaviour.
 */

export const GA_MEASUREMENT_ID = "G-9BLPF7SCZK";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Set by the inline snippet in index.html. */
    __KLS_ANALYTICS_ENABLED__?: boolean;
  }
}

/** True only when the tag was configured and the script actually loaded. */
export function isAnalyticsEnabled(): boolean {
  return (
    typeof window !== "undefined" &&
    window.__KLS_ANALYTICS_ENABLED__ === true &&
    typeof window.gtag === "function"
  );
}

/**
 * Reports a page view for a client-side route change.
 *
 * The initial page load is already reported by gtag('config') in index.html,
 * so callers must not send one for the first render or it will be counted
 * twice.
 */
export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

/**
 * Reports a custom event — a contact form submission, an outbound click.
 *
 * GA4 event names should be snake_case and under 40 characters; parameter
 * values are truncated at 100 characters by Google.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("event", name, params);
}
