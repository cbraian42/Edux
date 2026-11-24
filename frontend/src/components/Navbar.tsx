"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Users,
  PenSquare,
  Sparkles,
  Bot,
  Menu,
  X,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockTeacher } from "@/lib/mock-data";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Layers },
    { name: "Cursos", href: "/courses", icon: BookOpen },
    { name: "Alumnos", href: "/students", icon: Users },
    { name: "Nueva Bitácora", href: "/meetings/new", icon: PenSquare, highlight: true },
    { name: "Análisis IA", href: "/analysis", icon: Sparkles },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-emerald-500 shadow-sm shadow-sky-500/20 group-hover:shadow-md group-hover:shadow-sky-500/30 transition-all">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Edu<span className="text-sky-600">X</span>
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                  Robótica & IA
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                Copiloto pedagógico docente
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all",
                    active
                      ? "bg-sky-50 text-sky-800 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70",
                    item.highlight && !active && "text-blue-700 font-semibold hover:bg-blue-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active
                        ? "text-sky-600"
                        : item.highlight
                        ? "text-blue-600"
                        : "text-slate-500"
                    )}
                  />
                  <span>{item.name}</span>
                  {item.highlight && !active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Pill / Teacher Context */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-1.5">
            <div className="relative">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 border border-blue-200">
                MM
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-medium text-slate-900 leading-tight">
                {mockTeacher.name}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                Docente
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg",
                  active
                    ? "bg-sky-50 text-sky-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-sky-600" : "text-slate-500"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3 px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
              MM
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">{mockTeacher.name}</p>
              <p className="text-[10px] text-slate-500">{mockTeacher.email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
