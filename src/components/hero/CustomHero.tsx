import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { STUDIES_DATA, getStudyImageUrl } from "@/data/studiesData";

export type HeroTheme = 'default' | 'blue' | 'coral' | 'sage' | 'lavender';

interface CustomHeroProps {
  theme?: HeroTheme;
}

const GRADIENTS: Record<HeroTheme, string> = {
  default:  "linear-gradient(180deg, #d8d8d8 0%, #e4e4e4 40%, #f0f0f0 68%, #ffffff 100%)",
  blue:     "linear-gradient(180deg, #cfe5ff 0%, #d8d8ed 62%, #eceaf5 80%, #ffffff 100%)",
  coral:    "linear-gradient(180deg, #ffc5b0 0%, #ffd5c5 52%, #fff0eb 78%, #ffffff 100%)",
  sage:     "linear-gradient(180deg, #b8ddb8 0%, #cce8cc 52%, #e8f5e8 78%, #ffffff 100%)",
  lavender: "linear-gradient(180deg, #d4c8f0 0%, #ddd5f5 52%, #eee8ff 78%, #ffffff 100%)",
};

const HERO_ROTATION_MS = 7000;

const HERO_STUDY_TITLES = [
  "Screens Before Bed Hurt Sleep",
  "Blue Light Effects",
  "Adaptive Mattress Temperature Improves Sleep",
  "Dinner Potassium Better Sleep",
  "Partner Body Odor and Stress Responses",
];

type HeroStudy = (typeof STUDIES_DATA)[number];

function getHeroStudies(): HeroStudy[] {
  const picked = HERO_STUDY_TITLES
    .map((title) => STUDIES_DATA.find((study) => study.title === title))
    .filter((study): study is HeroStudy => Boolean(study));

  if (picked.length >= 5) return picked;

  const used = new Set(picked.map((study) => study.id));
  const fallback = STUDIES_DATA.filter((study) => !used.has(study.id)).slice(0, 5 - picked.length);
  return [...picked, ...fallback];
}

