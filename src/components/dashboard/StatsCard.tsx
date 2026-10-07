import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: "neutral" | "warning" | "danger" | "success" | "cyan";
  };
}

export function StatsCard({ title, value, subtitle, icon: Icon, badge }: StatsCardProps) {
  const badgeColors = {
    neutral: "bg-slate-800 text-slate-300 border border-slate-700/60",
    warning: "bg-amber-950/40 text-amber-300 border border-amber-500/30",
    danger: "bg-rose-950/40 text-rose-300 border border-rose-500/30",
    success: "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30",
    cyan: "bg-cyan-950/40 text-cyan-300 border border-cyan-500/30",
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#070b14]/80 border border-slate-800/90 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700/80 hover:bg-[#070b14] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-cyan-400 border border-slate-700/50">
            <Icon className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {value}
          </div>
          {badge && (
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium shrink-0 ${badgeColors[badge.variant]}`}>
              {badge.text}
            </span>
          )}
        </div>
      </div>

      {subtitle && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
          {subtitle}
        </div>
      )}
    </div>
  );
}
