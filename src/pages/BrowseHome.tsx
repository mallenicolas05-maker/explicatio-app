import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutDashboard, Pause, Play, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { STUDIES_DATA, getStudyImageUrl } from "@/data/studiesData";
import { useSavedStudies } from "@/hooks/useSavedStudies";
import { cn } from "@/lib/utils";

type BrowseStudy = (typeof STUDIES_DATA)[number];

interface BrowseRailData {
  id: string;
  title: string;
  studies: BrowseStudy[];
  segments: number;
  ranked?: boolean;
  shifted?: boolean;
}

function dateValue(study: BrowseStudy) {
  return Number(study.date.replaceAll(".", ""));
}

function ensureCount(studies: BrowseStudy[], limit: number, preferredCategory?: string) {
  if (studies.length >= limit) {
    return studies.slice(0, limit);
  }

  const used = new Set(studies.map((study) => study.id));
  const preferred = preferredCategory
    ? STUDIES_DATA.filter((study) => study.category === preferredCategory && !used.has(study.id))
    : [];

  const globalFallback = STUDIES_DATA.filter((study) => !used.has(study.id));
  return [...studies, ...preferred, ...globalFallback].slice(0, limit);
}

function findTitles(titles: string[], fallbackCategory?: string): BrowseStudy[] {
  const mapped = titles
    .map((title) => STUDIES_DATA.find((study) => study.title === title))
    .filter((study): study is BrowseStudy => Boolean(study));

  if (mapped.length === titles.length || !fallbackCategory) {
    return mapped;
  }

  const used = new Set(mapped.map((study) => study.id));
  const filler = STUDIES_DATA.filter((study) => study.category === fallbackCategory && !used.has(study.id)).slice(
    0,
    titles.length - mapped.length,
  );
  return [...mapped, ...filler];
}

function getHeroStudy() {
  return (
    STUDIES_DATA.find((study) => study.title === "Partner Body Odor and Stress Responses") ??
    STUDIES_DATA.find((study) => study.category === "Aesthetics") ??
    STUDIES_DATA[0]
  );
}

function getNewest(limit = 8) {
  return ensureCount([...STUDIES_DATA].sort((a, b) => dateValue(b) - dateValue(a)), limit);
}

function getMixedStudies(limit = 32) {
  const byDate = [...STUDIES_DATA].sort((a, b) => dateValue(b) - dateValue(a));
  return ensureCount(byDate, limit);
}

function getFeatured(limit = 16) {
  const titles = [
    "Blue Light Effects",
    "Screens Before Bed Hurt Sleep",
    "Adaptive Mattress Temperature Improves Sleep",
    "Sleep and Body Temperature Link",
    "Timing of Melatonin Onset in Older Adults After Uncontrolled vs Controlled Lighting",
    "Rhythms in Cortisol Mediate Sleep and Circadian Impacts on Health",
    "Water Before Bed",
    "Dinner Potassium Better Sleep",
    "Consistent Sleep Timing Helps",
    "Nurse Sleep Restriction Works",
    "Light Patterns Shape Sleep",
    "Daylight Therapy for Parkinson's Sleep",
    "Hot Bath Core Temperature Drop and Sleep Onset",
    "Adenosine Receptors Control Sleep",
    "Mechanisms of GABA in Improving Sleep",
    "Magnesium Supplementation and Sleep Quality",
  ];

  return ensureCount(findTitles(titles, "Sleep"), limit, "Sleep");
}

function getTopThisWeek(limit = 10) {
  const titles = [
    "How Smells Change Attraction",
    "Body Odor and Personality Judgments",
    "Social Media and Body Image",
    "Social Media and Cosmetic Procedures",
    "Beauty Premium in Decisions",
    "How Looks Affect Hiring Decisions",
    "Attractiveness, Liking and Moral Judgments",
    "Attractiveness and Trust Decisions",
    "How Smells Shape First Impressions",
    "Partner Body Odor and Stress Responses",
  ];

  return ensureCount(findTitles(titles, "Aesthetics"), limit, "Aesthetics");
}

function groupByCategory(category: string, limit = 16) {
  return ensureCount(STUDIES_DATA.filter((study) => study.category === category), limit, category);
}

