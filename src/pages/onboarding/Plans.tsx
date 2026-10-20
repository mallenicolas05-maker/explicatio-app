import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import OnboardingCheckoutModal from '@/components/onboarding/OnboardingCheckoutModal';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const Plans: React.FC<Props> = ({ onNext, onPrev }) => {
  const { data } = useOnboarding();
  const navigate = useNavigate();
  const recommendedTier = data.recommendedTier || '01';
  const [selectedTier, setSelectedTier] = useState<string>(recommendedTier);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const tiers = [
    { id: "01", price: "0.99", billingPeriod: "week", scope: "1 Category", freq: "4 New Studies", desc: "Ideal for exploring a single area of interest at your own pace.", perStudy: "$0.25 / study added" },
    { id: "02", price: "4.99", billingPeriod: "week", scope: "6 Categories", freq: "24 New Studies", desc: "A broader lens across multiple disciplines for the intellectually curious.", perStudy: "$0.20 / study added" },
    { id: "03", price: "11.99", billingPeriod: "month", scope: "10 Categories", freq: "40 New Studies", desc: "Comprehensive coverage for those committed to continuous learning.", perStudy: "$0.07 / study added" },
    { id: "04", price: "15", billingPeriod: "month", scope: "Unlimited", freq: "70 New Studies", desc: "Unrestricted access for the deeply committed knowledge seeker.", perStudy: "$0.05 / study added" }
  ];

  const selectedTierData = tiers.find(t => t.id === selectedTier) || tiers[0];

  const handleSelectPlan = () => {
    setIsCheckoutOpen(true);
  };

  const handleFreePlan = () => {
    navigate('/dashboard');
  };

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden px-4 md:px-8 relative">
      <nav className="flex justify-between items-center py-2 md:py-4 shrink-0 max-w-7xl mx-auto w-full">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl text-center">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-1 block">Membership</span>
          <h1 className="text-base md:text-2xl font-mono font-bold tracking-tight uppercase mb-1 md:mb-2">Select an Amount</h1>
          <p className="text-zinc-400 text-[9px] md:text-[10px] mb-3 md:mb-6 max-w-md mx-auto font-medium uppercase tracking-wider md:tracking-widest leading-relaxed px-2">
            Choose the volume of clinical insights delivered to your dashboard.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full mb-3 md:mb-5">
            {tiers.map((t) => (
              <TierCard 
                key={t.id}
                tier={t.id} 
                price={t.price} 
                billingPeriod={t.billingPeriod}
                scope={t.scope} 
                freq={t.freq} 
                desc={t.desc}
                perStudy={t.perStudy}
                active={selectedTier === t.id}
                recommended={recommendedTier === t.id}
                onSelect={() => setSelectedTier(t.id)}
              />
            ))}
          </div>

          {/* Free plan option - between cards and button */}
          <div className="mb-3 md:mb-5">
            <button
              onClick={handleFreePlan}
              className="text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-wide hover:text-zinc-600 transition-colors underline underline-offset-4"
            >
              Continue with free limited access
            </button>
            <p className="text-[8px] md:text-[9px] text-zinc-300 mt-1 uppercase tracking-wider">
              One randomized study per month · No category selection
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3">
            <button 
              onClick={handleSelectPlan}
              className="bg-black text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-3 md:py-4 px-10 md:px-16 rounded-sm hover:bg-zinc-800 transition-all shadow-xl"
            >
              Select Plan & Finish
            </button>
            <button onClick={onPrev} className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Back</button>
          </div>
        </div>
      </div>

      <div className="h-4 md:h-8 shrink-0"></div>

      <OnboardingCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        tier={selectedTierData}
      />
    </div>
  );
};

const TierCard = ({ tier, price, billingPeriod, scope, freq, desc, perStudy, active, recommended, onSelect }: {
  tier: string;
  price: string;
  billingPeriod: string;
  scope: string;
  freq: string;
  desc: string;
  perStudy: string;
  active: boolean;
  recommended: boolean;
  onSelect: () => void;
}) => {
  const billingLabel = billingPeriod === 'week' ? 'Weekly' : 'Monthly';
  
  return (
    <div 
      onClick={onSelect}
      className={`p-3 md:p-5 flex flex-col items-start transition-all duration-300 cursor-pointer rounded-sm group relative border ${
        active ? 'border-zinc-800 bg-white shadow-2xl z-10 scale-[1.02]' : 'border-slate-50 bg-white hover:border-slate-200'
      }`}
      style={{ borderWidth: active ? '1px' : '0.5px' }}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-black text-white text-[6px] md:text-[7px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm">
          Recommended
        </span>
      )}
      
      <span className={`text-[7px] md:text-[8px] font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 ${active ? 'text-black' : 'text-slate-300'}`}>Tier {tier}</span>
      
      <div className="flex items-baseline mb-1 md:mb-2">
        <span className="text-xl md:text-3xl font-sans font-extralight tracking-tight text-zinc-800" style={{ fontVariantNumeric: 'normal', fontFeatureSettings: '"zero" 0' }}>${price}</span>
      </div>
      
      <div className="mb-2 md:mb-4">
        <span className="text-[9px] md:text-[11px] font-mono uppercase tracking-wide text-black font-bold">{billingLabel}</span>
      </div>

      <div className="mb-2 md:mb-4">
        <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 uppercase tracking-wide">{perStudy}</span>
      </div>

      <div className="space-y-1 md:space-y-2 w-full mb-2 md:mb-4 text-left">
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-zinc-900">{scope}</p>
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-zinc-900">{freq} / week</p>
      </div>

      <p className={`text-[8px] md:text-[9px] text-zinc-400 font-medium leading-relaxed text-left transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
        {desc}
      </p>
      
      <p className={`text-[7px] md:text-[8px] text-zinc-300 italic leading-relaxed text-left mt-2 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
        Weekly study volume is an estimate and may vary.
      </p>

    </div>
  );
};

export default Plans;
