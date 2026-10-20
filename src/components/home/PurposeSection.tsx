import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Sparkles, BookOpen } from 'lucide-react';

const PurposeSection: React.FC = () => {
  return (
    <section className="border-y border-border bg-background py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-28">
          <span className="section-label mb-6">
            Our Purpose
          </span>
          <h2 className="editorial-title text-5xl md:text-7xl leading-[0.92]">
            Curious. Critical. Clear.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 text-center">
          <div className="space-y-5">
            <div className="flex justify-center mb-2">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <Lightbulb className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="editorial-title text-3xl">
              Guilt-free scrolling
            </h3>
            <p className="editorial-copy text-sm">
              Your downtime should feel good. We turn those moments you'd spend on endless feeds 
              into something that actually sticks with you. Real ideas, real discoveries, without 
              the algorithm trying to steal your attention.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex justify-center mb-2">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <Sparkles className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="editorial-title text-3xl">
              Ideas worth your time
            </h3>
            <p className="editorial-copy text-sm">
              Every study we pick is chosen because it matters right now. Trending, relevant, useful. 
              We're not here to bury you in information. We're here to show you things that make 
              you think 'wait, that's actually interesting.'
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex justify-center mb-2">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <BookOpen className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="editorial-title text-3xl">
              The rabbit hole starts here
            </h3>
            <p className="editorial-copy text-sm">
              Our goal isn't to give you all the answers. It's to spark enough curiosity that you 
              keep going, asking more questions, connecting dots, maybe even doing your own research. 
              That's where the real magic happens.
            </p>
          </div>
        </div>

        <div className="mt-24 border-t border-border pt-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.26em] text-foreground-subtle">
            "Your free time is the precise time to think uniquely."
          </p>
          <Link 
            to="/about" 
            className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-foreground-subtle transition-colors duration-300 hover:text-foreground"
          >
            Read more about our purpose here →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
