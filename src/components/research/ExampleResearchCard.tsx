import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowUpRight, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExampleResearchCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image?: string;
  isSimplified?: boolean;
}

export function ExampleResearchCard({
  id,
  title,
  category,
  date,
  readTime,
  summary,
  image,
  isSimplified = true
}: ExampleResearchCardProps) {
  return (
    <Link to={`/report/${id}`}>
      <div className="group block h-full bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-300 cursor-pointer flex flex-col">
        {image && (
          <div className="relative aspect-[3/2] overflow-hidden border-b border-border/50">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-0 group-hover:saturate-50"
            />
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur border-border/50 text-[10px] font-mono font-medium rounded-none uppercase tracking-wider px-2 py-0.5"
              >
                {category}
              </Badge>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readTime}
              </span>
            </div>
            {isSimplified && (
              <span className="text-emerald-600/80 font-medium flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Simplified
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl md:text-2xl font-medium leading-tight mb-4 group-hover:text-primary/80 transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
            {summary}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
            <span className="text-sm font-medium flex items-center gap-2">
              Read Analysis
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
