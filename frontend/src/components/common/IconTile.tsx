import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { box: "h-10 w-10 rounded-lg", icon: "h-5 w-5" },
  md: { box: "h-12 w-12 rounded-xl", icon: "h-6 w-6" },
  lg: { box: "h-14 w-14 rounded-xl", icon: "h-7 w-7" },
} as const;

interface IconTileProps {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  /** Fill with the brand gradient instead of a tinted primary wash. */
  solid?: boolean;
  className?: string;
}

/**
 * Consistent icon container used across feature cards, capability lists and
 * contact rows. Replaces the several slightly-different inline variants that
 * had drifted apart across pages.
 */
const IconTile = ({ icon: Icon, size = "md", solid = false, className }: IconTileProps) => {
  const dimensions = sizeMap[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors duration-300",
        dimensions.box,
        solid
          ? "bg-gradient-brand text-primary-foreground shadow-glow"
          : "bg-primary/10 text-primary ring-1 ring-inset ring-primary/15",
        className,
      )}
    >
      <Icon className={dimensions.icon} aria-hidden="true" />
    </span>
  );
};

export default IconTile;