function RailCard({
  study,
  ranked,
  rank,
}: {
  study: BrowseStudy;
  ranked?: boolean;
  rank?: number;
}) {
  const imageUrl = getStudyImageUrl(study);

  return (
    <Link
      to={`/studies/${study.slug}`}
      className={cn(
        "group relative block shrink-0",
        ranked ? "w-[138px] sm:w-[146px] lg:w-[154px]" : "w-[148px] sm:w-[154px] lg:w-[162px]",
      )}
    >
      {ranked && typeof rank === "number" && (
        <div className="pointer-events-none absolute left-[-42px] top-[108px] z-0 text-[112px] font-bold leading-none tracking-[-0.1em] text-[#cdc8c0] sm:left-[-46px] sm:top-[118px] sm:text-[124px] lg:left-[-52px] lg:top-[126px] lg:text-[138px]">
          {rank}
        </div>
      )}

      <div className="relative z-10">
        <div className="overflow-hidden rounded-[7px] bg-[#ece8e0] shadow-[0_4px_12px_rgba(17,17,16,0.04)]">
          <div className={cn("overflow-hidden rounded-[7px]", ranked ? "aspect-[0.66]" : "aspect-[0.655]")}>
            <img src={imageUrl} alt={study.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="pt-3">
          <div className="text-[9px] uppercase tracking-[0.28em] text-foreground-subtle">{study.category}</div>
          <h3 className="mt-1 line-clamp-2 font-serif text-[14px] leading-[1.16] tracking-[-0.02em] text-foreground">
            {study.title}
          </h3>
          <div className="mt-1 text-[10px] text-foreground-subtle">{study.readTime}</div>
        </div>
      </div>
    </Link>
  );
}

function RailControls({
  segments,
  activeSegment,
}: {
  segments: number;
  activeSegment: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: segments }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "block h-[2px] w-6 bg-[#d8d4ce]",
            index === activeSegment && "bg-[#171716]",
          )}
        />
      ))}
    </div>
  );
}

function RailEdgeArrows({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}) {
  return (
    <>
      {canScrollLeft && (
        <button
          type="button"
          onClick={onScrollLeft}
          className="absolute left-[-10px] top-[34%] z-20 -translate-y-1/2 px-1 text-[#a9a39b]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 stroke-[1.65]" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={onScrollRight}
          className="absolute right-[-10px] top-[34%] z-20 -translate-y-1/2 px-1 text-[#a9a39b]"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 stroke-[1.65]" />
        </button>
      )}
    </>
  );
}

