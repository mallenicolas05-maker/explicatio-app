import React from 'react';
import { ArrowRight } from 'lucide-react';

const StudyGenealogy: React.FC = () => {

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left Column */}
          <div className="w-full md:w-1/2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3 block font-mono">Our Process</span>
            <h2 className="font-sans font-extralight text-5xl text-zinc-800 tracking-tight mb-8">From Journal to Insight</h2>
            <p className="text-zinc-500 font-light text-lg leading-relaxed mb-8 max-w-md">
              Every summary follows a rigorous methodology. We analyze original research papers, extract key findings, and translate complex methodologies into accessible language—without sacrificing accuracy.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-semibold text-gray-900 hover:underline decoration-1 underline-offset-4">
              Learn About Our Methodology <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          {/* Right Column - Timeline with stroke-draw borders */}
          <div className="w-full md:w-1/2 relative">
            <div>
              {[
                { step: "01", title: "Global Scan", desc: "We query 400+ validated journals and databases (PubMed, Nature, Science) daily for new publications." },
                { step: "02", title: "Impact Filter", desc: "Algorithms rank studies by sample size, citation velocity, and journal impact factor to identify signal." },
                { step: "03", title: "Human Verification", desc: "PhD-level analysts review methodology, funding sources, and statistical strength." },
                { step: "04", title: "Synthesis & Publish", desc: "The study is translated into our structured format and pushed to the live feed." }
              ].map((item, i) => {
                const isLTR = i % 2 === 0;
                return (
                  <div key={i} className="grid grid-cols-[48px_1fr] gap-4 py-8 relative z-20">
                    <span className="font-mono text-lg text-gray-300">{item.step}</span>
                    <div>
                      <h3 className="font-sans font-medium text-lg text-zinc-800 tracking-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 font-light max-w-lg">{item.desc}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
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

export default StudyGenealogy;
