"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Primary", color: "var(--chart-1)" },
  secondary: { label: "Secondary", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function AC02AreaGradient({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillSecondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area dataKey="secondary" type="natural" fill="url(#fillSecondary)" fillOpacity={0.4} stroke="var(--color-secondary)" stackId="a" />
        <Area dataKey="value" type="natural" fill="url(#fillValue)" fillOpacity={0.4} stroke="var(--color-value)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
}
