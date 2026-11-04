import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The hero's device panel — a wall-mounted IoT control unit playing the KLS
 * brand film.
 *
 * Deliberately not a desktop monitor. KLS builds connected hardware, so the
 * frame is a device the company could plausibly have made: rounded chassis,
 * inset bezel, a live status LED and a sensor slot along the top edge. The
 * film is dark navy and cyan, so inside a light chassis it reads as a screen
 * that is genuinely powered on.
 *
 * Loading strategy, which matters because an autoplaying hero video is the
 * classic way to wreck Largest Contentful Paint:
 *
 *  - The poster is a 28 KB WebP and is the only thing fetched during the
 *    initial paint. It is what LCP measures.
 *  - The video element carries preload="none" and no source at all until
 *    after the window load event, so it cannot compete with fonts, CSS or
 *    the critical JS for bandwidth.
 *  - It only mounts a source on viewports wide enough to show the panel, so
 *    phones never download 787 KB they will not see.
 *  - Under prefers-reduced-motion the video is never loaded; the poster
 *    stays, which is a complete and correct representation of the content.
 *
 * The whole panel is decorative — the copy beside it carries the meaning —
 * so it is hidden from assistive technology.
 */

const VIDEO_SRC = "/kls-brand-film.mp4";
const POSTER_SRC = "/kls-brand-film-poster.webp";

/** Matches the `lg` breakpoint, below which the panel is not rendered. */
const DESKTOP_QUERY = "(min-width: 1024px)";

interface HeroDeviceProps {
  className?: string;
}

const HeroDevice = ({ className }: HeroDeviceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isDesktop = window.matchMedia(DESKTOP_QUERY);

    if (prefersReducedMotion.matches || !isDesktop.matches) return;

    // Wait for load rather than mount: at mount the browser is still fetching
    // render-critical assets, and adding a video source here would contend
    // with them for bandwidth on a slow connection.
    const start = () => setShouldLoad(true);

    if (document.readyState === "complete") {
      // Already loaded (client-side nav). Yield one frame so this never runs
      // inside the same paint as the rest of the hero.
      const raf = requestAnimationFrame(start);
      return () => cancelAnimationFrame(raf);
    }

    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  /** Pause off-screen — a looping video in a scrolled-past hero is wasted CPU. */
  useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void node.play().catch(() => {
            /* Autoplay refused (power saving, OS setting) — poster remains. */
          });
        } else {
          node.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div aria-hidden="true" className={cn("relative select-none", className)}>
      {/* Ambient wash — azure into the hero pink. */}
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -right-4 h-48 w-48 rounded-full bg-brand-pink/20 blur-3xl" />

      <div className="relative motion-safe:animate-float">
        {/* ---- Device chassis ---- */}
        <div className="relative rounded-[2rem] border border-border bg-gradient-card p-3 shadow-elevated sm:p-4">
          {/* Sensor slot + status LED along the top edge. */}
          <div className="mb-3 flex items-center justify-between px-3">
            <span className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              ))}
            </span>

            <span className="h-1.5 w-16 rounded-full bg-muted-foreground/15" />

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime/60 motion-safe:animate-ping-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
            </span>
          </div>

          {/* ---- Screen ---- */}
          {/* 16/9 matches the film exactly, so nothing is cropped or pillarboxed. */}
          <div className="relative aspect-video overflow-hidden rounded-[1.4rem] border border-border bg-brand-navy">
            <video
              ref={videoRef}
              // The poster paints immediately and carries LCP; the video file
              // is attached later by the effect above.
              poster={POSTER_SRC}
              src={shouldLoad ? VIDEO_SRC : undefined}
              preload="none"
              muted
              loop
              playsInline
              // Browsers block autoplay with sound, so a muted loop is the
              // only thing that reliably plays. disablePictureInPicture and
              // the controls omission keep it reading as a screen, not a player.
              disablePictureInPicture
              onPlaying={() => setIsPlaying(true)}
              className="h-full w-full object-cover"
            />

            {/* Faint screen sheen, sold as glass rather than a flat rectangle. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08]" />
          </div>

          {/* ---- Control strip ---- */}
          <div className="mt-3 flex items-center justify-between px-3">
            <span className="flex items-center gap-2">
              {/* Doubles as a playback indicator: lime and pulsing once the
                  film is actually running, inert while it is not. */}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                  isPlaying ? "bg-brand-lime motion-safe:animate-pulse-soft" : "bg-muted-foreground/25",
                )}
              />
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                KLS Tech Solutions
              </span>
            </span>
            <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
          </div>
        </div>

        {/* Wall mount, grounding the panel so it does not float in a void. */}
        <div className="mx-auto h-5 w-24 rounded-b-xl border-x border-b border-border bg-gradient-card" />
      </div>
    </div>
  );
};

export default HeroDevice;
