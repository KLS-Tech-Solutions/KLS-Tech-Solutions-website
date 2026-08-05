import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Final value to count to. */
  end: number;
  /** Duration in milliseconds. */
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
}

/**
 * Counts from zero to `end` once the element scrolls into view.
 *
 * Uses requestAnimationFrame with an ease-out curve rather than setInterval,
 * so the animation stays in step with the display refresh rate and pauses
 * automatically when the tab is backgrounded.
 */
export function useCountUp({ end, duration = 1600, decimals = 0 }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }

    let frame = 0;

    const run = () => {
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo — fast start, gentle settle.
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(end * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;
          run();
          observer.disconnect();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return { ref, display: value.toFixed(decimals) };
}
