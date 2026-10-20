import { PricingTier } from '@/types/pricing';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "01",
    price: 0.99,
    billingPeriod: "week",
    categories: 1,
    studies: 4,
    perStudyCost: 0.25,
    description: "Ideal for exploring a single area of interest at your own pace.",
    accentColor: "border-[#C0C0C0]/30",
    glowColor: "rgba(192, 192, 192, 0.4)",
    gradientColor: "#C0C0C0",
    protocolText: "Each category provides 4 studies per week"
  },
  {
    id: "02",
    price: 4.99,
    billingPeriod: "week",
    categories: 6,
    studies: 24,
    perStudyCost: 0.20,
    description: "A broader lens across multiple disciplines for the intellectually curious.",
    accentColor: "border-[#C0C0C0]/30",
    glowColor: "rgba(192, 192, 192, 0.4)",
    gradientColor: "#C0C0C0",
    protocolText: "Studies published Mon 7am EST — Fri 5pm EST"
  },
  {
    id: "03",
    price: 11.99,
    billingPeriod: "month",
    categories: 10,
    studies: 40,
    perStudyCost: 0.07,
    description: "Comprehensive coverage for those committed to continuous learning.",
    accentColor: "border-[#C0C0C0]/30",
    glowColor: "rgba(192, 192, 192, 0.4)",
    gradientColor: "#C0C0C0",
    protocolText: "Access includes all preloaded archive studies"
  },
  {
    id: "04",
    price: 15,
    billingPeriod: "month",
    categories: 'Unlimited',
    studies: 70,
    perStudyCost: 0.05,
    description: "Unrestricted access for the deeply committed knowledge seeker.",
    accentColor: "border-[#C0C0C0]/30",
    glowColor: "rgba(192, 192, 192, 0.4)",
    gradientColor: "#C0C0C0",
    protocolText: "No exact timestamps are promised"
  }
];

export const PROCESS_STEPS = [
  {
    label: "EXTRACTION",
    title: "Methodological Analysis",
    desc: "Our engine rigorously analyzes the study's framework, isolating the methodology from statistical noise."
  },
  {
    label: "VERIFICATION",
    title: "Bias Detection",
    desc: "Proprietary algorithms verify bias, identify conflicts of interest, and translate findings into plain English."
  },
  {
    label: "INTEGRATION",
    title: "Actionable Insights",
    desc: "Concise, structured knowledge that highlight practical takeaways so you can apply science immediately."
  }
];
