import React, { useMemo } from 'react';
import { STUDIES_DATA, getStudyKeywords, getStudyImageUrl, type StudyDetailData } from '@/data/studiesData';
import { HomeStudyCard } from '@/components/research/HomeStudyCard';

interface RelatedStudiesProps {
  currentStudy: StudyDetailData;
}

export const RelatedStudies: React.FC<RelatedStudiesProps> = ({ currentStudy }) => {
  const related = useMemo(() => {
    const currentKeywords = new Set(getStudyKeywords(currentStudy).map(k => k.toLowerCase()));

    const candidates = STUDIES_DATA
      .filter(s => s.slug !== currentStudy.slug && s.category === currentStudy.category)
      .map(s => {
        const keywords = getStudyKeywords(s).map(k => k.toLowerCase());
        const overlap = keywords.filter(k => currentKeywords.has(k)).length;
        return { study: s, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 3);

    // If fewer than 3 same-category studies, fill from other categories
    if (candidates.length < 3) {
      const slugs = new Set([currentStudy.slug, ...candidates.map(c => c.study.slug)]);
      const extras = STUDIES_DATA
        .filter(s => !slugs.has(s.slug))
        .map(s => {
          const keywords = getStudyKeywords(s).map(k => k.toLowerCase());
          const overlap = keywords.filter(k => currentKeywords.has(k)).length;
          return { study: s, overlap };
        })
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, 3 - candidates.length);
      candidates.push(...extras);
    }

    return candidates.map(c => c.study);
  }, [currentStudy]);

  if (related.length === 0) return null;

  return (
    <section className="container-editorial py-20">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-px bg-zinc-300"></div>
        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]">
          Related Studies
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((study) => (
          <HomeStudyCard
            key={study.slug}
            slug={study.slug}
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
  );
};
