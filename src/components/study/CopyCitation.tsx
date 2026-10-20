import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { StudyDetailData } from '@/data/studiesData';

interface CopyCitationProps {
  study: StudyDetailData;
}

export const CopyCitation: React.FC<CopyCitationProps> = ({ study }) => {
  const [copied, setCopied] = useState(false);

  const formatCitation = (): string => {
    // APA format
    const authors = study.researchers
      .map((r) => {
        const parts = r.name.replace(/^(Dr\.\s*|Prof\.\s*)/, '').split(' ');
        const lastName = parts[parts.length - 1];
        const initials = parts.slice(0, -1).map(n => n[0] + '.').join(' ');
        return `${lastName}, ${initials}`;
      })
      .join(', ');

    // Extract year from date
    const yearMatch = study.date.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : study.date;

    const title = study.source.title || study.title;
    const journal = study.journal;
    const doi = study.source.doi ? `https://doi.org/${study.source.doi}` : '';

    return `${authors} (${year}). ${title}. ${journal}. ${doi}`.trim();
  };

  const handleCopy = async () => {
    const citation = formatCitation();
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      toast({ title: 'Citation copied', description: 'APA citation copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-zinc-200">
      <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-3">
        Cite This Study
      </h4>
      <p className="text-[11px] text-zinc-500 leading-relaxed mb-3 break-words">
        {formatCitation()}
      </p>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        {copied ? 'Copied' : 'Copy Citation'}
      </button>
    </div>
  );
};
