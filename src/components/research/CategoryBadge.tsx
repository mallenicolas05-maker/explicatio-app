import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  name: string;
  slug: string;
  count?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; hover: string }> = {
  sleep: {
    bg: "bg-indigo-100",
    text: "text-indigo-900",
    hover: "hover:bg-indigo-200",
  },
  neuroscience: {
    bg: "bg-violet-100",
    text: "text-violet-900",
    hover: "hover:bg-violet-200",
  },
  nutrition: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    hover: "hover:bg-emerald-200",
  },
  performance: {
    bg: "bg-orange-100",
    text: "text-orange-900",
    hover: "hover:bg-orange-200",
  },
  physiology: {
    bg: "bg-teal-100",
    text: "text-teal-900",
    hover: "hover:bg-teal-200",
  },
  cognition: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    hover: "hover:bg-blue-200",
  },
  behavior: {
    bg: "bg-rose-100",
    text: "text-rose-900",
    hover: "hover:bg-rose-200",
  },
  longevity: {
    bg: "bg-amber-100",
    text: "text-amber-900",
    hover: "hover:bg-amber-200",
  },
  technology: {
    bg: "bg-cyan-100",
    text: "text-cyan-900",
    hover: "hover:bg-cyan-200",
  },
  aesthetics: {
    bg: "bg-pink-100",
    text: "text-pink-900",
    hover: "hover:bg-pink-200",
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-caption",
  md: "px-3 py-1 text-body-sm",
  lg: "px-4 py-1.5 text-body-md",
};

export function CategoryBadge({
  name,
  slug,
  count,
  size = "md",
  interactive = true,
}: CategoryBadgeProps) {
  const colors = categoryColors[slug] || {
    bg: "bg-secondary",
    text: "text-foreground-muted",
    hover: "hover:bg-secondary/80",
  };

  const classes = cn(
    "inline-flex items-center gap-2 rounded-sm font-mono font-medium uppercase tracking-wider transition-colors",
    colors.bg,
    colors.text,
    interactive && colors.hover,
    sizeClasses[size]
  );

  if (interactive) {
    return (
      <Link to={`/categories/${slug}`} className={classes}>
        {name}
        {count !== undefined && (
          <span className="opacity-60">{count}</span>
        )}
      </Link>
    );
  }

  return (
    <span className={classes}>
      {name}
      {count !== undefined && (
        <span className="opacity-60">{count}</span>
      )}
    </span>
  );
}
