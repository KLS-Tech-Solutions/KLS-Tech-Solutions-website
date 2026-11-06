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
 * Playback on every device, without wrecking Largest Contentful Paint:
 *
 *  - The poster is a 27 KB WebP and is the only thing fetched during the
 *    initial paint. It is what LCP measures.
 *  - No source is attached until after the window load event, so the video
 *    never competes with fonts, CSS or critical JS for bandwidth.
 *  - Phones get a 640px / 490 KB encode, desktops a 960px / 723 KB one. The
 *    panel is never wider than ~560px, so neither is upscaled.
 *  - Under prefers-reduced-motion nothing loads at all and the poster stays,
 *    which is a complete representation of the content.
 *
 * Mobile autoplay is fussier than desktop and needs all four of these, not
 * just one:
 *
 *  - muted and playsinline, or iOS refuses to play inline and tries to go
 *    fullscreen instead.
 *  - `muted` set imperatively on the element as well as via the prop. React
 *    sets it as a property and the attribute does not always land, which is
 *    enough for iOS to treat the video as unmuted and block it.
 *  - The autoplay attribute, so the browser's own native path runs rather
 *    than relying solely on a scripted play() call.
 *  - A play() call as a fallback, because Chrome on Android sometimes
 *    ignores the attribute when the element is attached dynamically.
 *
 * If every one of those still fails — iOS Low Power Mode and Android Data
 * Saver both refuse autoplay outright — the poster simply remains. That is
 * why the poster is a real frame from the film rather than a placeholder.
 */

const VIDEO_SRC_LG = "/kls-brand-film.mp4";
const VIDEO_SRC_SM = "/kls-brand-film-sm.mp4";
const POSTER_SRC = "/kls-brand-film-poster.webp";

/** Above this width the panel is large enough to justify the 960px encode. */
const LARGE_SCREEN = "(min-width: 768px)";

interface HeroDeviceProps {
  className?: string;
}

const HeroDevice = ({ className }: HeroDeviceProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);

  /** Decide whether to load at all, and which encode. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const choose = () =>
      setSrc(window.matchMedia(LARGE_SCREEN).matches ? VIDEO_SRC_LG : VIDEO_SRC_SM);

    // Deferred to window load so the video cannot contend with render-critical
    // assets on a slow connection.
    if (document.readyState === "complete") {
      const raf = requestAnimationFrame(choose);
      return () => cancelAnimationFrame(raf);
    }

    window.addEventListener("load", choose, { once: true });
    return () => window.removeEventListener("load", choose);
  }, []);

  /** Start playback, and pause while off screen. */
  useEffect(() => {
    const node = videoRef.current;
    if (!node || !src) return;

    // Belt and braces for iOS: React's muted prop sets the property but not
    // reliably the attribute, and an unmuted video is blocked outright.
    node.muted = true;
    node.defaultMuted = true;
    node.setAttribute("muted", "");

    const attemptPlay = () => {
      const attempt = node.play();
      // Older Safari returns undefined rather than a promise.
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          /* Autoplay refused (Low Power Mode, Data Saver). Poster remains. */
        });
      }
    };

    // The element needs enough data before play() will resolve on mobile.
    node.addEventListener("loadeddata", attemptPlay, { once: true });
    attemptPlay();

    if (typeof IntersectionObserver === "undefined") {
      return () => node.removeEventListener("loadeddata", attemptPlay);
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? attemptPlay() : node.pause()),
      { threshold: 0.15 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.removeEventListener("loadeddata", attemptPlay);
    };
  }, [src]);

  return (
    <div aria-hidden="true" className={cn("relative select-none", className)}>
      {/* Ambient wash — azure into the hero pink. */}
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -right-4 h-48 w-48 rounded-full bg-brand-pink/20 blur-3xl" />

      <div className="relative motion-safe:animate-float">
        {/* ---- Device chassis ---- */}
        <div className="relative rounded-[1.5rem] border border-border bg-gradient-card p-2.5 shadow-elevated sm:rounded-[2rem] sm:p-4">
          {/* Sensor slot + status LED along the top edge. */}
          <div className="mb-2.5 flex items-center justify-between px-2 sm:mb-3 sm:px-3">
            <span className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              ))}
            </span>

            <span className="h-1.5 w-12 rounded-full bg-muted-foreground/15 sm:w-16" />

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime/60 motion-safe:animate-ping-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
            </span>
          </div>

          {/* ---- Screen ---- */}
          {/* 16/9 matches the film exactly, so nothing is cropped. */}
          <div className="relative aspect-video overflow-hidden rounded-[1rem] border border-border bg-brand-navy sm:rounded-[1.4rem]">
            <video
              ref={videoRef}
              // The poster paints immediately and carries LCP; the source is
              // attached later by the effect above.
              poster={POSTER_SRC}
              src={src}
              preload={src ? "auto" : "none"}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              onPlaying={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
            />

            {/* Faint screen sheen, sold as glass rather than a flat rectangle. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08]" />
          </div>

          {/* ---- Control strip ---- */}
          <div className="mt-2.5 flex items-center justify-between px-2 sm:mt-3 sm:px-3">
            <span className="flex items-center gap-2">
              {/* Doubles as a playback indicator: lime and pulsing once the
                  film is actually running, inert while it is not. */}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                  isPlaying
                    ? "bg-brand-lime motion-safe:animate-pulse-soft"
                    : "bg-muted-foreground/25",
                )}
              />
              <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                KLS Tech Solutions
              </span>
            </span>
            <span className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/20 sm:h-4 sm:w-4" />
          </div>
        </div>

        {/* Wall mount, grounding the panel so it does not float in a void. */}
        <div className="mx-auto h-4 w-20 rounded-b-xl border-x border-b border-border bg-gradient-card sm:h-5 sm:w-24" />
      </div>
    </div>
  );
};

export default HeroDevice;
