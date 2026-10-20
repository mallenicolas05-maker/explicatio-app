import React from "react";
import { Check } from "lucide-react";

import type { HighlightColorPair } from "./colorPairs";

type Props = {
  selectedText: string;
  backgroundColor: string;
  textColor: string;
  pairs: HighlightColorPair[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
};

export function HighlightColorPickerPanel({ selectedText, backgroundColor, textColor, pairs, selectedIndex, onSelectIndex }: Props) {
  return (
    <div className="border-t border-border/40 p-3 space-y-3">
      {/* Preview */}
      <div
        className="px-3 py-2 rounded-lg text-sm font-medium max-h-24 overflow-y-auto break-words"
        style={{ backgroundColor, color: textColor }}
      >
        {selectedText}
      </div>

      {/* Background colors */}
      <div>
        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Background</p>
        <div className="flex gap-1.5 flex-wrap">
          {pairs.map((pair, index) => {
            const selected = index === selectedIndex;
            return (
              <button
                key={pair.name}
                type="button"
                onClick={() => onSelectIndex(index)}
                className={
                  "w-7 h-7 rounded-lg transition-all ring-1 ring-border/40 hover:scale-105 " +
                  (selected ? " ring-2 ring-foreground/15 shadow-sm scale-110" : "")
                }
                style={{ backgroundColor: pair.background }}
                title={pair.name}
              >
                {selected ? <Check size={12} className="mx-auto" style={{ color: pair.text }} /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text colors */}
      <div>
        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Text</p>
        <div className="flex gap-1.5 flex-wrap">
          {pairs.map((pair, index) => {
            const selected = index === selectedIndex;
            return (
              <button
                key={pair.name}
                type="button"
                onClick={() => onSelectIndex(index)}
                className={
                  "w-7 h-7 rounded-lg flex items-center justify-center transition-all bg-background ring-1 ring-border/40 hover:scale-105 " +
                  (selected ? " ring-2 ring-foreground/15 shadow-sm scale-110" : "")
                }
                title={pair.name}
              >
                <span className="text-sm font-bold" style={{ color: pair.text }}>
                  A
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
