"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BC04BarHorizontal({ data }: { data: { day: string; value: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data} layout="vertical" margin={{ left: -20 }}>
        <XAxis type="number" dataKey="value" hide />
        <YAxis dataKey="day" type="category" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
