import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSavedStudies } from "@/hooks/useSavedStudies";
import { useAuth } from "@/contexts/AuthContext";
import { PulseCard } from "@/components/pulse/PulseCard";
import { PulseCategoryBar } from "@/components/pulse/PulseCategoryBar";
import { fakeLikes, formatLikes, getPulseStudies, getSeenStudies, setSeenStudies } from "@/lib/pulse-utils";
import { toast } from "@/hooks/use-toast";

export default function Pulse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isStudySaved, toggleSaveStudy } = useSavedStudies();
  const studies = useMemo(() => getPulseStudies(), []);
  const [mode, setMode] = useState<"all" | "feed">("all");
  const [seen, setSeen] = useState<Set<string>>(() => getSeenStudies());
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (studies.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setSeen((prev) => {
          const next = new Set(prev);
          let changed = false;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const slug = entry.target.getAttribute("data-slug");
              if (slug && !next.has(slug)) {
                next.add(slug);
                changed = true;
              }
            }
          });
          if (changed) {
            setSeenStudies(next);
            return next;
          }
          return prev;
        });
      },
      { threshold: 0.8 },
    );

    cardRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [studies]);

  useEffect(() => {
    if (studies.length - seen.size < 5) {
      const next = new Set<string>();
      setSeen(next);
      setSeenStudies(next);
    }
  }, [seen, studies.length]);

  const feedStudies = useMemo(() => {
    if (mode === "all") return studies;
    const unseen = studies.filter((study) => !seen.has(study.slug));
    return unseen.length > 0 ? unseen : studies;
  }, [mode, seen, studies]);

  const handleShare = async (slug: string, title: string) => {
    const url = `${window.location.origin}/studies/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Study link copied to clipboard",
        });
      }
    } catch {
      // Ignore cancellation
    }
  };

  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
    return (
      <div className="min-h-screen bg-[#090b10] text-white">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.36em] text-white/48">Mobile only</div>
          <h1 className="mt-6 font-serif text-[42px] leading-[0.94] tracking-[-0.04em]">Pulse is built for mobile.</h1>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
            Open Pulse on your phone or narrow the browser to a mobile width for the full vertical feed experience.
          </p>
          <button
            type="button"
            onClick={() => navigate("/browse")}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-white"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0d14] text-white">
      <PulseCategoryBar mode={mode} onModeChange={setMode} onBack={() => navigate(-1)} />
      <div className="h-[100svh] snap-y snap-mandatory overflow-y-auto">
        {feedStudies.map((study, index) => (
          <section
            key={study.slug}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            data-slug={study.slug}
          >
            <PulseCard
              study={study}
              index={index}
              total={feedStudies.length}
              likeCount={formatLikes(fakeLikes(study.slug))}
              isSaved={isStudySaved(study.slug)}
              onToggleSave={() => {
                void toggleSaveStudy(study.slug);
              }}
              onShare={() => {
                void handleShare(study.slug, study.title);
              }}
            />
          </section>
        ))}
      </div>
      {!user && <div className="hidden" />}
    </div>
  );
}
