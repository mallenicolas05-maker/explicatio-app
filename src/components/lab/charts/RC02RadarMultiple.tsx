"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Metric 1", color: "var(--chart-1)" },
  secondary: { label: "Metric 2", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function RC02RadarMultiple({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <PolarAngleAxis dataKey="day" />
        <PolarGrid />
        <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.6} />
        <Radar dataKey="secondary" fill="var(--color-secondary)" />
      </RadarChart>
    </ChartContainer>
  );
}
