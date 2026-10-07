import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { RiskLevel, RiskFindingsBreakdown } from "@/types/document";

interface RiskScoreProps {
  score: number;
  level: RiskLevel;
  findingsBreakdown?: RiskFindingsBreakdown;
  status?: string;
  analyzedAt?: string;
}

export function RiskScore({
  score,
  level,
  findingsBreakdown,
  status = "ready",
  analyzedAt,
}: RiskScoreProps) {
  const getBadgeStyle = () => {
    switch (level) {
      case "CRITICAL":
      case "HIGH":
        return "bg-rose-950/80 text-rose-300 border-rose-500/40";
      case "MEDIUM":
        return "bg-amber-950/80 text-amber-300 border-amber-500/40";
      case "LOW":
      default:
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";
    }
  };

  const getBarColor = () => {
    if (score >= 70) return "bg-rose-500";
    if (score >= 45) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const total = findingsBreakdown?.total || 0;

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-[#070b14]/80 shadow-md backdrop-blur-sm space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
            AI Contract Analysis
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {analyzedAt ? `Audited on ${new Date(analyzedAt).toLocaleDateString()}` : "Continuous Telemetry"}
          </span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase font-mono ${getBadgeStyle()}`}>
          {level} RISK
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
          {score}<span className="text-xs font-normal text-slate-400 ml-1">/ 100</span>
        </div>
        <span className="text-xs font-medium text-slate-300">
          {score >= 70
            ? "High Exposure • Action Required"
            : score >= 45
            ? "Moderate Risk • Review Recommended"
            : "Low Risk • Clean Terms"}
        </span>
      </div>

      {/* Visual meter bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>

      {/* Findings Breakdown tally counters */}
      {findingsBreakdown && (
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">
              {total} Total Findings
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Empirical Vector
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
            <div className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
              <span className="block font-bold text-xs">{findingsBreakdown.critical}</span>
              <span className="text-[9px] uppercase text-rose-400">Critical</span>
            </div>
            <div className="p-1.5 rounded bg-orange-950/40 border border-orange-500/30 text-orange-300">
              <span className="block font-bold text-xs">{findingsBreakdown.high}</span>
              <span className="text-[9px] uppercase text-orange-400">High</span>
            </div>
            <div className="p-1.5 rounded bg-yellow-950/40 border border-yellow-500/30 text-yellow-300">
              <span className="block font-bold text-xs">{findingsBreakdown.medium}</span>
              <span className="text-[9px] uppercase text-yellow-400">Medium</span>
            </div>
            <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span className="block font-bold text-xs">{findingsBreakdown.low}</span>
              <span className="text-[9px] uppercase text-emerald-400">Low</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
