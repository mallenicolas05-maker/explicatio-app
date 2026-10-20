import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useSavedHighlights } from '@/hooks/useSavedHighlights';
import { useAuth } from '@/contexts/AuthContext';
import { HIGHLIGHT_COLOR_PAIRS } from './highlight/colorPairs';
import { HighlightColorPickerPanel } from './highlight/HighlightColorPickerPanel';

interface TextHighlighterProps {
  studySlug: string;
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({ studySlug }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const [selectedText, setSelectedText] = useState('');
  const [colorPairIndex, setColorPairIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selectionRangeRef = useRef<Range | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const { saveHighlight } = useSavedHighlights();
  const { user } = useAuth();

  const activePair = HIGHLIGHT_COLOR_PAIRS[colorPairIndex] ?? HIGHLIGHT_COLOR_PAIRS[0];
  const backgroundColor = activePair.background;
  const textColor = activePair.text;

  const updatePopoverPosition = useCallback(() => {
    const range = selectionRangeRef.current;
    if (!range) return;

    try {
      const rect = range.getBoundingClientRect();
      if (!rect) return;

      const pad = 12;
      const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

      let x = clamp(rect.left + rect.width / 2, pad, window.innerWidth - pad);
      let y = 0;
      let nextPlacement: 'top' | 'bottom' = 'top';

      // If selection is fully off-screen, pin to top/bottom edge.
      if (rect.bottom < 0) {
        y = pad;
        nextPlacement = 'bottom';
      } else if (rect.top > window.innerHeight) {
        y = window.innerHeight - pad;
        nextPlacement = 'top';
      } else {
        const preferTop = rect.top > 96;
        if (preferTop) {
          y = rect.top - 10;
          nextPlacement = 'top';
        } else {
          y = rect.bottom + 10;
          nextPlacement = 'bottom';
        }
        y = clamp(y, pad, window.innerHeight - pad);
      }

      setPlacement(nextPlacement);
      setPosition({ x, y });
    } catch {
      // If the underlying DOM changes, the stored range can become invalid.
      setIsVisible(false);
      setShowColorPicker(false);
      selectionRangeRef.current = null;
    }
  }, []);

  const handleSelectionCheck = useCallback((e: MouseEvent | TouchEvent) => {
    // Ignore events originating inside the popover (prevents glitchy toggling).
    if (popoverRef.current?.contains(e.target as Node)) return;

    // Small delay to ensure selection is complete
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 3) {
        // Only allow highlighting within designated content areas.
        const anchorNode = selection?.anchorNode;
        const anchorEl = anchorNode instanceof HTMLElement ? anchorNode : anchorNode?.parentElement;
        if (!anchorEl?.closest('[data-highlightable]')) return;

        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          // Keep a stable reference to the selection so we can follow it on scroll.
          selectionRangeRef.current = range?.cloneRange() ?? null;

          // Position the popover above the selection
          updatePopoverPosition();
          setSelectedText(text);
          setIsVisible(true);
          setShowColorPicker(false);
        }
      }
    }, 10);
  }, [updatePopoverPosition]);

  const handleSelectionClear = useCallback((e: MouseEvent | TouchEvent) => {
    // Don't close if clicking inside the popover
    if (popoverRef.current?.contains(e.target as Node)) {
      return;
    }
    setIsVisible(false);
    setShowColorPicker(false);
    selectionRangeRef.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleSelectionCheck);
    document.addEventListener('mousedown', handleSelectionClear);
    document.addEventListener('touchend', handleSelectionCheck);
    document.addEventListener('touchstart', handleSelectionClear);

    return () => {
      document.removeEventListener('mouseup', handleSelectionCheck);
      document.removeEventListener('mousedown', handleSelectionClear);
      document.removeEventListener('touchend', handleSelectionCheck);
      document.removeEventListener('touchstart', handleSelectionClear);
    };
  }, [handleSelectionCheck, handleSelectionClear]);

  // Keep the popover anchored to the selected text as the user scrolls/resizes.
  useEffect(() => {
    if (!isVisible) return;

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updatePopoverPosition();
      });
    };

    // Initial positioning once visible.
    schedule();

    window.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isVisible, updatePopoverPosition]);

  const handleSave = async () => {
    if (!user) {
      setIsVisible(false);
      selectionRangeRef.current = null;
      return;
    }

    setIsSaving(true);
    const success = await saveHighlight(studySlug, selectedText, backgroundColor, textColor);
    setIsSaving(false);
    
    if (success) {
      setIsVisible(false);
      selectionRangeRef.current = null;
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setShowColorPicker(false);
    selectionRangeRef.current = null;
    window.getSelection()?.removeAllRanges();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 animate-in fade-in zoom-in-95 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: placement === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Main action bar */}
        <div className="flex items-center gap-1 p-2">
          {/* Color preview / toggle */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.preventDefault();
              // Prevent document-level selection handlers from re-triggering.
              e.stopPropagation();
              setShowColorPicker((v) => !v);
            }}
            className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-50 rounded-lg transition-colors"
            title="Customize colors"
          >
            <div 
              className="w-5 h-5 rounded border border-zinc-300 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor, color: textColor }}
            >
              A
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Colors
            </span>
          </button>

          <div className="w-px h-6 bg-zinc-200" />

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isSaving || !user}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
            title={user ? "Save to library" : "Sign in to save"}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus size={14} />
            )}
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {user ? 'Save' : 'Sign in'}
            </span>
          </button>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hover:text-zinc-600"
          >
            <X size={14} />
          </button>
        </div>

        {/* Color picker panel */}
        {showColorPicker && (
          <HighlightColorPickerPanel
            selectedText={selectedText}
            backgroundColor={backgroundColor}
            textColor={textColor}
            pairs={HIGHLIGHT_COLOR_PAIRS}
            selectedIndex={colorPairIndex}
            onSelectIndex={setColorPairIndex}
          />
        )}
      </div>

      {/* Arrow pointer */}
      {placement === 'top' ? (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white',
          }}
        />
      ) : (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid white',
          }}
        />
      )}
    </div>
  );
};
