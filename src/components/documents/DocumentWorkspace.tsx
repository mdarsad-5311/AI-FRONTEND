"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Columns,
  Sparkles,
  Layers,
  Shield,
  Menu,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { DocumentItem, DocumentRisk, Clause } from "@/types/document";
import { DocumentNavigation } from "./DocumentNavigation";
import { PdfViewer } from "./PdfViewer";
import { RiskAssessmentPanel } from "@/components/analysis/RiskAssessmentPanel";

interface DocumentWorkspaceProps {
  document: DocumentItem;
}

export function DocumentWorkspace({ document }: DocumentWorkspaceProps) {
  // Synchronized Interaction States
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(
    document.analysis?.clauses[0]?.id || null
  );
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<"overview" | "risks" | "clauses" | "clause">("overview");

  // Responsive drawer toggles for Tablet & Mobile
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  // Synchronization 1: When user selects a clause (from Navigation or PDF Viewer)
  const handleSelectClause = (clauseId: string, pageNumber: number) => {
    setSelectedClauseId(clauseId);
    setCurrentPage(pageNumber);

    // Switch right panel to clause detail to show AI explanation
    setActiveAnalysisTab("clause");

    // If this clause has an associated risk, sync it
    const matchingRisk = document.analysis?.risks.find(
      (r) => r.affectedClauseId === clauseId || r.clauseRef?.includes(clauseId)
    );
    if (matchingRisk) {
      setSelectedRiskId(matchingRisk.id);
    } else {
      setSelectedRiskId(null);
    }

    // Auto-close mobile drawers
    setIsNavOpen(false);
  };

  // Synchronization 2: When user selects a risk from the AI Assessment panel
  const handleSelectRisk = (risk: DocumentRisk) => {
    setSelectedRiskId(risk.id);

    // Switch right panel to clause detail tab
    setActiveAnalysisTab("clause");

    // Find affected clause in analysis
    if (risk.affectedClauseId) {
      setSelectedClauseId(risk.affectedClauseId);
      const clause = document.analysis?.clauses.find((c) => c.id === risk.affectedClauseId);
      if (clause) {
        setCurrentPage(clause.pageNumber);
      }
    } else if (risk.clauseRef) {
      // Fuzzy match by section reference
      const clause = document.analysis?.clauses.find((c) =>
        risk.clauseRef?.includes(c.sectionNumber || "") || c.title.includes(risk.clauseRef || "")
      );
      if (clause) {
        setSelectedClauseId(clause.id);
        setCurrentPage(clause.pageNumber);
      }
    }

    // Auto-close mobile drawer
    setIsAnalysisOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.2rem)] -m-6 md:-m-8 bg-[#070b14] overflow-hidden text-slate-100">
      {/* Top Workspace Bar */}
      <header className="h-12 border-b border-slate-800 bg-[#070b14] px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/documents"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Repository</span>
          </Link>

          <span className="text-slate-600 hidden sm:inline">|</span>

          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-bold text-white truncate max-w-[180px] sm:max-w-md">
              {document.title}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50 hidden md:inline">
              AI Document Intelligence Workspace
            </span>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle Left Navigation (Mobile/Tablet) */}
          <button
            onClick={() => {
              setIsNavOpen(!isNavOpen);
              setIsAnalysisOpen(false);
            }}
            className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
            aria-label="Toggle document structure"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Structure</span>
          </button>

          {/* Toggle Right AI Panel (Mobile/Tablet) */}
          <button
            onClick={() => {
              setIsAnalysisOpen(!isAnalysisOpen);
              setIsNavOpen(false);
            }}
            className="xl:hidden flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-xs text-cyan-300 hover:text-white font-semibold"
            aria-label="Toggle AI analysis panel"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Risk ({document.riskScore})</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Workspace Grid */}
      <div className="flex-1 flex min-h-0 relative">
        {/* LEFT COLUMN: Document Navigation (Desktop fixed 300px, responsive drawer on mobile/tablet) */}
        <div
          className={`w-72 lg:w-80 shrink-0 h-full transition-transform duration-200 z-30 ${
            isNavOpen
              ? "absolute inset-y-0 left-0 shadow-2xl translate-x-0"
              : "hidden lg:block"
          }`}
        >
          <DocumentNavigation
            document={document}
            selectedClauseId={selectedClauseId}
            onSelectClause={handleSelectClause}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Backdrop for mobile Left Drawer */}
        {isNavOpen && (
          <div
            onClick={() => setIsNavOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}

        {/* CENTER COLUMN: Professional PDF Viewer */}
        <main className="flex-1 h-full min-w-0 flex flex-col overflow-hidden bg-[#0b1120]">
          <PdfViewer
            document={document}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            selectedClauseId={selectedClauseId}
            onSelectClause={handleSelectClause}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </main>

        {/* RIGHT COLUMN: AI Risk Assessment Panel (Desktop fixed 360px, responsive drawer on mobile/tablet) */}
        <div
          className={`w-80 xl:w-96 shrink-0 h-full transition-transform duration-200 z-30 ${
            isAnalysisOpen
              ? "absolute inset-y-0 right-0 shadow-2xl translate-x-0"
              : "hidden xl:block"
          }`}
        >
          <RiskAssessmentPanel
            document={document}
            selectedClauseId={selectedClauseId}
            selectedRiskId={selectedRiskId}
            onSelectRisk={handleSelectRisk}
            onSelectClause={handleSelectClause}
            onNavigatePage={setCurrentPage}
            activeTab={activeAnalysisTab}
            onTabChange={setActiveAnalysisTab}
          />
        </div>

        {/* Backdrop for mobile Right Drawer */}
        {isAnalysisOpen && (
          <div
            onClick={() => setIsAnalysisOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 xl:hidden"
          />
        )}
      </div>
    </div>
  );
}
