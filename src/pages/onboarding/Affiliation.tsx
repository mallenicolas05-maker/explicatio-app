import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Building2, GraduationCap } from 'lucide-react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const suggestedCompanies = [
  'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Goldman Sachs', 
  'McKinsey', 'JPMorgan', 'Pfizer', 'Johnson & Johnson'
];

const suggestedSchools = [
  'Harvard University', 'Stanford University', 'MIT', 'Yale University',
  'Princeton University', 'Columbia University', 'Oxford University', 
  'Cambridge University', 'UC Berkeley', 'UCLA'
];

const Affiliation: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data, updateData } = useOnboarding();
  const [affiliationType, setAffiliationType] = useState<'work' | 'study' | null>(null);
  const [affiliation, setAffiliation] = useState(data.affiliation || '');

  const handleNext = () => {
    updateData({ affiliation });
    onNext();
  };

  const handleSkip = () => {
    updateData({ affiliation: '' });
    onNext();
  };

  const handleSuggestionClick = (value: string) => {
    setAffiliation(value);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-4 md:py-8 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 overflow-y-auto">
        <div className="w-full max-w-[520px] text-center py-4">
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight mb-3 md:mb-4 uppercase px-2">Where do you work or study?</h1>
          <p className="text-[10px] md:text-xs font-mono text-zinc-400 uppercase tracking-wide mb-8 md:mb-12">This helps us tailor content to your professional context</p>
          
          <div className="space-y-5 md:space-y-8 text-left">
            {/* Type Selection */}
            <div className="group">
              <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-2 md:mb-3 px-1">I'm currently...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAffiliationType('work')}
                  className={`p-4 md:p-5 border rounded-sm transition-all flex items-center gap-3 ${
                    affiliationType === 'work' 
                      ? 'border-black bg-white shadow-lg' 
                      : 'border-zinc-200/60 bg-white hover:border-zinc-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-zinc-600" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide">Working</span>
                </button>
                <button
                  onClick={() => setAffiliationType('study')}
                  className={`p-4 md:p-5 border rounded-sm transition-all flex items-center gap-3 ${
                    affiliationType === 'study' 
                      ? 'border-black bg-white shadow-lg' 
                      : 'border-zinc-200/60 bg-white hover:border-zinc-300'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-zinc-600" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide">Studying</span>
                </button>
              </div>
            </div>

            {/* Input Field */}
            {affiliationType && (
              <div className="group animate-fade-in">
                <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-1.5 md:mb-2 px-1">
                  {affiliationType === 'work' ? 'Company name' : 'School or university'}
                </label>
                <input 
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full bg-white border border-zinc-100 rounded-sm py-4 md:py-5 px-4 md:px-6 outline-none focus:border-black transition-all text-sm font-mono uppercase tracking-wide shadow-sm"
                  placeholder={affiliationType === 'work' ? 'e.g. Bloomberg' : 'e.g. Harvard University'}
                />
              </div>
            )}

            {/* Quick Suggestions */}
            {affiliationType && (
              <div className="animate-fade-in">
                <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-2 md:mb-3 px-1">Popular choices</label>
                <div className="flex flex-wrap gap-2">
                  {(affiliationType === 'work' ? suggestedCompanies : suggestedSchools).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-3 py-1.5 border rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-wide transition-all ${
                        affiliation === suggestion
                          ? 'border-black bg-black text-white'
                          : 'border-zinc-200 bg-white hover:border-zinc-400 text-zinc-600'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 md:pt-6 flex flex-col items-center gap-3">
              <button 
                onClick={handleNext}
                disabled={!affiliation.trim()}
                className="bg-zinc-800 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] py-4 md:py-5 px-10 md:px-16 rounded-sm hover:bg-black transition-all shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button 
                onClick={handleSkip}
                className="text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-wide hover:text-zinc-600 transition-colors"
              >
                Skip this step
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 md:h-20 shrink-0"></div>
    </div>
  );
};

export default Affiliation;
