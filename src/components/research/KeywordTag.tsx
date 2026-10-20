import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface KeywordTagProps {
  keyword: string;
  size?: 'sm' | 'md';
  interactive?: boolean;
  className?: string;
}

export const KeywordTag: React.FC<KeywordTagProps> = ({
  keyword,
  size = 'sm',
  interactive = true,
  className,
}) => {
  const baseStyles = cn(
    'inline-flex items-center font-mono uppercase tracking-wide transition-colors rounded-full border',
    size === 'sm' 
      ? 'px-2 py-0.5 text-[8px]' 
      : 'px-2.5 py-1 text-[9px]',
    'bg-zinc-100 text-zinc-600 border-zinc-200',
    interactive && 'hover:bg-zinc-200 hover:text-zinc-800 cursor-pointer',
    className
  );

  if (interactive) {
    return (
      <Link
        to={`/studies?keyword=${encodeURIComponent(keyword)}`}
        className={baseStyles}
      >
        {keyword}
      </Link>
    );
  }

  return (
    <span className={baseStyles}>
      {keyword}
    </span>
  );
};

interface KeywordTagListProps {
  keywords: string[];
  size?: 'sm' | 'md';
  interactive?: boolean;
  maxDisplay?: number;
  className?: string;
}

export const KeywordTagList: React.FC<KeywordTagListProps> = ({
  keywords,
  size = 'sm',
  interactive = true,
  maxDisplay = 4,
  className,
}) => {
  const displayKeywords = keywords.slice(0, maxDisplay);
  const remainingCount = keywords.length - maxDisplay;

  if (displayKeywords.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {displayKeywords.map((keyword) => (
        <KeywordTag
          key={keyword}
          keyword={keyword}
          size={size}
          interactive={interactive}
        />
      ))}
      {remainingCount > 0 && (
        <span className={cn(
          'inline-flex items-center font-mono uppercase tracking-wide text-zinc-400',
          size === 'sm' ? 'text-[8px]' : 'text-[9px]'
        )}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default KeywordTag;
