import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryBadge } from "@/components/research/CategoryBadge";
import { Button } from "@/components/ui/button";
import { getStudyById, researchStudies } from "@/data/researchData";
import { ResearchCard } from "@/components/research/ResearchCard";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Bookmark, 
  Share2,
  ChevronDown,
  ExternalLink 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3 className="font-serif text-heading-md text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-foreground-muted transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[2000px] pb-8" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

const ResearchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const study = getStudyById(id || "");

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-display-sm text-foreground mb-4">
              Study Not Found
            </h1>
            <p className="text-body-md text-foreground-muted mb-8">
              The research study you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/research">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Research
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedStudies = researchStudies
    .filter((s) => s.categorySlug === study.categorySlug && s.id !== study.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Article Header */}
        <section className="section-zebra-alt border-b border-border">
          <div className="container-narrow py-12 lg:py-16">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-body-sm text-foreground-muted hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <CategoryBadge
                name={study.category}
                slug={study.categorySlug}
              />
              <span className="inline-flex items-center gap-1.5 text-caption text-foreground-subtle">
                <FileText className="h-3 w-3" />
                Simplified Summary
              </span>
            </div>

            <h1 className="font-serif text-display-sm lg:text-display-md text-foreground leading-tight animate-fade-in-up">
              {study.title}
            </h1>

            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
              <span className="text-body-sm text-foreground-muted">{study.date}</span>
              <span className="inline-flex items-center gap-1.5 text-body-sm text-foreground-muted">
                <Clock className="h-4 w-4" />
                {study.readingTime}
              </span>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-foreground-muted">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-foreground-muted">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-zebra-light">
          <div className="container-narrow py-12 lg:py-16">
            <div className="prose-editorial">
              <CollapsibleSection title="Original Research Purpose">
                <p className="text-body-lg text-foreground-muted leading-relaxed">
                  {study.originalPurpose}
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Method (Simplified)">
                <p className="text-body-lg text-foreground-muted leading-relaxed">
                  {study.method}
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Key Findings">
                <ul className="space-y-4">
                  {study.keyFindings.map((finding, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-caption font-medium">
                        {index + 1}
                      </span>
                      <p className="text-body-md text-foreground-muted leading-relaxed">
                        {finding}
                      </p>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>

              <CollapsibleSection title="Practical Implications">
                <ul className="space-y-4">
                  {study.practicalImplications.map((implication, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2.5" />
                      <p className="text-body-md text-foreground-muted leading-relaxed">
                        {implication}
                      </p>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>

              <CollapsibleSection title="Limitations" defaultOpen={false}>
                <ul className="space-y-4">
                  {study.limitations.map((limitation, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-foreground-subtle mt-2.5" />
                      <p className="text-body-md text-foreground-muted leading-relaxed">
                        {limitation}
                      </p>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            </div>
          </div>
        </section>

        {/* Source Citation */}
        <section className="section-zebra-alt border-t border-border">
          <div className="container-narrow py-12 lg:py-16">
            <h3 className="font-serif text-heading-md text-foreground mb-6">
              Source Citation
            </h3>
            <div className="p-6 bg-card border border-border rounded-sm">
              <p className="text-body-md text-foreground mb-2">
                {study.source.authors}
              </p>
              <p className="text-body-sm text-foreground-muted mb-4">
                <em>{study.source.journal}</em>, {study.source.year}
              </p>
              <a
                href={`https://doi.org/${study.source.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-accent hover:text-accent/80 transition-colors"
              >
                DOI: {study.source.doi}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Related Research */}
        {relatedStudies.length > 0 && (
          <section className="section-zebra-light border-t border-border">
            <div className="container-editorial py-16 lg:py-20">
              <h2 className="font-serif text-display-sm text-foreground mb-10">
                Related Research
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {relatedStudies.map((study) => (
                  <ResearchCard
                    key={study.id}
                    id={study.id}
                    title={study.title}
                    category={study.category}
                    categorySlug={study.categorySlug}
                    date={study.date}
                    readingTime={study.readingTime}
                    simplified={study.simplified}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ResearchDetail;
