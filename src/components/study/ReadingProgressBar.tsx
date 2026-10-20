import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ReadingProgressBarProps {
  readTime: string;
  categoryHex: string;
  contentRef?: React.RefObject<HTMLElement>;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ contentRef, categoryHex }) => {
  const [progress, setProgress] = useState(0);
  const [barStyle, setBarStyle] = useState<{ left: string; width: string }>({ left: '0px', width: '100%' });

  const updateBarPosition = useCallback(() => {
    if (contentRef?.current) {
      const rect = contentRef.current.getBoundingClientRect();
      const scrollLeft = window.scrollX || 0;
      setBarStyle({
        left: `${rect.left + scrollLeft}px`,
        width: `${rect.width}px`,
      });
    }
  }, [contentRef]);

  const handleScroll = useCallback(() => {
    // Calculate progress based on Original Source section
    const endEl = document.getElementById('section-original-source');
    if (!endEl) {
      // Fallback to full page
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      return;
    }

    const scrollTop = window.scrollY;
    const endRect = endEl.getBoundingClientRect();
    // Full progress when bottom of Original Source is at bottom of viewport
    const endPosition = endRect.bottom + scrollTop - window.innerHeight;
    
    if (endPosition <= 0) {
      setProgress(100);
      return;
    }
    
    setProgress(Math.min(Math.max((scrollTop / endPosition) * 100, 0), 100));
  }, []);

  useEffect(() => {
    updateBarPosition();
    window.addEventListener('resize', updateBarPosition);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('resize', updateBarPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateBarPosition]);

  return (
    <div
      className="fixed top-16 lg:top-20 z-[60] h-[2px] bg-zinc-100"
      style={{ left: barStyle.left, width: barStyle.width }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, backgroundColor: categoryHex }}
      />
    </div>
  );
};
