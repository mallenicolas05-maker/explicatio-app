"use client";

import * as React from "react";
import { ArrowLeft, BarChart2, CalendarDays, CheckSquare, ChevronRight, Layers, TrendingUp } from "lucide-react";

import { AC01AreaDefault } from "@/components/lab/charts/AC01AreaDefault";
import { AC02AreaGradient } from "@/components/lab/charts/AC02AreaGradient";
import { AC03AreaLinear } from "@/components/lab/charts/AC03AreaLinear";
import { AC04AreaStacked } from "@/components/lab/charts/AC04AreaStacked";
import { AC05AreaStep } from "@/components/lab/charts/AC05AreaStep";
import { AC06AreaLegend } from "@/components/lab/charts/AC06AreaLegend";
import { BC01BarDefault } from "@/components/lab/charts/BC01BarDefault";
import { BC02BarLabel } from "@/components/lab/charts/BC02BarLabel";
import { BC03BarActive } from "@/components/lab/charts/BC03BarActive";
import { BC04BarHorizontal } from "@/components/lab/charts/BC04BarHorizontal";
import { BC05BarMultiple } from "@/components/lab/charts/BC05BarMultiple";
import { BC06BarMixed } from "@/components/lab/charts/BC06BarMixed";
import { BC07BarStacked } from "@/components/lab/charts/BC07BarStacked";
import { LC01LineDefault } from "@/components/lab/charts/LC01LineDefault";
import { LC02LineDots } from "@/components/lab/charts/LC02LineDots";
import { LC03LineMultiple } from "@/components/lab/charts/LC03LineMultiple";
import { LC04LineLinear } from "@/components/lab/charts/LC04LineLinear";
import { RC01RadarDots } from "@/components/lab/charts/RC01RadarDots";
import { RC02RadarMultiple } from "@/components/lab/charts/RC02RadarMultiple";
import { Button } from "@/components/lab/ui/button";

export type Step4FormatCategory = "linear" | "bar" | "habit" | "multi" | "weekly";
export type ChartId =
  | "AC-01" | "AC-02" | "AC-03" | "AC-04" | "AC-05" | "AC-06"
  | "BC-01" | "BC-02" | "BC-03" | "BC-04" | "BC-05" | "BC-06" | "BC-07"
  | "LC-01" | "LC-02" | "LC-03" | "LC-04"
  | "RC-01" | "RC-02";

const traceButtonClass =
  "relative overflow-hidden rounded-lg border border-[var(--text)] bg-white font-mono-custom text-[12px] uppercase tracking-[0.12em] text-[var(--text)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(143,189,245,0.18),rgba(182,160,255,0.18),rgba(239,192,107,0.16),rgba(158,217,247,0.18))] before:opacity-0 before:transition-opacity before:duration-300 after:pointer-events-none after:absolute after:-left-1/3 after:top-0 after:h-full after:w-1/3 after:rotate-12 after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.82),transparent)] after:opacity-0 after:transition-all after:duration-500 hover:border-[var(--accent)] hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,249,252,0.98))] hover:text-[var(--text)] hover:shadow-[0_10px_24px_rgba(143,189,245,0.12)] hover:before:opacity-100 hover:after:left-full hover:after:opacity-100";

const traceButtonContentClass = "relative z-10 inline-flex items-center gap-1.5";

