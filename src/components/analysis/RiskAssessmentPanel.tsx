"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  RotateCcw,
} from "lucide-react";
import { DocumentItem, DocumentRisk, Clause } from "@/types/document";
import { RiskScore } from "./RiskScore";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { RiskFinding } from "./RiskFinding";
import { ClauseAnalysis } from "./ClauseAnalysis";
import { AiProcessingState } from "./AiProcessingState";

import { RiskVisualization } from "./RiskVisualization";
import { ClauseVisualization } from "./ClauseVisualization";

interface RiskAssessmentPanelProps {
  document: DocumentItem;
  selectedClauseId: string | null;
  selectedRiskId: string | null;
  onSelectRisk: (risk: DocumentRisk) => void;
  onSelectClause?: (clauseId: string, pageNumber: number) => void;
  onScrollToSelectedClause?: () => void;
  onNavigatePage?: (pageNum: number) => void;
  activeTab?: "overview" | "risks" | "clauses" | "clause";
  onTabChange?: (tab: "overview" | "risks" | "clauses" | "clause") => void;
}

export function RiskAssessmentPanel({
  document,
  selectedClauseId,
  selectedRiskId,
  onSelectRisk,
  onSelectClause,
  onScrollToSelectedClause,
  onNavigatePage,
  activeTab: controlledTab,
  onTabChange,
}: RiskAssessmentPanelProps) {
  const [internalTab, setInternalTab] = useState<"overview" | "risks" | "clauses" | "clause">("overview");
  const [isSimulatingProcessing, setIsSimulatingProcessing] = useState(false);

  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: "overview" | "risks" | "clauses" | "clause") => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const analysis = document.analysis;
  const selectedClause = analysis?.clauses.find((c) => c.id === selectedClauseId);
  const confidence = analysis?.aiConfidence || 94;

  return (
    <aside className="w-full h-full flex flex-col bg-[#070b14] border-l border-slate-800 text-slate-300 overflow-hidden select-text">
      {/* 1. Header & AI Confidence Banner */}
      <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800/50">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight uppercase">
              AI Contract Intelligence
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Deterministic Reasoning Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            {confidence}% Confidence
          </span>
          <button
            onClick={() => setIsSimulatingProcessing(!isSimulatingProcessing)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Simulate re-analysis pipeline"
            aria-label="Simulate re-analysis pipeline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Secondary Tab Switcher */}
      <div className="flex items-center border-b border-slate-800 bg-[#070b14] px-3 pt-2 gap-1 text-xs shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-2.5 py-1.5 font-semibold transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
            activeTab === "overview"
              ? "border-cyan-400 text-cyan-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("risks")}
          className={`px-2.5 py-1.5 font-semibold transition-colors border-b-2 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            activeTab === "risks"
              ? "border-cyan-400 text-cyan-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>Risks</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
            {analysis?.risks.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("clauses")}
          className={`px-2.5 py-1.5 font-semibold transition-colors border-b-2 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
            activeTab === "clauses"
              ? "border-cyan-400 text-cyan-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>Clauses</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
            {analysis?.clauses.length || 0}
          </span>
        </button>

        {selectedClause && (
          <button
            onClick={() => setActiveTab("clause")}
            className={`px-2.5 py-1.5 font-semibold transition-colors border-b-2 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
              activeTab === "clause"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bookmark className="w-3 h-3 text-cyan-400" />
            <span className="truncate max-w-[80px]">Selected</span>
          </button>
        )}
      </div>

      {/* 3. Tab Content View Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {isSimulatingProcessing ? (
          <AiProcessingState
            documentTitle={document.title}
            onComplete={() => setIsSimulatingProcessing(false)}
          />
        ) : activeTab === "clause" && selectedClause ? (
          <ClauseAnalysis
            clause={selectedClause}
            onScrollToClause={onScrollToSelectedClause}
          />
        ) : activeTab === "risks" ? (
          /* Step 11: Dedicated Risk Visualization */
          <RiskVisualization
            risks={analysis?.risks || []}
            selectedRiskId={selectedRiskId}
            selectedClauseId={selectedClauseId}
            onSelectRisk={onSelectRisk}
            onNavigatePage={onNavigatePage}
          />
        ) : activeTab === "clauses" ? (
          /* Step 11: Dedicated Clause Visualization */
          <ClauseVisualization
            clauses={analysis?.clauses || []}
            selectedClauseId={selectedClauseId}
            onSelectClause={(cId, pNum) => {
              if (onSelectClause) {
                onSelectClause(cId, pNum);
              }
            }}
            onNavigatePage={onNavigatePage}
          />
        ) : (
          /* Overview Tab: Composite Score + Breakdown Tiles + Executive Summary + Top Risk Highlights */
          <div className="space-y-4">
            <RiskScore
              score={document.riskScore}
              level={document.riskLevel}
              findingsBreakdown={analysis?.findingsBreakdown}
              status={document.status}
              analyzedAt={analysis?.analyzedAt}
            />

            {analysis && (
              <ExecutiveSummary
                summary={analysis.summary}
                parties={analysis.parties}
                governingLaw={analysis.governingLaw}
                effectiveDate={analysis.effectiveDate}
                contractType={analysis.contractType}
                keyConcerns={analysis.keyConcerns}
                businessImpactSummary={analysis.businessImpactSummary}
                obligations={analysis.obligations}
                importantTerms={analysis.importantTerms}
                missingOrConcerning={analysis.missingOrConcerning}
                onNavigatePage={onNavigatePage}
              />
            )}

            {/* Quick list of primary risks */}
            {analysis?.risks && analysis.risks.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  <span>Priority Risk Findings</span>
                  <button
                    onClick={() => setActiveTab("risks")}
                    className="text-cyan-400 hover:text-cyan-300 normal-case font-semibold cursor-pointer"
                  >
                    View all ({analysis.risks.length}) →
                  </button>
                </div>

                {analysis.risks.slice(0, 2).map((risk) => (
                  <RiskFinding
                    key={risk.id}
                    risk={risk}
                    isSelected={selectedRiskId === risk.id || selectedClauseId === risk.affectedClauseId}
                    onSelect={() => onSelectRisk(risk)}
                  />
                ))}
              </div>
            )}

            {/* Recommendations Section */}
            {analysis?.recommendations && analysis.recommendations.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  AI Action Recommendations
                </div>

                {analysis.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-lg bg-[#070b14]/70 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-semibold text-slate-200">
                        {rec.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {rec.suggestedAction}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Footer Note */}
      <div className="p-2.5 border-t border-slate-800/80 bg-slate-900/60 text-[10px] text-slate-500 flex items-center justify-between font-mono shrink-0">
        <span>DocuSense AI Legal Engine v2.4</span>
        <span className="text-cyan-400/80">Active Reasoning</span>
      </div>
    </aside>
  );
}
