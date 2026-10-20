import React, { useState, useEffect } from 'react';

interface TOCSection {
  id: string;
  label: string;
}

const SECTIONS: TOCSection[] = [
  { id: 'section-summary', label: 'Summary' },
  { id: 'section-execution-protocol', label: 'Execution Protocol' },
  { id: 'section-research-objective', label: 'Research Objective' },
  { id: 'section-methodology', label: 'Methodology' },
  { id: 'section-observations', label: 'Observations' },
  { id: 'section-impact', label: 'Impact' },
  { id: 'section-constraints', label: 'Constraints' },
  { id: 'section-original-source', label: 'Original Source' },
];

interface TableOfContentsProps {
  categoryHex: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ categoryHex }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="border-b border-zinc-200 pb-3 mb-5">
        <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]">
          Contents
        </h4>
      </div>
      <nav className="space-y-0">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`block w-full text-left py-2 pl-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-200 border-l-2 ${
                isActive
                  ? 'font-semibold text-[#0B0B0B]'
                  : 'font-medium text-zinc-400 border-transparent hover:text-zinc-600'
              }`}
              style={{ borderLeftColor: isActive ? categoryHex : 'transparent' }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
