export type HighlightColorPair = {
  name: string;
  background: string; // CSS color (HSL)
  text: string; // CSS color (HSL)
};

// Paired palette: each background swatch has a corresponding text color.
// Stored as HSL strings so they stay theme-agnostic and DB-friendly.
export const HIGHLIGHT_COLOR_PAIRS: HighlightColorPair[] = [
  { name: "Blue", background: "hsl(210 92% 95%)", text: "hsl(214 84% 56%)" },
  { name: "Lavender", background: "hsl(270 100% 96%)", text: "hsl(263 71% 58%)" },
  { name: "Pink", background: "hsl(330 100% 96%)", text: "hsl(330 81% 60%)" },
  { name: "Peach", background: "hsl(28 100% 95%)", text: "hsl(20 90% 52%)" },
  { name: "Mint", background: "hsl(140 45% 95%)", text: "hsl(158 64% 40%)" },
  { name: "Butter", background: "hsl(54 100% 95%)", text: "hsl(35 92% 45%)" },
  { name: "Coral", background: "hsl(8 100% 95%)", text: "hsl(0 84% 60%)" },
  { name: "Teal", background: "hsl(186 65% 94%)", text: "hsl(188 84% 38%)" },
  { name: "Gray", background: "hsl(210 20% 96%)", text: "hsl(215 16% 47%)" },
  { name: "Ink", background: "hsl(222 47% 11%)", text: "hsl(0 0% 100%)" },
];
