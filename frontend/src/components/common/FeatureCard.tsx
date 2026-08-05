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
      "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs",
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

    <Heading className="heading-card mb-2 text-foreground">{title}</Heading>
    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

    {bullets && bullets.length > 0 && (
      <ul className="mt-5 space-y-2 border-t border-border pt-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span
              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </article>
);

export default FeatureCard;
