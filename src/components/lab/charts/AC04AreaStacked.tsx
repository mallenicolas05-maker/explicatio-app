"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Primary", color: "var(--chart-1)" },
  secondary: { label: "Secondary", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function AC04AreaStacked({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area dataKey="secondary" type="natural" fill="var(--color-secondary)" fillOpacity={0.4} stroke="var(--color-secondary)" stackId="a" />
        <Area dataKey="value" type="natural" fill="var(--color-value)" fillOpacity={0.4} stroke="var(--color-value)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  );
}
