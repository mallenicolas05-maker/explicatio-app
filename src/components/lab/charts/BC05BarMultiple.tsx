"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "This Trial", color: "var(--chart-1)" },
  secondary: { label: "Previous Trial", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function BC05BarMultiple({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
        <Bar dataKey="secondary" fill="var(--color-secondary)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
