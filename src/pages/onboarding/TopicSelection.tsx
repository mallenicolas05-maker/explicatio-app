import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Check } from 'lucide-react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const TOPIC_CATEGORIES = [
  { id: 'sleep', name: 'Sleep', color: 'bg-indigo-400', description: 'Circadian rhythms, sleep quality, rest optimization' },
  { id: 'neuroscience', name: 'Neuroscience', color: 'bg-violet-500', description: 'Brain structure, neural pathways, neurological function' },
  { id: 'nutrition', name: 'Nutrition', color: 'bg-emerald-500', description: 'Diet, micronutrients, metabolic health' },
  { id: 'performance', name: 'Performance', color: 'bg-orange-500', description: 'Physical training, movement, peak performance' },
  { id: 'physiology', name: 'Physiology', color: 'bg-teal-500', description: 'Body systems, biological processes' },
  { id: 'cognition', name: 'Cognition', color: 'bg-blue-500', description: 'Memory, attention, learning, decisions' },
  { id: 'behavior', name: 'Behavior', color: 'bg-rose-500', description: 'Habits, motivation, behavioral change' },
  { id: 'longevity', name: 'Longevity', color: 'bg-amber-500', description: 'Aging, lifespan, biological markers' },
  { id: 'technology', name: 'Technology', color: 'bg-cyan-500', description: 'Digital health, wearables, screen effects' },
  { id: 'aesthetics', name: 'Aesthetics', color: 'bg-pink-500', description: 'Skin health, body composition, appearance' },
];

const TopicSelection: React.FC<Props> = ({ onNext, onPrev }) => {
  const { updateData } = useOnboarding();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const selectAll = () => {
    if (selectedTopics.length === TOPIC_CATEGORIES.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(TOPIC_CATEGORIES.map(t => t.id));
    }
  };

  const handleContinue = () => {
    const rec = getRecommendation();
    updateData({ interests: selectedTopics, recommendedTier: rec.tier });
    onNext();
  };

  const getRecommendation = () => {
    const count = selectedTopics.length;
    if (count <= 1) return { tier: '01', categories: '1 category included', studies: '4 studies per week' };
    if (count <= 4) return { tier: '02', categories: '6 categories included', studies: '24 studies per week' };
    if (count <= 6) return { tier: '03', categories: '10 categories included', studies: '40 studies per week' };
    return { tier: '04', categories: 'Unlimited categories included', studies: '70 studies per week' };
  };

  const recommendation = getRecommendation();

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <nav className="flex justify-between items-center px-4 md:px-12 py-2 md:py-4 shrink-0">
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-4xl text-center">
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-zinc-300 mb-1 md:mb-2 block">Topic Selection</span>
          <h1 className="text-lg md:text-3xl font-mono font-bold tracking-tight uppercase mb-1 md:mb-2">Select Your Research Topics</h1>
          <p className="text-zinc-400 text-[9px] md:text-[10px] mb-3 md:mb-6 font-medium uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed max-w-lg mx-auto px-2">
            These help us understand your interests. Select the topics that appeal to you the most.
          </p>

          {/* Select All Button */}
          <div className="mb-3 md:mb-5">
            <button
              onClick={selectAll}
              className="text-[9px] md:text-[10px] font-mono uppercase tracking-wide text-zinc-500 hover:text-black transition-colors underline underline-offset-4"
            >
              {selectedTopics.length === TOPIC_CATEGORIES.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {/* Topic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 max-w-3xl mx-auto mb-3 md:mb-6">
            {TOPIC_CATEGORIES.map((topic) => {
              const isSelected = selectedTopics.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`relative p-3 md:p-4 border rounded-xl transition-all duration-300 text-left group ${
                    isSelected
                      ? 'border-black bg-zinc-50 shadow-lg ring-1 ring-black'
                      : 'border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md'
                  }`}
                >
                  <div className={`absolute top-2 right-2 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-black' : 'bg-zinc-100'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />}
                  </div>

                  <div className={`w-2 h-2 rounded-full ${topic.color} mb-2`}></div>
                  
                  <h3 className="text-[10px] md:text-[12px] font-mono font-bold uppercase tracking-wide mb-0.5">
                    {topic.name}
                  </h3>
                  
                  <p className="hidden md:block text-[8px] text-zinc-400 leading-relaxed">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selection count & recommendation */}
          <div className="mb-3 md:mb-6">
            <div className="inline-flex flex-col items-center gap-1 px-4 py-2 md:py-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wide text-zinc-400">
                {selectedTopics.length} of 10 selected
              </span>
              {selectedTopics.length > 0 && (
                <>
                  <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wide text-black">
                    Tier {recommendation.tier} recommended
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-wide text-black">
                    What does this include?
                  </span>
                  <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-wide text-black">
                    {recommendation.categories} · {recommendation.studies}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:gap-3">
            <button 
              onClick={handleContinue}
              disabled={selectedTopics.length === 0}
              className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] py-3 md:py-4 px-10 md:px-16 rounded-sm transition-all shadow-xl ${
                selectedTopics.length > 0
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
            <button onClick={onPrev} className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">Go Back</button>
          </div>
        </div>
      </div>
      <div className="h-4 md:h-6 shrink-0"></div>
    </div>
  );
};

export default TopicSelection;