const FORMAT_CATEGORIES = [
  {
    id: "linear",
    icon: TrendingUp,
    label: "Line View",
    description: "Track one value on a smooth or sharp line over time. Best for scores, energy levels, focus ratings, anything 1–10.",
    exampleStudies: ["Caffeine & Focus Score", "Daily Mood Tracking", "Sleep Quality Rating"],
    hasVariants: true,
    defaultChartId: "AC-01",
  },
  {
    id: "bar",
    icon: BarChart2,
    label: "Bar View",
    description: "Track quantities where comparing each day as a distinct block is clearer than a flowing line. Best for minutes, reps, grams, glasses.",
    exampleStudies: ["Water Intake (ml)", "Exercise Duration (min)", "Daily Steps"],
    hasVariants: true,
    defaultChartId: "BC-01",
  },
  {
    id: "habit",
    icon: CheckSquare,
    label: "Habit Streak",
    description: "Track yes or no consistency. Best when the question is simply whether you did the thing each day.",
    exampleStudies: ["Morning Meditation", "Cold Shower Protocol", "No Sugar Challenge"],
    hasVariants: false,
    defaultChartId: null,
  },
  {
    id: "multi",
    icon: Layers,
    label: "Multi-Metric",
    description: "Track a few related values together when the trial has more than one moving part. Best for comparing energy vs focus vs mood.",
    exampleStudies: ["Sleep + Energy + Focus", "Magnesium: Mood + Recall", "HRV + Stress + Recovery"],
    hasVariants: true,
    defaultChartId: "LC-03",
  },
  {
    id: "weekly",
    icon: CalendarDays,
    label: "Weekly Summary",
    description: "Collapse results into broader weekly checkpoints. Best for lower-frequency reviews where daily noise is not useful.",
    exampleStudies: ["Intermittent Fasting Results", "Monthly Supplement Stack", "Long-Term Habit Formation"],
    hasVariants: true,
    defaultChartId: "AC-05",
  },
] as const;

const PREVIEW_DATA = [
  { day: "D1", value: 42, secondary: 28, fill: "#8B5CF6" },
  { day: "D2", value: 58, secondary: 35, fill: "#4D7BF0" },
  { day: "D3", value: 51, secondary: 40, fill: "#06B6D4" },
  { day: "D4", value: 67, secondary: 44, fill: "#EF4444" },
  { day: "D5", value: 73, secondary: 38, fill: "#F59E0B" },
  { day: "D6", value: 69, secondary: 52, fill: "#CDD3DD" },
];

const PREVIEW_THEME_STYLES: React.CSSProperties[] = [
  {
    ["--chart-1" as string]: "#8B5CF6",
    ["--chart-2" as string]: "#D0BAFF",
    ["--chart-3" as string]: "#EEE6FF",
    ["--chart-4" as string]: "#A78BFA",
    ["--chart-5" as string]: "#F5F0FF",
  },
  {
    ["--chart-1" as string]: "#4D7BF0",
    ["--chart-2" as string]: "#8FBDF5",
    ["--chart-3" as string]: "#DCE9FF",
    ["--chart-4" as string]: "#06B6D4",
    ["--chart-5" as string]: "#EEF8FD",
  },
  {
    ["--chart-1" as string]: "#EF4444",
    ["--chart-2" as string]: "#F6B1AA",
    ["--chart-3" as string]: "#FCE4E1",
    ["--chart-4" as string]: "#F59E0B",
    ["--chart-5" as string]: "#FEF0D6",
  },
  {
    ["--chart-1" as string]: "#CDD3DD",
    ["--chart-2" as string]: "#8A94A6",
    ["--chart-3" as string]: "#EEF1F5",
    ["--chart-4" as string]: "#B3BCCB",
    ["--chart-5" as string]: "#F7F8FA",
  },
];

const CHART_VARIANTS: Record<
  string,
  {
    chartId: ChartId;
    label: string;
    description: string;
    bestFor: string;
    previewComponent: React.ComponentType<{ data: typeof PREVIEW_DATA }>;
  }[]
