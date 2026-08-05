import { useEffect, useState } from "react";

/**
 * Cycles an index from 0..length-1 on a fixed interval.
 *
 * Used by the hero to rotate through the service pillars. Two things it does
 * that a bare setInterval does not:
 *
 *  - Honours prefers-reduced-motion. Content that changes on its own is motion,
 *    even when nothing slides, so for those users the index stays put at 0.
 *  - Pauses while the tab is hidden, so a backgrounded tab is not repainting
 *    every few seconds for nobody.
 */
export const useRotatingIndex = (length: number, intervalMs = 3200) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let timer: number | undefined;

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % length);
      }, intervalMs);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.clearInterval(timer);
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [length, intervalMs]);

  return index;
};
