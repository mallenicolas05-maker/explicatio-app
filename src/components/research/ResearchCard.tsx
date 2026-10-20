import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Clock, FileText } from "lucide-react";

export interface ResearchCardProps {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  simplified: boolean;
  excerpt?: string;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  sleep: "bg-indigo-100 text-indigo-900",
  neuroscience: "bg-violet-100 text-violet-900",
  nutrition: "bg-emerald-100 text-emerald-900",
  performance: "bg-orange-100 text-orange-900",
  physiology: "bg-teal-100 text-teal-900",
  cognition: "bg-blue-100 text-blue-900",
  behavior: "bg-rose-100 text-rose-900",
  longevity: "bg-amber-100 text-amber-900",
  technology: "bg-cyan-100 text-cyan-900",
  aesthetics: "bg-pink-100 text-pink-900",
};

export function ResearchCard({
  id,
  title,
  category,
  categorySlug,
  date,
  readingTime,
  simplified,
  excerpt,
  featured = false,
}: ResearchCardProps) {
  return (
    <article
      className={cn(
        "group relative bg-card border border-border-subtle rounded-sm transition-all duration-300",
        "hover:border-border hover:shadow-md",
        featured && "lg:col-span-2"
      )}
    >
      <Link to={`/research/${id}`} className="block p-6 lg:p-8">
        {/* Meta Row */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 text-caption font-medium rounded-sm uppercase tracking-wider",
              categoryColors[categorySlug] || "bg-secondary text-foreground-muted"
            )}
          >
            {category}
          </span>
          {simplified && (
            <span className="inline-flex items-center gap-1.5 text-caption text-foreground-subtle">
              <FileText className="h-3 w-3" />
              Simplified
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-serif text-foreground transition-colors group-hover:text-accent",
            featured ? "text-heading-lg lg:text-display-sm" : "text-heading-md"
          )}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="mt-3 text-body-md text-foreground-muted line-clamp-2">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-subtle">
          <span className="text-caption text-foreground-subtle">{date}</span>
          <span className="text-foreground-subtle">·</span>
          <span className="inline-flex items-center gap-1.5 text-caption text-foreground-subtle">
            <Clock className="h-3 w-3" />
            {readingTime}
          </span>
        </div>
      </Link>
    </article>
  );
}
