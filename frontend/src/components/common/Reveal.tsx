import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** Direction/style of the entrance. Defaults to a subtle upward fade. */
  variant?: RevealVariant;
  /** Stagger in milliseconds, applied as a CSS transition-delay. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps content in a scroll-triggered entrance animation.
 *
 * The element carries only a data attribute; the transition itself is defined
 * in CSS and driven by the document-level observer in useScrollReveal. That
 * keeps this component render-cheap (no state, no per-element observer) and
 * means reduced-motion users get the content immediately with no JS branch.
 */
const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: RevealProps) => (
  <Tag
    data-reveal={variant}
    className={cn(className)}
    style={{ ...style, ...(delay ? { "--reveal-delay": `${delay}ms` } : {}) } as CSSProperties}
  >
    {children}
  </Tag>
);

export default Reveal;
