"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { DocumentItem, ContractPage, RiskLevel } from "@/types/document";
import { DocumentToolbar } from "./DocumentToolbar";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  FileText,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface PdfViewerProps {
  document: DocumentItem;
  currentPage: number;
  onPageChange: (page: number) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  selectedClauseId: string | null;
  onSelectClause: (clauseId: string, pageNumber: number) => void;
  searchQuery: string;
  onSearchChange?: (query: string) => void;
}

export function PdfViewer({
  document,
  currentPage,
  onPageChange,
  zoomLevel,
  onZoomChange,
  selectedClauseId,
  onSelectClause,
  searchQuery,
  onSearchChange,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeClauseRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const pages: ContractPage[] = document.pages || [];
  const totalPages = document.pageCount || pages.length || 1;

  // Search matches calculation
  const searchMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) return [];
    const q = searchQuery.toLowerCase();
    const matches: { pageNumber: number; paragraphId: string; clauseId?: string }[] = [];

    pages.forEach((page) => {
      page.paragraphs.forEach((p) => {
        if (p.text.toLowerCase().includes(q)) {
          matches.push({
            pageNumber: page.pageNumber,
            paragraphId: p.id,
            clauseId: p.clauseId,
          });
        }
      });
    });

    return matches;
  }, [searchQuery, pages]);

  // When match index changes, scroll to the page
  const handleNextMatch = () => {
    if (searchMatches.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIdx);
    const match = searchMatches[nextIdx];
    if (match) {
      onPageChange(match.pageNumber);
      if (match.clauseId) {
        onSelectClause(match.clauseId, match.pageNumber);
      }
    }
  };

  const handlePrevMatch = () => {
    if (searchMatches.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIndex(prevIdx);
    const match = searchMatches[prevIdx];
    if (match) {
      onPageChange(match.pageNumber);
      if (match.clauseId) {
        onSelectClause(match.clauseId, match.pageNumber);
      }
    }
  };

  // Zoom preset handlers
  const handleFitWidth = () => {
    onZoomChange(115);
  };

  const handleFitPage = () => {
    onZoomChange(90);
  };

  // Toggle fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!documentModeIsFullscreen()) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      window.document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const documentModeIsFullscreen = () => {
    return !!window.document.fullscreenElement;
  };

  // Auto-scroll to selected clause or target page when changed
  useEffect(() => {
    if (activeClauseRef.current) {
      activeClauseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      const pageIndex = currentPage - 1;
      const targetPageEl = pageRefs.current[pageIndex];
      if (targetPageEl && containerRef.current) {
        targetPageEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [selectedClauseId, currentPage]);

  const getRiskStyles = (level?: RiskLevel, isSelected?: boolean) => {
    if (!level) return "";
    const base = "relative transition-all cursor-pointer rounded-md p-3.5 my-3 border";

    switch (level) {
      case "CRITICAL":
        return `${base} ${
          isSelected
            ? "bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/60 shadow-xl shadow-rose-950/60"
            : "bg-rose-950/25 border-rose-500/40 hover:bg-rose-950/45 hover:border-rose-400"
        }`;
      case "HIGH":
        return `${base} ${
          isSelected
            ? "bg-orange-950/80 border-orange-500 ring-2 ring-orange-500/60 shadow-xl shadow-orange-950/60"
            : "bg-orange-950/25 border-orange-500/40 hover:bg-orange-950/45 hover:border-orange-400"
        }`;
      case "MEDIUM":
        return `${base} ${
          isSelected
            ? "bg-yellow-950/80 border-yellow-500 ring-2 ring-yellow-500/60 shadow-xl shadow-yellow-950/60"
            : "bg-yellow-950/20 border-yellow-500/35 hover:bg-yellow-950/40 hover:border-yellow-400"
        }`;
      case "LOW":
        return `${base} ${
          isSelected
            ? "bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/60 shadow-xl shadow-emerald-950/60"
            : "bg-emerald-950/20 border-emerald-500/35 hover:bg-emerald-950/40 hover:border-emerald-400"
        }`;
      default:
        return "";
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case "CRITICAL":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-900/90 text-rose-100 border border-rose-400 uppercase font-mono tracking-wider">
            <ShieldAlert className="w-3 h-3 text-rose-300" /> Critical Risk
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-900/90 text-orange-100 border border-orange-400 uppercase font-mono tracking-wider">
            <AlertTriangle className="w-3 h-3 text-orange-300" /> High Risk
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-900/90 text-yellow-100 border border-yellow-400 uppercase font-mono tracking-wider">
            <AlertTriangle className="w-3 h-3 text-yellow-300" /> Medium Risk
          </span>
        );
      case "LOW":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-900/90 text-emerald-100 border border-emerald-400 uppercase font-mono tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Low Risk
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
            <mark
              key={i}
              className="bg-cyan-400/35 text-cyan-100 px-0.5 py-0.2 rounded font-semibold border-b border-cyan-400"
            >
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
    <div
      ref={containerRef}
      className="flex-1 h-full flex flex-col bg-[#0b1120] overflow-hidden select-text"
    >
      {/* 1. Document PDF Toolbar */}
      <DocumentToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        zoomLevel={zoomLevel}
        onZoomChange={onZoomChange}
        documentTitle={document.title}
        onFitWidth={handleFitWidth}
        onFitPage={handleFitPage}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        matchCount={searchMatches.length}
        currentMatchIndex={currentMatchIndex}
        onNextMatch={handleNextMatch}
        onPrevMatch={handlePrevMatch}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* 2. Neutral Document Canvas with Professional Sheet Render */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center gap-8 bg-[#070b14]/70">
        {isLoading ? (
          <div className="h-96 flex flex-col items-center justify-center text-center p-8">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
            <h4 className="text-sm font-semibold text-white">Rendering Document Stream...</h4>
            <p className="text-xs text-slate-400 font-mono mt-1">Preparing PDF viewport</p>
          </div>
        ) : loadError ? (
          <div className="my-auto max-w-md p-6 rounded-xl border border-rose-900 bg-rose-950/30 text-center">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Unable to load document</h4>
            <p className="text-xs text-slate-400 mt-1 mb-4">{loadError}</p>
            <button
              onClick={() => setLoadError(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Loading
            </button>
          </div>
        ) : (
          /* Multi-Page Stack with Realist Legal Paper Sheet Aspect Ratio */
          pages.map((page, index) => {
            const isCurrentPage = page.pageNumber === currentPage;

            return (
              <div
                key={page.pageNumber}
                ref={(el) => {
                  pageRefs.current[index] = el;
                }}
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: "top center",
                }}
                className="w-full max-w-3xl transition-transform duration-150 ease-out"
              >
                {/* Simulated White/High-Contrast Legal Document Page with Subtle Box Shadow */}
                <div
                  className={`rounded-sm bg-[#0e1726] border text-slate-200 p-8 sm:p-14 shadow-2xl relative min-h-[960px] flex flex-col justify-between transition-colors ${
                    isCurrentPage ? "border-slate-700 ring-1 ring-cyan-500/20" : "border-slate-800"
                  }`}
                >
                  {/* Subtle Legal Page Watermark & Header */}
                  <div className="border-b border-slate-800 pb-3 mb-8 flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    <span className="truncate max-w-md">{page.headerTitle}</span>
                    <span className="shrink-0 font-bold text-slate-300">
                      Page {page.pageNumber} of {totalPages}
                    </span>
                  </div>

                  {/* Legal Document Content Body */}
                  <div className="space-y-4 text-slate-200 text-[13.5px] leading-relaxed flex-1 font-serif">
                    {page.paragraphs.map((p) => {
                      if (p.isHeading) {
                        return (
                          <h3
                            key={p.id}
                            className={`font-sans font-bold tracking-tight text-white mt-6 mb-3 ${
                              p.headingLevel === 1
                                ? "text-xl sm:text-2xl text-center border-b border-slate-800 pb-3"
                                : "text-base text-cyan-300 border-l-2 border-cyan-500 pl-3.5"
                            }`}
                          >
                            {highlightMatches(p.text)}
                          </h3>
                        );
                      }

                      // If paragraph is a monitored covenant with Risk Severity
                      if (p.clauseId && p.riskLevel) {
                        const isSelected = selectedClauseId === p.clauseId;

                        return (
                          <div
                            key={p.id}
                            ref={isSelected ? activeClauseRef : null}
                            onClick={() => onSelectClause(p.clauseId!, page.pageNumber)}
                            className={getRiskStyles(p.riskLevel, isSelected)}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10 font-sans">
                              <div className="flex items-center gap-1.5">
                                <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-xs font-bold text-white uppercase font-mono">
                                  Audited Covenant • {p.clauseId}
                                </span>
                              </div>
                              {getRiskBadge(p.riskLevel)}
                            </div>

                            <p className="text-slate-100 text-[13.5px] leading-relaxed">
                              {highlightMatches(p.text)}
                            </p>

                            {isSelected && (
                              <div className="mt-2.5 pt-2 border-t border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-300 font-sans">
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-cyan-400" /> Active in AI Risk Assessment
                                </span>
                                <span className="text-slate-400 font-mono text-[10px]">
                                  Click to view mitigation
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Standard paragraph
                      return (
                        <p key={p.id} className="text-slate-300 leading-relaxed">
                          {highlightMatches(p.text)}
                        </p>
                      );
                    })}
                  </div>

                  {/* Legal Page Footer */}
                  <div className="border-t border-slate-800 pt-4 mt-8 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>DocuSense AI Verified Document • Strict Confidentiality</span>
                    <span>Document Page #{page.pageNumber}</span>
                  </div>
                </div>

                {/* Clear visual page gap indicator between stacked pages */}
                {index < pages.length - 1 && (
                  <div className="h-4 flex items-center justify-center my-2">
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      • • •
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
