import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { StudyDetailData } from '@/data/studiesData';

interface OriginalSourceSectionProps {
  study: StudyDetailData;
}

export const OriginalSourceSection: React.FC<OriginalSourceSectionProps> = ({ study }) => {
  const [copied, setCopied] = useState(false);
  const sourceUrl = study.source.link || `https://doi.org/${study.source.doi}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(sourceUrl);
      setCopied(true);
      toast({
        title: "URL copied",
        description: "Paste in a new browser tab to view the study.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please select and copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-t border-zinc-200 pt-16 mt-4">
      <h3 
        className="text-[26px] font-bold text-[#0B0B0B] uppercase tracking-[-0.01em] text-center mb-10"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Original Source
      </h3>
      <div className="bg-zinc-100 py-10 px-8 text-center">
        <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-4">Journal Reference</p>
        <p 
          className="font-bold text-[#0B0B0B] text-[18px] uppercase tracking-[0.01em] mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          "{study.source.title}"
        </p>
        <p 
          className="text-[13px] text-zinc-400 mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          DOI: {study.source.doi}
        </p>
        
        {/* Static URL Display */}
        <div className="bg-white border border-zinc-200 py-4 px-5 mb-3 max-w-lg mx-auto">
          <p 
            className="text-[12px] text-zinc-600 break-all select-all"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {sourceUrl}
          </p>
        </div>
        
        {/* Instructional Text */}
        <p 
          className="text-[11px] text-zinc-400 mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Open this link in a new browser tab to access the full study
        </p>
        
        {/* Copy Button */}
        <button
          onClick={handleCopyUrl}
          className="inline-flex items-center justify-center gap-3 bg-[#0B0B0B] text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] hover:bg-zinc-800 transition-colors"
        >
          {copied ? (
            <>
              Copied
              <Check size={14} />
            </>
          ) : (
            <>
              Copy URL
              <Copy size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
