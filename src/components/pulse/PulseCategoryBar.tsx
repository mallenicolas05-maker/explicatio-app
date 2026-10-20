import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PulseCategoryBarProps {
  mode: "all" | "feed";
  onModeChange: (mode: "all" | "feed") => void;
  onBack: () => void;
}

export function PulseCategoryBar({ mode, onModeChange, onBack }: PulseCategoryBarProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(7,9,14,0.78)_0%,rgba(7,9,14,0.28)_58%,rgba(7,9,14,0)_100%)]" />
      <div className="relative flex items-center gap-3 pt-3 text-white">
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white/92"
          aria-label="Back"
        >
          <ArrowLeft className="h-[17px] w-[17px]" strokeWidth={1.7} />
        </button>

        <div className="pointer-events-auto flex items-center gap-5">
          {(["all", "feed"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onModeChange(item)}
              className={cn(
                "border-b pb-1 text-[10px] uppercase tracking-[0.34em] transition-colors",
                mode === item ? "border-white text-white" : "border-transparent text-white/54",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
