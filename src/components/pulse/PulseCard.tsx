import { Bookmark, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { PulseStudy } from "@/lib/pulse-utils";

const CATEGORY_COLORS: Record<string, string> = {
  Sleep: "#8d92ff",
  Neuroscience: "#df7a84",
  Nutrition: "#74c889",
  Performance: "#eba66b",
  Physiology: "#7dd1c9",
  Cognition: "#77abff",
  Behavior: "#f0a8c1",
  Longevity: "#7db9ff",
  Technology: "#7faecf",
  Aesthetics: "#ef9dde",
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? "#ffffff";
}

function getCardStyle(index: number) {
  return index % 6;
}

function getStudySignals(study: PulseStudy) {
  return [study.keywords[0], study.keywords[1], study.excerpt.split(".")[0]]
    .filter(Boolean)
    .slice(0, 3);
}

interface PulseCardProps {
  study: PulseStudy;
  index: number;
  total: number;
  likeCount: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}

export function PulseCard({
  study,
  index,
  total,
  likeCount,
  isSaved,
  onToggleSave,
  onShare,
}: PulseCardProps) {
  const accent = getCategoryColor(study.category);
  const styleVariant = getCardStyle(index);
  const signals = getStudySignals(study);
  const counter = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

  if (styleVariant === 5) {
    return (
      <article className="relative flex h-[100svh] snap-start items-stretch overflow-hidden bg-[#06080d] text-white">
        <img src={study.imageUrl} alt={study.title} className="absolute inset-0 h-full w-full object-cover opacity-86" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(8,10,16,0.28)_0%,rgba(8,10,16,0.12)_24%,rgba(8,10,16,0.62)_65%,rgba(8,10,16,0.94)_100%)]" />

        <div className="relative flex w-full flex-col px-4 pb-[max(1.7rem,env(safe-area-inset-bottom))] pt-[max(1.1rem,env(safe-area-inset-top))]">
          <div className="mt-14 flex items-center justify-between text-[9px] uppercase tracking-[0.34em] text-white/54">
            <div className="rounded-full border border-white/18 bg-white/6 px-3 py-1 backdrop-blur-md">
              {study.category}
            </div>
            <span>{counter}</span>
          </div>

          <div className="mt-auto grid grid-cols-[1fr_48px] gap-3">
            <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_22%,rgba(13,17,26,0.64)_56%,rgba(10,13,20,0.92)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
              <div className="relative aspect-[0.86] overflow-hidden">
                <img src={study.imageUrl} alt={study.title} className="h-full w-full object-cover" />
                <div
                  className="absolute inset-x-0 top-0 h-full"
                  style={{
                    background: `linear-gradient(180deg, ${accent}1f 0%, rgba(255,255,255,0.08) 24%, rgba(8,10,16,0) 48%, rgba(8,10,16,0.74) 100%)`,
                  }}
                />
              </div>

              <div className="px-5 pb-6 pt-4">
                <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>
                  {study.category}
                </div>
                <h2 className="mt-3 font-serif text-[22px] leading-[1.12] tracking-[-0.035em] text-white">
                  {study.title}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-white/44">
                  <span>{study.readTime}</span>
                  <span className="h-1 w-1 rounded-full bg-white/24" />
                  <span className="line-clamp-1">{study.journal}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {signals.slice(0, 2).map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[10px] text-white/62 backdrop-blur-sm"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/studies/${study.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/86"
                >
                  Read Analysis
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <ActionRail
              likeCount={likeCount}
              isSaved={isSaved}
              onToggleSave={onToggleSave}
              onShare={onShare}
            />
          </div>
        </div>
      </article>
    );
  }

  const overlay =
    styleVariant === 0
      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(237,171,193,0.18)_28%,rgba(11,10,14,0.22)_60%,rgba(8,8,10,0.82)_100%)]"
      : styleVariant === 1
        ? "bg-[linear-gradient(180deg,rgba(166,201,255,0.18)_0%,rgba(147,115,191,0.12)_28%,rgba(4,10,16,0.34)_62%,rgba(4,9,14,0.88)_100%)]"
        : styleVariant === 2
          ? "bg-[linear-gradient(180deg,rgba(167,255,239,0.16)_0%,rgba(54,138,125,0.08)_30%,rgba(9,17,16,0.36)_66%,rgba(5,10,9,0.9)_100%)]"
          : styleVariant === 3
            ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_22%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.88)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(247,216,154,0.22)_0%,rgba(105,61,22,0.08)_36%,rgba(32,16,7,0.52)_70%,rgba(22,12,8,0.9)_100%)]";

  return (
    <article className="relative flex h-[100svh] snap-start items-stretch overflow-hidden bg-[#07090e] text-white">
      <img src={study.imageUrl} alt={study.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className={cn("absolute inset-0", overlay)} />
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: `linear-gradient(180deg, ${accent}20 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 100%)` }}
      />

      {styleVariant === 3 && (
        <div
          className="absolute inset-x-0 top-0 h-[44svh]"
          style={{ background: `linear-gradient(180deg, ${accent}0d 0%, rgba(255,255,255,0) 100%)` }}
        />
      )}

      <div className="relative flex w-full flex-col px-4 pb-[max(1.8rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="mt-14 flex items-center justify-between text-[9px] uppercase tracking-[0.34em] text-white/56">
          <div
            className="rounded-full border px-3 py-1"
            style={{ borderColor: `${accent}80`, backgroundColor: `${accent}1d` }}
          >
            {study.category}
          </div>
          <span>{counter}</span>
        </div>

        <div className="mt-auto grid grid-cols-[1fr_44px] gap-3">
          <div className="mb-8 max-w-[78%]">
            <div className="mb-4 text-[10px] uppercase tracking-[0.32em] text-white/62">{study.journal}</div>
            <h2 className="font-serif text-[24px] leading-[1.08] tracking-[-0.04em] text-white">
              {study.title}
            </h2>

            <div className="mt-4 space-y-2">
              {signals.slice(0, 2).map((signal) => (
                <div key={signal} className="flex items-center gap-2 text-[11px] text-white/64">
                  <span className="h-px w-5 bg-white/26" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>

            <Link
              to={`/studies/${study.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/28 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white"
            >
              View Full Study
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ActionRail likeCount={likeCount} isSaved={isSaved} onToggleSave={onToggleSave} onShare={onShare} />
        </div>
      </div>
    </article>
  );
}

function ActionRail({
  likeCount,
  isSaved,
  onToggleSave,
  onShare,
}: {
  likeCount: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
}) {
  return (
    <div className="mb-10 flex flex-col items-center justify-end gap-4">
      <ActionIcon icon={<Heart className="h-[22px] w-[22px]" strokeWidth={1.65} />} label={likeCount} />
      <ActionButton onClick={onToggleSave} active={isSaved} icon={<Bookmark className="h-[21px] w-[21px]" strokeWidth={1.65} />} />
      <ActionButton onClick={onShare} icon={<Share2 className="h-[20px] w-[20px]" strokeWidth={1.65} />} />
    </div>
  );
}

function ActionIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-white">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/10 backdrop-blur-[10px]">
        {icon}
      </div>
      <span className="text-[10px] text-white/60">{label}</span>
    </div>
  );
}

function ActionButton({
  icon,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-[10px]",
        active && "bg-white/16",
      )}
    >
      {icon}
    </button>
  );
}
