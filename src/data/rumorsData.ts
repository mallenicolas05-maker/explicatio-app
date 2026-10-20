// Debunking Rumors Data - Premium feature dataset

export type RumorVerdict = 'Supported' | 'Inconclusive' | 'Debunked';

export interface Rumor {
  id: string;
  slug: string;
  claim: string;
  verdict: RumorVerdict;
  category: string;
  categorySlug: string;
  summary: string;
  explanation: string;
  relatedStudies: string[]; // Study slugs
  sources: Array<{
    title: string;
    journal: string;
    year: number;
    doi: string;
  }>;
  trendingScore: number;
  dateAdded: string;
  lastUpdated: string;
}

export const RUMOR_CATEGORIES = [
  { name: 'Nutrition Myths', slug: 'nutrition-myths', color: 'bg-emerald-100 text-emerald-900' },
  { name: 'Health Claims', slug: 'health-claims', color: 'bg-rose-100 text-rose-900' },
  { name: 'Supplements', slug: 'supplements', color: 'bg-amber-100 text-amber-900' },
  { name: 'Technology', slug: 'technology', color: 'bg-cyan-100 text-cyan-900' },
  { name: 'Sleep Myths', slug: 'sleep-myths', color: 'bg-indigo-100 text-indigo-900' },
  { name: 'Exercise Claims', slug: 'exercise-claims', color: 'bg-orange-100 text-orange-900' },
];

