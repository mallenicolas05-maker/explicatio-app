export interface PricingTier {
  id: string;
  price: number;
  billingPeriod: 'week' | 'month';
  categories: number | 'Unlimited';
  studies: number;
  perStudyCost: number;
  description: string;
  accentColor: string;
  glowColor: string;
  gradientColor: string;
  protocolText: string;
}

export interface GlobalRule {
  id: number;
  text: string;
}