function BrowseRail({ rail }: { rail: BrowseRailData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0);
      const progress = maxScroll > 0 ? node.scrollLeft / maxScroll : 0;
      const nextSegment = Math.min(rail.segments - 1, Math.round(progress * (rail.segments - 1)));
      setActiveSegment(nextSegment);
      setCanScrollLeft(node.scrollLeft > 8);
      setCanScrollRight(node.scrollLeft < maxScroll - 8);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rail.segments]);

  const handleScroll = (direction: "left" | "right") => {
    const node = containerRef.current;
    if (!node) return;

    const amount = node.clientWidth * 0.72;
    node.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.36em] text-foreground-subtle">{rail.title}</div>
        <div className="flex items-center gap-1.5">
          <RailControls segments={rail.segments} activeSegment={activeSegment} />
        </div>
      </div>

      <div className="relative">
        <RailEdgeArrows
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollLeft={() => handleScroll("left")}
          onScrollRight={() => handleScroll("right")}
        />
        <div
          ref={containerRef}
          className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        <div
          className={cn(
            "flex",
            rail.ranked ? "gap-10 pl-14 pr-8 sm:gap-11 sm:pl-18 lg:gap-12 lg:pl-24" : "gap-3 lg:gap-4",
            rail.shifted && !rail.ranked ? "pl-2" : "",
          )}
        >
          {rail.studies.map((study, index) => (
            <RailCard
              key={`${rail.id}-${study.id}`}
              study={study}
              ranked={rail.ranked}
              rank={rail.ranked ? index + 1 : undefined}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

export default function BrowseHome() {
  const { savedStudySlugs } = useSavedStudies();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);

  const heroStudy = useMemo(() => getHeroStudy(), []);
  const rails = useMemo<BrowseRailData[]>(
    () => [
      {
        id: "new",
        title: "Newly Added",
        studies: getMixedStudies(32),
        segments: 8,
      },
      {
        id: "featured",
        title: "Featured",
        studies: getFeatured(16),
        segments: 4,
      },
      {
        id: "week",
        title: "Top 10 This Week",
        studies: getTopThisWeek(10),
        segments: 2,
        ranked: true,
        shifted: true,
      },
      {
        id: "sleep",
        title: "Sleep",
        studies: groupByCategory("Sleep", 16),
        segments: 4,
      },
      {
        id: "neuro",
        title: "Neuroscience",
        studies: groupByCategory("Neuroscience", 16),
        segments: 4,
      },
      {
        id: "nutrition",
        title: "Nutrition",
        studies: groupByCategory("Nutrition", 16),
        segments: 4,
      },
      {
        id: "performance",
        title: "Performance",
        studies: groupByCategory("Performance", 16),
        segments: 4,
      },
    ],
    [],
  );

  const heroImage = getStudyImageUrl(heroStudy);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const attemptAutoplay = async () => {
      try {
        await video.play();
        setIsHeroPlaying(true);
      } catch {
        setIsHeroPlaying(false);
      }
    };

    void attemptAutoplay();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const pauseHeroVideo = () => {
      video.pause();
      setIsHeroPlaying(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        pauseHeroVideo();
      }
    };

    window.addEventListener("blur", pauseHeroVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", pauseHeroVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleHeroPlaybackToggle = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsHeroPlaying(true);
      } catch {
        setIsHeroPlaying(false);
      }
      return;
    }

    video.pause();
    setIsHeroPlaying(false);
  };

  const handleHeroRestart = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    try {
      await video.play();
      setIsHeroPlaying(true);
    } catch {
      setIsHeroPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-foreground">
      <Header />

      <main>
        <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/browse-hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.66)_0%,rgba(0,0,0,0.34)_34%,rgba(0,0,0,0.14)_58%,rgba(0,0,0,0.28)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(180deg,rgba(251,250,247,0)_0%,rgba(251,250,247,0.06)_18%,rgba(251,250,247,0.18)_36%,rgba(251,250,247,0.54)_60%,rgba(251,250,247,0.88)_82%,rgba(251,250,247,1)_100%)]" />

          <div className="relative mx-auto flex min-h-[92vh] max-w-[1600px] items-end px-6 pb-48 pt-28 md:px-10 lg:px-14">
            <div className="max-w-[540px]">
              <div className="mb-6 text-[10px] uppercase tracking-[0.42em] text-white/72">Our Intention</div>
              <h1 className="max-w-[510px] font-serif text-[3.35rem] leading-[0.92] tracking-[-0.06em] text-white sm:text-[4.2rem] lg:text-[4.7rem]">
                Stimulate curiosity.
                <br />
                Spark innovation.
              </h1>
              <p className="mt-6 max-w-[470px] text-sm leading-8 text-white/72 md:text-[15px]">
                The root of all innovation is curiosity. We encourage individuals to stimulate that innate curiosity and thus propel them into a state of passionate research. It is every individual's choice to act on their curiosities. We exist to make the first step into satisfying ventures seamless.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-none border-white/55 bg-transparent px-6 text-white hover:border-white/55 hover:bg-transparent"
                >
                  <Link to="/studies">Start Exploring</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-11 rounded-none border-white/35 bg-transparent p-0 text-white/80 hover:border-white/35 hover:bg-transparent hover:text-white/80"
                >
                  <Link to="/dashboard" aria-label="Open dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-[170px] right-6 z-20 flex items-center md:right-10 lg:right-14">
            <div
              className={cn(
                "pointer-events-auto flex items-center gap-3 transition-all duration-300",
                !isHeroPlaying && "translate-x-[-10px]",
              )}
            >
              <button
                type="button"
                onClick={handleHeroPlaybackToggle}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-black/18 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/26"
                aria-label={isHeroPlaying ? "Pause hero video" : "Play hero video"}
              >
                {isHeroPlaying ? <Pause className="h-[17px] w-[17px]" strokeWidth={1.85} /> : <Play className="ml-0.5 h-[17px] w-[17px]" strokeWidth={1.85} />}
              </button>

              <div
                className={cn(
                  "flex items-center overflow-hidden rounded-full border border-white/45 bg-black/18 text-white/92 backdrop-blur-sm transition-all duration-300",
                  isHeroPlaying ? "max-w-0 border-transparent opacity-0" : "max-w-[72px] opacity-100",
                )}
              >
                <button
                  type="button"
                  onClick={handleHeroRestart}
                  className="inline-flex h-11 w-11 items-center justify-center"
                  aria-label="Restart hero video"
                >
                  <RotateCcw className="h-[16px] w-[16px]" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-36 bg-transparent px-6 pb-20 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1600px] space-y-12">
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.36em] text-white">Newly Added</div>
              <BrowseRail rail={{ ...rails[0], title: "" }} />
            </div>
            {savedStudySlugs.size > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[10px] uppercase tracking-[0.36em] text-foreground-subtle">Saved</div>
                  <RailControls
                    segments={2}
                    activeSegment={0}
                    canScrollLeft={false}
                    canScrollRight={false}
                    onScrollLeft={() => {}}
                    onScrollRight={() => {}}
                  />
                </div>
                <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex gap-3 lg:gap-4">
                    {STUDIES_DATA.filter((study) => savedStudySlugs.has(study.slug))
                      .slice(0, 8)
                      .map((study) => (
                        <RailCard key={`saved-${study.id}`} study={study} />
                      ))}
                  </div>
                </div>
              </section>
            )}

            {rails.slice(1).map((rail) => (
              <BrowseRail key={rail.id} rail={rail} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
