import React from "react";
import Link from "next/link";
import { UploadCloud, FolderOpen, History, Settings, ArrowRight } from "lucide-react";

interface QuickActionsProps {
  onOpenUpload: () => void;
}

export function QuickActions({ onOpenUpload }: QuickActionsProps) {
  const actions = [
    {
      label: "Upload Document",
      description: "Analyze new PDF or DOCX agreement",
      icon: UploadCloud,
      onClick: onOpenUpload,
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30 hover:border-cyan-400",
      isButton: true,
    },
    {
      label: "Browse Documents",
      description: "Filter agreements by risk & type",
      icon: FolderOpen,
      href: "/documents",
      accent: "text-slate-300 border-slate-800 bg-slate-900/60 hover:border-slate-700",
      isButton: false,
    },
    {
      label: "View Analysis History",
      description: "Inspect chronological audit trail",
      icon: History,
      href: "/analysis",
      accent: "text-slate-300 border-slate-800 bg-slate-900/60 hover:border-slate-700",
      isButton: false,
    },
    {
      label: "Configure Settings",
      description: "Tweak LLM models & risk thresholds",
      icon: Settings,
      href: "/settings",
      accent: "text-slate-300 border-slate-800 bg-slate-900/60 hover:border-slate-700",
      isButton: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((act) => {
        const Icon = act.icon;
        if (act.isButton) {
          return (
            <button
              key={act.label}
              onClick={act.onClick}
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all group ${act.accent} hover:shadow-md cursor-pointer`}
            >
              <div className="h-9 w-9 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {act.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {act.description}
                </p>
              </div>
            </button>
          );
        }

        return (
          <Link
            key={act.label}
            href={act.href!}
            className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all group ${act.accent} hover:shadow-md`}
          >
            <div className="h-9 w-9 rounded-lg bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Icon className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {act.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {act.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
