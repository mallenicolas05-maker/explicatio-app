import React from 'react';

const ComparisonDemo: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-sans font-extralight text-4xl text-zinc-800 tracking-tight mb-4">Signal vs. Noise</h2>
          <p className="text-zinc-500 font-light text-center max-w-lg text-lg">
            We cut through pages of academic jargon so you get what actually matters — in minutes, not hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-gray-200 overflow-hidden">
          {/* Left: The Original */}
          <div className="bg-gray-50 p-12 relative overflow-hidden">
            <div className="absolute top-8 left-8 z-20 text-[10px] font-mono tracking-widest uppercase text-red-600 font-medium">The Original</div>
            <div className="mt-12 opacity-60 select-none pointer-events-none">
              <h4 className="font-serif text-2xl mb-6 text-gray-800">Abstract</h4>
              <p className="font-serif text-sm leading-[2] text-justify text-gray-600">
                "In the present investigation, we sought to elucidate the varying kinetic parameters of nicotinamide mononucleotide bioavailability across a heterogeneous cohort of 120 participants, stratified by age and baseline metabolic status, with a double-blind placebo-controlled design spanning 12 weeks..."
              </p>
              <p className="font-serif text-sm leading-[2] text-justify text-gray-600 mt-6">
                Dense. Technical. 47 pages long. You'd need a PhD and three cups of coffee just to find the one sentence that matters.
              </p>
            </div>
          </div>

          {/* Right: The Explicatio Version */}
          <div className="bg-white p-12 relative md:border-l border-t md:border-t-0 border-gray-200">
            <div className="absolute top-8 left-8 text-[10px] font-mono tracking-widest uppercase text-green-700 font-medium">The Explicatio Version</div>
            <div className="mt-12 space-y-8">
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">The Point</span>
                <p className="text-gray-900 font-medium text-lg leading-relaxed">250mg of NMN daily raised NAD+ levels by 40% in 12 weeks.</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">How Strong Is the Evidence</span>
                <div className="w-full bg-gray-100 h-1.5 mt-2">
                  <div className="bg-gray-900 h-1.5 w-3/4"></div>
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">What It Means for You</span>
                <p className="text-gray-600 font-light text-base leading-relaxed">NMN supplementation shows real promise for healthy aging — especially in adults over 55.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonDemo;
