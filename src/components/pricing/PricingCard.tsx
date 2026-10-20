import React, { useState } from 'react';
import { PricingTier } from '@/types/pricing';
import CheckoutModal from '@/components/checkout/CheckoutModal';

interface PricingCardProps {
  tier: PricingTier;
}

const MAX_CATEGORIES = 10;

const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const billingLabel = tier.billingPeriod === 'week' ? 'Weekly' : 'Monthly';
  const categoriesLabel =
    tier.categories === 'Unlimited'
      ? 'Unlimited'
      : `${tier.categories} ${Number(tier.categories) === 1 ? 'category' : 'categories'}`;

  const coveragePct =
    tier.categories === 'Unlimited'
      ? 100
      : (Number(tier.categories) / MAX_CATEGORIES) * 100;

  const isDark = tier.id === '04';

  const labelClass = isDark
    ? 'text-[10px] font-medium uppercase tracking-[0.26em] text-background/55'
    : 'text-[10px] font-medium uppercase tracking-[0.26em] text-foreground-subtle';

  const valueClass = isDark
    ? 'text-foreground-on-dark text-background'
    : 'text-foreground';

  const dividerClass = isDark ? 'border-background/10' : 'border-border';

  return (
    <>
      <article
        className={`flex h-full flex-col rounded-lg border transition-colors duration-200 ${
          isDark
            ? 'bg-foreground border-foreground text-background'
            : 'bg-card border-border hover:border-foreground/20'
        }`}
      >
        {/* Header: tier + billing */}
        <div className={`flex items-center justify-between border-b px-6 py-4 ${dividerClass}`}>
          <span className={labelClass}>Tier {tier.id}</span>
          <span className={labelClass}>{billingLabel}</span>
        </div>

        {/* Price */}
        <div className={`border-b px-6 py-7 ${dividerClass}`}>
          <div className="flex items-end gap-2 mb-3">
            <span
              className={`font-serif text-[52px] leading-none tracking-tight ${
                isDark ? 'text-background' : 'text-foreground'
              }`}
            >
              ${tier.price}
            </span>
            <span className={`pb-1.5 ${labelClass}`}>/ {tier.billingPeriod}</span>
          </div>
          <p
            className={`text-sm leading-6 ${
              isDark ? 'text-background/65' : 'text-foreground-muted'
            }`}
          >
            {tier.description}
          </p>
        </div>

        {/* Coverage bar */}
        <div className={`border-b px-6 py-5 ${dividerClass}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={labelClass}>Coverage</span>
            <span
              className={`text-[11px] font-medium tracking-tight ${
                isDark ? 'text-background/80' : 'text-foreground'
              }`}
            >
              {categoriesLabel}
            </span>
          </div>
          <div
            className={`h-px w-full ${
              isDark ? 'bg-background/12' : 'bg-border'
            }`}
          >
            <div
              className={`h-px transition-all duration-700 ${
                isDark ? 'bg-background/55' : 'bg-foreground'
              }`}
              style={{ width: `${coveragePct}%` }}
            />
          </div>
        </div>

        {/* Data rows */}
        <div className="flex-1 px-6 py-6 space-y-5">
          <div>
            <p className={`${labelClass} mb-1.5`}>Publishing Cadence</p>
            <p className={`text-base tracking-tight ${valueClass}`}>
              {tier.studies} studies / week
            </p>
          </div>
          <div>
            <p className={`${labelClass} mb-1.5`}>Efficiency</p>
            <p className={`text-base tracking-tight ${valueClass}`}>
              ${tier.perStudyCost.toFixed(2)} per study
            </p>
          </div>
          <div
            className={`pt-4 border-t text-sm leading-6 ${
              isDark
                ? 'border-background/10 text-background/50'
                : 'border-border text-foreground-subtle'
            }`}
          >
            {tier.protocolText}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className={`w-full flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] px-0 py-3 border-b transition-colors duration-200 cursor-pointer ${
              isDark
                ? 'border-background/25 text-background hover:border-background/55'
                : 'border-border text-foreground hover:border-foreground/30'
            }`}
          >
            <span>Initialize Membership</span>
            <span>→</span>
          </button>
        </div>
      </article>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        tier={tier}
      />
    </>
  );
};

export default PricingCard;
