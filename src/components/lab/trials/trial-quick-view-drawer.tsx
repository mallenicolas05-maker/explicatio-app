"use client";

import { useMemo } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/lab/ui/badge";
import { Button } from "@/components/lab/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/lab/ui/drawer";
import { Progress } from "@/components/lab/ui/progress";

type TrialQuickView = {
  title: string;
  study: string;
  status: string;
  category: string;
  categoryColor: string;
  completion: number;
  notes: string;
};

export function TrialQuickViewDrawer({
  trial,
  children,
  onOpenTrial,
}: {
  trial: TrialQuickView;
  children: React.ReactNode;
  onOpenTrial: () => void;
}) {
  const summary = useMemo(() => {
    if (trial.notes.length <= 140) return trial.notes;
    return `${trial.notes.slice(0, 137)}...`;
  }, [trial.notes]);

  return (
    <Drawer direction="right" shouldScaleBackground={false}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="w-full max-w-[420px] border-l border-[var(--border)] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
        <DrawerHeader className="gap-2 border-b border-[var(--border)] px-5 py-5">
          <DrawerTitle className="text-[22px] font-semibold tracking-[-0.03em] text-[var(--text)]">
            {trial.title}
          </DrawerTitle>
          <DrawerDescription className="text-sm leading-7 text-[var(--text-2)]">
            A quick view of this trial without leaving the table.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-5 px-5 py-5 text-sm">
          <QuickViewItem label="Study" value={trial.study} />
          <div className="grid gap-4 sm:grid-cols-2">
            <QuickViewItem label="Status" value={trial.status} />
            <div className="grid gap-2">
              <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                Category
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: trial.categoryColor }} />
                <span className="text-[var(--text)]">{trial.category}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              Progress
            </span>
            <div className="flex items-center gap-3">
              <Progress value={trial.completion} className="flex-1 gap-0" />
              <span className="text-[12px] text-[var(--text-2)]">{trial.completion}%</span>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#1b1b1b] via-[#212121] to-[#2c2c2c] p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-white/60">Insights</p>
              <Sparkles className="h-4 w-4 text-white/60" />
            </div>
            <p className="mt-3 text-[13px] leading-6 text-white/92">{summary}</p>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Button
              className="h-10 rounded-lg border border-[var(--text)] bg-white text-[12px] uppercase tracking-[0.12em] text-[var(--text)] hover:bg-[var(--soft)]"
              onClick={onOpenTrial}
            >
              <ArrowUpRight className="mr-1 h-4 w-4" />
              Open Test
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="h-10 rounded-lg border-[var(--border)] bg-white text-[12px] uppercase tracking-[0.12em] text-[var(--text-2)]"
              >
                Back
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function QuickViewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2">
      <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
        {label}
      </span>
      {label === "Status" ? (
        <Badge variant="secondary" className="w-fit border-0 bg-[var(--soft)] text-[12px] text-[var(--text)]">
          {value}
        </Badge>
      ) : (
        <span className="text-[var(--text)]">{value}</span>
      )}
    </div>
  );
}
