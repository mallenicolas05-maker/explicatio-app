"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/lab/ui/badge";
import { Button } from "@/components/lab/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/lab/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/lab/ui/dropdown-menu";
import { Input } from "@/components/lab/ui/input";
import { TableCell, TableRow } from "@/components/lab/ui/table";
import { Textarea } from "@/components/lab/ui/textarea";

type EntryRow = {
  id: string;
  periodLabel: string;
  index: number;
  value: number;
  delta: number;
  note: string;
  status: string;
};

type TrialMeta = {
  title: string;
  unit: string;
  category: string;
  categoryColor: string;
};

export function EntryEditDrawer({
  entry,
  trial,
  onSave,
}: {
  entry: EntryRow;
  trial: TrialMeta;
  onSave: (value: number, note: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(entry.value));
  const [note, setNote] = useState(entry.note);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <TableRow
        className="cursor-pointer hover:bg-[var(--soft)]/60"
        onClick={() => {
          setValue(String(entry.value));
          setNote(entry.note);
          setOpen(true);
        }}
      >
        <TableCell className="py-3 text-[13px] text-[var(--text)]">{entry.periodLabel} {entry.index}</TableCell>
        <TableCell className="py-3 text-[13px] font-medium text-[var(--text)]">{entry.value} {trial.unit}</TableCell>
        <TableCell className="py-3">
          <Badge
            variant="secondary"
            className={`border-0 text-[10px] ${
              entry.delta > 0
                ? "bg-[var(--green-bg)] text-[var(--green)]"
                : entry.delta < 0
                  ? "bg-[var(--red-soft)] text-[var(--accent)]"
                  : "bg-[var(--soft)] text-[var(--text-2)]"
            }`}
          >
            {entry.delta > 0 ? "+" : ""}
            {entry.delta} {trial.unit}
          </Badge>
        </TableCell>
        <TableCell className="py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: trial.categoryColor }} />
            <span className="text-[12px] text-[var(--text-2)]">{trial.category}</span>
          </div>
        </TableCell>
        <TableCell className="py-3">
          <Badge variant="secondary" className="border-0 bg-[var(--green-bg)] text-[10px] text-[var(--green)]">
            {entry.status}
          </Badge>
        </TableCell>
        <TableCell className="py-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-[var(--text-3)] hover:bg-[var(--soft)] hover:text-[var(--text)]"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
                />
              }
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setValue(String(entry.value));
                  setNote(entry.note);
                  setOpen(true);
                }}
              >
                Edit Entry
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <DrawerContent className="w-full max-w-[420px] border-l border-[var(--border)] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
        <DrawerHeader className="gap-2 border-b border-[var(--border)] px-5 py-5">
          <DrawerTitle className="text-[22px] font-semibold tracking-[-0.03em] text-[var(--text)]">
            Edit Entry
          </DrawerTitle>
          <DrawerDescription className="text-sm leading-7 text-[var(--text-2)]">
            Update {entry.periodLabel} {entry.index} for {trial.title}
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 px-5 py-5">
          <div className="grid gap-2">
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              Value
            </span>
            <Input value={value} onChange={(event) => setValue(event.target.value)} className="h-11 rounded-lg border-[var(--border)]" />
          </div>
          <div className="grid gap-2">
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              Entry Note
            </span>
            <Textarea value={note} onChange={(event) => setNote(event.target.value)} className="min-h-[120px] rounded-lg border-[var(--border)]" />
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Button
              className="h-10 rounded-lg border border-[var(--text)] bg-white text-[12px] uppercase tracking-[0.12em] text-[var(--text)] hover:bg-[var(--soft)]"
              onClick={() => {
                onSave(Number(value), note);
                setOpen(false);
              }}
            >
              Save
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="h-10 rounded-lg border-[var(--border)] bg-white text-[12px] uppercase tracking-[0.12em] text-[var(--text-2)]"
              >
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
