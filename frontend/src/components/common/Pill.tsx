import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PillTone = "primary" | "accent" | "neutral";

const toneClasses: Record<PillTone, string> = {
  primary: "border-primary/25 bg-primary/10 text-primary",
  // Lime, used exactly as sparingly as it appears in the logo.
  accent: "border-brand-lime/30 bg-brand-lime/10 text-success",
  neutral: "border-border bg-muted text-muted-foreground",
};

interface PillProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  tone?: PillTone;
  className?: string;
}

/** Small status/eyebrow chip — R&D badges, section labels, category tags. */
const Pill = ({ children, icon: Icon, tone = "primary", className }: PillProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
      toneClasses[tone],
      className,
    )}
  >
    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
    {children}
  </span>
);

export default Pill;
