import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ResearchCard } from "@/components/research/ResearchCard";
import { CategoryBadge } from "@/components/research/CategoryBadge";
import { researchStudies, categories } from "@/data/researchData";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Research = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredStudies = activeCategory
    ? researchStudies.filter((study) => study.categorySlug === activeCategory)
    : researchStudies;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Header */}
        <section className="section-zebra-alt border-b border-border">
          <div className="container-editorial py-16 lg:py-20">
            <p className="text-overline uppercase text-foreground-subtle font-sans tracking-widest mb-4 animate-fade-in">
              Research Feed
            </p>
            <h1 className="font-serif text-display-md lg:text-display-lg text-foreground animate-fade-in-up">
              Latest Studies
            </h1>
            <p className="mt-4 text-body-lg text-foreground-muted max-w-2xl animate-fade-in-up stagger-1">
              Structured summaries of recently published research in health, biology, and human performance.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="section-zebra-light border-b border-border-subtle sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-sm">
          <div className="container-editorial py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 text-body-sm font-medium rounded-sm whitespace-nowrap transition-colors",
                  activeCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground-muted hover:text-foreground"
                )}
              >
                All Research
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={cn(
                    "px-4 py-2 text-body-sm font-medium rounded-sm whitespace-nowrap transition-colors",
                    activeCategory === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground-muted hover:text-foreground"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Research Grid */}
        <section className="section-zebra-light">
          <div className="container-editorial py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredStudies.map((study, index) => (
                <div
                  key={study.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ResearchCard
                    id={study.id}
                    title={study.title}
                    category={study.category}
                    categorySlug={study.categorySlug}
                    date={study.date}
                    readingTime={study.readingTime}
                    simplified={study.simplified}
                    excerpt={study.excerpt}
                  />
                </div>
              ))}
            </div>

            {filteredStudies.length === 0 && (
              <div className="text-center py-16">
                <p className="text-body-lg text-foreground-muted">
                  No studies found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Research;
