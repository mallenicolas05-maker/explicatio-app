import React, { useState } from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const ChoosePlatform: React.FC<Props> = ({ onNext, onPrev }) => {
  const [selected, setSelected] = useState<'individual' | 'institution'>('individual');

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 overflow-y-auto">
        <div className="w-full max-w-4xl text-center py-4">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-2 block">Account Type</span>
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-2 md:mb-3">How will you use Explicatio?</h1>
          <p className="text-zinc-400 text-[9px] md:text-[10px] mb-8 md:mb-12 font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed max-w-md mx-auto px-2">
            Select the account type that best matches your daily research workflow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12">
            <div 
              onClick={() => setSelected('individual')}
              className={`cursor-pointer p-6 md:p-10 border transition-all duration-300 rounded-md text-left ${
                selected === 'individual' ? 'border-black bg-zinc-50 shadow-xl ring-1 ring-black' : 'border-zinc-100 bg-white hover:border-zinc-200 opacity-80'
              }`}
            >
              <h3 className="text-base md:text-lg font-mono font-bold uppercase tracking-tight mb-3 md:mb-4">For Myself</h3>
              <p className="text-zinc-500 text-[10px] md:text-[11px] mb-5 md:mb-8 leading-relaxed">Perfect for independent researchers and curious minds tracking health data.</p>
              <div className="border-t border-zinc-100 pt-4 md:pt-6 space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selected === 'individual' ? 'bg-black' : 'bg-zinc-300'}`}></div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-zinc-700">6 Weekly Tracks</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selected === 'individual' ? 'bg-black' : 'bg-zinc-300'}`}></div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-zinc-700">Standard Archive</span>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setSelected('institution')}
              className={`cursor-pointer p-6 md:p-10 border transition-all duration-300 rounded-md text-left ${
                selected === 'institution' ? 'border-black bg-zinc-50 shadow-xl ring-1 ring-black' : 'border-zinc-100 bg-white hover:border-zinc-200 opacity-80'
              }`}
            >
              <h3 className="text-base md:text-lg font-mono font-bold uppercase tracking-tight mb-3 md:mb-4">For my Lab</h3>
              <p className="text-zinc-500 text-[10px] md:text-[11px] mb-5 md:mb-8 leading-relaxed">Designed for university labs and medical institutions with collaborative needs.</p>
              <div className="border-t border-zinc-100 pt-4 md:pt-6 space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selected === 'institution' ? 'bg-black' : 'bg-zinc-300'}`}></div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-zinc-700">Unlimited Streams</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selected === 'institution' ? 'bg-black' : 'bg-zinc-300'}`}></div>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-zinc-700">API Access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-4">
            <button 
              onClick={onNext}
              className="bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-4 md:py-5 px-10 md:px-16 rounded-sm hover:bg-zinc-800 transition-all shadow-xl"
            >
              Continue to Profile
            </button>
            <button onClick={onPrev} className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-zinc-300 hover:text-black transition-colors">Go Back</button>
          </div>
        </div>
      </div>
      <div className="h-8 md:h-12 shrink-0"></div>
    </div>
  );
};

export default ChoosePlatform;
