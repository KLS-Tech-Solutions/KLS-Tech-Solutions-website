import { useEffect } from "react";

/**
 * Reveals elements as they enter the viewport.
 *
 * A single IntersectionObserver is attached at the document level and watches
 * every [data-reveal] node, rather than one observer per component. Elements
 * are unobserved once revealed, so the observer set shrinks as the user scrolls
 * and there is no ongoing cost.
 *
 * The initial hidden state lives in CSS (see index.css), which means it applies
 * before hydration and there is no flash of positioned-then-moved content.
 * Users with prefers-reduced-motion are opted out entirely.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No IntersectionObserver, or motion is unwanted: show everything at once.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      {
        // Fire slightly before the element is fully on screen so the
        // transition finishes around the time it settles into view.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.05,
      },
    );

    nodes.forEach((node) => {
      // Anything already in view on mount is revealed immediately, avoiding
      // an empty first paint above the fold.
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.setAttribute("data-revealed", "true");
        return;
      }
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);
}
