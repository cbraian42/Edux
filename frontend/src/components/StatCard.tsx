import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "blue" | "celeste" | "green" | "slate";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "blue",
}: StatCardProps) {
  const iconBackgrounds = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    celeste: "bg-sky-50 text-sky-700 border-sky-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  }[variant];

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border",
            iconBackgrounds
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
      </div>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
