"use client";

import * as React from "react";
import { Legend, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts";
import { type NameType, type ValueType } from "recharts/types/component/DefaultTooltipContent";

import { cn } from "@/lib/lab-utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

const ChartContext = React.createContext<ChartConfig>({});

export function ChartContainer({
  config,
  className,
  children,
}: React.PropsWithChildren<{ config: ChartConfig; className?: string }>) {
  const style = Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value.color) {
      acc[`--color-${key}`] = value.color;
    }
    return acc;
  }, {});

  return (
    <ChartContext.Provider value={config}>
      <div className={cn("h-full w-full text-xs", className)} style={style as React.CSSProperties}>
        <ResponsiveContainer width="100%" height="100%">
          {React.isValidElement(children) ? children : <>{children}</>}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  return <Tooltip {...props} />;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
}: {
  active?: boolean;
  payload?: Array<{
    color?: string;
    dataKey?: string | number;
    name?: string | number;
    value?: string | number | null;
  }>;
  label?: string | number;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
}) {
  const config = React.useContext(ChartContext);

  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 shadow-sm">
      {!hideLabel && label ? <p className="mb-1 text-[11px] text-[var(--text-3)]">{String(label)}</p> : null}
      <div className="space-y-1">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? "");
          const labelText = config[key]?.label ?? String(item.name ?? key);
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color ?? config[key]?.color ?? "currentColor" }}
                />
                <span className="text-[11px] text-[var(--text-2)]">{labelText}</span>
              </div>
              <span className="text-[11px] font-medium text-[var(--text)]">{String(item.value ?? "")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChartLegend({
  content,
}: {
  content: React.ReactElement;
}) {
  return <Legend content={() => content} />;
}

export function ChartLegendContent() {
  const config = React.useContext(ChartContext);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {Object.entries(config).map(([key, item]) => (
        <div key={key} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color ?? "currentColor" }} />
          <span className="text-[11px] text-[var(--text-2)]">{item.label ?? key}</span>
        </div>
      ))}
    </div>
  );
}
