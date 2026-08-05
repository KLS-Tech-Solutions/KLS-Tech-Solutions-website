import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}

const SectionHeader = ({ 
  label, 
  title, 
  description, 
  centered = false, 
  className,
  children 
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      "mb-12 max-w-3xl",
      centered && "mx-auto text-center",
      className
    )}>
      {label && (
        <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
          {label}
        </span>
      )}
      <h2 className="heading-section text-foreground mb-4">{title}</h2>
      {description && (
        <p className="body-large">{description}</p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
