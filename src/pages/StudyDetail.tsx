import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Section } from '@/components/study/Section';
import { 
  Bookmark, 
  ArrowRight,
  ArrowLeft,
  Volume2,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getStudyBySlug, getStudyById, getStudyKeywords, type StudyDetailData } from '@/data/studiesData';
import { useSavedStudies } from '@/hooks/useSavedStudies';
import { OriginalSourceSection } from '@/components/study/OriginalSourceSection';
import { TextHighlighter } from '@/components/study/TextHighlighter';
import { ReadingProgressBar } from '@/components/study/ReadingProgressBar';
import { TableOfContents } from '@/components/study/TableOfContents';
import { ReadingComfortControl, useReadingSize, SIZE_STYLES } from '@/components/study/ReadingComfortControl';
import { RelatedStudies } from '@/components/study/RelatedStudies';
import { CopyCitation } from '@/components/study/CopyCitation';

const CATEGORY_HEX_MAP: Record<string, string> = {
  Sleep: '#f4b9ba', Neuroscience: '#e6393c', Nutrition: '#6e1617',
  Performance: '#6c69a9', Physiology: '#90a6c7', Cognition: '#15c49c',
  Behavior: '#9AE4F5', Longevity: '#3d98f8', Technology: '#376f7a', Aesthetics: '#082f54',
};
const getCategoryHex = (category: string) => CATEGORY_HEX_MAP[category] || '#a1a1aa';

const studyAudioStyles = `
  @keyframes studyAudioPulse {
    0% { transform: scaleY(0.46); opacity: 0.72; }
    42% { transform: scaleY(1); opacity: 1; }
    100% { transform: scaleY(0.62); opacity: 0.88; }
  }
`;

const visualAudioBars = [30, 54, 70, 86, 94, 98, 92, 84, 78, 88, 96, 90, 82, 72, 84, 92];

