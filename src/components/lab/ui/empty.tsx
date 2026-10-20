"use client";

import * as React from "react";

import { cn } from "@/lib/lab-utils";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn("flex w-full flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-white px-6 py-10 text-center", className)}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex flex-col items-center gap-3", className)} {...props} />;
}

function EmptyMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & { variant?: "icon" }) {
  return (
    <div
      data-slot="empty-media"
      className={cn(
        "flex items-center justify-center rounded-full border border-[var(--border)] bg-[linear-gradient(135deg,rgba(143,189,245,0.08),rgba(182,160,255,0.08),rgba(255,255,255,0.98))]",
        variant === "icon" ? "h-12 w-12" : "",
        className,
      )}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="empty-title" className={cn("text-[18px] font-semibold tracking-tight text-[var(--text)]", className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="empty-description" className={cn("max-w-md text-sm leading-7 text-[var(--text-2)]", className)} {...props} />;
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("mt-5 flex items-center justify-center", className)} {...props} />;
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
