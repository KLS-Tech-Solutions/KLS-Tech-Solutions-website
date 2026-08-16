import type { LucideIcon } from "lucide-react";

import IconTile from "@/components/common/IconTile";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional supporting bullets rendered beneath the description. */
  bullets?: readonly string[];
  /** Raise the card with a gradient hairline — used for the lead item. */
  featured?: boolean;
  /** Heading level, so the card fits the surrounding document outline. */
  as?: "h3" | "h4";
  className?: string;
}

/**
 * Primary content card.
 *
 * Layout notes, because these are what keep a row of cards looking uniform:
 *
 *  - `h-full` + `flex-col` lets the card fill whatever height the grid row
 *    resolves to, so cards in a row match without a hard-coded height (which
 *    would clip copy on narrow screens).
 *  - The description carries `flex-1`, absorbing the slack. That pushes the
 *    bullet block to the bottom of every card, so the bullet lists align
 *    across a row even when the descriptions differ in length.
 *  - The title is clamped to two lines so a long service name can't shift the
 *    body copy of one card out of step with its neighbours.
 *
 * Hover lifts the card 2px and warms the border rather than applying a heavy
 * glow — at card density a strong glow reads as noise. The transform is
 * GPU-composited and disabled under prefers-reduced-motion via index.css.
 */
const FeatureCard = ({
  icon,
  title,
  description,
  bullets,
  featured = false,
  as: Heading = "h3",
  className,
}: FeatureCardProps) => (
  <article
    className={cn(
      "group relative flex h-full flex-col rounded-2xl border border-border bg-card",
      "p-5 shadow-xs sm:p-6",
      "transition-all duration-300 ease-out-expo",
      "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
      featured && "border-gradient shadow-soft",
      className,
    )}
  >
    <IconTile
      icon={icon}
      solid={featured}
      className="mb-5 transition-transform duration-300 group-hover:scale-105"
    />

    <Heading className="heading-card mb-2 line-clamp-2 text-foreground">{title}</Heading>

    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

    {bullets && bullets.length > 0 && (
      <ul className="mt-5 space-y-2 border-t border-border pt-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span
              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="min-w-0">{bullet}</span>
          </li>
        ))}
      </ul>
    )}
  </article>
);

export default FeatureCard;
