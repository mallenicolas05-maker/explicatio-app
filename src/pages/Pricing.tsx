import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PRICING_TIERS, PROCESS_STEPS } from '@/data/pricingConstants';
import PricingCard from '@/components/pricing/PricingCard';

const comparisonRows = [
  {
    label: 'Category coverage',
    values: PRICING_TIERS.map((tier) =>
      tier.categories === 'Unlimited'
        ? 'Unlimited'
        : `${tier.categories} ${tier.categories === 1 ? 'category' : 'categories'}`
    ),
  },
  {
    label: 'New studies / week',
    values: PRICING_TIERS.map((tier) => `${tier.studies}`),
  },
  {
    label: 'Billing rhythm',
    values: PRICING_TIERS.map((tier) => (tier.billingPeriod === 'week' ? 'Weekly' : 'Monthly')),
  },
  {
    label: 'Per-study cost',
    values: PRICING_TIERS.map((tier) => `$${tier.perStudyCost.toFixed(2)}`),
  },
];

const keyStats = [
  { label: 'Tiers', value: '4', detail: 'Weekly and monthly options' },
  { label: 'Studies / week (max)', value: '70', detail: 'Tier 04 full library' },
  { label: 'Cost per study (min)', value: '$0.05', detail: 'Most efficient rate' },
  { label: 'Evidence standard', value: 'Constant', detail: 'Same across every plan' },
];

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 lg:pt-24">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="container-editorial py-20 lg:py-28">
            <div className="max-w-3xl">
              <span className="section-label mb-6">Pricing</span>
              <h1 className="editorial-title mb-7 text-5xl leading-[0.92] md:text-7xl lg:text-[82px]">
                Access designed around how much you want to read.
              </h1>
              <p className="editorial-copy max-w-xl text-base">
                Every tier follows the same editorial method. The only difference is how broad your category coverage is and how many new studies land each week.
              </p>
            </div>
          </div>
        </section>

        {/* ── Key stats strip (Lab-style stat cards) ────────────── */}
        <section className="border-b border-border bg-background-alt">
          <div className="container-editorial py-0">
            <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
              {keyStats.map((stat) => (
                <div key={stat.label} className="px-6 py-8 lg:px-8">
                  <p className="section-label mb-3">{stat.label}</p>
                  <p className="font-serif text-3xl tracking-tight text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-foreground-subtle">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tier cards ────────────────────────────────────────── */}
        <section className="container-editorial py-16 lg:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <span className="section-label mb-4">Plans</span>
              <h2 className="editorial-title text-4xl md:text-5xl">Choose a reading scope</h2>
            </div>
            <p className="hidden lg:block text-right text-sm leading-7 text-foreground-muted max-w-xs">
              Start narrow, expand later, or open the full library from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </section>

        {/* ── Comparison table ──────────────────────────────────── */}
        <section className="container-editorial pb-16 lg:pb-20">
          <div className="rounded-lg border border-border overflow-hidden">
            {/* Table header */}
            <div className="border-b border-border px-6 py-5 md:px-8">
              <span className="section-label mb-3">Comparison</span>
              <h2 className="editorial-title text-3xl">At a glance</h2>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Column headers */}
                <div className="grid grid-cols-[200px_repeat(4,minmax(0,1fr))] border-b border-border bg-background-alt px-6 py-3 md:px-8">
                  <div className="section-label !mb-0 self-center">Plan detail</div>
                  {PRICING_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      className={`text-center section-label !mb-0 self-center py-1 ${
                        tier.id === '04'
                          ? 'text-foreground font-medium'
                          : ''
                      }`}
                    >
                      Tier {tier.id}
                    </div>
                  ))}
                </div>

                {comparisonRows.map((row, rowIndex) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[200px_repeat(4,minmax(0,1fr))] border-b border-border px-6 py-5 md:px-8 ${
                      rowIndex === comparisonRows.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="text-sm text-foreground self-center">{row.label}</div>
                    {row.values.map((value, index) => (
                      <div
                        key={`${row.label}-${index}`}
                        className={`text-center self-center ${
                          index === 3
                            ? 'text-sm font-medium text-foreground'
                            : 'text-sm text-foreground-muted'
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Free tier + philosophy (Lab two-card split) ────────── */}
        <section className="container-editorial pb-16 lg:pb-20">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_380px]">

            {/* Free tier — plain card */}
            <div className="rounded-lg border border-border bg-card p-8 md:p-10 flex flex-col">
              <span className="section-label mb-5">Free tier</span>
              <h2 className="editorial-title mb-5 text-3xl md:text-4xl leading-tight">
                A quiet entry point remains available.
              </h2>
              <p className="editorial-copy mb-8 text-sm max-w-lg">
                Maintained for archival continuity. Receive one randomized study per monthly cycle with no selective categorization and no custom coverage controls.
              </p>
              <div className="mt-auto">
                <Link
                  to="/studies"
                  className="inline-flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] border-b border-border py-3 w-full sm:w-auto sm:gap-16 hover:border-foreground/30 transition-colors duration-200"
                >
                  <span>Continue with limited access</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Billing philosophy — dark inverted card (Lab AiInsightsCard pattern) */}
            <div className="rounded-lg bg-foreground text-background p-8 md:p-10 flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-background/50 mb-5">
                Billing philosophy
              </span>
              <p className="font-serif text-[26px] leading-[1.18] tracking-tight text-background mt-auto">
                The plans do not change the quality of the work. They only change the range and pace of what arrives.
              </p>
            </div>
          </div>
        </section>

        {/* ── Protocol steps (Lab stat-card row pattern) ─────────── */}
        <section className="container-editorial pb-24 lg:pb-32">
          <div className="mb-10 text-center">
            <span className="section-label mb-4">Protocol</span>
            <h2 className="editorial-title text-4xl md:text-5xl">
              How membership translates into usable output
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-border bg-card p-8 md:p-9 transition-colors duration-200 hover:border-foreground/20">
                <div className="mb-8 flex items-center justify-between border-b border-border pb-5">
                  <span className="section-label !mb-0">{step.label}</span>
                  <span className="font-mono text-sm text-foreground-subtle">0{index + 1}</span>
                </div>
                <h3 className="mb-4 font-serif text-2xl tracking-tight text-foreground">{step.title}</h3>
                <p className="text-sm leading-7 text-foreground-muted">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
