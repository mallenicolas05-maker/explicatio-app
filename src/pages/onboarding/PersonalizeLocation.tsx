import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ChevronDown } from 'lucide-react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Japan',
  'South Korea',
  'Singapore',
  'India',
  'Brazil',
  'Mexico',
  'Argentina',
  'New Zealand',
  'Ireland',
  'Belgium',
  'Austria',
  'Portugal',
  'Israel',
  'United Arab Emirates',
  'South Africa',
  'Other'
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia'
];

const PersonalizeLocation: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data, updateData } = useOnboarding();
  const [name, setName] = useState(data.displayName);
  const [country, setCountry] = useState(data.country || '');
  const [state, setState] = useState(data.state || '');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);

  const canProceed = name.trim().length > 0 && ageConfirmed;

  const handleNext = () => {
    if (!canProceed) return;
    updateData({ 
      displayName: name, 
      country: country,
      state: country === 'United States' ? state : undefined
    });
    onNext();
  };

  const isUS = country === 'United States';

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-3 md:py-6 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-[520px] text-center">
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight mb-6 md:mb-10 uppercase px-2">Help us personalize your experience</h1>
          
          <div className="space-y-4 md:space-y-6 text-left">
            <div className="group">
              <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-1.5 md:mb-2 px-1">What's your name?</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-zinc-100 rounded-sm py-3 md:py-4 px-4 md:px-6 outline-none focus:border-black transition-all text-sm font-mono uppercase tracking-wide shadow-sm"
                placeholder="Elizabeth"
              />
            </div>

            <div className="group relative">
              <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-1.5 md:mb-2 px-1">Where do you live?</label>
              <button
                type="button"
                onClick={() => {
                  setCountryOpen(!countryOpen);
                  setStateOpen(false);
                }}
                className={`w-full bg-white border rounded-sm py-3 md:py-4 px-4 md:px-6 outline-none transition-all text-sm font-mono uppercase tracking-wide shadow-sm flex items-center justify-between ${
                  country ? 'border-black text-black' : 'border-zinc-100 text-zinc-400'
                }`}
              >
                <span>{country || 'Select country'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${countryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {countryOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-sm shadow-xl max-h-60 overflow-y-auto">
                  {countries.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setCountryOpen(false);
                        if (c !== 'United States') {
                          setState('');
                        }
                      }}
                      className={`w-full text-left px-4 md:px-6 py-3 text-sm font-mono uppercase tracking-wide hover:bg-zinc-50 transition-colors ${
                        country === c ? 'bg-zinc-100 font-bold' : ''
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isUS && (
              <div className="group relative animate-fade-in">
                <label className="text-[8px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] block mb-1.5 md:mb-2 px-1">What state?</label>
                <button
                  type="button"
                  onClick={() => {
                    setStateOpen(!stateOpen);
                    setCountryOpen(false);
                  }}
                  className={`w-full bg-white border rounded-sm py-3 md:py-4 px-4 md:px-6 outline-none transition-all text-sm font-mono uppercase tracking-wide shadow-sm flex items-center justify-between ${
                    state ? 'border-black text-black' : 'border-zinc-100 text-zinc-400'
                  }`}
                >
                  <span>{state || 'Select state'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${stateOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {stateOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-sm shadow-xl max-h-60 overflow-y-auto">
                    {usStates.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setState(s);
                          setStateOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-3 text-sm font-mono uppercase tracking-wide hover:bg-zinc-50 transition-colors ${
                          state === s ? 'bg-zinc-100 font-bold' : ''
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-start gap-3 md:gap-4 py-2 md:py-3 px-1">
              <input 
                type="checkbox" 
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="w-4 h-4 border border-zinc-200 rounded-sm mt-0.5 md:mt-1 shrink-0 cursor-pointer accent-black" 
                id="age-confirm" 
              />
              <label htmlFor="age-confirm" className="text-[9px] md:text-[10px] font-medium text-zinc-400 leading-relaxed cursor-pointer select-none">
                By checking this box, you confirm you have reached the age of 18 years old (or the age of legal majority where you live).
              </label>
            </div>

            {/* Privacy Notice */}
            <p className="text-[10px] md:text-[11px] text-zinc-400 text-center font-sans font-medium tracking-wide px-2">
              We never sell your data to third-parties. We only use it for analytics.
            </p>

            <div className="pt-3 md:pt-4 flex flex-col items-center gap-3">
              <button 
                onClick={handleNext}
                disabled={!canProceed}
                className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] py-3 md:py-4 px-10 md:px-16 rounded-sm transition-all shadow-xl ${
                  canProceed
                    ? 'bg-zinc-800 text-white hover:bg-black'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
              <button onClick={onPrev} className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-zinc-300 hover:text-black transition-colors">Back</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 md:h-12 shrink-0"></div>
    </div>
  );
};

export default PersonalizeLocation;
