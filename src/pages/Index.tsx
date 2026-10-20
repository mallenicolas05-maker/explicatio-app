import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeStudyCard } from "@/components/research/HomeStudyCard";
import { categories } from "@/data/researchData";
import { STUDIES_DATA, getStudyImageUrl } from "@/data/studiesData";
import { HOMEPAGE_FEATURED_IDS } from "@/data/featuredStudies";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import CustomHero, { HeroTheme } from "@/components/hero/CustomHero";
import ComparisonDemo from "@/components/ComparisonDemo";
import StudyGenealogy from "@/components/StudyGenealogy";
import ConsensusMeter from "@/components/ConsensusMeter";
import AudioSynthesis from "@/components/AudioSynthesis";
import RequestQueue from "@/components/RequestQueue";
import explicatioStandardIcon from "@/assets/explicatio-standard-icon.png";
import { motion } from "framer-motion";

const THEMES: { id: HeroTheme; label: string; color: string }[] = [
  { id: 'default',  label: 'Default',  color: '#d8d8d8' },
  { id: 'blue',     label: 'Blue',     color: '#cfe5ff' },
  { id: 'coral',    label: 'Coral',    color: '#ffc5b0' },
  { id: 'sage',     label: 'Sage',     color: '#b8ddb8' },
  { id: 'lavender', label: 'Lavender', color: '#d4c8f0' },
];

function StudyPreviewSwirlDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#3d98f8]/12 via-[#3d98f8]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 top-0 w-12 bg-gradient-to-r from-[#3d98f8]/14 via-[#3d98f8]/6 to-transparent" />
      <svg
        className="absolute left-4 right-4 top-5 h-16 w-[calc(100%-32px)]"
        viewBox="0 0 900 112"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-10 72C16 29 54 21 63 47C73 76 42 96 19 88C-6 79 -2 45 24 31C61 12 104 38 129 61C158 87 195 99 241 98C300 98 331 75 357 49C383 22 421 12 436 41C451 70 425 96 398 92C368 88 360 49 385 27C412 3 451 8 483 38C519 72 562 97 614 99C675 101 713 82 746 49C774 20 812 10 826 39C840 67 819 92 792 91C764 90 755 50 779 28C806 4 847 10 879 38C909 65 936 78 910 80"
          stroke="rgba(61,152,248,0.34)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-8 86C25 48 58 43 75 62C93 82 70 103 43 98C14 92 13 55 45 39C86 18 136 43 166 69C194 93 236 102 291 100C351 98 384 73 410 47C436 20 476 10 491 42C505 70 480 94 452 91"
          stroke="rgba(61,152,248,0.2)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 62C47 30 83 31 107 57C132 84 167 90 208 78C243 67 268 40 299 39C330 38 348 66 334 88C318 112 277 100 283 68C289 36 333 18 378 37C424 57 450 86 507 89C562 91 603 69 637 43C672 17 721 18 741 48C759 76 733 103 703 94C673 86 674 47 704 31C742 10 785 27 825 58C855 81 881 89 914 86"
          stroke="rgba(61,152,248,0.16)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-1 top-4 h-[calc(100%-16px)] w-10"
        viewBox="0 0 64 720"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M34 -20C42 42 34 93 30 142C25 200 39 249 33 310C28 365 22 407 30 458C40 515 43 558 32 620C25 655 25 692 31 742"
          stroke="rgba(61,152,248,0.42)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M44 -14C51 37 42 89 39 142C35 201 47 248 42 309C38 362 31 406 38 458C47 514 50 557 40 618C34 656 33 691 38 742"
          stroke="rgba(61,152,248,0.22)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ThemeToggle({ theme, onThemeChange }: { theme: HeroTheme; onThemeChange: (t: HeroTheme) => void }) {
  const [open, setOpen] = useState(false);
  const current = THEMES.find(t => t.id === theme)!;

  return (
    <div className="fixed right-0 z-50 flex items-stretch" style={{ top: '20vh' }}>
      {/* Expandable panel — slides in from right */}
      <div
        style={{
          width: open ? '132px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'width 0.28s ease, opacity 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="w-[132px] h-full bg-white/92 backdrop-blur-md border border-r-0 border-[#28292a]/12 px-3 py-3 flex flex-col gap-2.5">
          {/* Color circles */}
          <div className="flex gap-1.5 items-center flex-wrap">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className="shrink-0 transition-transform hover:scale-110"
                title={t.label}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: t.color,
                  boxShadow: theme === t.id
                    ? `0 0 0 1.5px white, 0 0 0 3px ${t.color}`
                    : 'none',
                }}
              />
            ))}
          </div>
          {/* Current label */}
          <span className="text-[8.5px] font-mono uppercase tracking-widest text-gray-400">
            {current.label}
          </span>
        </div>
      </div>

      {/* Tab handle — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center bg-white/75 backdrop-blur-sm border border-[#28292a]/12 px-1.5 py-3"
        style={{ borderRadius: open ? '0' : '2px 0 0 2px' }}
      >
        <ChevronLeft
          style={{
            width: '11px',
            height: '11px',
            color: '#aac8f0',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.28s ease',
          }}
        />
      </button>
    </div>
  );
}

const ProductDemoLight: React.FC = () => {
  const sectionExplanations = [
    {
      title: "Key Details",
      text: "The identifying frame of the paper: release date, journal, authorship, read time, and category. It lets a reader place the study before entering the argument.",
      sample: "Released in Cell Metabolism, this eight-minute summary frames the study by date, source, category, and reading load before the analysis begins.",
    },
    {
      title: "Summary",
      text: "The short account of what the study found and why the finding matters. It preserves the central claim without asking the reader to parse the full paper first.",
      sample: "Daily supplementation of 250mg NMN significantly increased whole-blood NAD+ levels by 40% compared to placebo after 12 weeks.",
    },
    {
      title: "Execution Protocol",
      text: "The operational blueprint of the study: how participants were selected, grouped, measured, and followed through the intervention or observation period.",
      sample: "Researchers assigned participants to a controlled supplementation protocol and monitored blood markers across the intervention window.",
    },
    {
      title: "Research Objective",
      text: "The question the researchers set out to answer. It clarifies the gap in knowledge, the hypothesis under pressure, and the reason the work was conducted.",
      sample: "The study tested whether NAD+ precursors could measurably alter systemic NAD+ availability in adults under controlled conditions.",
    },
    {
      title: "Methodology",
      text: "The structure of the investigation: design, controls, measurements, sample logic, and analytic choices. This is where credibility is won or weakened.",
      sample: "Blood measures were compared across treatment and placebo groups using predefined biomarkers and repeated collection points.",
    },
    {
      title: "Observations",
      text: "The results as they appeared in the data. This section separates what was actually observed from what might be inferred, marketed, or overstated.",
      sample: "The intervention group showed a clear rise in whole-blood NAD+ while the placebo group did not show the same magnitude of change.",
    },
    {
      title: "Impact",
      text: "The practical meaning of the result. It asks what the study changes, who it may matter for, and where the finding can be used with appropriate caution.",
      sample: "The findings support further research into NAD+ precursor supplementation while keeping claims about performance or longevity restrained.",
    },
    {
      title: "Constraints",
      text: "The boundaries of the evidence: sample size, design limits, confounds, measurement weaknesses, and anything that should restrain interpretation.",
      sample: "The result should be read within the limits of the sample, study duration, biomarker focus, and absence of broader clinical outcomes.",
    },
    {
      title: "Original Source",
      text: "The paper itself, with citation context intact. It keeps the simplified summary accountable to the source that produced the evidence.",
      sample: "The original publication remains linked so readers can inspect the full methods, statistics, limitations, and citation context directly.",
    },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingPhase, setTypingPhase] = useState<'typing' | 'holding' | 'deleting' | 'waiting'>('typing');

  useEffect(() => {
    const text = sectionExplanations[activeSection].text;
    let timeout: number | undefined;

    if (typingPhase === 'typing' && typedText.length < text.length) {
      timeout = window.setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, 36);
    } else if (typingPhase === 'typing') {
      timeout = window.setTimeout(() => {
        setTypingPhase('deleting');
      }, 4000);
    } else if (typingPhase === 'deleting' && typedText.length > 0) {
      timeout = window.setTimeout(() => {
        setTypedText((current) => current.slice(0, Math.max(0, current.length - 4)));
      }, 16);
    } else if (typingPhase === 'deleting') {
      setActiveSection((currentSection) => (currentSection + 1) % sectionExplanations.length);
      setTypingPhase('waiting');
    } else if (typingPhase === 'waiting') {
      timeout = window.setTimeout(() => {
        setTypingPhase('typing');
      }, 1000);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [activeSection, sectionExplanations.length, typedText, typingPhase]);

  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-medium mb-6 block font-mono">
            Study Anatomy
          </span>
          <h2 className="font-sans font-extralight text-4xl text-zinc-800 tracking-tight">What you get</h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,620px)_minmax(360px,1fr)]">
          <article className="relative min-h-[650px] overflow-hidden border border-gray-200 bg-white">
            <StudyPreviewSwirlDecor />
            <div className="relative z-10 p-8 lg:p-10">
              <span
                className="mb-10 inline-flex rounded-full bg-white px-2.5 py-[5px] text-[8px] font-medium uppercase tracking-[0.18em]"
                style={{ color: '#3d98f8', border: '1px solid rgba(61,152,248,0.32)' }}
              >
                Longevity
              </span>

              <h3
                className="mb-8 font-serif text-5xl leading-[0.96] tracking-tight text-[#0B0B0B] lg:text-[58px]"
              >
                NAD+ Precursors in Muscle
              </h3>

              <div className="mb-8 grid grid-cols-3 gap-5 border-t border-gray-200 pt-6">
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Release</span>
                  <p className="text-[13px] font-medium text-[#0B0B0B]">2026.01.15</p>
                </div>
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Journal</span>
                  <p className="text-[13px] font-medium uppercase tracking-[0.05em] text-[#0B0B0B]">Cell Metabolism</p>
                </div>
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Read Time</span>
                  <p className="text-[13px] font-medium text-[#0B0B0B]">8 min</p>
                </div>
              </div>

              <div className="mb-8 border-b border-gray-200 pb-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-6 bg-gray-300" />
                  <motion.span
                    key={`preview-label-${sectionExplanations[activeSection].title}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24 }}
                    className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-gray-400"
                  >
                    {sectionExplanations[activeSection].title}
                  </motion.span>
                </div>
                <motion.p
                  key={`preview-copy-${sectionExplanations[activeSection].title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="min-h-[126px] text-2xl font-normal leading-[1.28] tracking-[-0.02em] text-[#0B0B0B]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {sectionExplanations[activeSection].sample}
                </motion.p>
              </div>

              <Link to="/studies" className="btn-sweep-trigger relative border border-gray-200 bg-gray-50 py-6 px-6 flex items-center justify-center gap-6 group cursor-pointer">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect x="0" y="0" width="100" height="100" fill="none" stroke="#9ca3af" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="btn-sweep-segment" />
                </svg>
                <div className="text-center relative z-10">
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-mono">Ready to Explore?</p>
                  <p className="font-bold text-[#0B0B0B] text-[14px] uppercase tracking-[0.01em] mb-1">DISCOVER RESEARCH THAT MATTERS</p>
                  <p className="text-[11px] text-gray-400 font-mono">Browse 100+ simplified studies across all categories</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 flex-shrink-0 relative z-10" />
              </Link>
            </div>
          </article>

          <aside className="relative min-h-[650px] border-l-2 border-gray-200 pl-9 pt-1">
            <span className="mb-8 block text-center font-mono text-[10px] uppercase tracking-[0.34em] text-gray-400">
              What This Means
            </span>

            <motion.div
              key={sectionExplanations[activeSection].title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26 }}
            >
              <p
                className="mb-5 text-[18px] uppercase text-[#28292a]"
                style={{ fontFamily: '"Fk Raster Grotesk Compact Blended", "Perfectly Nineties", "Courier New", monospace' }}
              >
                {sectionExplanations[activeSection].title}:
              </p>
            </motion.div>

            <div className="min-h-[560px] max-w-[540px]">
              <p
                className="whitespace-pre-wrap font-mono text-[40px] font-medium leading-[1.16] tracking-[-0.04em] text-[#111111]"
              >
                {typedText}
                <span className="ml-1 inline-block h-[1em] w-px translate-y-[0.16em] animate-pulse bg-[#111111]" />
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const [heroTheme, setHeroTheme] = useState<HeroTheme>(() =>
    (localStorage.getItem('hero-theme') as HeroTheme) || 'default'
  );

  return <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <CustomHero theme={heroTheme} />

        {/* Theme toggle */}
        <ThemeToggle theme={heroTheme} onThemeChange={(t) => { setHeroTheme(t); localStorage.setItem('hero-theme', t); }} />

        {/* product-demo */}
        <ProductDemoLight />

        {/* What it is */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="font-sans font-extralight text-3xl md:text-4xl leading-tight tracking-tight text-zinc-800">
                  Not a blog. <br />
                  <span className="text-zinc-400 italic">A research utility.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-px w-8 bg-primary mt-3 shrink-0" />
                    <div>
                      <h3 className="font-sans font-extralight text-lg text-zinc-800 tracking-tight mb-2">Editorial Rigor</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We don't chase headlines. We analyze methodology, sample size, and conflict of interest statements before a word is written.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-px w-8 bg-primary mt-3 shrink-0" />
                    <div>
                      <h3 className="font-sans font-extralight text-lg text-zinc-800 tracking-tight mb-2">Structured Summaries</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every report follows the same consistent structure: Purpose, Method, Findings, Implications, and Limitations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-px w-8 bg-primary mt-3 shrink-0" />
                    <div>
                      <h3 className="font-sans font-extralight text-lg text-zinc-800 tracking-tight mb-2">Practical Utility</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We focus on "So what?" Understanding the mechanism is good; understanding the application is better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-8 md:p-12 relative">
                {/* Decorative corner icon */}
                <img src={explicatioStandardIcon} alt="" className="absolute top-6 right-6 w-16 h-16 opacity-30" />
                <h3 className="font-sans font-extralight text-2xl text-zinc-800 tracking-tight mb-8">Explicatio Standard</h3>

                <div className="space-y-0 font-mono text-sm text-muted-foreground">
                  <div className="flex justify-between items-baseline border-b border-gray-200 py-3">
                    <span className="w-1/2">Source Quality</span>
                    <span className="w-1/2 text-right text-primary">Peer-Reviewed Only</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-gray-200 py-3">
                    <span className="w-1/2">Bias Check</span>
                    <span className="w-1/2 text-right text-primary">Funding Disclosed</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-gray-200 py-3">
                    <span className="w-1/2">Clickbait</span>
                    <span className="w-1/2 text-right text-primary">Strictly Prohibited</span>
                  </div>
                  <div className="flex justify-between items-baseline py-3">
                    <span className="w-1/2">Update Frequency</span>
                    <span className="w-1/2 text-right text-primary">Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* examples Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOMEPAGE_FEATURED_IDS.map(id => STUDIES_DATA.find(s => s.id === id)).filter(Boolean).map((study) => (
                <HomeStudyCard
                  key={study!.id}
                  slug={study!.slug}
                  title={study!.title}
                  category={study!.category}
                  date={study!.date}
                  readTime={study!.readTime}
                  excerpt={study!.excerpt}
                  imageUrl={getStudyImageUrl(study!)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* comparison */}
        <ComparisonDemo />

        {/* Process */}
        <StudyGenealogy />

        {/* Aggregate-analysis */}
        <ConsensusMeter />

        {/* text-to-speech */}
        <AudioSynthesis />

        {/* Categories */}
        <section className="bg-[#FAFAFA]">
          <div className="w-full max-w-6xl mx-auto px-6 py-16 lg:py-20">
            <header className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-16">
              <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-medium mb-6 font-mono">
                Research Areas
              </span>
              <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-[0.1em] uppercase text-gray-900 mb-8 leading-tight">
                CATEGORIES
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Browse research by topic. Each category contains curated summaries of recent scientific studies.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => {
              const studiesPageCategoryMap: Record<string, string> = {
                'SLEEP': 'Sleep', 'NEUROSCIENCE': 'Neuroscience', 'NUTRITION': 'Nutrition',
                'PERFORMANCE': 'Performance', 'PHYSIOLOGY': 'Physiology', 'COGNITION': 'Cognition',
                'BEHAVIOR': 'Behavior', 'LONGEVITY': 'Longevity', 'TECHNOLOGY': 'Technology', 'AESTHETICS': 'Aesthetics'
              };
              const mappedCategory = studiesPageCategoryMap[category.name];
              const linkTo = mappedCategory ? `/studies?category=${encodeURIComponent(mappedCategory)}` : '/studies';
              return <Link key={category.slug} to={linkTo} className="btn-sweep-trigger group block bg-white border border-gray-100 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <rect x="0" y="0" width="100" height="100" fill="none" stroke="#0f172a" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="btn-sweep-segment" />
                  </svg>
                  <div className="mb-6 relative z-20">
                    <span className={`inline-block px-3 py-1.5 text-[9px] font-mono font-bold tracking-[0.1em] uppercase ${category.color} rounded-full`}>
                      {category.name}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 h-16 relative z-20">
                    {category.description}
                  </p>
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between relative z-20">
                    <span className="font-mono text-[10px] text-gray-400 tracking-[0.1em] uppercase">{category.studyCount} studies</span>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>;
            })}
            </div>
          </div>
        </section>

        {/* community-search */}
        <RequestQueue />

        {/* final-cta */}
        <CTASection />
      </main>

      <Footer />
    </div>;
};

function CTASection() {
  return <section className="bg-background py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#64748B] mb-6">
              Start Learning
            </span>
            <h2 className="font-sans font-extralight text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-zinc-800 tracking-tight mb-6">
              Research that respects your intelligence
            </h2>
            <p className="text-[17px] lg:text-[19px] leading-[1.7] text-zinc-500 font-light mb-10">
              Join thousands of curious minds who rely on Explicatio 
              for clear, accurate summaries of the latest scientific findings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                View Plans
                <ArrowRight size={14} />
              </Link>
              <Link to="/studies" className="btn-sweep-trigger relative inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-widest text-zinc-900">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect x="0" y="0" width="100" height="100" fill="none" stroke="#d1d5db" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="0" y="0" width="100" height="100" fill="none" stroke="#0f172a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="btn-sweep-segment" />
                </svg>
                <span className="relative z-10">Browse Research</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
export default Index;
