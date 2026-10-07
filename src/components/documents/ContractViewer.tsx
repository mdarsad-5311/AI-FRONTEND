"use client";

import React, { useEffect, useRef } from "react";
import { DocumentItem, ContractPage, ContractParagraph, RiskLevel } from "@/types/document";
import { DocumentToolbar } from "./DocumentToolbar";
import { ShieldAlert, AlertTriangle, CheckCircle2, Bookmark, Sparkles } from "lucide-react";

interface ContractViewerProps {
  document: DocumentItem;
  currentPage: number;
  onPageChange: (page: number) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  selectedClauseId: string | null;
  onSelectClause: (clauseId: string, pageNumber: number) => void;
  searchQuery: string;
}

export function ContractViewer({
  document,
  currentPage,
  onPageChange,
  zoomLevel,
  onZoomChange,
  selectedClauseId,
  onSelectClause,
  searchQuery,
}: ContractViewerProps) {
  const activeClauseRef = useRef<HTMLDivElement>(null);
  const pages: ContractPage[] = document.pages || [];
  const activePageData = pages.find((p) => p.pageNumber === currentPage) || pages[0];

  // Auto-scroll to selected clause when changed
  useEffect(() => {
    if (activeClauseRef.current) {
      activeClauseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedClauseId, currentPage]);

  const getRiskStyles = (level?: RiskLevel, isSelected?: boolean) => {
    if (!level) return "";

    const base = "transition-all cursor-pointer rounded-md p-3 my-2 border";

    switch (level) {
      case "CRITICAL":
        return `${base} ${
          isSelected
            ? "bg-rose-950/70 border-rose-400 ring-2 ring-rose-500/50 shadow-lg shadow-rose-950/50"
            : "bg-rose-950/25 border-rose-500/40 hover:bg-rose-950/40"
        }`;
      case "HIGH":
        return `${base} ${
          isSelected
            ? "bg-orange-950/70 border-orange-400 ring-2 ring-orange-500/50 shadow-lg shadow-orange-950/50"
            : "bg-orange-950/25 border-orange-500/40 hover:bg-orange-950/40"
        }`;
      case "MEDIUM":
        return `${base} ${
          isSelected
            ? "bg-yellow-950/70 border-yellow-400 ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-950/50"
            : "bg-yellow-950/20 border-yellow-500/30 hover:bg-yellow-950/30"
        }`;
      case "LOW":
        return `${base} ${
          isSelected
            ? "bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/50"
            : "bg-emerald-950/15 border-emerald-500/30 hover:bg-emerald-950/30"
        }`;
      default:
        return "";
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case "CRITICAL":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-900/80 text-rose-200 border border-rose-400/50 uppercase font-mono">
            <ShieldAlert className="w-3 h-3 text-rose-400" /> Critical Risk
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-900/80 text-orange-200 border border-orange-400/50 uppercase font-mono">
            <AlertTriangle className="w-3 h-3 text-orange-400" /> High Risk
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-900/80 text-yellow-200 border border-yellow-400/50 uppercase font-mono">
            <AlertTriangle className="w-3 h-3 text-yellow-400" /> Medium Risk
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-400/50 uppercase font-mono">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Audited Clause
          </span>
        );
      default:
        return null;
    }
  };

  const highlightMatches = (text: string) => {
    if (!searchQuery.trim()) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-cyan-400/30 text-cyan-200 px-0.5 rounded font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0b1120] overflow-hidden">
      {/* Top Document Toolbar */}
      <DocumentToolbar
        currentPage={currentPage}
        totalPages={document.pageCount}
        onPageChange={onPageChange}
        zoomLevel={zoomLevel}
        onZoomChange={onZoomChange}
        documentTitle={document.title}
      />

      {/* Main Document Body Viewer */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#070b14]/50">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          className="w-full max-w-3xl transition-transform duration-150 ease-out"
        >
          {/* Simulated Physical Legal Contract Page Document */}
          <div className="rounded-xl border border-slate-800 bg-[#070b14] p-8 sm:p-12 shadow-2xl relative min-h-[900px] flex flex-col justify-between">
            {/* Page Header Banner */}
            <div className="border-b border-slate-800 pb-4 mb-8 flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              <span>{activePageData?.headerTitle || document.title}</span>
              <span>Doc ID: {document.id} • Page {currentPage}</span>
            </div>

            {/* Document Content / Structured Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed flex-1">
              {activePageData?.paragraphs.map((p) => {
                if (p.isHeading) {
                  return (
                    <h3
                      key={p.id}
                      className={`font-bold tracking-tight text-white mt-6 mb-3 ${
                        p.headingLevel === 1
                          ? "text-xl sm:text-2xl text-center border-b border-slate-800/80 pb-3"
                          : "text-base text-cyan-300 border-l-2 border-cyan-500 pl-3"
                      }`}
                    >
                      {highlightMatches(p.text)}
                    </h3>
                  );
                }

                // If this paragraph is bound to a clause with risk level
                if (p.clauseId && p.riskLevel) {
                  const isSelected = selectedClauseId === p.clauseId;

                  return (
                    <div
                      key={p.id}
                      ref={isSelected ? activeClauseRef : null}
                      onClick={() => onSelectClause(p.clauseId!, currentPage)}
                      className={getRiskStyles(p.riskLevel, isSelected)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-xs font-bold text-white uppercase font-mono">
                            Inspected Covenant ({p.clauseId})
                          </span>
                        </div>
                        {getRiskBadge(p.riskLevel)}
                      </div>

                      <p className="text-slate-200 text-sm leading-relaxed font-serif">
                        {highlightMatches(p.text)}
                      </p>

                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-300 font-sans">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-cyan-400" /> Active in AI Analysis Panel
                          </span>
                          <span className="text-slate-400">Click to focus details</span>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard contract paragraph
                return (
                  <p key={p.id} className="text-slate-300 text-sm leading-relaxed font-serif">
                    {highlightMatches(p.text)}
                  </p>
                );
              })}
            </div>

            {/* Page Footer */}
            <div className="border-t border-slate-800 pt-4 mt-8 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Confidential & Proprietary • Legal Operations Review</span>
              <span>Page {currentPage} of {document.pageCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
