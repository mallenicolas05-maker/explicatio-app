"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Score" },
} satisfies ChartConfig;

export function BC06BarMixed({ data }: { data: { day: string; value: number; fill: string }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 0 }}>
        <YAxis dataKey="day" type="category" tickLine={false} tickMargin={10} axisLine={false} />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