function VisualAudioPlayer({
  isPlaying,
  onToggle,
  onReplay,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  onReplay: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2.5">
      <div className="flex h-10 items-center gap-1 px-1">
        {visualAudioBars.map((height, index) => (
          <span
            key={index}
            className="block w-1 rounded-full bg-[#1f2d3b]"
            style={{
              height: `${height}%`,
              animation: isPlaying
                ? `studyAudioPulse ${0.78 + (index % 5) * 0.08}s ease-in-out ${index * 0.035}s infinite alternate`
                : 'none',
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-9 min-w-[112px] items-center justify-center gap-2.5 rounded-full border border-[#d4d8de] bg-white px-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#1f2d3b] transition-colors hover:border-[#aeb5bf]"
      >
        {isPlaying ? <Pause size={10} strokeWidth={1.8} /> : <Play size={10} strokeWidth={1.8} fill="currentColor" />}
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button
        type="button"
        onClick={onReplay}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d4d8de] bg-white text-[#1f2d3b] transition-colors hover:border-[#aeb5bf]"
        aria-label="Replay audio animation"
      >
        <RotateCcw size={14} strokeWidth={1.7} />
      </button>
    </div>
  );
}

function StudyPrototypeDecor({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 xl:hidden">
        <div
          className="absolute inset-x-0 top-16 h-[124px]"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, ${color} 54%, white) 0%, color-mix(in srgb, ${color} 38%, white) 32%, rgba(255,255,255,0.88) 72%, rgba(255,255,255,0) 100%)`,
          }}
        />
        <div
          className="absolute left-0 top-16 bottom-0 w-[40px]"
          style={{
            background: `linear-gradient(90deg, color-mix(in srgb, ${color} 54%, white) 0%, color-mix(in srgb, ${color} 36%, white) 34%, rgba(255,255,255,0.88) 78%, rgba(255,255,255,0) 100%)`,
          }}
        />
        <svg
          className="absolute left-3 right-3 top-[72px] h-[64px] w-[calc(100%-24px)]"
          viewBox="0 0 1200 116"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-12 74C20 24 66 18 73 46C81 78 46 98 23 90C-7 79 -5 42 25 29C66 11 116 38 144 61C172 85 214 100 271 100C337 100 374 73 401 46C428 18 468 10 483 42C496 70 470 95 441 92C409 89 400 47 425 25C450 4 494 7 529 39C569 75 611 97 671 100C737 103 782 83 816 48C844 19 886 8 900 39C913 66 892 93 865 92C835 90 826 48 851 26C880 1 923 8 958 38C999 74 1044 97 1102 98C1140 98 1173 92 1212 80"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="absolute left-0 top-[110px] bottom-0 h-[calc(100%-110px)] w-[40px]"
          viewBox="0 0 92 2400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M46 0C70 27 71 56 48 86C26 115 24 144 46 173C68 202 69 230 47 259C25 288 23 317 46 346C69 375 69 404 47 433C24 463 24 491 47 520C69 549 69 578 47 607C25 636 24 665 47 694C69 723 69 752 47 781C25 810 24 839 46 868C69 898 69 927 47 956C24 985 24 1014 46 1044C69 1074 69 1102 47 1131C25 1161 24 1190 46 1219C69 1249 69 1278 47 1307C25 1336 24 1365 46 1394C69 1424 69 1453 47 1482C25 1511 24 1540 46 1569C69 1598 69 1627 47 1656C25 1685 24 1714 46 1743C69 1772 69 1801 47 1830C25 1860 24 1889 46 1918C69 1947 69 1976 47 2005C25 2034 24 2063 46 2092C69 2122 69 2151 47 2180C25 2209 24 2238 46 2267C69 2296 69 2325 47 2354C31 2375 29 2390 33 2400"
            stroke="rgba(255,255,255,0.94)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 0C51 29 52 57 30 86C9 114 8 142 29 170C50 198 52 227 30 256C8 284 8 313 29 341C50 369 52 398 30 427C8 456 8 485 29 514C50 543 52 572 30 601C8 630 8 658 29 687C50 716 52 745 30 774C8 803 8 832 29 861C50 890 52 919 30 948C8 977 8 1006 29 1035C50 1064 52 1093 30 1122C8 1151 8 1179 29 1208C50 1237 52 1266 30 1295C8 1324 8 1353 29 1382C50 1411 52 1440 30 1469C8 1498 8 1527 29 1556C50 1585 52 1614 30 1643C8 1672 8 1701 29 1730C50 1760 52 1789 30 1818C8 1847 8 1875 29 1904C50 1933 52 1962 30 1991C8 2020 8 2049 29 2078C50 2107 52 2136 30 2165C8 2194 8 2223 29 2252C50 2281 52 2310 30 2339C11 2365 11 2385 17 2400"
            stroke="rgba(255,255,255,0.54)"
            strokeWidth="1.05"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="absolute inset-0 hidden xl:block">
        <div
          className="absolute inset-x-0 top-20 h-[178px]"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, ${color} 58%, white) 0%, color-mix(in srgb, ${color} 42%, white) 30%, rgba(255,255,255,0.88) 70%, rgba(255,255,255,0) 100%)`,
          }}
        />

        <div
          className="absolute left-0 top-20 bottom-0 w-[92px]"
          style={{
            background: `linear-gradient(90deg, color-mix(in srgb, ${color} 58%, white) 0%, color-mix(in srgb, ${color} 42%, white) 30%, rgba(255,255,255,0.9) 72%, rgba(255,255,255,0) 100%)`,
          }}
        />

        <div
          className="absolute left-0 top-20 h-[178px] w-[92px]"
          style={{
            background: `radial-gradient(circle at top left, color-mix(in srgb, ${color} 56%, white) 0%, color-mix(in srgb, ${color} 42%, white) 28%, rgba(255,255,255,0.14) 74%, rgba(255,255,255,0) 100%)`,
          }}
        />

        <svg
          className="absolute left-5 right-5 top-[92px] h-[108px] w-[calc(100%-40px)]"
          viewBox="0 0 1200 116"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-12 74C20 24 66 18 73 46C81 78 46 98 23 90C-7 79 -5 42 25 29C66 11 116 38 144 61C172 85 214 100 271 100C337 100 374 73 401 46C428 18 468 10 483 42C496 70 470 95 441 92C409 89 400 47 425 25C450 4 494 7 529 39C569 75 611 97 671 100C737 103 782 83 816 48C844 19 886 8 900 39C913 66 892 93 865 92C835 90 826 48 851 26C880 1 923 8 958 38C999 74 1044 97 1102 98C1140 98 1173 92 1212 80"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          className="absolute left-0 top-[146px] bottom-0 h-[calc(100%-146px)] w-[92px]"
          viewBox="0 0 92 2400"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M46 0C70 27 71 56 48 86C26 115 24 144 46 173C68 202 69 230 47 259C25 288 23 317 46 346C69 375 69 404 47 433C24 463 24 491 47 520C69 549 69 578 47 607C25 636 24 665 47 694C69 723 69 752 47 781C25 810 24 839 46 868C69 898 69 927 47 956C24 985 24 1014 46 1044C69 1074 69 1102 47 1131C25 1161 24 1190 46 1219C69 1249 69 1278 47 1307C25 1336 24 1365 46 1394C69 1424 69 1453 47 1482C25 1511 24 1540 46 1569C69 1598 69 1627 47 1656C25 1685 24 1714 46 1743C69 1772 69 1801 47 1830C25 1860 24 1889 46 1918C69 1947 69 1976 47 2005C25 2034 24 2063 46 2092C69 2122 69 2151 47 2180C25 2209 24 2238 46 2267C69 2296 69 2325 47 2354C31 2375 29 2390 33 2400"
            stroke="rgba(255,255,255,0.94)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 0C51 29 52 57 30 86C9 114 8 142 29 170C50 198 52 227 30 256C8 284 8 313 29 341C50 369 52 398 30 427C8 456 8 485 29 514C50 543 52 572 30 601C8 630 8 658 29 687C50 716 52 745 30 774C8 803 8 832 29 861C50 890 52 919 30 948C8 977 8 1006 29 1035C50 1064 52 1093 30 1122C8 1151 8 1179 29 1208C50 1237 52 1266 30 1295C8 1324 8 1353 29 1382C50 1411 52 1440 30 1469C8 1498 8 1527 29 1556C50 1585 52 1614 30 1643C8 1672 8 1701 29 1730C50 1760 52 1789 30 1818C8 1847 8 1875 29 1904C50 1933 52 1962 30 1991C8 2020 8 2049 29 2078C50 2107 52 2136 30 2165C8 2194 8 2223 29 2252C50 2281 52 2310 30 2339C11 2365 11 2385 17 2400"
            stroke="rgba(255,255,255,0.56)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

const StudyDetail: React.FC = () => {
  const { studyId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isStudySaved, toggleSaveStudy } = useSavedStudies();
  const { size: readingSize, setSize: setReadingSize } = useReadingSize();
  const [showVisualAudio, setShowVisualAudio] = useState(false);
  const [isVisualAudioPlaying, setIsVisualAudioPlaying] = useState(false);
  const [audioReplayKey, setAudioReplayKey] = useState(0);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [studyId]);

  // Highlight navigation from dashboard
  useEffect(() => {
    const highlightText = searchParams.get('highlight');
    if (!highlightText) return;

    const hlBg = searchParams.get('hlBg') || '#fde047';
    const hlColor = searchParams.get('hlColor') || '#000';

    const timer = setTimeout(() => {
      const decoded = decodeURIComponent(highlightText);
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        if (node.textContent && node.textContent.includes(decoded)) {
          const parent = node.parentElement;
          if (!parent || parent.closest('[data-highlightable]') === null) continue;
          
          const range = document.createRange();
          const startIdx = node.textContent.indexOf(decoded);
          range.setStart(node, startIdx);
          range.setEnd(node, startIdx + decoded.length);
          
          const mark = document.createElement('mark');
          mark.style.backgroundColor = hlBg;
          mark.style.color = hlColor;
          mark.style.backgroundImage = `linear-gradient(to right, ${hlBg} 50%, transparent 50%)`;
          mark.style.backgroundSize = '0% 100%';
          mark.style.backgroundRepeat = 'no-repeat';
          mark.className = 'highlight-sweep-animate';
          
          range.surroundContents(mark);
          mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams]);

  let study: StudyDetailData | undefined;
  
  if (studyId) {
    study = getStudyBySlug(studyId);
    if (!study) {
      study = getStudyById(studyId);
      if (study) {
        navigate(`/studies/${study.slug}`, { replace: true });
        return null;
      }
    }
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container-editorial py-16 pt-48 text-center">
          <h1 className="editorial-title text-4xl mb-4">Study Not Found</h1>
          <p className="editorial-copy mb-8">The study you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/studies')}
            className="editorial-button px-6 py-3"
          >
            Back to Studies
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryHex = getCategoryHex(study.category);
  const sizeStyles = SIZE_STYLES[readingSize];

  const handleCategoryClick = () => {
    navigate(`/studies?category=${encodeURIComponent(study!.category)}`);
  };

  const handlePrototypeBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    const fromCategory = searchParams.get('from');
    navigate(fromCategory ? `/categories/${fromCategory}` : '/studies');
  };

  const handleToggleVisualAudio = () => {
    setShowVisualAudio((current) => {
      const next = !current;
      setIsVisualAudioPlaying(next);
      return next;
    });
  };

  const handleReplayVisualAudio = () => {
    setAudioReplayKey((current) => current + 1);
    setIsVisualAudioPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgressBar readTime={study.readTime} categoryHex={categoryHex} contentRef={contentRef} />
      <style>{studyAudioStyles}</style>
      <Header variant="study" />

      <div className="relative">
        <StudyPrototypeDecor color={categoryHex} />

        <div className="container-editorial relative z-10 py-8 pt-28 sm:py-16 sm:pt-56">
          <button
            onClick={handlePrototypeBack}
            className="absolute left-0 top-[96px] hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 xl:inline-flex"
          >
            <ArrowLeft size={14} strokeWidth={1.45} />
            Back
          </button>
        {/* Back to category */}
        <button
          onClick={handlePrototypeBack}
          className="mb-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 xl:hidden"
        >
          <ArrowLeft size={14} strokeWidth={1.45} />
          Back
        </button>
        {searchParams.get('from') && (
          <button
            onClick={() => navigate(`/categories/${searchParams.get('from')}`)}
            className="mb-8 hidden items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-subtle transition-colors hover:text-foreground xl:hidden"
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <div className="flex gap-8 lg:gap-[80px]">
          
          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              <div>
                <div className="border-b border-border pb-3 mb-5">
                  <h4 className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Researchers</h4>
                </div>
                <div className="space-y-5">
                  {study.researchers.map((researcher, index) => (
                    <div key={index}>
                      <p className="font-semibold text-foreground text-[15px]">{researcher.name}</p>
                      <p className="text-foreground-subtle text-[13px]">{researcher.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="border-b border-border pb-3 mb-5">
                  <h4 className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Institutions</h4>
                </div>
                <div className="space-y-3">
                  {study.institutions.map((institution, index) => (
                    <p key={index} className="text-foreground text-[15px] font-medium leading-snug">{institution}</p>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main ref={contentRef} className="flex-1 min-w-0 max-w-[550px]">
            <header className="mb-16">
              <div className="mb-6 space-y-5">
                <div>
                  <Link 
                    to={`/studies?category=${encodeURIComponent(study.category)}`}
                    className="inline-flex border border-border bg-background-alt px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
                    style={{ borderColor: categoryHex }}
                  >
                    {study.category}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {getStudyKeywords(study).map((keyword) => (
                    <span key={keyword} className="border border-border bg-secondary px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-foreground-subtle">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <h1 
                className="mb-10 font-serif text-[38px] leading-[0.94] tracking-tight text-foreground sm:text-[50px] lg:text-[68px]"
              >
                {study.title}
              </h1>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-12 border-t border-border pt-6">
                <div>
                  <span className="text-foreground-subtle text-[10px] uppercase tracking-[0.15em] block mb-1">Release</span>
                  <p className="text-[14px] text-foreground">
                    {study.date.replace('Oct ', '2024.10.')}
                  </p>
                </div>
                <div>
                  <span className="text-foreground-subtle text-[10px] uppercase tracking-[0.15em] block mb-1">Journal</span>
                  <p className="text-[14px] uppercase tracking-[0.05em] text-foreground">
                    {study.journal}
                  </p>
                </div>
                <div className="relative flex w-full min-w-0 items-start justify-start sm:ml-auto sm:w-auto sm:min-w-[320px] sm:justify-end">
                  <div className="flex items-center gap-2">
                    <ReadingComfortControl size={readingSize} onChange={setReadingSize} />
                    <button
                      onClick={handleToggleVisualAudio}
                      className={`rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted ${showVisualAudio ? 'bg-muted' : ''}`}
                      title={showVisualAudio ? 'Hide audio controls' : 'Show audio controls'}
                    >
                      <Volume2 size={18} strokeWidth={1.5} className="text-foreground-subtle" />
                    </button>
                    <button
                      onClick={() => study && toggleSaveStudy(study.slug)}
                      className={`rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted ${isStudySaved(study?.slug || '') ? 'bg-muted' : ''}`}
                      title={isStudySaved(study?.slug || '') ? 'Remove from library' : 'Save to library'}
                    >
                      <Bookmark
                        size={18}
                        strokeWidth={1.5}
                        className={isStudySaved(study?.slug || '') ? 'text-foreground fill-foreground' : 'text-foreground-subtle'}
                      />
                    </button>
                  </div>

                  {showVisualAudio && (
                    <div className="absolute left-0 top-full z-20 pt-3 sm:left-auto sm:right-0">
                      <VisualAudioPlayer
                        key={audioReplayKey}
                        isPlaying={isVisualAudioPlaying}
                        onToggle={() => setIsVisualAudioPlaying((current) => !current)}
                        onReplay={handleReplayVisualAudio}
                      />
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Mobile Researchers & Institutions */}
            <div className="lg:hidden mb-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="border-b border-border pb-3 mb-5">
                  <h4 className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Researchers</h4>
                </div>
                <div className="space-y-5">
                  {study.researchers.map((researcher, index) => (
                    <div key={index}>
                      <p className="font-semibold text-foreground text-[15px]">{researcher.name}</p>
                      <p className="text-foreground-subtle text-[13px]">{researcher.role}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="border-b border-border pb-3 mb-5">
                  <h4 className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Institutions</h4>
                </div>
                <div className="space-y-3">
                  {study.institutions.map((institution, index) => (
                    <p key={index} className="text-foreground text-[15px] font-medium leading-snug">{institution}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <section id="section-summary" className="mb-20">
              <div className="pb-12 border-b border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-border"></div>
                  <span className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Summary</span>
                </div>
                <p 
                  data-highlightable
                  className={`${sizeStyles.summary} text-foreground leading-[1.25] font-normal tracking-[-0.01em]`}
                >
                  {study.summary}
                </p>
              </div>
            </section>

            {/* Execution Protocol */}
            <section id="section-execution-protocol" className="mb-16 pt-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-border"></div>
                <span className="text-[11px] font-medium text-foreground-subtle uppercase tracking-[0.2em]">Execution Protocol</span>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-full">
                {study.executionProtocol.map((item, i) => (
                  <div key={i}>
                    <h4 className="mb-3 text-[14px] font-medium uppercase tracking-[0.14em] text-foreground">
                      {item.title}
                    </h4>
                    <p data-highlightable className={`${sizeStyles.body} text-foreground-muted leading-relaxed`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Systematic Analysis */}
            <section className="border-t border-border">
              <div id="section-research-objective">
                <Section number="01" title="Research Objective" defaultOpen={true}>
                  <p data-highlightable className={sizeStyles.body}>{study.researchObjective}</p>
                </Section>
              </div>

              <div id="section-methodology">
                <Section number="02" title="Methodology">
                  <p data-highlightable className={sizeStyles.body}>{study.methodology.intro}</p>
                  <ul className="list-disc list-outside ml-5 space-y-3 mt-6">
                    {study.methodology.points.map((point, index) => (
                      <li data-highlightable key={index} className={sizeStyles.body}>{point}</li>
                    ))}
                  </ul>
                </Section>
              </div>

              <div id="section-observations">
                <Section number="03" title="Observations">
                  {study.observations.map((observation, index) => (
                    <p data-highlightable key={index} className={`${sizeStyles.body} ${index > 0 ? 'mt-4' : ''}`}>
                      {observation}
                    </p>
                  ))}
                </Section>
              </div>

              <div id="section-impact">
                <Section number="04" title="Impact">
                  <p data-highlightable className={sizeStyles.body}>{study.impact}</p>
                </Section>
              </div>

              <div id="section-constraints">
                <Section number="05" title="Constraints">
                  <p data-highlightable className={sizeStyles.body}>{study.constraints}</p>
                </Section>
              </div>
              
              <div id="section-original-source">
                <OriginalSourceSection study={study} />
              </div>
            </section>

            {/* Footer Navigation */}
            <footer className="mt-100 pt-8 border-t border-border">
              <div className="flex justify-center">
                <button 
                  onClick={handleCategoryClick}
                  className="group flex items-center gap-3 text-[11px] text-foreground-subtle uppercase tracking-[0.2em] hover:text-foreground transition-colors"
                >
                  "{study.category}"
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </footer>
          </main>

          {/* RIGHT SIDEBAR - TOC + Citation */}
          <aside className="hidden xl:block w-48 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents categoryHex={categoryHex} />
              <CopyCitation study={study} />
            </div>
          </aside>
        </div>
        </div>
        <RelatedStudies currentStudy={study} />
      </div>

      <Footer />
      <TextHighlighter studySlug={study.slug} />
    </div>
  );
};

export default StudyDetail;
