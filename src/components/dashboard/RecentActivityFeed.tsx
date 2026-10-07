"use client";

import React from "react";
import Link from "next/link";
import {
  FileUp,
  CheckCircle2,
  ShieldAlert,
  Clock,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { ActivityItem } from "@/types/document";

interface RecentActivityFeedProps {
  activities: ActivityItem[];
  loading?: boolean;
}

export function RecentActivityFeed({ activities, loading = false }: RecentActivityFeedProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "risk_flagged":
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case "analysis_completed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "upload":
        return <FileUp className="w-4 h-4 text-cyan-400" />;
      default:
        return <FileCheck className="w-4 h-4 text-slate-400" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case "risk_flagged":
        return "bg-rose-950/40 border-rose-500/30";
      case "analysis_completed":
        return "bg-emerald-950/40 border-emerald-500/30";
      case "upload":
        return "bg-cyan-950/40 border-cyan-500/30";
      default:
        return "bg-slate-800 border-slate-700/60";
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#070b14]/70 p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Live Activity Stream</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                Demo Feed
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Chronological contract audits & risk updates</p>
          </div>
          <Clock className="w-4 h-4 text-slate-500" />
        </div>

        <div className="mt-4 space-y-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-slate-800 shrink-0"></div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-32 bg-slate-800 rounded"></div>
                  <div className="h-2.5 w-48 bg-slate-800/60 rounded"></div>
                </div>
              </div>
            ))
          ) : activities.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No recent activity recorded yet.
            </div>
          ) : (
            activities.slice(0, 5).map((act) => (
              <div key={act.id} className="group flex items-start gap-3 text-xs">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${getEventBg(
                    act.type
                  )}`}
                >
                  {getEventIcon(act.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
                      {act.documentTitle}
                    </p>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                      {act.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {act.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 mt-4">
        <Link
          href="/analysis"
          className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
        >
          View Full Audit History <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
