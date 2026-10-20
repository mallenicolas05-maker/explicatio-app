import React, { useState, useEffect } from 'react';

export type ReadingSize = 'compact' | 'default' | 'comfortable';

const STORAGE_KEY = 'explicatio_reading_size';

const SIZES: { key: ReadingSize; label: string; fontSize: string }[] = [
  { key: 'compact', label: 'A', fontSize: '13px' },
  { key: 'default', label: 'A', fontSize: '16px' },
  { key: 'comfortable', label: 'A', fontSize: '19px' },
];

export const SIZE_STYLES: Record<ReadingSize, { body: string; summary: string }> = {
  compact: { body: 'text-[15px]', summary: 'text-[28px]' },
  default: { body: 'text-[17px]', summary: 'text-[32px]' },
  comfortable: { body: 'text-[19px]', summary: 'text-[36px]' },
};

export function useReadingSize() {
  const [size, setSize] = useState<ReadingSize>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ReadingSize) || 'default';
    } catch {
      return 'default';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, size);
  }, [size]);

  return { size, setSize };
}

interface ReadingComfortControlProps {
  size: ReadingSize;
  onChange: (size: ReadingSize) => void;
}

export const ReadingComfortControl: React.FC<ReadingComfortControlProps> = ({ size, onChange }) => {
  return (
    <div className="flex items-center gap-0">
      {SIZES.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`p-2 transition-colors rounded ${
            size === s.key ? 'text-zinc-600' : 'text-zinc-300 hover:text-zinc-500'
          }`}
          style={{ fontSize: s.fontSize, lineHeight: 1 }}
          title={s.key.charAt(0).toUpperCase() + s.key.slice(1)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};
