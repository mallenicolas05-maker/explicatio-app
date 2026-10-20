import React from 'react';

const ConsensusMeter: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500 mb-4 inline-block">How Strong Is the Evidence</span>
          <h2 className="font-sans font-extralight text-3xl text-zinc-800 tracking-tight mb-6">Measuring Agreement</h2>
          <p className="text-zinc-500 font-light text-lg leading-relaxed mb-6">
            One study can be interesting. But when dozens point the same direction, it starts to mean something. We track how many studies agree — and how many don't.
          </p>
          <div className="flex gap-4 text-xs font-mono text-gray-400">
            <span>142 studies reviewed</span>
            <span>•</span>
            <span>Updated weekly</span>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 border border-gray-200 p-8 relative">
            <div className="flex justify-end mb-16">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Topic: Creatine & Brain Function</span>
            </div>

            {/* Scale */}
            <div className="relative pb-4">
              <div className="absolute bottom-full left-[72%] -translate-x-1/2 mb-1 flex flex-col items-center z-10">
                <div className="text-gray-900 text-[10px] font-mono px-3 py-1 uppercase tracking-widest border border-gray-200 bg-white rounded-full">
                  Strong Signal
                </div>
                <div className="w-px h-3 bg-gray-300"></div>
              </div>

              <div className="h-2 w-full overflow-hidden flex border border-gray-200 bg-white">
                <div className="w-1/3 bg-gray-900"></div>
                <div className="w-1/3 bg-gray-300"></div>
                <div className="w-1/3 bg-white"></div>
              </div>

              <div className="flex justify-between mt-3 text-[10px] font-mono uppercase text-gray-400 tracking-widest">
                <span>Mixed</span>
                <span>Growing</span>
                <span>Solid</span>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block font-sans font-extralight text-3xl text-zinc-800 tracking-tight">84%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1 block font-mono">Positive</span>
              </div>
              <div>
                <span className="block font-sans font-extralight text-3xl text-zinc-800 tracking-tight">12%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1 block font-mono">No Effect</span>
              </div>
              <div>
                <span className="block font-sans font-extralight text-3xl text-zinc-800 tracking-tight">4%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1 block font-mono">Negative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsensusMeter;
