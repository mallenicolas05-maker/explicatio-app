"use client";

import { TrialQuickViewDrawer } from "@/components/lab/trials/trial-quick-view-drawer";

type TrialNameCellTrial = {
  title: string;
  study: string;
  status: string;
  category: string;
  categoryColor: string;
  completion: number;
  notes: string;
};

export function TrialNameCell({
  trial,
  onOpenTrial,
}: {
  trial: TrialNameCellTrial;
  onOpenTrial: () => void;
}) {
  return (
    <TrialQuickViewDrawer trial={trial} onOpenTrial={onOpenTrial}>
      <button className="relative text-left text-[13px] font-medium text-[var(--text)] transition-colors hover:text-[var(--text)]">
        <span className="bg-linear-to-r from-[var(--text)] to-[var(--text)] bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 hover:bg-[length:100%_1px]">
          {trial.title}
        </span>
      </button>
    </TrialQuickViewDrawer>
  );
}
