import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { categories } from '@/data/researchData';
import { STUDIES_DATA, getStudyImageUrl } from '@/data/studiesData';
import { categoryEditorialData } from '@/data/categoryEditorialData';
import { HomeStudyCard } from '@/components/research/HomeStudyCard';
import { ArrowRight, Clock, BookOpen, ArrowLeft } from 'lucide-react';

const CategoryDetail: React.FC = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <button onClick={() => navigate('/categories')} className="text-sm font-mono uppercase tracking-wider hover:underline">
              ← Back to Categories
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryNameMap: Record<string, string> = {
    'SLEEP': 'Sleep', 'NEUROSCIENCE': 'Neuroscience', 'NUTRITION': 'Nutrition',
    'PERFORMANCE': 'Performance', 'PHYSIOLOGY': 'Physiology', 'COGNITION': 'Cognition',
    'BEHAVIOR': 'Behavior', 'LONGEVITY': 'Longevity', 'TECHNOLOGY': 'Technology', 'AESTHETICS': 'Aesthetics',
  };
  const mappedName = categoryNameMap[category.name] || category.name;
  const studies = STUDIES_DATA.filter(s => s.category === mappedName);
  const featuredStudy = studies[0];
  const editorial = categoryEditorialData[category.slug];
  const trendingStudies = studies.slice(1, 4);
  const avgReadTime = studies.length > 0
    ? Math.round(studies.reduce((sum, s) => sum + parseInt(s.readTime), 0) / studies.length)
    : 0;

  const faintBg = editorial ? `${editorial.hexColor}12` : '#f5f5f5';
  const faintBorder = editorial ? `${editorial.hexColor}30` : '#e5e5e5';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />

      <main className="flex-1 pt-20 lg:pt-24">
        {/* Back */}
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <button onClick={() => navigate('/categories')} className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-wider hover:text-zinc-700 transition-colors mb-8">
            <ArrowLeft size={14} /> All Categories
          </button>
        </div>

        {/* Hero: Title + Image side by side */}
        <header className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="flex-1">
              <span className={`inline-block px-3 py-1.5 text-[9px] font-mono font-bold tracking-[0.1em] uppercase ${category.color} rounded-full mb-6`}>
                {category.name}
              </span>
              <h1 className="text-4xl md:text-6xl font-sans font-extralight tracking-tight text-zinc-800 mb-6 leading-tight">
                {mappedName}
              </h1>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
                {category.description}
              </p>
              {editorial && (
                <p className="text-zinc-600 text-[13px] md:text-[14px] leading-[1.9] tracking-wide max-w-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {editorial.editorialNote}
                </p>
              )}
            </div>

            {/* Right: Hero Image */}
            {editorial && (
              <div className="w-full lg:w-[380px] flex-shrink-0">
                <div className="relative w-full h-[240px] lg:h-full lg:min-h-[320px] rounded-xl overflow-hidden">
                  <img
                    src={editorial.heroImageUrl}
                    alt={`${mappedName} research`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
                      {studies.length} peer-reviewed studies · Updated weekly
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Stats Bar */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-wrap gap-8 py-6 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-gray-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-gray-600">
                {studies.length} Studies
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-gray-600">
                ~{avgReadTime} min avg read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Study */}
        {featuredStudy && (
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-6">Featured Study</h2>
            <Link to={`/studies/${featuredStudy.slug}?from=${categorySlug}`} className="group block bg-white border border-gray-200 rounded-xl overflow-hidden transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-80 h-48 md:h-auto bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img src={getStudyImageUrl(featuredStudy)} alt={featuredStudy.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{featuredStudy.readTime}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{featuredStudy.journal}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight mb-4 group-hover:text-gray-600 transition-colors">
                    {featuredStudy.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">{featuredStudy.excerpt}</p>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-gray-900">
                    Read Full Analysis <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* By the Numbers */}
        {editorial && (
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-6">By the Numbers</h2>
            <div className="rounded-xl p-8 md:p-10" style={{ backgroundColor: faintBg, border: `1px solid ${faintBorder}` }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                {editorial.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center text-center ${
                      idx < editorial.stats.length - 1 ? 'md:border-r' : ''
                    }`}
                    style={{ borderColor: idx < editorial.stats.length - 1 ? faintBorder : undefined }}
                  >
                    <span className="text-4xl md:text-5xl font-mono font-bold text-gray-900 tracking-tight mb-2">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 max-w-[200px] leading-relaxed">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trending Strip */}
        {trendingStudies.length > 0 && editorial && (
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-6">
              {editorial.trendingLabel}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trendingStudies.map((study) => (
                <Link
                  key={study.id}
                  to={`/studies/${study.slug}?from=${categorySlug}`}
                  className="flex-shrink-0 flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3 hover:border-gray-400 hover:shadow-sm transition-all group"
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 border-[1.5px]" style={{ borderColor: editorial?.hexColor || '#999', backgroundColor: 'transparent' }} />
                  <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap max-w-[260px] truncate group-hover:text-black transition-colors">
                    {study.title}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                    {study.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Studies Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 mb-8">
            All {mappedName} Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map((study) => (
              <HomeStudyCard
                key={study.id}
                slug={`${study.slug}?from=${categorySlug}`}
                title={study.title}
                category={study.category}
                date={study.date}
                readTime={study.readTime}
                excerpt={study.excerpt}
                imageUrl={getStudyImageUrl(study)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryDetail;