> = {
  linear: [
    { chartId: "AC-01", label: "Smooth Area", description: "Curved line with a soft fill beneath it.", bestFor: "Mood, energy, subjective scores", previewComponent: AC01AreaDefault },
    { chartId: "AC-02", label: "Gradient Area", description: "Two overlapping metrics with fading gradient fills.", bestFor: "Comparing this trial vs a baseline", previewComponent: AC02AreaGradient },
    { chartId: "AC-03", label: "Linear Area", description: "Straight-edge line segments with flat fill.", bestFor: "Data that changes abruptly day to day", previewComponent: AC03AreaLinear },
    { chartId: "LC-01", label: "Clean Line", description: "Minimal curved line, no fill. Clean and precise.", bestFor: "Users who prefer a clinical, data-forward look", previewComponent: LC01LineDefault },
    { chartId: "LC-02", label: "Line with Dots", description: "Line with a visible dot marker at each logged entry.", bestFor: "Seeing exactly where each data point lands", previewComponent: LC02LineDots },
    { chartId: "LC-04", label: "Sharp Line", description: "Perfectly straight segments between points.", bestFor: "Precise numeric data like temperature or dosage", previewComponent: LC04LineLinear },
  ],
  bar: [
    { chartId: "BC-01", label: "Standard Bars", description: "Clean vertical bars, one per day.", bestFor: "Any quantity tracked daily", previewComponent: BC01BarDefault },
    { chartId: "BC-02", label: "Labeled Bars", description: "Value floats above each bar for instant readout.", bestFor: "Users who want exact numbers always visible", previewComponent: BC02BarLabel },
    { chartId: "BC-03", label: "Active Bar", description: "Today's bar is highlighted with a dashed outline.", bestFor: "Making the current day immediately obvious", previewComponent: BC03BarActive },
    { chartId: "BC-04", label: "Horizontal Bars", description: "Bars run left to right. Days listed vertically.", bestFor: "Longer trial periods where vertical bars get too narrow", previewComponent: BC04BarHorizontal },
    { chartId: "BC-05", label: "Comparison Bars", description: "Side-by-side bars: this trial vs previous trial.", bestFor: "Repeat trials where improvement is the goal", previewComponent: BC05BarMultiple },
    { chartId: "BC-06", label: "Mixed Bars", description: "Each bar a different color. Horizontal layout.", bestFor: "Comparing performance across different days of the week", previewComponent: BC06BarMixed },
  ],
  multi: [
    { chartId: "LC-03", label: "Multiple Lines", description: "Two or three lines on one chart, one per metric.", bestFor: "Seeing how Energy, Focus, and Mood trend together", previewComponent: LC03LineMultiple },
    { chartId: "AC-06", label: "Stacked Area", description: "Layered fills with a shared legend.", bestFor: "Understanding how multiple metrics combine over time", previewComponent: AC06AreaLegend },
    { chartId: "RC-01", label: "Radar — Dots", description: "Polygon shape across multiple axes. Snapshot view.", bestFor: "Weekly snapshots comparing all metrics at once", previewComponent: RC01RadarDots },
    { chartId: "RC-02", label: "Radar — Comparison", description: "Two overlapping radar shapes. This week vs last week.", bestFor: "Seeing if all metrics improved week over week", previewComponent: RC02RadarMultiple },
  ],
  weekly: [
    { chartId: "AC-05", label: "Step Area", description: "Flat plateaus per week. Clean weekly blocks.", bestFor: "Showing stable weekly averages without daily noise", previewComponent: AC05AreaStep },
    { chartId: "BC-07", label: "Stacked Weekly", description: "Stacked bars comparing two metrics week by week.", bestFor: "Trials with two values that add up to a total", previewComponent: BC07BarStacked },
    { chartId: "BC-05", label: "Side-by-Side Weeks", description: "This week vs last week as grouped bars.", bestFor: "Seeing week-over-week improvement clearly", previewComponent: BC05BarMultiple },
    { chartId: "AC-04", label: "Stacked Area", description: "Two areas stacked. Shows cumulative weekly pattern.", bestFor: "Multi-metric weekly totals", previewComponent: AC04AreaStacked },
  ],
};

