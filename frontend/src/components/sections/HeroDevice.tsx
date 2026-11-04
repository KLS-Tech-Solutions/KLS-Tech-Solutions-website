import { cn } from "@/lib/utils";

/**
 * The hero's device panel — a wall-mounted IoT control unit.
 *
 * Deliberately not a desktop monitor. KLS builds connected hardware, so the
 * frame is a device the company could plausibly have made: rounded chassis,
 * inset bezel, a live status LED and a sensor slot along the top edge.
 *
 * The three scenes inside are inline SVG rather than images. That means no
 * network request, no decode cost, nothing to lazy-load, and no contribution
 * to LCP — the panel paints with the rest of the markup. It also means every
 * stroke reads from the theme tokens, so the artwork can never drift out of
 * sync with the palette, and nothing here resembles stock or generated
 * imagery.
 *
 * Everything is decorative: the copy beside it carries the meaning, so the
 * whole panel is hidden from assistive technology.
 */

interface HeroDeviceProps {
  /** Index of the scene to show — driven by the headline so they stay in step. */
  activeIndex: number;
  className?: string;
}

const SCENE_COUNT = 3;

/* ------------------------------------------------------------------ */
/* Scene 1 — IoT: sensors reporting into a gateway                     */
/* ------------------------------------------------------------------ */

const SceneIot = () => (
  <svg viewBox="0 0 320 200" className="h-full w-full" role="presentation">
    <defs>
      <linearGradient id="kls-iot-link" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.75" />
      </linearGradient>
    </defs>

    {/* Links from each sensor into the hub. */}
    {[
      [54, 44],
      [54, 100],
      [54, 156],
      [266, 44],
      [266, 100],
      [266, 156],
    ].map(([x, y], i) => (
      <line
        key={i}
        x1={x}
        y1={y}
        x2="160"
        y2="100"
        stroke="url(#kls-iot-link)"
        strokeWidth="1.6"
        strokeDasharray="3 5"
        className="motion-safe:animate-pulse-soft"
        style={{ animationDelay: `${i * 260}ms` }}
      />
    ))}

    {/* Sensor nodes. */}
    {[
      [54, 44],
      [54, 100],
      [54, 156],
      [266, 44],
      [266, 100],
      [266, 156],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="13" fill="hsl(var(--primary) / 0.10)" />
        <circle
          cx={x}
          cy={y}
          r="5.5"
          fill="hsl(var(--primary))"
          className="motion-safe:animate-pulse-soft"
          style={{ animationDelay: `${i * 300}ms` }}
        />
      </g>
    ))}

    {/* Central gateway. */}
    <rect
      x="128"
      y="74"
      width="64"
      height="52"
      rx="11"
      fill="hsl(var(--card))"
      stroke="hsl(var(--primary) / 0.5)"
      strokeWidth="2"
    />
    {[86, 95, 104].map((y, i) => (
      <rect
        key={y}
        x="140"
        y={y}
        width={i === 1 ? 40 : 28}
        height="4"
        rx="2"
        fill="hsl(var(--primary) / 0.45)"
      />
    ))}
    <circle cx="182" cy="83" r="3" fill="hsl(var(--brand-lime))" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Scene 2 — SaaS & AI: a metrics surface                              */
/* ------------------------------------------------------------------ */

