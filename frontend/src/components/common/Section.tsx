import { forwardRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "card" | "gradient";

const toneClasses: Record<SectionTone, string> = {
  default: "",
  muted: "bg-muted/40",
  card: "bg-card",
  gradient: "bg-gradient-surface",
};

interface SectionProps {
  children: ReactNode;
  /** Anchor target and structured-data hook. */
  id?: string;
  /** Background treatment. */
  tone?: SectionTone;
  /** Draw a hairline divider along the top edge. */
  bordered?: boolean;
  /** Widen the inner container from 1152px to 1280px. */
  wide?: boolean;
  /** Override the rendered element — e.g. "header" for a page hero. */
  as?: ElementType;
  className?: string;
  /** Applied to the inner container rather than the outer section. */
  containerClassName?: string;
}

/**
 * Standard page section: consistent vertical rhythm plus a centred container.
 *
 * Previously every page repeated `section-padding` and `container-narrow mx-auto`
 * by hand, which is how the spacing drifted between routes. Sections now share
 * one definition, so the rhythm is uniform by construction.
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      id,
      tone = "default",
      bordered = false,
      wide = false,
      as: Tag = "section",
      className,
      containerClassName,
    },
    ref,
  ) => (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "section-padding",
        toneClasses[tone],
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className={cn(wide ? "container-wide" : "container-narrow", containerClassName)}>
        {children}
      </div>
    </Tag>
  ),
);

Section.displayName = "Section";

export default Section;