export function Step4Format({
  selectedCategory,
  selectedChartId,
  onSelectCategory,
  onSelectChartId,
  onAdvance,
}: {
  selectedCategory: Step4FormatCategory | "";
  selectedChartId: ChartId | null;
  onSelectCategory: (category: Step4FormatCategory, chartId: ChartId | null) => void;
  onSelectChartId: (chartId: ChartId) => void;
  onAdvance: () => void;
}) {
  const [subStep, setSubStep] = React.useState<"category" | "variant">("category");
  const [localCategory, setLocalCategory] = React.useState<Step4FormatCategory | "">(selectedCategory);

  React.useEffect(() => {
    setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  const selectedCategoryConfig = FORMAT_CATEGORIES.find((item) => item.id === localCategory);
  const variants = localCategory ? CHART_VARIANTS[localCategory] ?? [] : [];

  if (subStep === "variant" && selectedCategoryConfig) {
    return (
      <div className="space-y-5">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSubStep("category")}
            className="inline-flex items-center gap-1 text-[12px] text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <div>
            <p className="text-[18px] font-semibold tracking-tight text-[var(--text)]">
              Choose your {selectedCategoryConfig.label} style
            </p>
            <p className="mt-1 text-[13px] text-[var(--text-2)]">
              Pick the visual that matches how you think about your data.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {variants.map((variant) => {
            const PreviewComponent = variant.previewComponent;
            const isSelected = selectedChartId === variant.chartId;
            const previewStyle = PREVIEW_THEME_STYLES[(variants.findIndex((item) => item.chartId === variant.chartId)) % PREVIEW_THEME_STYLES.length];

            return (
              <button
                key={variant.chartId}
                type="button"
                onClick={() => onSelectChartId(variant.chartId)}
                className={`relative rounded-xl border bg-white p-4 text-left transition-all ${
                  isSelected ? "border-2 border-[var(--text)]" : "border-[var(--border)] hover:border-[var(--border-2)]"
                }`}
              >
                <div
                  className="h-[120px] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,248,252,0.98))] p-2 pointer-events-none"
                  style={previewStyle}
                >
                  <PreviewComponent data={PREVIEW_DATA} />
                </div>
                <p className="mt-3 text-[14px] font-semibold text-[var(--text)]">{variant.label}</p>
                <p className="mt-1 text-[12px] text-[var(--text-2)]">{variant.description}</p>
                <p className="mt-1 text-[11px] text-[color:rgba(111,109,104,0.72)]">Best for: {variant.bestFor}</p>
              </button>
            );
          })}
        </div>

        <Button
          type="button"
          disabled={!selectedChartId}
          onClick={onAdvance}
          className={`h-11 w-full px-4 disabled:bg-[var(--soft)] disabled:text-[var(--text-3)] ${traceButtonClass}`}
        >
          <span className={traceButtonContentClass}>
            Continue
            <ChevronRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {FORMAT_CATEGORIES.map((category) => {
        const selected = localCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              if (!category.hasVariants) {
                onSelectCategory(category.id, null);
                onAdvance();
                return;
              }

              setLocalCategory(category.id);
              onSelectCategory(category.id, category.defaultChartId);
              setSubStep("variant");
            }}
            className={`flex min-h-[220px] flex-col rounded-xl border p-4 text-left transition-all ${
              selected ? "border-2 border-[var(--text)] bg-[var(--soft)]/30" : "border-[var(--border)] hover:border-[var(--border-2)]"
            }`}
          >
            <category.icon className="h-5 w-5 text-[var(--chart-1)]" />
            <p className="mt-4 text-[15px] font-semibold text-[var(--text)]">{category.label}</p>
            <p className="mt-1 text-[13px] leading-6 text-[var(--text-2)]">{category.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {category.exampleStudies.map((study) => (
                <span key={study} className="rounded-full bg-[var(--soft)] px-2 py-0.5 text-[11px] text-[var(--text-2)]">
                  {study}
                </span>
              ))}
            </div>
            {category.hasVariants ? (
              <span className="mt-4 text-[11px] text-[var(--text-3)]">Choose style →</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