const SceneSaas = () => (
  <svg viewBox="0 0 320 200" className="h-full w-full" role="presentation">
    <defs>
      <linearGradient id="kls-saas-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--brand-pink) / 0.30)" />
        <stop offset="100%" stopColor="hsl(var(--brand-pink) / 0)" />
      </linearGradient>
    </defs>

    {/* Baseline grid. */}
    {[40, 76, 112, 148].map((y) => (
      <line key={y} x1="24" y1={y} x2="296" y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
    ))}

    {/* Trend area + line. */}
    <path
      d="M24 132 C60 132 66 96 98 96 C130 96 136 118 168 112 C200 106 206 66 238 62 C266 58 276 74 296 70 L296 148 L24 148 Z"
      fill="url(#kls-saas-area)"
    />
    <path
      d="M24 132 C60 132 66 96 98 96 C130 96 136 118 168 112 C200 106 206 66 238 62 C266 58 276 74 296 70"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* Point markers. */}
    {[
      [98, 96],
      [168, 112],
      [238, 62],
    ].map(([x, y], i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r="4.5"
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary))"
        strokeWidth="2.4"
      />
    ))}

    {/* Stat tiles along the bottom. */}
    {[24, 118, 212].map((x, i) => (
      <g key={x}>
        <rect
          x={x}
          y="160"
          width="84"
          height="26"
          rx="7"
          fill="hsl(var(--primary) / 0.06)"
          stroke="hsl(var(--primary) / 0.22)"
          strokeWidth="1"
        />
        <rect
          x={x + 10}
          y="170"
          width={i === 1 ? 44 : 34}
          height="6"
          rx="3"
          fill="hsl(var(--primary) / 0.4)"
        />
      </g>
    ))}
  </svg>
);

/* ------------------------------------------------------------------ */
/* Scene 3 — Academy: verified open-source work                        */
/* ------------------------------------------------------------------ */

const SceneAcademy = () => (
  <svg viewBox="0 0 320 200" className="h-full w-full" role="presentation">
    {/* Commit spine with branch. */}
    <path
      d="M52 36 L52 164"
      stroke="hsl(var(--border))"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M52 100 C52 72 96 72 96 44"
      fill="none"
      stroke="hsl(var(--primary) / 0.45)"
      strokeWidth="2"
    />

    {[36, 72, 100, 128, 164].map((y, i) => (
      <circle
        key={y}
        cx="52"
        cy={y}
        r="6.5"
        fill={i === 2 ? "hsl(var(--primary))" : "hsl(var(--card))"}
        stroke="hsl(var(--primary))"
        strokeWidth="2.2"
        className={i === 2 ? "motion-safe:animate-pulse-soft" : undefined}
      />
    ))}
    <circle cx="96" cy="44" r="6.5" fill="hsl(var(--card))" stroke="hsl(var(--brand-lime))" strokeWidth="2.2" />

    {/* Commit rows. */}
    {[36, 72, 100, 128, 164].map((y, i) => (
      <rect
        key={y}
        x="72"
        y={y - 4}
        width={[96, 132, 148, 110, 124][i]}
        height="8"
        rx="4"
        fill="hsl(var(--muted-foreground) / 0.22)"
      />
    ))}

    {/* Verified certificate badge. */}
    <g>
      <rect
        x="206"
        y="92"
        width="92"
        height="72"
        rx="12"
        fill="hsl(var(--card))"
        stroke="hsl(var(--brand-lime) / 0.55)"
        strokeWidth="2"
      />
      {/* QR-ish grid, the thing that makes the certificate verifiable. */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((cIdx) => (
          <rect
            key={`${r}-${cIdx}`}
            x={222 + cIdx * 18}
            y={106 + r * 18}
            width="12"
            height="12"
            rx="2.5"
            fill={
              (r + cIdx) % 2 === 0
                ? "hsl(var(--brand-lime) / 0.75)"
                : "hsl(var(--primary) / 0.25)"
            }
          />
        )),
      )}
    </g>
  </svg>
);

const SCENES = [SceneIot, SceneSaas, SceneAcademy] as const;

/* ------------------------------------------------------------------ */

const HeroDevice = ({ activeIndex, className }: HeroDeviceProps) => {
  const safeIndex = ((activeIndex % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT;

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
          <div className="relative overflow-hidden rounded-[1.4rem] border border-border bg-background">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

            {/* All three scenes are mounted and cross-faded. Swapping the
                mounted element instead would re-trigger the SVG animations
                on every change and flicker. */}
            <div className="relative aspect-[16/10]">
              {SCENES.map((Scene, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 p-4 transition-opacity duration-700 ease-out-expo sm:p-5",
                    i === safeIndex ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Scene />
                </div>
              ))}
            </div>
          </div>

          {/* ---- Control strip ---- */}
          <div className="mt-3 flex items-center justify-between px-3">
            <span className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === safeIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/25",
                  )}
                />
              ))}
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
