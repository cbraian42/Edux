import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "celeste" | "green" | "gray" | "slate";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "celeste",
  size = "md",
  className,
}: BadgeProps) {
  const variantStyles = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    celeste: "bg-sky-50 text-sky-700 border-sky-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gray: "bg-slate-100 text-slate-700 border-slate-200",
    slate: "bg-slate-50 text-slate-600 border-slate-200",
  }[variant];

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 font-medium rounded-full",
    md: "text-xs px-2.5 py-1 font-medium rounded-md",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border transition-colors",
        variantStyles,
        sizeStyles,
        className
      )}
    >
      {children}
    </span>
  );
}
