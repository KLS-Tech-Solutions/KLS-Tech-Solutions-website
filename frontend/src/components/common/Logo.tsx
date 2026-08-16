import { Link } from "react-router-dom";

import { assets, company } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The mark's intrinsic aspect ratio (240 x 145 after trimming). Width is
 * derived from height so the image never distorts and never causes CLS.
 */
const MARK_RATIO = 240 / 145;

const sizeMap = {
  sm: { h: 24, text: "text-sm" },
  md: { h: 30, text: "text-base" },
  lg: { h: 38, text: "text-lg" },
} as const;

interface LogoProps {
  size?: keyof typeof sizeMap;
  /** Hide the wordmark and render the mark alone. */
  markOnly?: boolean;
  /** Render as a plain element instead of a link. */
  asLink?: boolean;
  /**
   * Set on dark surfaces (the navy footer). The mark keeps its full colour
   * and is placed on a white plate; only the wordmark switches to white.
   */
  onDark?: boolean;
  className?: string;
}

/**
 * The single canonical logo component.
 *
 * This replaces five copy-pasted blocks that each inlined the same
 * `filter: drop-shadow(...)` style and rendered the mark at h-32 — which is
 * what pushed the logo out of the 64px header.
 *
 * On dark surfaces the mark is NOT recoloured. It previously used
 * `brightness-0 invert`, which flattened it to a white silhouette and threw
 * away the azure, silver and lime that make it recognisable. Instead the
 * artwork sits on a rounded white plate, so the header and footer show the
 * identical logo — the same treatment already used in the OG share image.
 */
const Logo = ({
  size = "md",
  markOnly = false,
  asLink = true,
  onDark = false,
  className,
}: LogoProps) => {
  const { h, text } = sizeMap[size];
  const w = Math.round(h * MARK_RATIO);

  const mark = (
    <img
      src={assets.mark}
      // Decorative: the adjacent wordmark already names the company, and the
      // link itself carries an aria-label, so alt text here would be noise.
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      loading="eager"
      decoding="async"
      className="block shrink-0 object-contain"
      style={{ height: h, width: w }}
    />
  );

  const content = (
    <>
      {onDark ? (
        // Plate padding scales with the mark so it stays proportional at
        // every size, and shrink-0 stops it collapsing in flex rows.
        <span
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-white/20"
          style={{ padding: Math.round(h * 0.22) }}
        >
          {mark}
        </span>
      ) : (
        mark
      )}

      {!markOnly && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            onDark ? "text-white" : "text-foreground",
            text,
          )}
        >
          {company.name}
        </span>
      )}
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-85",
    className,
  );

  if (!asLink) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link to="/" className={classes} aria-label={`${company.name} — go to homepage`}>
      {content}
    </Link>
  );
};

export default Logo;
