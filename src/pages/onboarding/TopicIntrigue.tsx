import React, { useState } from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const ALL_BUZZWORDS = [
  'Sleep Quality', 'Circadian Rhythm', 'REM Optimization', 'Melatonin',
  'Focus Enhancement', 'Memory', 'Decision Making', 'Learning Speed',
  'Gut Health', 'Micronutrients', 'Fasting', 'Metabolic Flexibility',
  'Recovery', 'Endurance', 'Strength Training', 'Peak States',
  'Brain Plasticity', 'Neural Pathways', 'Dopamine', 'Stress Response',
  'Aging Markers', 'NAD+', 'Autophagy', 'Telomeres',
  'Habits', 'Motivation', 'Behavioral Change', 'Reward Systems',
  'Body Systems', 'Inflammation', 'Hormones', 'Immune Function',
  'Wearables', 'Digital Health', 'Screen Effects', 'Biometrics',
  'Skin Health', 'Body Composition', 'Collagen', 'Appearance',
  'Cold Exposure', 'Heart Rate', 'Blood Pressure', 'Cortisol',
  'Caffeine', 'Hydration', 'Probiotics', 'Vitamin D',
  'Mindfulness', 'Breathing', 'Posture', 'Blue Light',
];

const TopicIntrigue: React.FC<Props> = ({ onNext, onPrev }) => {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  const toggleWord = (word: string) => {
    setSelectedWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-2 md:py-4 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-3xl text-center">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-1 md:mb-2 block">Interests</span>
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-1 md:mb-2">What topics intrigue you?</h1>
          <p className="text-zinc-400 text-[8px] md:text-[9px] mb-3 md:mb-5 font-medium uppercase tracking-[0.1em] md:tracking-[0.15em] leading-relaxed max-w-lg mx-auto px-2">
            Click any topic that might interest you and you might want to learn more about. This helps us better understand your learning goals so we can recommend the right plan.
          </p>

          {/* Grid Container */}
          <div className="border border-black rounded-sm p-4 md:p-6 mx-auto max-w-2xl mb-3 md:mb-5">
            <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
              {ALL_BUZZWORDS.map((word) => {
                const isSelected = selectedWords.has(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleWord(word)}
                    className={`text-[8px] md:text-[10px] font-mono uppercase tracking-wide px-3 py-1.5 md:px-4 md:py-2 rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'text-zinc-500 border-zinc-200 hover:text-black hover:border-zinc-400'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3">
            <button 
              onClick={onNext}
              className="bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-3 md:py-4 px-10 md:px-16 rounded-sm hover:bg-zinc-800 transition-all shadow-xl"
            >
              Continue to Plans
            </button>
            <div className="flex items-center gap-8 md:gap-12">
              <button onClick={onPrev} className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors py-2">Go Back</button>
              <button onClick={onNext} className="text-[10px] md:text-[11px] font-mono text-zinc-400 uppercase tracking-widest hover:text-zinc-600 transition-colors py-2">Skip</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4 md:h-6 shrink-0"></div>
    </div>
  );
};

export default TopicIntrigue;
