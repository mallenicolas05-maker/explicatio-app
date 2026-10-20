import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RUMORS_DATA, RUMOR_CATEGORIES, getTrendingRumors, getVerdictColor, Rumor, RumorVerdict } from '@/data/rumorsData';
import { TrendingUp, Filter, ExternalLink, Lock } from 'lucide-react';

interface DebunkingRumorsProps {
  isPremium?: boolean;
}

const DebunkingRumors: React.FC<DebunkingRumorsProps> = ({ isPremium = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showTrending, setShowTrending] = useState(true);

  const filteredRumors = selectedCategory
    ? RUMORS_DATA.filter(r => r.categorySlug === selectedCategory)
    : showTrending
      ? getTrendingRumors(6)
      : RUMORS_DATA;

  const VerdictBadge: React.FC<{ verdict: RumorVerdict }> = ({ verdict }) => {
    const colors = getVerdictColor(verdict);
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}>
        {verdict}
      </span>
    );
  };

  const RumorCard: React.FC<{ rumor: Rumor }> = ({ rumor }) => (
    <div className="glass-card p-5 rounded-xl group hover:shadow-lg transition-all duration-300">
      {/* Verdict */}
      <div className="flex items-center justify-between mb-4">
        <VerdictBadge verdict={rumor.verdict} />
        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {rumor.trendingScore}%
        </span>
      </div>

      {/* Claim */}
      <h3 className="font-sans font-medium text-lg text-zinc-800 mb-3 leading-tight group-hover:text-zinc-600 transition-colors">
        "{rumor.claim}"
      </h3>

      {/* Summary */}
      <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
        {rumor.summary}
      </p>

      {/* Category & Sources */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
          {rumor.category}
        </span>
        <span className="text-[9px] font-mono text-zinc-400">
          {rumor.sources.length} source{rumor.sources.length > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );

  if (!isPremium) {
    return (
      <div className="glass-panel p-8 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-zinc-400" />
          </div>
          <div>
            <h2 className="font-sans font-extralight text-xl text-zinc-800 tracking-tight">
              Debunking Rumors
            </h2>
            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Premium Feature
            </span>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mb-6">
          Upgrade to access our evidence-based analysis of trending health claims and myths.
        </p>
        <Link 
          to="/pricing" 
          className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-black hover:text-zinc-600 transition-colors"
        >
          View Plans <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-1">
            Premium Feature
          </span>
          <h2 className="font-sans font-extralight text-2xl text-zinc-800 tracking-tight">
            Debunking Rumors
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowTrending(true); setSelectedCategory(null); }}
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-md transition-colors ${
              showTrending && !selectedCategory
                ? 'bg-black text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Trending
          </button>
          <button
            onClick={() => { setShowTrending(false); setSelectedCategory(null); }}
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-md transition-colors ${
              !showTrending && !selectedCategory
                ? 'bg-black text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <Filter className="w-3 h-3 inline mr-1" />
            All
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {RUMOR_CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
            className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wide rounded-full border transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-black text-white border-black'
                : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Rumors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRumors.map(rumor => (
          <RumorCard key={rumor.id} rumor={rumor} />
        ))}
      </div>

      {filteredRumors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400 text-sm">No rumors found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default DebunkingRumors;
