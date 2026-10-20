import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { User, GraduationCap, ArrowRight } from 'lucide-react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

type Persona = 'individual' | 'professional';

const PersonaSelection: React.FC<Props> = ({ onNext, onPrev }) => {
  const { updateData } = useOnboarding();
  const [persona, setPersona] = useState<Persona | null>(null);

  const handlePersonaSelect = (selected: Persona) => {
    setPersona(selected);
    const professionalIdentity = selected === 'individual' 
      ? 'Curious individual seeking personal insight'
      : 'Student or researcher building professional knowledge';
    updateData({ professionalIdentity });
    onNext();
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 overflow-y-auto">
        <div className="w-full max-w-4xl text-center py-4">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-2 block">About You</span>
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-2 md:mb-3">What brings you here?</h1>
          <p className="text-zinc-400 text-[9px] md:text-[10px] mb-8 md:mb-12 font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed max-w-md mx-auto px-2">
            Help us understand your goals so we can personalize your experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-12">
            <button 
              onClick={() => handlePersonaSelect('individual')}
              className="cursor-pointer p-6 md:p-10 border border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-lg transition-all duration-300 rounded-xl text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-zinc-100 transition-colors">
                <User className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="text-base md:text-lg font-mono font-bold uppercase tracking-tight mb-3 md:mb-4">Personal Insight</h3>
              <p className="text-zinc-500 text-[10px] md:text-[11px] mb-5 md:mb-8 leading-relaxed">
                I want to understand health, performance, and life better. Curious individual seeking practical knowledge.
              </p>
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wide text-zinc-400 group-hover:text-black transition-colors">
                <span>Continue</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>

            <button 
              onClick={() => handlePersonaSelect('professional')}
              className="cursor-pointer p-6 md:p-10 border border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-lg transition-all duration-300 rounded-xl text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-zinc-100 transition-colors">
                <GraduationCap className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="text-base md:text-lg font-mono font-bold uppercase tracking-tight mb-3 md:mb-4">Professional Knowledge</h3>
              <p className="text-zinc-500 text-[10px] md:text-[11px] mb-5 md:mb-8 leading-relaxed">
                I'm building deeper scientific or professional expertise. Student, researcher, or practitioner seeking rigor.
              </p>
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wide text-zinc-400 group-hover:text-black transition-colors">
                <span>Continue</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>

          <button onClick={onPrev} className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-zinc-300 hover:text-black transition-colors">Go Back</button>
        </div>
      </div>
      <div className="h-8 md:h-12 shrink-0"></div>
    </div>
  );
};

export default PersonaSelection;
