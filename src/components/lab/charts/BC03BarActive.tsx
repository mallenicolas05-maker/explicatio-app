"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import type { BarShapeProps } from "recharts/types/cartesian/Bar";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/lab/ui/chart";

const chartConfig = {
  value: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function BC03BarActive({
  data,
  activeIndex = 0,
}: {
  data: { day: string; value: number; fill?: string }[];
  activeIndex?: number;
}) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar
          dataKey="value"
          strokeWidth={2}
          radius={8}
          shape={({ index, ...props }: BarShapeProps) =>
            index === activeIndex ? (
              <Rectangle {...props} fillOpacity={0.8} stroke={props.payload?.fill ?? "var(--chart-1)"} strokeDasharray={4} strokeDashoffset={4} />
            ) : (
              <Rectangle {...props} />
            )
          }
        />
      </BarChart>
    </ChartContainer>
  );
}
