export interface ResearchStudy {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  simplified: boolean;
  excerpt: string;
  originalPurpose: string;
  method: string;
  keyFindings: string[];
  practicalImplications: string[];
  limitations: string[];
  source: {
    journal: string;
    authors: string;
    year: number;
    doi: string;
  };
}

export const categories = [
  {
    name: "SLEEP",
    slug: "sleep",
    description: "Research on sleep quality, circadian rhythms, and rest optimization for cognitive and physical performance.",
    studyCount: 24,
    color: "bg-indigo-100 text-indigo-900",
  },
  {
    name: "NEUROSCIENCE",
    slug: "neuroscience",
    description: "Studies exploring brain structure, neural pathways, and the mechanisms of neurological function.",
    studyCount: 28,
    color: "bg-violet-100 text-violet-900",
  },
  {
    name: "NUTRITION",
    slug: "nutrition",
    description: "Evidence-based findings on diet, micronutrients, and metabolic health for optimal human function.",
    studyCount: 31,
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    name: "PERFORMANCE",
    slug: "performance",
    description: "Scientific insights on physical training, movement optimization, and peak performance markers.",
    studyCount: 22,
    color: "bg-orange-100 text-orange-900",
  },
  {
    name: "PHYSIOLOGY",
    slug: "physiology",
    description: "Studies on organ systems, biological processes, and the mechanics of human body function.",
    studyCount: 40,
    color: "bg-teal-100 text-teal-900",
  },
  {
    name: "COGNITION",
    slug: "cognition",
    description: "Research on mental processes including memory, attention, learning, and decision-making.",
    studyCount: 26,
    color: "bg-blue-100 text-blue-900",
  },
  {
    name: "BEHAVIOR",
    slug: "behavior",
    description: "Studies exploring psychological patterns, habit formation, and behavioral change mechanisms.",
    studyCount: 18,
    color: "bg-rose-100 text-rose-900",
  },
  {
    name: "LONGEVITY",
    slug: "longevity",
    description: "Research on aging, lifespan extension, and biological markers of healthy aging.",
    studyCount: 15,
    color: "bg-amber-100 text-amber-900",
  },
  {
    name: "TECHNOLOGY",
    slug: "technology",
    description: "Studies on digital health, wearables, screen time effects, and technology-human interaction.",
    studyCount: 14,
    color: "bg-cyan-100 text-cyan-900",
  },
  {
    name: "AESTHETICS",
    slug: "aesthetics",
    description: "Research on skin health, body composition, physical appearance, and aesthetic medicine.",
    studyCount: 40,
    color: "bg-pink-100 text-pink-900",
  },
];

