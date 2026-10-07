"use client";

import React, { useMemo, useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  FileText,
  BarChart3,
  Layers,
  ArrowRight,
} from "lucide-react";
import { DocumentRisk, RiskLevel } from "@/types/document";
import { RiskFinding } from "./RiskFinding";

interface RiskVisualizationProps {
  risks: DocumentRisk[];
  selectedRiskId: string | null;
  selectedClauseId: string | null;
  onSelectRisk: (risk: DocumentRisk) => void;
  onNavigatePage?: (pageNum: number) => void;
}

export function RiskVisualization({
  risks,
  selectedRiskId,
  selectedClauseId,
  onSelectRisk,
  onNavigatePage,
}: RiskVisualizationProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<"ALL" | RiskLevel>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Distribution calculations
  const stats = useMemo(() => {
    const total = risks.length;
    const critical = risks.filter((r) => r.severity === "CRITICAL").length;
    const high = risks.filter((r) => r.severity === "HIGH").length;
    const medium = risks.filter((r) => r.severity === "MEDIUM").length;
    const low = risks.filter((r) => r.severity === "LOW").length;

    // Categories
    const categories: Record<string, number> = {};
    risks.forEach((r) => {
      // Extract category from clauseRef or title
      const cat = r.clauseRef ? r.clauseRef.split(" ")[0] : "General";
      categories[cat] = (categories[cat] || 0) + 1;
    });

    return { total, critical, high, medium, low, categories };
  }, [risks]);

  // Filtered risks
  const filteredRisks = useMemo(() => {
    return risks.filter((risk) => {
      const matchesSeverity =
        selectedSeverity === "ALL" || risk.severity === selectedSeverity;
      const matchesSearch =
        searchQuery.trim() === "" ||
        risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        risk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (risk.clauseRef && risk.clauseRef.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSeverity && matchesSearch;
    });
  }, [risks, selectedSeverity, searchQuery]);

  return (
    <div className="space-y-4">
      {/* 1. Severity Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setSelectedSeverity("ALL")}
          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedSeverity === "ALL"
              ? "bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/30"
              : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
          }`}
          aria-label="Filter by all risks"
        >
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Risks</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">{stats.total}</div>
          <div className="text-[9px] text-cyan-400 font-mono mt-0.5">100% evaluated</div>
        </button>

        <button
          onClick={() => setSelectedSeverity(selectedSeverity === "CRITICAL" ? "ALL" : "CRITICAL")}
          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedSeverity === "CRITICAL"
              ? "bg-rose-950/80 border-rose-400 ring-1 ring-rose-400/30"
              : "bg-rose-950/30 border-rose-900/50 hover:border-rose-700/60"
          }`}
          aria-label="Filter by critical risks"
        >
          <div className="text-[10px] font-mono uppercase text-rose-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse" />
            Critical
          </div>
          <div className="text-xl font-bold text-rose-200 font-mono mt-0.5">{stats.critical}</div>
          <div className="text-[9px] text-rose-400/80 font-mono mt-0.5">Immediate action</div>
        </button>

        <button
          onClick={() => setSelectedSeverity(selectedSeverity === "HIGH" ? "ALL" : "HIGH")}
          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedSeverity === "HIGH"
              ? "bg-orange-950/80 border-orange-400 ring-1 ring-orange-400/30"
              : "bg-orange-950/30 border-orange-900/50 hover:border-orange-700/60"
          }`}
          aria-label="Filter by high risks"
        >
          <div className="text-[10px] font-mono uppercase text-orange-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            High
          </div>
          <div className="text-xl font-bold text-orange-200 font-mono mt-0.5">{stats.high}</div>
          <div className="text-[9px] text-orange-400/80 font-mono mt-0.5">High exposure</div>
        </button>

        <button
          onClick={() => setSelectedSeverity(selectedSeverity === "MEDIUM" ? "ALL" : "MEDIUM")}
          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
            selectedSeverity === "MEDIUM"
              ? "bg-yellow-950/80 border-yellow-400 ring-1 ring-yellow-400/30"
              : "bg-yellow-950/30 border-yellow-900/50 hover:border-yellow-700/60"
          }`}
          aria-label="Filter by medium risks"
        >
          <div className="text-[10px] font-mono uppercase text-yellow-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
            Medium
          </div>
          <div className="text-xl font-bold text-yellow-200 font-mono mt-0.5">{stats.medium}</div>
          <div className="text-[9px] text-yellow-400/80 font-mono mt-0.5">Review required</div>
        </button>
      </div>

      {/* 2. Severity Distribution Proportional Bar Chart */}
      {stats.total > 0 && (
        <div className="p-3 rounded-xl border border-slate-800 bg-[#070b14]/90 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Risk Severity Distribution
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {stats.total} Findings Total
            </span>
          </div>

          {/* Accessible horizontal stacked bar */}
          <div
            className="w-full h-3 rounded-full overflow-hidden bg-slate-800 flex"
            role="progressbar"
            aria-label="Risk severity distribution"
            aria-valuemin={0}
            aria-valuemax={stats.total}
            aria-valuenow={stats.total}
          >
            {stats.critical > 0 && (
              <div
                style={{ width: `${(stats.critical / stats.total) * 100}%` }}
                className="bg-rose-500 h-full transition-all duration-300 hover:brightness-110"
                title={`Critical: ${stats.critical} (${Math.round((stats.critical / stats.total) * 100)}%)`}
              />
            )}
            {stats.high > 0 && (
              <div
                style={{ width: `${(stats.high / stats.total) * 100}%` }}
                className="bg-orange-500 h-full transition-all duration-300 hover:brightness-110"
                title={`High: ${stats.high} (${Math.round((stats.high / stats.total) * 100)}%)`}
              />
            )}
            {stats.medium > 0 && (
              <div
                style={{ width: `${(stats.medium / stats.total) * 100}%` }}
                className="bg-yellow-500 h-full transition-all duration-300 hover:brightness-110"
                title={`Medium: ${stats.medium} (${Math.round((stats.medium / stats.total) * 100)}%)`}
              />
            )}
            {stats.low > 0 && (
              <div
                style={{ width: `${(stats.low / stats.total) * 100}%` }}
                className="bg-emerald-500 h-full transition-all duration-300 hover:brightness-110"
                title={`Low: ${stats.low} (${Math.round((stats.low / stats.total) * 100)}%)`}
              />
            )}
          </div>

          {/* Distribution legend */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 flex-wrap gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Critical: {stats.critical} ({Math.round((stats.critical / stats.total) * 100 || 0)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              High: {stats.high} ({Math.round((stats.high / stats.total) * 100 || 0)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Medium: {stats.medium} ({Math.round((stats.medium / stats.total) * 100 || 0)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Low: {stats.low} ({Math.round((stats.low / stats.total) * 100 || 0)}%)
            </span>
          </div>
        </div>
      )}

      {/* 3. Filter Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search risk findings or clause..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-0.5">
          {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedSeverity(lvl)}
              className={`px-2 py-1 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer shrink-0 ${
                selectedSeverity === lvl
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Risk Findings List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
          <span>
            Identified Risks ({filteredRisks.length} of {risks.length})
          </span>
          <span className="font-mono text-cyan-400">Click to Inspect in PDF</span>
        </div>

        {filteredRisks.length > 0 ? (
          filteredRisks.map((risk) => (
            <div key={risk.id} className="relative group">
              <RiskFinding
                risk={risk}
                isSelected={
                  selectedRiskId === risk.id || selectedClauseId === risk.affectedClauseId
                }
                onSelect={() => {
                  onSelectRisk(risk);
                  if (risk.pageNumber && onNavigatePage) {
                    onNavigatePage(risk.pageNumber);
                  }
                }}
              />
            </div>
          ))
        ) : risks.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-slate-800 bg-[#070b14]/50">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
            <h4 className="text-xs font-semibold text-white">No risks identified for this document</h4>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              The AI legal audit completed with zero high-severity findings or liability anomalies.
            </p>
          </div>
        ) : (
          <div className="p-6 text-center rounded-xl border border-slate-800 bg-[#070b14]/50">
            <Filter className="w-6 h-6 text-slate-500 mx-auto mb-1.5" />
            <h4 className="text-xs font-semibold text-slate-300">No matching risks found</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Try adjusting your severity filter or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedSeverity("ALL");
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
