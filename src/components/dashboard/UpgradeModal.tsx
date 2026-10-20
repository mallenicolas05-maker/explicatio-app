import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '@/data/pricingConstants';
import OnboardingCheckoutModal from '@/components/onboarding/OnboardingCheckoutModal';
import type { PricingTier } from '@/types/pricing';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  if (!isOpen) return null;

  if (selectedTier) {
    return (
      <OnboardingCheckoutModal
        isOpen={true}
        onClose={() => { setSelectedTier(null); onClose(); }}
        tier={{
          id: selectedTier.id,
          price: String(selectedTier.price),
          billingPeriod: selectedTier.billingPeriod,
          scope: `${selectedTier.categories === 'Unlimited' ? 'Unlimited' : selectedTier.categories} ${typeof selectedTier.categories === 'number' && selectedTier.categories === 1 ? 'category' : 'categories'}`,
          freq: `${selectedTier.studies} studies/week`,
          desc: selectedTier.description,
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={16} className="text-gray-400" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.15em]">Upgrade Your Plan</h2>
            </div>
            <p className="text-xs text-gray-500">Unlock the full Explicatio experience</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-gray-400 mb-4">
            Your current plan limits saved studies and highlights. Upgrade to access the complete dashboard with AI recommendations, knowledge quizzes, and more.
          </p>
          {PRICING_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className="w-full p-4 border border-gray-200 rounded-xl hover:border-gray-400 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">/{tier.billingPeriod}</span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    {tier.categories === 'Unlimited' ? 'Unlimited' : tier.categories} {typeof tier.categories === 'number' && tier.categories === 1 ? 'category' : 'categories'} · {tier.studies} studies/week
                  </p>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
