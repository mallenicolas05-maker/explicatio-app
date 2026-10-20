"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Metric 1", color: "var(--chart-1)" },
  secondary: { label: "Metric 2", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function LC03LineMultiple({ data }: { data: { day: string; value: number; secondary?: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
        <Line dataKey="secondary" type="monotone" stroke="var(--color-secondary)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
