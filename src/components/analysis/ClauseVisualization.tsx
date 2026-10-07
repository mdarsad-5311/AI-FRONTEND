"use client";

import React, { useMemo, useState } from "react";
import {
  Bookmark,
  Layers,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Clause, RiskLevel } from "@/types/document";

interface ClauseVisualizationProps {
  clauses: Clause[];
  selectedClauseId: string | null;
  onSelectClause: (clauseId: string, pageNumber: number) => void;
  onNavigatePage?: (pageNum: number) => void;
}

export function ClauseVisualization({
  clauses,
  selectedClauseId,
  onSelectClause,
  onNavigatePage,
}: ClauseVisualizationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<"ALL" | RiskLevel>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClauseIds, setExpandedClauseIds] = useState<Set<string>>(new Set());

  // Aggregate category stats
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    clauses.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [clauses]);

  // Aggregate risk levels
  const riskStats = useMemo(() => {
    const counts = {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    };
    clauses.forEach((c) => {
      if (c.riskLevel in counts) {
        counts[c.riskLevel as keyof typeof counts]++;
      }
    });
    return counts;
  }, [clauses]);

  // Filtered clause set
  const filteredClauses = useMemo(() => {
    return clauses.filter((c) => {
      const matchesCategory =
        selectedCategory === "ALL" || c.category === selectedCategory;
      const matchesRisk =
        selectedRiskLevel === "ALL" || c.riskLevel === selectedRiskLevel;
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.sectionNumber && c.sectionNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesRisk && matchesSearch;
    });
  }, [clauses, selectedCategory, selectedRiskLevel, searchQuery]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedClauseIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getRiskBadge = (level: RiskLevel) => {
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

  return (
    <div className="space-y-4">
      {/* 1. Category Summary Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Clause Categories ({Object.keys(categoryStats).length})
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {clauses.length} Indexed
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            All Categories ({clauses.length})
          </button>
          {Object.entries(categoryStats).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? "ALL" : cat)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Clause Risk-Level Distribution Progress Bar */}
      {clauses.length > 0 && (
        <div className="p-3 rounded-xl border border-slate-800 bg-[#070b14]/90 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-medium">Clause Risk Assessment Breakdown</span>
            <span className="text-[10px] font-mono text-cyan-400">
              {riskStats.CRITICAL + riskStats.HIGH} High-Priority
            </span>
          </div>

          <div
            className="w-full h-2.5 rounded-full overflow-hidden bg-slate-800 flex"
            role="progressbar"
            aria-label="Clause risk distribution"
            aria-valuemin={0}
            aria-valuemax={clauses.length}
            aria-valuenow={clauses.length}
          >
            {riskStats.CRITICAL > 0 && (
              <div
                style={{ width: `${(riskStats.CRITICAL / clauses.length) * 100}%` }}
                className="bg-rose-500 h-full"
                title={`Critical: ${riskStats.CRITICAL}`}
              />
            )}
            {riskStats.HIGH > 0 && (
              <div
                style={{ width: `${(riskStats.HIGH / clauses.length) * 100}%` }}
                className="bg-orange-500 h-full"
                title={`High: ${riskStats.HIGH}`}
              />
            )}
            {riskStats.MEDIUM > 0 && (
              <div
                style={{ width: `${(riskStats.MEDIUM / clauses.length) * 100}%` }}
                className="bg-yellow-500 h-full"
                title={`Medium: ${riskStats.MEDIUM}`}
              />
            )}
            {riskStats.LOW > 0 && (
              <div
                style={{ width: `${(riskStats.LOW / clauses.length) * 100}%` }}
                className="bg-emerald-500 h-full"
                title={`Low: ${riskStats.LOW}`}
              />
            )}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <button
              onClick={() => setSelectedRiskLevel(selectedRiskLevel === "CRITICAL" ? "ALL" : "CRITICAL")}
              className={`hover:text-rose-300 cursor-pointer ${selectedRiskLevel === "CRITICAL" ? "text-rose-400 font-bold" : ""}`}
            >
              Crit: {riskStats.CRITICAL}
            </button>
            <button
              onClick={() => setSelectedRiskLevel(selectedRiskLevel === "HIGH" ? "ALL" : "HIGH")}
              className={`hover:text-orange-300 cursor-pointer ${selectedRiskLevel === "HIGH" ? "text-orange-400 font-bold" : ""}`}
            >
              High: {riskStats.HIGH}
            </button>
            <button
              onClick={() => setSelectedRiskLevel(selectedRiskLevel === "MEDIUM" ? "ALL" : "MEDIUM")}
              className={`hover:text-yellow-300 cursor-pointer ${selectedRiskLevel === "MEDIUM" ? "text-yellow-400 font-bold" : ""}`}
            >
              Med: {riskStats.MEDIUM}
            </button>
            <button
              onClick={() => setSelectedRiskLevel(selectedRiskLevel === "LOW" ? "ALL" : "LOW")}
              className={`hover:text-emerald-300 cursor-pointer ${selectedRiskLevel === "LOW" ? "text-emerald-400 font-bold" : ""}`}
            >
              Low: {riskStats.LOW}
            </button>
          </div>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter clauses by title, text or section..."
          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* 4. Clause List & Expandable Details */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
          <span>
            Contract Clauses ({filteredClauses.length} of {clauses.length})
          </span>
          <span className="font-mono text-cyan-400">Click to Select</span>
        </div>

        {filteredClauses.length > 0 ? (
          filteredClauses.map((clause) => {
            const isSelected = selectedClauseId === clause.id;
            const isExpanded = expandedClauseIds.has(clause.id);

            return (
              <div
                key={clause.id}
                onClick={() => {
                  onSelectClause(clause.id, clause.pageNumber);
                  if (onNavigatePage) {
                    onNavigatePage(clause.pageNumber);
                  }
                }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md shadow-cyan-950/40"
                    : "bg-[#070b14]/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase font-mono ${getRiskBadge(
                        clause.riskLevel
                      )}`}
                    >
                      {clause.riskLevel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {clause.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 font-mono text-[10px]">
                    <span className="text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      Page {clause.pageNumber}
                    </span>
                    <button
                      onClick={(e) => toggleExpand(clause.id, e)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title={isExpanded ? "Collapse details" : "Expand details"}
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-white text-[12.5px] leading-snug mb-1">
                  {clause.title}
                </h4>

                <p className="text-[11px] text-slate-300 font-serif line-clamp-2 italic leading-relaxed mb-1">
                  &quot;{clause.snippet}&quot;
                </p>

                {/* Expandable Details Area */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-2 animate-in fade-in duration-150">
                    {clause.explanation && (
                      <div className="text-[11px] text-slate-300">
                        <span className="font-bold text-amber-300 flex items-center gap-1 mb-0.5">
                          <AlertTriangle className="w-3 h-3 text-amber-400" /> Risk Rationale:
                        </span>
                        <p className="leading-relaxed">{clause.explanation}</p>
                      </div>
                    )}

                    {clause.businessImpact && (
                      <div className="p-2 rounded bg-rose-950/20 border border-rose-950/60 text-[11px] text-slate-300">
                        <span className="font-bold text-rose-300 flex items-center gap-1 mb-0.5">
                          <Zap className="w-3 h-3 text-rose-400" /> Commercial Impact:
                        </span>
                        <p className="leading-snug">{clause.businessImpact}</p>
                      </div>
                    )}

                    {clause.recommendedAction && (
                      <div className="p-2 rounded bg-cyan-950/25 border border-cyan-800/40 text-[11px] text-slate-300">
                        <span className="font-bold text-cyan-300 flex items-center gap-1 mb-0.5">
                          <Lightbulb className="w-3 h-3 text-cyan-400" /> Recommended Action:
                        </span>
                        <p className="leading-snug">{clause.recommendedAction}</p>
                      </div>
                    )}

                    {clause.suggestedRedline && (
                      <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/50 text-[11px] text-slate-200 font-mono">
                        <span className="font-sans font-bold text-emerald-300 block mb-0.5">
                          Suggested Redline:
                        </span>
                        <p className="text-[10px] leading-snug">{clause.suggestedRedline}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Section {clause.sectionNumber || "N/A"}</span>
                  <span className="text-cyan-400 flex items-center gap-0.5">
                    Jump to Page {clause.pageNumber} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })
        ) : clauses.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-slate-800 bg-[#070b14]/50">
            <CheckCircle2 className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-80" />
            <h4 className="text-xs font-semibold text-white">No clause analysis available</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              Extract and analyze document text to populate covenant extractions.
            </p>
          </div>
        ) : (
          <div className="p-6 text-center rounded-xl border border-slate-800 bg-[#070b14]/50">
            <Filter className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
            <h4 className="text-xs font-semibold text-slate-300">No matching clauses</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Try resetting your category or risk level filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedRiskLevel("ALL");
                setSearchQuery("");
              }}
              className="mt-2 text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
