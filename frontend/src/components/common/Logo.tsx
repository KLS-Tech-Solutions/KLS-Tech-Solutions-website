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
  className?: string;
}

/**
 * The single canonical logo component.
 *
 * This replaces five copy-pasted blocks that each inlined the same
 * `filter: drop-shadow(...)` style and rendered the mark at h-32 — which is
 * what pushed the logo out of the 64px header.
 *
 * The site is light-mode only, so the logo's own navy-on-white artwork is
 * used directly with no variant swapping.
 */
const Logo = ({ size = "md", markOnly = false, asLink = true, className }: LogoProps) => {
  const { h, text } = sizeMap[size];
  const w = Math.round(h * MARK_RATIO);

  const content = (
    <>
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

      {!markOnly && (
        <span className={cn("font-semibold tracking-tight text-foreground", text)}>
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
