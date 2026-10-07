import React from "react";
import { Sparkles, AlertOctagon, TrendingDown, Building, Calendar, Scale } from "lucide-react";

interface ExecutiveSummaryProps {
  summary: string;
  parties: string[];
  governingLaw: string;
  effectiveDate: string;
  contractType?: string;
  keyConcerns?: string[];
  businessImpactSummary?: string;
  obligations?: Array<{ party: string; description: string; page_start?: number }>;
  importantTerms?: Array<{ term: string; value: string; page_start?: number }>;
  missingOrConcerning?: Array<{ title: string; description: string }>;
  onNavigatePage?: (pageNum: number) => void;
}

export function ExecutiveSummary({
  summary,
  parties,
  governingLaw,
  effectiveDate,
  contractType,
  keyConcerns,
  businessImpactSummary,
  obligations,
  importantTerms,
  missingOrConcerning,
  onNavigatePage,
}: ExecutiveSummaryProps) {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-[#070b14]/80 space-y-4 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            AI Executive Summary
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded">
          {contractType || "Legal Ops Brief"}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {summary}
      </p>

      {/* Key Concerns Bullet points */}
      {keyConcerns && keyConcerns.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            Key Strategic Concerns
          </span>
          <ul className="space-y-1.5 pl-1">
            {keyConcerns.map((concern, i) => (
              <li key={i} className="text-[11px] text-slate-300 leading-snug flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Business Impact Summary */}
      {businessImpactSummary && (
        <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs">
          <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            Commercial & Legal Impact
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {businessImpactSummary}
          </p>
        </div>
      )}

      {/* Contract metadata grid */}
      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[10px] flex items-center gap-1 block mb-0.5">
            <Building className="w-3 h-3 text-cyan-400" /> Parties
          </span>
          <span className="text-white font-medium truncate block">
            {parties && parties.length > 0 ? parties.join(" & ") : "Disclosing & Receiving Parties"}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 text-[10px] flex items-center gap-1 block mb-0.5">
            <Scale className="w-3 h-3 text-cyan-400" /> Jurisdiction
          </span>
          <span className="text-white font-medium truncate block">
            {governingLaw || "State of Delaware, USA"}
          </span>
        </div>
      </div>

      {/* Important Commercial Terms */}
      {importantTerms && importantTerms.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
          <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Important Commercial Terms
          </span>
          <div className="space-y-1">
            {importantTerms.map((term, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-1.5 rounded bg-slate-900/40 border border-slate-800/60 text-[11px]"
              >
                <span className="text-slate-400 font-medium">{term.term}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-mono">{term.value}</span>
                  {term.page_start && onNavigatePage && (
                    <button
                      onClick={() => onNavigatePage(term.page_start!)}
                      className="text-[10px] text-cyan-400 hover:underline px-1 py-0.2 bg-cyan-950/60 rounded border border-cyan-800/40 cursor-pointer"
                    >
                      p.{term.page_start}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Obligations */}
      {obligations && obligations.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
          <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Key Contractual Obligations
          </span>
          <div className="space-y-1.5">
            {obligations.map((ob, i) => (
              <div key={i} className="p-2 rounded bg-slate-900/50 border border-slate-800/80 text-[11px]">
                <div className="flex items-center justify-between text-indigo-300 font-semibold mb-0.5">
                  <span>{ob.party}</span>
                  {ob.page_start && onNavigatePage && (
                    <button
                      onClick={() => onNavigatePage(ob.page_start!)}
                      className="text-[10px] text-cyan-400 hover:underline font-mono cursor-pointer"
                    >
                      Page {ob.page_start}
                    </button>
                  )}
                </div>
                <p className="text-slate-300 leading-snug">{ob.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing or Concerning Provisions */}
      {missingOrConcerning && missingOrConcerning.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
          <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            Missing or Concerning Provisions
          </span>
          <div className="space-y-1.5">
            {missingOrConcerning.map((m, i) => (
              <div key={i} className="p-2 rounded bg-rose-950/20 border border-rose-500/30 text-[11px]">
                <div className="text-rose-300 font-semibold mb-0.5">{m.title}</div>
                <p className="text-slate-300 text-[10px] leading-snug">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
