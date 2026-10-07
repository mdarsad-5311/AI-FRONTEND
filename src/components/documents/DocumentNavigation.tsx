"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Layers,
  ChevronDown,
  X,
} from "lucide-react";
import { DocumentItem, Clause, RiskLevel } from "@/types/document";

interface DocumentNavigationProps {
  document: DocumentItem;
  selectedClauseId: string | null;
  onSelectClause: (clauseId: string, pageNumber: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DocumentNavigation({
  document,
  selectedClauseId,
  onSelectClause,
  searchQuery,
  onSearchChange,
}: DocumentNavigationProps) {
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const getRiskIndicator = (level: RiskLevel) => {
    switch (level) {
      case "CRITICAL":
        return <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Critical Risk" />;
      case "HIGH":
        return <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" title="High Risk" />;
      case "MEDIUM":
        return <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" title="Medium Risk" />;
      case "LOW":
        return <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Low Risk" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />;
    }
  };

  const allClauses: Clause[] = document.analysis?.clauses || [];

  // Filter clauses by search query and risk level
  const filteredClauses = allClauses.filter((clause) => {
    const matchesSearch =
      !searchQuery ||
      clause.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk =
      filterRisk === "all" ||
      clause.riskLevel === filterRisk ||
      (filterRisk === "FLAGGED" && (clause.riskLevel === "HIGH" || clause.riskLevel === "CRITICAL" || clause.riskLevel === "MEDIUM"));

    return matchesSearch && matchesRisk;
  });

  return (
    <aside className="w-full h-full flex flex-col bg-[#070b14] border-r border-slate-800 text-slate-300 overflow-hidden">
      {/* 1. Header & Meta */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
            {document.documentType}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              document.riskScore >= 70
                ? "bg-rose-950/60 text-rose-300 border border-rose-500/30"
                : document.riskScore >= 45
                ? "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
            }`}
          >
            {document.riskLevel} ({document.riskScore}/100)
          </span>
        </div>

        <h2 className="mt-2 text-sm font-bold text-white line-clamp-1" title={document.title}>
          {document.title}
        </h2>
        <p className="mt-0.5 text-[11px] text-slate-400 font-mono truncate" title={document.filename}>
          {document.filename}
        </p>

        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/60 pt-2">
          <span>{document.pageCount} Pages • {document.fileSize}</span>
          <span>Updated {new Date(document.uploadedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 2. In-document search & risk quick filter */}
      <div className="p-3 border-b border-slate-800/80 space-y-2 bg-[#070b14]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search clauses or terms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md bg-slate-900/90 border border-slate-800 pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">Risk Filter:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterRisk("all")}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                filterRisk === "all" ? "bg-cyan-950 text-cyan-400 border border-cyan-800/50 font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              All ({allClauses.length})
            </button>
            <button
              onClick={() => setFilterRisk("FLAGGED")}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                filterRisk === "FLAGGED" ? "bg-rose-950/70 text-rose-300 border border-rose-500/30 font-semibold" : "text-slate-400 hover:text-rose-300"
              }`}
            >
              Flagged
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sections & Clause Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* If user is searching or filtering, show direct clause list */}
        {searchQuery ? (
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
              Search Results ({filteredClauses.length})
            </div>
            {filteredClauses.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching clauses found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredClauses.map((clause) => {
                  const isSelected = selectedClauseId === clause.id;
                  return (
                    <button
                      key={clause.id}
                      onClick={() => onSelectClause(clause.id, clause.pageNumber)}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 shadow-sm"
                          : "hover:bg-slate-900 border border-transparent text-slate-300"
                      }`}
                    >
                      <div className="mt-1">{getRiskIndicator(clause.riskLevel)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold truncate text-slate-200">
                            {clause.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono shrink-0">
                            p.{clause.pageNumber}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {clause.snippet}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Structured Sections & Clauses */
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
              Contract Structure ({document.sections?.length || 0} Sections)
            </div>

            <div className="space-y-2">
              {document.sections && document.sections.length > 0 ? (
                document.sections.map((section) => {
                  const sectionClauses = section.clauses.filter((c) =>
                    filterRisk === "all" ? true : filterRisk === "FLAGGED" ? c.riskLevel !== "LOW" : c.riskLevel === filterRisk
                  );

                  return (
                    <div
                      key={section.id}
                      className="rounded-lg border border-slate-800/80 bg-slate-900/30 overflow-hidden"
                    >
                      <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-cyan-400 text-[10px] font-bold">
                            {section.sectionNumber}
                          </span>
                          <span className="font-semibold text-slate-200 truncate">
                            {section.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          p.{section.pageNumber}
                        </span>
                      </div>

                      {sectionClauses.length > 0 ? (
                        <div className="p-1 space-y-0.5">
                          {sectionClauses.map((clause) => {
                            const isSelected = selectedClauseId === clause.id;
                            return (
                              <button
                                key={clause.id}
                                onClick={() => onSelectClause(clause.id, clause.pageNumber)}
                                className={`w-full flex items-start gap-2 p-2 rounded-md text-left transition-all ${
                                  isSelected
                                    ? "bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-medium"
                                    : "hover:bg-slate-800/60 border border-transparent text-slate-300"
                                }`}
                              >
                                <div className="mt-1">{getRiskIndicator(clause.riskLevel)}</div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[11px] font-medium truncate">
                                      {clause.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-500 capitalize">
                                    {clause.category}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-2 px-3 text-[10px] text-slate-500 italic">
                          No flagged covenants in this section
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                /* Fallback if sections not populated */
                <div className="space-y-1">
                  {filteredClauses.map((clause) => {
                    const isSelected = selectedClauseId === clause.id;
                    return (
                      <button
                        key={clause.id}
                        onClick={() => onSelectClause(clause.id, clause.pageNumber)}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-all ${
                          isSelected
                            ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-200"
                            : "hover:bg-slate-900 border border-transparent text-slate-300"
                        }`}
                      >
                        <div className="mt-1">{getRiskIndicator(clause.riskLevel)}</div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate text-slate-200">
                            {clause.title}
                          </p>
                          <span className="text-[10px] text-slate-500">
                            Page {clause.pageNumber} • {clause.category}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. Navigation Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{allClauses.length} Covenants Tracked</span>
        </span>
        <span className="text-emerald-400 font-mono text-[10px]">Verified Audit</span>
      </div>
    </aside>
  );
}
