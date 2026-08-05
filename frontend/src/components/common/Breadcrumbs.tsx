import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  /** Trail beneath Home; Home is prepended automatically. */
  items: Crumb[];
  className?: string;
}

/**
 * Visible breadcrumb trail. Pairs with breadcrumbSchema() in lib/schema.ts —
 * Google requires the markup to reflect breadcrumbs the user can actually see,
 * so the two must always be rendered together.
 */
const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.path} className="rounded transition-colors hover:text-primary">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
