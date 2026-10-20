import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, FileSearch, Shield, Users } from "lucide-react";

const processSteps = [
  {
    label: "Step 01",
    title: "Selection",
    icon: FileSearch,
    description:
      "We prioritize peer-reviewed studies from reputable journals, published within the past 12 months, with robust methodology.",
  },
  {
    label: "Step 02",
    title: "Review",
    icon: Users,
    description:
      "Each study is reviewed by subject matter experts who verify accuracy and identify the most relevant findings.",
  },
  {
    label: "Step 03",
    title: "Translation",
    icon: CheckCircle,
    description:
      "Complex findings are translated into clear language without losing essential nuance or context.",
  },
  {
    label: "Step 04",
    title: "Disclosure",
    icon: Shield,
    description:
      "We always include limitations, conflicts of interest, and source citations. Transparency is mandatory.",
  },
];

const principles = [
  {
    title: "Accuracy Over Engagement",
    body: "We don't sensationalize findings or use clickbait. If a study has modest results, we say so. If the implications are limited, we disclose that.",
  },
  {
    title: "Context Is Essential",
    body: "Single studies rarely prove anything definitively. We provide context about how findings fit within the broader scientific landscape.",
  },
  {
    title: "Limitations Matter",
    body: "Every study has limitations. We always include them. Understanding what a study doesn't prove is as important as what it does.",
  },
  {
    title: "No Medical Advice",
    body: "We provide information, not medical advice. Our summaries are educational tools, not replacements for professional healthcare guidance.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-alt">
      <Header />

      <main className="flex-1 pt-20 lg:pt-24">
        <header className="relative z-10 mx-auto mt-12 mb-20 flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <span className="section-label mb-6">About Explicatio</span>
          <h1 className="editorial-title mb-8 text-5xl leading-[0.94] md:text-7xl">
            Bridging Research & Understanding
          </h1>
          <p className="editorial-copy max-w-2xl text-sm md:text-base">
            Explicatio exists because scientific research matters—but access to it shouldn't require a PhD. We translate newly published studies into structured, digestible summaries without sacrificing accuracy or nuance.
          </p>
        </header>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="surface-card p-8 md:p-10">
              <span className="section-label mb-4">The Challenge</span>
              <h2 className="editorial-title mb-6 text-3xl md:text-4xl">The Problem We Solve</h2>
              <p className="editorial-copy mb-4 text-sm">
                Scientific literature is growing exponentially. Over 3 million papers are published annually. Most are hidden behind paywalls, written in technical jargon, and inaccessible to non-specialists.
              </p>
              <p className="editorial-copy text-sm">
                Meanwhile, health misinformation spreads freely. People make decisions about their bodies based on headlines and influencer claims rather than evidence.
              </p>
            </div>

            <div className="surface-card p-8 md:p-10">
              <span className="section-label mb-4">Our Solution</span>
              <h2 className="editorial-title mb-6 text-3xl md:text-4xl">Our Approach</h2>
              <p className="editorial-copy mb-4 text-sm">
                We select studies based on methodology quality, relevance, and recency. We then translate them into structured reports that preserve the essential information while making it accessible.
              </p>
              <p className="editorial-copy text-sm">
                Every summary includes the original purpose, simplified methodology, key findings, practical implications, limitations, and source citation. Nothing is hidden or oversimplified.
              </p>
            </div>
          </div>
        </section>

        <section id="methodology" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="section-label mb-6">Our Process</span>
            <h2 className="editorial-title text-4xl md:text-5xl">Methodology</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="surface-card p-8 text-center">
                <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center border border-border bg-background">
                  <step.icon className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
                </div>
                <span className="section-label mb-3">{step.label}</span>
                <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
                <p className="text-sm leading-7 text-foreground-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-6 py-12 lg:py-16">
          <div className="surface-card p-8 md:p-12">
            <div className="mb-8 text-center">
              <span className="section-label mb-6 block">The Name</span>
              <h2 className="editorial-title text-4xl md:text-5xl">Explicatio</h2>
            </div>

            <div className="mx-auto max-w-2xl text-center">
              <p className="editorial-copy mb-4 text-sm">
                <span className="font-semibold text-foreground">Explicatio</span> comes from Latin, meaning to unfold or to lay something open.
              </p>
              <p className="editorial-copy mb-4 text-sm">
                For us, explicatio isn't about simplifying science or stripping it down. It's about opening it up—taking research that's dense, technical, or buried in jargon and carefully unfolding it so the structure, reasoning, and meaning become clear.
              </p>
              <p className="editorial-copy mb-4 text-sm">
                Scientific papers aren't inaccessible because they're impossible to understand. They're inaccessible because their ideas are rarely explained outside of specialist circles.
              </p>
              <p className="editorial-copy mb-4 text-sm">
                Explicatio exists to bridge that gap. We keep the science intact, but present it in a way that lets curious, motivated readers actually see what's going on beneath the surface—and why it matters.
              </p>
              <p className="editorial-copy text-sm">We don't water things down. We make them visible.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-6 py-20 lg:py-24">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="section-label mb-6">Our Standards</span>
            <h2 className="editorial-title text-4xl md:text-5xl">Principles</h2>
          </div>

          <div className="space-y-4">
            {principles.map((principle) => (
              <div key={principle.title} className="surface-card border-l-2 border-l-foreground/10 p-7 md:p-9">
                <h3 className="mb-3 text-2xl font-medium tracking-tight text-foreground">{principle.title}</h3>
                <p className="editorial-copy text-sm">{principle.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 w-full bg-background py-20 lg:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
            <span className="section-label mb-4">Get Started</span>
            <h2 className="editorial-title mb-6 text-4xl md:text-5xl">Start Reading Research</h2>
            <p className="editorial-copy mb-10 max-w-md text-sm">
              Explore our library of structured research summaries. Evidence-based. Clearly explained. No hype.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/studies" className="editorial-button px-8 py-4">
                Browse Research
                <ArrowRight size={16} />
              </Link>
              <Link to="/pricing" className="editorial-button px-8 py-4">
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
