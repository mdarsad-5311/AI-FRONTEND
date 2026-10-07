import React from "react";
import { ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2, Zap, Lightbulb } from "lucide-react";
import { DocumentRisk, RiskLevel } from "@/types/document";

interface RiskFindingProps {
  risk: DocumentRisk;
  isSelected: boolean;
  onSelect: () => void;
}

export function RiskFinding({ risk, isSelected, onSelect }: RiskFindingProps) {
  const getBadge = (severity: RiskLevel) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-rose-950/80 text-rose-300 border-rose-500/50";
      case "HIGH":
        return "bg-orange-950/80 text-orange-300 border-orange-500/50";
      case "MEDIUM":
        return "bg-yellow-950/80 text-yellow-300 border-yellow-500/50";
      default:
        return "bg-emerald-950/80 text-emerald-300 border-emerald-500/50";
    }
  };

  const confidence = risk.confidence || 94;

  return (
    <div
      onClick={onSelect}
      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
        isSelected
          ? "bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-950/40"
          : "bg-[#070b14]/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${getBadge(risk.severity)}`}>
            {risk.severity}
          </span>
          <span className="text-[10px] text-cyan-300/80 font-mono">
            {confidence}% AI Confidence
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
          {risk.pageNumber && (
            <span className="text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              Page {risk.pageNumber}
            </span>
          )}
          {risk.clauseRef && (
            <span className="text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
              {risk.clauseRef}
            </span>
          )}
        </div>
      </div>

      <h4 className="font-semibold text-white mb-1.5 text-[13px] leading-snug">
        {risk.title}
      </h4>

      <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5 font-sans">
        {risk.description}
      </p>

      {/* Business Impact badge */}
      {risk.businessImpact && (
        <div className="mb-2 px-2.5 py-1.5 rounded-md bg-rose-950/25 border border-rose-500/30 text-[11px] text-slate-300">
          <span className="text-rose-300 font-semibold flex items-center gap-1 mb-0.5 text-[10.5px]">
            <Zap className="w-3 h-3 text-rose-400" /> Business Impact:
          </span>
          <p className="text-slate-300 text-[11px] leading-snug">{risk.businessImpact}</p>
        </div>
      )}

      {/* Recommended Action */}
      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px]">
        <span className="text-cyan-400 font-semibold flex items-center gap-1 mb-0.5 text-[10.5px]">
          <Lightbulb className="w-3 h-3 text-cyan-400" /> Recommended Action:
        </span>
        <p className="text-slate-300 leading-snug">{risk.mitigation}</p>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
        <span>Click to scroll & focus in document viewer</span>
        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
      </div>
    </div>
  );
}
