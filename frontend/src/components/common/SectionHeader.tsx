import type { ReactNode } from "react";

import Reveal from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small uppercase label above the heading. */
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  /**
   * Heading level. Sections nested under an existing h2 should pass "h3" so
   * the document outline never skips a level.
   */
  as?: "h2" | "h3";
  className?: string;
  children?: ReactNode;
}

/** Standard section heading block: eyebrow, title, supporting copy. */
const SectionHeader = ({
  label,
  title,
  description,
  centered = false,
  as: Heading = "h2",
  className,
  children,
}: SectionHeaderProps) => (
  <Reveal className={cn("mb-12 max-w-3xl md:mb-16", centered && "mx-auto text-center", className)}>
    {label && <p className="eyebrow mb-3">{label}</p>}
    <Heading className="heading-section text-foreground">{title}</Heading>
    {description && <p className="body-large mt-4">{description}</p>}
    {children}
  </Reveal>
);

export default SectionHeader;