function HeroStudyCard({ study, isActive }: { study: HeroStudy; isActive?: boolean }) {
  const imageUrl =
    study.title === "Screens Before Bed Hurt Sleep"
      ? "/soccer-sleep-study.jpg"
      : getStudyImageUrl(study);

  return (
    <Link
      to={`/studies/${study.slug}`}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      className="brutalist-btn block h-full"
      style={{ borderRadius: "14px" }}
    >
      <article
        className="relative flex h-full flex-col overflow-hidden border-2 border-[#28292a] bg-white"
        style={{ borderRadius: "14px" }}
      >
        <div className="relative overflow-hidden bg-[#eef1f4]" style={{ aspectRatio: "1.58" }}>
          <img
            src={imageUrl}
            alt={study.title}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-[5px] text-[8px] font-medium uppercase tracking-[0.18em]"
            style={{
              color: study.categoryColor,
              background: "rgba(255,255,255,0.94)",
              border: `1px solid ${study.categoryColor}52`,
            }}
          >
            {study.category}
          </div>
        </div>

        <div className="flex flex-col px-5 pb-5 pt-4">
          <h3 className="line-clamp-2 font-sans text-[16px] font-semibold leading-[1.14] tracking-[-0.03em] text-foreground">
            {study.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[10px] leading-[1.72] text-foreground-muted">
            {study.excerpt}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#e1dfda] pt-4">
            <div>
              <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Published</span>
              <span className="mt-1 block font-mono text-[10px] text-foreground">{study.date}</span>
            </div>
            <div className="border-l border-[#e1dfda] pl-4">
              <span className="block text-[9px] font-medium uppercase tracking-[0.24em] text-foreground-subtle">Details</span>
              <div className="mt-1 flex items-center gap-2 text-[10px]">
                <span className="font-mono uppercase text-foreground">{study.category}</span>
                <span className="text-[#c6c3bc]">|</span>
                <span className="font-mono text-foreground">{study.readTime}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#e1dfda] pt-3">
            <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-foreground">Read Analysis</span>
            <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

const CustomHero = ({ theme = 'default' }: CustomHeroProps) => {
  const { user } = useAuth();
  const heroStudies = useMemo(() => getHeroStudies(), []);
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  // Sync both chroma animations to wall-clock phase so they always match
  const chromaDelay = `${-(Date.now() / 1000 % 30)}s`;

  const moveStudy = (direction: 1 | -1) => {
    setActiveStudyIndex((current) => (current + direction + heroStudies.length) % heroStudies.length);
  };

  useEffect(() => {
    const rotation = window.setInterval(() => moveStudy(1), HERO_ROTATION_MS);
    return () => window.clearInterval(rotation);
  }, [activeStudyIndex, heroStudies.length]);

  return (
    <section className="relative overflow-hidden" style={{ background: GRADIENTS[theme] }}>
      {/* dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(20,2,6,.18) .8px, transparent .9px), radial-gradient(rgba(255,255,255,.38) 1px, transparent 1px)",
        backgroundPosition: "0 0, 2px 2px",
        backgroundSize: "4px 4px",
        mixBlendMode: "multiply",
        opacity: 0.42,
      }} />
      {/* smooth fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10" style={{
        background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.65) 55%, #ffffff 100%)"
      }} />
      <div className="relative z-20 flex min-h-screen items-center py-32 lg:py-40 px-4 lg:px-10">
        <div className="flex w-full items-start gap-10 xl:gap-16">
        <div className="w-full max-w-[540px] flex-shrink-0">
          {/* Eyebrow: staggered word reveal + line draw */}
          <div className="mb-10 w-fit">
            <div className="flex gap-[0.6em] overflow-hidden text-[10px] uppercase tracking-[0.28em] text-foreground-subtle">
              {['Build', 'Knowledge', 'Through', 'Research'].map((word, i) => (
                <span
                  key={word}
                  className="hero-eyebrow-word"
                  style={{ animationDelay: `${i * 0.09}s` }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="hero-eyebrow-line mt-2.5" />
          </div>

          <div className="mb-8">
            <div className="mb-5 text-[10px] uppercase tracking-[0.34em] text-foreground-subtle">
              Research Made Clear
            </div>
            <h1 className="hero-main-title">
              Scientific <br />
              Research <br />
              <span className="accent-shift-text" style={{ animationDelay: chromaDelay }}>Explained.</span>
            </h1>
          </div>

          <p className="mb-12 max-w-2xl" style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: 'clamp(1.45rem, 2.2vw, 2.25rem)',
            fontWeight: 400,
            lineHeight: 0.93,
            letterSpacing: '-0.06em',
            color: 'rgb(40, 41, 42)',
            WebkitFontSmoothing: 'antialiased',
            margin: 0,
            marginBottom: '3rem',
          }}>
            We translate newly published studies in health, biology, and human performance into clear, structured summaries. No fluff. No hype. Just the evidence.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Primary CTA — chroma animated, brutalist hover */}
            <div
              className="group relative inline-block"
              style={{ boxShadow: "6px 6px 0 0 #140206" }}
            >
              <Link
                to={user ? "/browse" : "/onboarding"}
                className="hero-btn-primary brutalist-btn relative inline-flex items-center justify-center px-6 font-mono text-[0.78rem] uppercase tracking-[-0.03em] min-h-[3.4rem] border border-[#28292a] group-hover:translate-x-[5px] group-hover:translate-y-[5px]"
                style={{ animationDelay: chromaDelay }}
              >
                {user ? "Initialize Dashboard" : "Log In"}
              </Link>
            </div>

            {/* Browse Studies — cream bg, brutalist hover */}
            <div
              className="group relative inline-block"
              style={{ boxShadow: "6px 6px 0 0 #140206" }}
            >
              <Link
                to="/studies"
                className="brutalist-btn relative inline-flex items-center justify-center gap-2 px-6 font-mono text-[0.78rem] uppercase tracking-[-0.03em] text-[#28292a] min-h-[3.4rem] border border-[#28292a]/40 bg-[#f7f4ef] hover:bg-[#f0ede8] group-hover:translate-x-[5px] group-hover:translate-y-[5px]"
              >
                <span>Browse Studies</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero study stack — right column, desktop only */}
        <div className="hidden lg:flex flex-1 items-start justify-center pt-[6rem]">
          <div className="relative h-[520px] w-full max-w-[620px]">
            <button
              type="button"
              onClick={() => moveStudy(1)}
              className="absolute top-[44%] z-40 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[#28292a]/75 transition-colors hover:text-[#28292a]"
              style={{ left: "calc(50% - 365px)" }}
              aria-label="Previous featured study"
            >
              <ChevronLeft className="h-8 w-8 stroke-[1.9]" />
            </button>
            <button
              type="button"
              onClick={() => moveStudy(-1)}
              className="absolute top-[44%] z-40 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[#28292a]/75 transition-colors hover:text-[#28292a]"
              style={{ left: "calc(50% + 365px)" }}
              aria-label="Next featured study"
            >
              <ChevronRight className="h-8 w-8 stroke-[1.9]" />
            </button>

            {heroStudies.map((study, index) => {
              const offset = (index - activeStudyIndex + heroStudies.length) % heroStudies.length;
              const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === heroStudies.length - 1 ? "previous" : "hidden";
              if (position === "hidden") return null;

              const isActive = position === "active";
              const positionStyles: Record<"active" | "next" | "previous", React.CSSProperties> = {
                active: {
                  transform: "translate3d(0, 0, 0) scale(1)",
                  opacity: 1,
                  zIndex: 30,
                  pointerEvents: "auto",
                },
                next: {
                  transform: "translate3d(82px, 44px, 0) scale(0.91)",
                  opacity: 0.92,
                  zIndex: 20,
                  pointerEvents: "none",
                },
                previous: {
                  transform: "translate3d(-82px, 50px, 0) scale(0.9)",
                  opacity: 0.88,
                  zIndex: 10,
                  pointerEvents: "none",
                },
              };

              return (
                <div
                  key={study.id}
                  className="absolute top-0 h-[500px] w-[490px] transition-[transform,opacity]"
                  style={{
                    ...positionStyles[position],
                    marginLeft: "-245px",
                    left: "50%",
                    transitionDuration: "950ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "6px 6px 0 0 #28292a",
                    borderRadius: "14px",
                  }}
                >
                  <HeroStudyCard study={study} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};

export default CustomHero;
