import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const items = [
  "Clinical Reports", "Weekly Updates", "Personal Health", "Deep Research", "Data Analysis", "Newsletters", "Study Summaries", "Peer Review"
];

const UseCases: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data, updateData, saveToProfile, isLoading } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(data.interests || []);

  const toggle = (label: string) => {
    setSelected(prev => 
        prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const handleNext = async () => {
    updateData({ interests: selected });
    await saveToProfile(selected);
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-3 md:py-6 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-3xl text-center">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-2 block">Interests</span>
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-2 md:mb-3">What's your primary goal?</h1>
          <p className="text-zinc-400 text-[9px] md:text-[10px] mb-6 md:mb-10 font-medium uppercase tracking-[0.15em] md:tracking-[0.2em]">
            Select your initial focus areas.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10">
            {items.map((label) => {
              const isSelected = selected.includes(label);
              return (
                <div 
                  key={label}
                  onClick={() => toggle(label)}
                  className={`cursor-pointer p-4 md:p-6 rounded-sm text-center transition-all duration-300 flex flex-col items-center justify-center border text-[10px] md:text-[11px] font-bold uppercase tracking-wide ${
                      isSelected ? 'border-zinc-800 bg-white shadow-lg scale-105' : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                  style={{ borderWidth: isSelected ? '1px' : '0.5px' }}
                >
                  {label}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 md:gap-5">
            <button 
              onClick={handleNext}
              disabled={isLoading}
              className="bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-3 md:py-4 px-10 md:px-16 rounded-sm hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Continue'}
            </button>
            <div className="flex items-center gap-8 md:gap-12">
              <button onClick={onPrev} className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors py-2">Go Back</button>
              <button onClick={handleSkip} className="text-[10px] md:text-[11px] font-mono text-zinc-400 uppercase tracking-widest hover:text-zinc-600 transition-colors py-2">Skip</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 md:h-10 shrink-0"></div>
    </div>
  );
};

export default UseCases;
