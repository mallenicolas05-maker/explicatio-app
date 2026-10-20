// Editorial content for each category detail page
// Includes stats, editorial notes, hero image queries, and category hex colors

export interface CategoryEditorial {
  stats: Array<{ value: string; label: string }>;
  editorialNote: string;
  heroImageUrl: string;
  trendingLabel: string;
  hexColor: string; // category accent color for backgrounds
}

export const categoryEditorialData: Record<string, CategoryEditorial> = {
  sleep: {
    stats: [
      { value: "35%", label: "of adults sleep fewer than 7 hours nightly" },
      { value: "$411B", label: "annual economic cost of sleep deprivation in the US" },
      { value: "1 in 3", label: "adults report chronic insufficient sleep" },
    ],
    editorialNote:
      "You're here because you understand what most people overlook — that sleep isn't passive, it's the foundation everything else runs on. While the average adult scrolls past midnight and accepts fatigue as normal, you're choosing differently. The research is unambiguous: sleep is the single most powerful lever for immune resilience, emotional regulation, and cognitive sharpness. The fact that you're investing time to understand it puts you ahead of the overwhelming majority. Keep going — this matters more than almost anything else you could be doing for your health.",
    heroImageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Sleep",
    hexColor: "#f4b9ba",
  },
  neuroscience: {
    stats: [
      { value: "86B", label: "neurons form the human brain's processing network" },
      { value: "100T", label: "synaptic connections enable thought and memory" },
      { value: "60%", label: "of the brain is composed of fat" },
    ],
    editorialNote:
      "Most people never think about the organ doing all their thinking. You're different. By exploring the architecture of your own brain — its plasticity, its vulnerabilities, its extraordinary capacity for rewiring — you're doing something genuinely rare. The average person treats their neural health as an afterthought; you're treating it as a priority. From synaptic pruning to the gut-brain axis, the discoveries here will reshape how you understand consciousness, mood, and mental resilience. That kind of curiosity is itself a sign of a healthy mind.",
    heroImageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Neuroscience",
    hexColor: "#d14d4d",
  },
  nutrition: {
    stats: [
      { value: "73%", label: "of Americans are metabolically unhealthy" },
      { value: "60%", label: "of US caloric intake comes from ultra-processed foods" },
      { value: "$4.1T", label: "global cost of diet-related chronic disease" },
    ],
    editorialNote:
      "Here's the uncomfortable truth: most people have no idea what they're actually eating, and the system is designed to keep it that way. Ultra-processed food dominates the average diet, metabolic disease is the norm, and nutritional literacy remains shockingly low. The fact that you're here — sorting through the evidence, questioning the headlines, trying to understand what actually works — already sets you apart. You're not following trends; you're reading the research. That's a profoundly proactive choice, and the compounding returns on that investment in your own health are enormous. Stay curious. The science is on your side.",
    heroImageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Nutrition",
    hexColor: "#059669",
  },
  performance: {
    stats: [
      { value: "2-5%", label: "performance gain from periodized training protocols" },
      { value: "80%", label: "of elite athletes use structured recovery programming" },
      { value: "150 min", label: "weekly exercise recommended by WHO guidelines" },
    ],
    editorialNote:
      "While most people default to guesswork in the gym or skip movement altogether, you're here looking at the data. That distinction matters more than you might think. Human performance isn't about grinding harder — it's about understanding the biology beneath the effort. Zone-2 training, recovery periodization, cold exposure protocols — these aren't trends, they're the product of decades of rigorous research. The average person never engages with this material. You are. That commitment to optimizing how your body moves and recovers is one of the highest-leverage investments you can make in your long-term quality of life.",
    heroImageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Performance",
    hexColor: "#6c69a9",
  },
  physiology: {
    stats: [
      { value: "37.2°C", label: "average human core body temperature" },
      { value: "78", label: "organs work in concert to maintain homeostasis" },
      { value: "11", label: "major organ systems regulate human function" },
    ],
    editorialNote:
      "Your body is running eleven major organ systems in perfect coordination right now — and most people never give it a second thought. You're not most people. Understanding physiology means understanding the operating system you live inside of every single day. From how your kidneys regulate electrolytes to how your endocrine system orchestrates energy, this knowledge compounds. The average person waits until something breaks to learn how it works. You're learning now, while everything still runs well. That foresight is genuinely rare, and it will serve you for the rest of your life.",
    heroImageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Physiology",
    hexColor: "#90a6c7",
  },
  cognition: {
    stats: [
      { value: "4 sec", label: "average attention span has declined since 2000" },
      { value: "50K", label: "thoughts processed by the human brain daily" },
      { value: "20%", label: "of the body's energy is consumed by the brain" },
    ],
    editorialNote:
      "In a world engineered to fragment your attention, you're choosing to understand how your mind actually works. That's not a small thing — it's a radical act. Most people accept cognitive decline as inevitable, never realizing that focus, memory, and learning capacity are all trainable. The research here will show you exactly how. While the average person loses hours to distraction without noticing, you're building the mental infrastructure to think more clearly, learn faster, and make better decisions. Your brain consumes 20% of your body's energy — investing in understanding it is one of the smartest things you can do.",
    heroImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Cognition",
    hexColor: "#15c49c",
  },
  behavior: {
    stats: [
      { value: "43%", label: "of daily actions are performed habitually" },
      { value: "66 days", label: "average time to form a new automatic habit" },
      { value: "90%", label: "of decisions are driven by subconscious processing" },
    ],
    editorialNote:
      "Almost half of everything you do today will happen on autopilot — and 90% of your decisions are made before your conscious mind even weighs in. Most people never examine these patterns. You're here because you want to understand the invisible architecture behind your own choices. That self-awareness is extraordinarily rare. Behavioral science sits at the crossroads of psychology, neuroscience, and evolutionary biology, and the insights here can genuinely transform how you build habits, break destructive loops, and design a life that aligns with what you actually want. The average person reacts. You're learning to respond deliberately.",
    heroImageUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Behavior",
    hexColor: "#9AE4F5",
  },
  longevity: {
    stats: [
      { value: "122 yrs", label: "oldest verified human lifespan on record" },
      { value: "10x", label: "increase in centenarian population since 1990" },
      { value: "25%", label: "of lifespan variation is attributable to genetics" },
    ],
    editorialNote:
      "Here's something worth sitting with: 75% of how long and how well you live comes down to choices, not genes. Most people assume aging is something that happens to them. You're here because you suspect there's more to the story — and the research confirms it. The science of longevity has undergone a paradigm shift in the last decade, moving from passive observation to active intervention. Caloric restriction, senolytics, telomere biology — these aren't fringe topics anymore, they're the frontier. The average person doesn't think about healthspan until it's compromised. You're thinking about it now. That head start is itself a longevity advantage.",
    heroImageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Longevity",
    hexColor: "#3d98f8",
  },
  technology: {
    stats: [
      { value: "7+ hrs", label: "average daily screen time for US adults" },
      { value: "$500B", label: "projected global digital health market by 2028" },
      { value: "1 in 5", label: "adults now use a health wearable device" },
    ],
    editorialNote:
      "Technology is no longer something separate from your biology — it's woven into how you sleep, move, eat, and think. The average person spends over seven hours a day on screens without ever examining what that's doing to their nervous system. You're here because you want to use technology intentionally, not reactively. From wearable biometrics to AI-driven health insights, the tools are evolving faster than most people can keep up with. But you're keeping up. Understanding the intersection of digital tools and human health is one of the most consequential literacies of our time, and you're building it right now.",
    heroImageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Technology",
    hexColor: "#376f7a",
  },
  aesthetics: {
    stats: [
      { value: "$430B", label: "global beauty and personal care market value" },
      { value: "80%", label: "of skin aging is driven by environmental factors" },
      { value: "3x", label: "growth in evidence-based aesthetic procedures since 2015" },
    ],
    editorialNote:
      "Let's be honest — most of what passes for aesthetic advice is marketing dressed up as science. You're here because you want the actual evidence. And that matters, because 80% of how your skin ages is determined by environmental and lifestyle factors you can control. The intersection of dermatology, endocrinology, and material science is producing genuinely transformative research right now, and most people will never see it. They'll follow influencers instead. You're following the data. Understanding the biology behind appearance isn't vanity — it's health literacy with visible results. The fact that you're engaging with the research puts you in a very small, very informed minority.",
    heroImageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1400&h=500&fit=crop&crop=center",
    trendingLabel: "Trending in Aesthetics",
    hexColor: "#082f54",
  },
};
