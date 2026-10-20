import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { categories } from "@/data/researchData";
import RequestQueue from "@/components/RequestQueue";

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-alt">
      <Header />
      
      <main className="flex-1 pt-20 lg:pt-24">
        {/* Header */}
        <header className="relative z-10 mx-auto mt-12 mb-20 flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <span className="section-label mb-6">
            Research Areas
          </span>

          <h1 className="editorial-title mb-8 text-5xl md:text-7xl leading-[0.92]">
            Categories
          </h1>

          <p className="editorial-copy max-w-2xl text-sm md:text-base">
            Browse research by topic. Each category contains curated summaries of recent scientific studies.
          </p>
        </header>

        {/* Categories Grid */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group block rounded-lg border border-border bg-background p-9 transition-colors duration-200 hover:border-foreground/20"
              >
                <div className="mb-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-foreground-subtle">
                    {category.name}
                  </span>
                </div>
                <p className="mb-10 h-16 text-sm leading-7 text-foreground-muted">
                  {category.description}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-subtle">{category.studyCount} studies</span>
                  <svg className="h-4 w-4 text-foreground-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Community Radar Research Queue */}
        <RequestQueue />
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
