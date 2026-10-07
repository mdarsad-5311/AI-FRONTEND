import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle2, Bookmark, Lightbulb, Zap, ArrowRight, FileEdit, Sparkles } from "lucide-react";
import { Clause, RiskLevel } from "@/types/document";

interface ClauseAnalysisProps {
  clause: Clause;
  onScrollToClause?: () => void;
}

export function ClauseAnalysis({ clause, onScrollToClause }: ClauseAnalysisProps) {
  const getSeverityBadge = (level: RiskLevel) => {
    switch (level) {
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

  const confidence = clause.confidence || 94;

  return (
    <div className="rounded-xl border border-cyan-500/40 bg-[#070b14]/90 p-4 space-y-4 shadow-xl shadow-cyan-950/30 animate-in fade-in duration-150 backdrop-blur-sm">
      {/* 1. Header with Severity and AI Confidence */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <Bookmark className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
            Clause AI Assessment
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            {confidence}% Confidence
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase font-mono ${getSeverityBadge(clause.riskLevel)}`}>
            {clause.riskLevel}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white leading-snug">
          {clause.title}
        </h4>
        <span className="text-[11px] font-mono text-slate-400">
          Document Page {clause.pageNumber} • Category: {clause.category}
        </span>
      </div>

      {/* 2. Original Source Clause Snippet */}
      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-200 font-serif leading-relaxed border-l-2 border-l-cyan-400">
        <span className="text-[10px] font-sans font-bold text-slate-400 block mb-1 uppercase tracking-wider">
          Contract Language:
        </span>
        &quot;{clause.snippet}&quot;
      </div>

      {/* 3. AI Explanation: Why it is risky */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          AI Risk Assessment & Rationale
        </span>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {clause.explanation}
        </p>
      </div>

      {/* 4. Business Impact */}
      {clause.businessImpact && (
        <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs">
          <span className="font-bold text-rose-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <Zap className="w-3.5 h-3.5 text-rose-400" />
            Commercial & Legal Impact
          </span>
          <p className="text-slate-300 text-[11.5px] leading-relaxed">
            {clause.businessImpact}
          </p>
        </div>
      )}

      {/* 5. Recommended Legal Action */}
      {clause.recommendedAction && (
        <div className="p-3 rounded-lg bg-cyan-950/25 border border-cyan-500/30 text-xs">
          <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
            Recommended Legal Action
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {clause.recommendedAction}
          </p>
        </div>
      )}

      {/* 6. Suggested Redline (Contract modification) */}
      {clause.suggestedRedline && (
        <div className="p-3 rounded-lg bg-emerald-950/25 border border-emerald-500/35 text-xs">
          <span className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <FileEdit className="w-3.5 h-3.5 text-emerald-400" />
            Suggested Contract Redline
          </span>
          <p className="text-emerald-100 font-mono text-[11px] leading-relaxed bg-[#070b14] p-2 rounded border border-emerald-500/20">
            {clause.suggestedRedline}
          </p>
        </div>
      )}

      {onScrollToClause && (
        <button
          onClick={onScrollToClause}
          className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Focus Clause in PDF Viewer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