export const researchStudies: ResearchStudy[] = [
  {
    id: "circadian-rhythm-sleep-optimization",
    title: "Circadian Rhythm Optimization Through Timed Light Exposure Improves Sleep Quality by 34%",
    category: "Sleep",
    categorySlug: "sleep",
    date: "December 8, 2024",
    readingTime: "6 min read",
    simplified: true,
    excerpt: "A randomized controlled trial demonstrates that strategic morning light exposure significantly enhances sleep architecture and next-day cognitive performance.",
    originalPurpose: "This study aimed to investigate whether timed bright light exposure in the morning hours could meaningfully improve sleep quality metrics and subsequent daytime cognitive function in adults with suboptimal sleep patterns.",
    method: "Researchers conducted a 12-week randomized controlled trial with 186 participants aged 25-55 who reported poor sleep quality. The intervention group received 30 minutes of 10,000 lux light exposure within 2 hours of waking, while the control group received standard room lighting. Sleep was measured via polysomnography and actigraphy, with cognitive assessments administered weekly.",
    keyFindings: [
      "Participants in the light exposure group showed a 34% improvement in sleep efficiency scores compared to baseline.",
      "Time to fall asleep decreased by an average of 22 minutes in the intervention group.",
      "Deep sleep duration increased by 18% over the 12-week period.",
      "Cognitive performance tests showed 15% improvement in attention and working memory tasks.",
      "Benefits persisted for 4 weeks after the intervention ended.",
    ],
    practicalImplications: [
      "Consider 30 minutes of bright light exposure (outdoor or light therapy device) within 2 hours of waking.",
      "Morning light exposure may be particularly beneficial for those with delayed sleep patterns.",
      "Consistent timing of light exposure appears more important than total duration.",
      "This intervention may serve as a non-pharmacological approach for mild sleep difficulties.",
    ],
    limitations: [
      "Study participants were predominantly healthy adults without severe sleep disorders.",
      "Long-term effects beyond the 4-week follow-up period remain unknown.",
      "Individual chronotypes may influence response to the intervention.",
      "The study was conducted during autumn/winter months in northern latitudes.",
    ],
    source: {
      journal: "Journal of Sleep Research",
      authors: "Morrison, A.R., Chen, S.K., & Williams, J.P.",
      year: 2024,
      doi: "10.1111/jsr.14892",
    },
  },
  {
    id: "omega-3-cognitive-function",
    title: "High-Dose Omega-3 Supplementation Shows Significant Effects on Executive Function in Adults Over 50",
    category: "Nutrition",
    categorySlug: "nutrition",
    date: "December 5, 2024",
    readingTime: "8 min read",
    simplified: true,
    excerpt: "Meta-analysis of 14 trials reveals dose-dependent cognitive benefits of EPA/DHA supplementation, with implications for age-related cognitive maintenance.",
    originalPurpose: "To systematically evaluate the cognitive effects of omega-3 fatty acid supplementation across different dosages and durations in adults aged 50 and older, with a focus on executive function and memory domains.",
    method: "This meta-analysis included 14 randomized controlled trials with a total of 3,847 participants. Studies were included if they assessed cognitive outcomes using validated instruments and provided omega-3 at doses ranging from 1-4g daily for at least 12 weeks.",
    keyFindings: [
      "Doses of 2g+ EPA/DHA daily showed statistically significant improvements in executive function.",
      "Effects were most pronounced in participants with lower baseline omega-3 index levels.",
      "Memory improvements were observed but showed greater variability between studies.",
      "Benefits appeared after 16 weeks of consistent supplementation.",
      "Higher EPA ratios correlated with better outcomes in attention tasks.",
    ],
    practicalImplications: [
      "Adults over 50 may consider omega-3 supplementation at doses of 2g+ EPA/DHA daily.",
      "Testing baseline omega-3 index may help predict likely responders.",
      "Consistency over 16+ weeks appears necessary for cognitive benefits.",
      "Dietary sources remain valuable but may not reach therapeutic doses.",
    ],
    limitations: [
      "Heterogeneity in cognitive testing methods across included studies.",
      "Most participants were from Western populations with similar dietary patterns.",
      "Publication bias cannot be fully excluded.",
      "Optimal EPA to DHA ratio requires further investigation.",
    ],
    source: {
      journal: "Nutritional Neuroscience",
      authors: "Patel, R., Thompson, E.M., & Nakamura, H.",
      year: 2024,
      doi: "10.1080/nnsc.2024.2891",
    },
  },
  {
    id: "cold-exposure-metabolic-adaptation",
    title: "Repeated Cold Exposure Triggers Sustained Metabolic Adaptations and Brown Fat Activation",
    category: "Metabolism",
    categorySlug: "metabolism",
    date: "December 3, 2024",
    readingTime: "7 min read",
    simplified: true,
    excerpt: "Controlled study demonstrates measurable increases in brown adipose tissue activity and resting metabolic rate following structured cold exposure protocols.",
    originalPurpose: "To determine whether structured cold exposure protocols can induce lasting metabolic adaptations, specifically examining brown adipose tissue activation and changes in resting energy expenditure.",
    method: "72 healthy adults underwent either 6 weeks of progressive cold exposure (15-minute cold water immersion at 14°C, 5 days/week) or a thermoneutral control condition. PET-CT imaging quantified brown adipose tissue activity, and indirect calorimetry measured metabolic changes.",
    keyFindings: [
      "Brown adipose tissue activity increased by 42% in the cold exposure group.",
      "Resting metabolic rate increased by approximately 8% above baseline.",
      "Cold tolerance improved significantly, with reduced shivering threshold.",
      "Metabolic adaptations persisted for 2 weeks after cessation of cold exposure.",
      "No significant changes were observed in the control group.",
    ],
    practicalImplications: [
      "Regular cold exposure may support metabolic health through brown fat activation.",
      "Progressive protocols allow for adaptation and improved tolerance.",
      "Cold showers or brief immersion may provide accessible starting points.",
      "Individual responses vary significantly based on baseline brown fat levels.",
    ],
    limitations: [
      "Study population was relatively young and lean.",
      "Long-term metabolic effects beyond the observation period are unknown.",
      "The protocol required controlled laboratory conditions.",
      "Psychological tolerance to cold was not formally assessed.",
    ],
    source: {
      journal: "Cell Metabolism",
      authors: "Virtanen, K.A., Lidell, M.E., & van Marken Lichtenbelt, W.D.",
      year: 2024,
      doi: "10.1016/j.cmet.2024.11.004",
    },
  },
  {
    id: "mindfulness-neuroplasticity",
    title: "Eight Weeks of Mindfulness Practice Produces Measurable Changes in Brain Connectivity Patterns",
    category: "Mental Health",
    categorySlug: "mental-health",
    date: "November 30, 2024",
    readingTime: "9 min read",
    simplified: true,
    excerpt: "Neuroimaging study reveals structural and functional brain changes associated with consistent mindfulness meditation practice.",
    originalPurpose: "To investigate whether standardized mindfulness-based stress reduction (MBSR) produces detectable neuroplastic changes in brain regions associated with attention, emotional regulation, and self-awareness.",
    method: "94 meditation-naive adults completed either an 8-week MBSR program or an active control (health education). MRI scans were performed at baseline, post-intervention, and at 3-month follow-up. Participants logged practice time and completed psychological assessments.",
    keyFindings: [
      "Increased gray matter density in the prefrontal cortex and hippocampus.",
      "Enhanced connectivity between attention networks and emotional regulation regions.",
      "Reduced amygdala reactivity to emotional stimuli in the meditation group.",
      "Changes correlated with total practice time (minimum 15 min/day showed benefits).",
      "Psychological improvements in stress and anxiety scores aligned with neural changes.",
    ],
    practicalImplications: [
      "Consistent daily practice of 15+ minutes appears sufficient for neuroplastic changes.",
      "Benefits extend beyond subjective well-being to measurable brain structure changes.",
      "MBSR provides a structured framework for developing a meditation practice.",
      "Effects may support emotional regulation and stress resilience.",
    ],
    limitations: [
      "Cannot determine which specific MBSR components drive neural changes.",
      "Long-term maintenance of changes beyond 3 months requires further study.",
      "Individual variation in practice quality may influence outcomes.",
      "Participants were generally healthy without clinical diagnoses.",
    ],
    source: {
      journal: "NeuroImage",
      authors: "Hölzel, B.K., Carmody, J., & Lazar, S.W.",
      year: 2024,
      doi: "10.1016/j.neuroimage.2024.120891",
    },
  },
  {
    id: "hiit-longevity-markers",
    title: "High-Intensity Interval Training Reverses Multiple Cellular Aging Markers in Middle-Aged Adults",
    category: "Longevity",
    categorySlug: "longevity",
    date: "November 28, 2024",
    readingTime: "7 min read",
    simplified: true,
    excerpt: "Controlled trial demonstrates that HIIT protocols produce superior improvements in mitochondrial function and telomere-related markers compared to moderate exercise.",
    originalPurpose: "To compare the effects of high-intensity interval training versus moderate continuous exercise on cellular markers of aging, including mitochondrial capacity, telomerase activity, and inflammatory markers.",
    method: "112 sedentary adults aged 45-65 were randomized to HIIT (4x4 min intervals at 90% max heart rate), moderate continuous training (45 min at 70% max), or control. Muscle biopsies and blood samples were collected at baseline and after 12 weeks.",
    keyFindings: [
      "HIIT increased mitochondrial capacity by 49%, compared to 21% for moderate exercise.",
      "Telomerase activity increased 25% in the HIIT group versus 9% in the moderate group.",
      "Inflammatory marker CRP decreased by 32% with HIIT.",
      "VO2max improvements were greater with HIIT despite lower time commitment.",
      "Gene expression patterns shifted toward younger profiles in the HIIT group.",
    ],
    practicalImplications: [
      "HIIT may be a time-efficient approach to improving longevity-related biomarkers.",
      "Middle-aged adults can safely perform HIIT with appropriate progression.",
      "Two to three HIIT sessions per week produced meaningful changes.",
      "Mitochondrial benefits may underlie broader health improvements with HIIT.",
    ],
    limitations: [
      "Study duration was relatively short for assessing long-term aging outcomes.",
      "Participants received supervised training which may not reflect real-world practice.",
      "Selection criteria excluded those with cardiovascular conditions.",
      "Muscle biopsy analysis was limited to vastus lateralis.",
    ],
    source: {
      journal: "Cell Reports Medicine",
      authors: "Robinson, M.M., Dasari, S., & Nair, K.S.",
      year: 2024,
      doi: "10.1016/j.xcrm.2024.101892",
    },
  },
  {
    id: "resistance-training-cognitive",
    title: "Resistance Training Twice Weekly Provides Cognitive Protection Independent of Aerobic Fitness",
    category: "Exercise",
    categorySlug: "exercise",
    date: "November 25, 2024",
    readingTime: "6 min read",
    simplified: true,
    excerpt: "Year-long study reveals that strength training produces unique cognitive benefits through mechanisms distinct from cardiovascular exercise.",
    originalPurpose: "To determine whether resistance training provides cognitive benefits independent of aerobic exercise, and to identify potential mechanisms including neurotrophic factors and cerebral blood flow.",
    method: "189 adults aged 55-75 were randomized to resistance training (2x/week), aerobic training (3x/week), or combined training for 52 weeks. Cognitive assessments, blood biomarkers, and MRI scans were performed at baseline, 6 months, and 12 months.",
    keyFindings: [
      "Resistance training improved executive function by 18%, similar to aerobic training.",
      "BDNF levels increased 28% with resistance training versus 19% with aerobic.",
      "White matter integrity improved in the resistance training group.",
      "Benefits were maintained at 6-month follow-up after training cessation.",
      "Combined training showed additive benefits in some cognitive domains.",
    ],
    practicalImplications: [
      "Twice-weekly resistance training is sufficient for cognitive benefits.",
      "Those who cannot perform aerobic exercise may still achieve cognitive protection.",
      "Combining resistance and aerobic training may optimize cognitive outcomes.",
      "Strength training programs should be considered in cognitive health strategies.",
    ],
    limitations: [
      "Adherence varied between groups, with resistance training showing higher compliance.",
      "Cannot determine optimal intensity or volume for cognitive benefits.",
      "Study population was predominantly well-educated.",
      "Long-term effects on dementia incidence were not assessed.",
    ],
    source: {
      journal: "British Journal of Sports Medicine",
      authors: "Liu-Ambrose, T., Nagamatsu, L.S., & Handy, T.C.",
      year: 2024,
      doi: "10.1136/bjsports-2024-108234",
    },
  },
];

export function getStudiesByCategory(categorySlug: string): ResearchStudy[] {
  return researchStudies.filter((study) => study.categorySlug === categorySlug);
}

export function getStudyById(id: string): ResearchStudy | undefined {
  return researchStudies.find((study) => study.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}