export const RUMORS_DATA: Rumor[] = [
  {
    id: 'rumor-1',
    slug: 'seed-oils-toxic',
    claim: 'Seed oils are toxic and cause inflammation',
    verdict: 'Inconclusive',
    category: 'Nutrition Myths',
    categorySlug: 'nutrition-myths',
    summary: 'The claim that seed oils are inherently toxic lacks strong scientific support, though concerns about omega-6 to omega-3 ratios have some merit.',
    explanation: 'Seed oils (canola, soybean, sunflower) contain polyunsaturated fatty acids, primarily omega-6. While excessive omega-6 relative to omega-3 intake may promote inflammation, controlled trials show mixed results. The "toxic" framing is not supported by clinical evidence. Context matters: oxidized oils from high-heat cooking may be problematic, but fresh seed oils in moderate amounts are not shown to be harmful in healthy populations.',
    relatedStudies: ['essential-fatty-acids-brain', 'polyphenols-gut-microbiota'],
    sources: [
      { title: 'Dietary Fat Quality and Inflammatory Markers', journal: 'American Journal of Clinical Nutrition', year: 2023, doi: '10.1093/ajcn/nqad123' },
      { title: 'Polyunsaturated Fatty Acids and Cardiovascular Disease', journal: 'Circulation', year: 2022, doi: '10.1161/CIRCULATIONAHA.122.060458' },
    ],
    trendingScore: 92,
    dateAdded: '2024-10-01',
    lastUpdated: '2024-12-15',
  },
  {
    id: 'rumor-2',
    slug: 'blue-light-brain-damage',
    claim: 'Blue light from screens damages the brain',
    verdict: 'Debunked',
    category: 'Technology',
    categorySlug: 'technology',
    summary: 'No credible evidence supports direct brain damage from screen blue light at normal exposure levels.',
    explanation: 'Blue light from devices primarily affects circadian rhythm when viewed close to bedtime, potentially disrupting sleep. However, claims of direct neurological damage are not supported by peer-reviewed research. The intensity of blue light from screens is far lower than natural sunlight. Sleep disruption can indirectly affect cognitive function, but this is different from "brain damage." Blue light blocking glasses may help with sleep but are not necessary for preventing neurological harm.',
    relatedStudies: ['light-exposure-cortisol', 'sleep-architecture-adolescents'],
    sources: [
      { title: 'Blue Light and Neurological Function: A Systematic Review', journal: 'Neuroscience & Biobehavioral Reviews', year: 2024, doi: '10.1016/j.neubiorev.2024.01.004' },
      { title: 'Screen Time and Cognitive Development in Children', journal: 'JAMA Pediatrics', year: 2023, doi: '10.1001/jamapediatrics.2023.2851' },
    ],
    trendingScore: 87,
    dateAdded: '2024-09-15',
    lastUpdated: '2024-12-10',
  },
  {
    id: 'rumor-3',
    slug: 'cold-showers-fat-loss',
    claim: 'Cold showers significantly boost fat loss',
    verdict: 'Inconclusive',
    category: 'Health Claims',
    categorySlug: 'health-claims',
    summary: 'Cold exposure activates brown fat and increases metabolic rate temporarily, but the caloric impact is modest for weight loss purposes.',
    explanation: 'Cold exposure does activate brown adipose tissue (BAT), which burns calories to generate heat. Studies show increased metabolic rate during and shortly after cold exposure. However, the total caloric expenditure from cold showers is relatively small (perhaps 50-100 extra calories). For meaningful fat loss, cold exposure would need to be combined with diet and exercise. The claim has a kernel of truth but is overstated for practical weight loss.',
    relatedStudies: ['thermogenesis-brown-fat', 'ampk-activation-pathways'],
    sources: [
      { title: 'Cold Exposure and Brown Fat Activation in Humans', journal: 'Cell Metabolism', year: 2023, doi: '10.1016/j.cmet.2023.05.012' },
      { title: 'Thermogenic Contribution to Energy Expenditure', journal: 'Obesity Reviews', year: 2022, doi: '10.1111/obr.13456' },
    ],
    trendingScore: 78,
    dateAdded: '2024-10-20',
    lastUpdated: '2024-12-01',
  },
  {
    id: 'rumor-4',
    slug: 'vitamin-d-cures-depression',
    claim: 'Vitamin D supplementation cures depression',
    verdict: 'Inconclusive',
    category: 'Supplements',
    categorySlug: 'supplements',
    summary: 'Vitamin D deficiency is associated with depression, but supplementation shows mixed results for treating depressive symptoms.',
    explanation: 'Observational studies consistently link low vitamin D levels with higher rates of depression. However, randomized controlled trials of vitamin D supplementation for depression show inconsistent results. Correcting deficiency may help mood in deficient individuals, but evidence does not support vitamin D as a standalone treatment for clinical depression. It may play a supporting role alongside other interventions.',
    relatedStudies: ['rem-latency-depression', 'dopaminergic-pathway-modulation'],
    sources: [
      { title: 'Vitamin D and Depression: A Meta-Analysis of RCTs', journal: 'Journal of Affective Disorders', year: 2024, doi: '10.1016/j.jad.2024.02.015' },
      { title: 'Vitamin D Status and Mental Health', journal: 'Lancet Psychiatry', year: 2023, doi: '10.1016/S2215-0366(23)00234-5' },
    ],
    trendingScore: 71,
    dateAdded: '2024-11-01',
    lastUpdated: '2024-12-05',
  },
  {
    id: 'rumor-5',
    slug: 'eight-glasses-water',
    claim: 'You must drink 8 glasses of water daily',
    verdict: 'Debunked',
    category: 'Health Claims',
    categorySlug: 'health-claims',
    summary: 'The "8 glasses" rule has no scientific basis. Hydration needs vary based on body size, activity, climate, and diet.',
    explanation: 'This popular recommendation lacks scientific origin. A 2002 review found no evidence supporting the specific "8x8" guideline. Actual water needs depend on body weight, physical activity, temperature, humidity, and water content of foods consumed. Most people can rely on thirst as an adequate hydration guide. Overhydration can be dangerous in extreme cases. The best evidence suggests drinking when thirsty and monitoring urine color (pale yellow indicates adequate hydration).',
    relatedStudies: [],
    sources: [
      { title: 'Drink at Least Eight Glasses of Water a Day—Really?', journal: 'American Journal of Physiology', year: 2002, doi: '10.1152/ajpregu.00365.2002' },
      { title: 'Water Requirements and Recommendations', journal: 'Nutrition Reviews', year: 2020, doi: '10.1093/nutrit/nuaa091' },
    ],
    trendingScore: 65,
    dateAdded: '2024-08-15',
    lastUpdated: '2024-11-20',
  },
  {
    id: 'rumor-6',
    slug: 'breakfast-most-important',
    claim: 'Breakfast is the most important meal of the day',
    verdict: 'Debunked',
    category: 'Nutrition Myths',
    categorySlug: 'nutrition-myths',
    summary: 'This claim originated from cereal marketing, not nutrition science. Meal timing matters less than total daily intake for most people.',
    explanation: 'The "most important meal" claim was popularized by breakfast cereal companies in the early 20th century. Modern research on intermittent fasting and meal timing shows that skipping breakfast is not inherently harmful for healthy adults. What matters more is total caloric intake, food quality, and individual metabolic factors. Some people perform better with breakfast; others do well with time-restricted eating. Personalization is key.',
    relatedStudies: ['circadian-rhythm-insulin-resistance', 'caloric-restriction-mimetics'],
    sources: [
      { title: 'Breakfast Skipping and Metabolic Health', journal: 'British Medical Journal', year: 2019, doi: '10.1136/bmj.l42' },
      { title: 'Time-Restricted Eating and Metabolic Outcomes', journal: 'Cell Metabolism', year: 2022, doi: '10.1016/j.cmet.2022.01.003' },
    ],
    trendingScore: 58,
    dateAdded: '2024-07-01',
    lastUpdated: '2024-10-15',
  },
];

export function getRumorsByCategory(categorySlug: string): Rumor[] {
  return RUMORS_DATA.filter(r => r.categorySlug === categorySlug);
}

export function getTrendingRumors(limit: number = 5): Rumor[] {
  return [...RUMORS_DATA].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, limit);
}

export function getRumorBySlug(slug: string): Rumor | undefined {
  return RUMORS_DATA.find(r => r.slug === slug);
}

export function getVerdictColor(verdict: RumorVerdict): { bg: string; text: string; border: string } {
  switch (verdict) {
    case 'Supported':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' };
    case 'Inconclusive':
      return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' };
    case 'Debunked':
      return { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' };
  }
}
