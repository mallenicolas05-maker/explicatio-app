"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Week Score", color: "var(--chart-1)" },
  secondary: { label: "Previous Week", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function BC07BarStacked({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="value" stackId="a" fill="var(--color-value)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="secondary" stackId="a" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
