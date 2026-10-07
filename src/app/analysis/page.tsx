"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DocumentService } from "@/services/documentService";
import { ActivityItem, DocumentItem, DocumentRisk } from "@/types/document";
import {
  Clock,
  CheckCircle2,
  ShieldAlert,
  FileText,
  ArrowRight,
  BarChart3,
  Layers,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { RiskVisualization } from "@/components/analysis/RiskVisualization";
import { ClauseVisualization } from "@/components/analysis/ClauseVisualization";

export default function AnalysisPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"risks" | "clauses" | "history">("risks");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [docs, acts] = await Promise.all([
          DocumentService.getDocuments(),
          DocumentService.getRecentActivities(),
        ]);
        setDocuments(docs);
        setActivities(acts);
        if (docs.length > 0) {
          setSelectedDocId(docs[0].id);
        }
      } catch (err) {
        console.error("Failed to load analysis page data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];
  const analysis = selectedDoc?.analysis;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            Risk & Clauses Intelligence Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Interactive analytical visualization of contractual liability vectors, high-risk covenants, and historical audit milestones.
          </p>
        </div>

        {/* Document Selector */}
        {documents.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium">Agreement:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title} ({d.riskScore}/100 Risk)
                </option>
              ))}
            </select>
            {selectedDoc && (
              <Link
                href={`/documents/${selectedDoc.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/60 transition-colors"
              >
                Open Workspace <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("risks")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "risks"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Risk Distribution ({analysis?.risks.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("clauses")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "clauses"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Clause Categories ({analysis?.clauses.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "history"
              ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40"
              : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Audit History</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === "risks" ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <RiskVisualization
            risks={analysis?.risks || []}
            selectedRiskId={null}
            selectedClauseId={null}
            onSelectRisk={(r) => {}}
          />
        </div>
      ) : activeTab === "clauses" ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <ClauseVisualization
            clauses={analysis?.clauses || []}
            selectedClauseId={null}
            onSelectClause={(cId, pNum) => {}}
          />
        </div>
      ) : (
        /* Audit History Timeline */
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-6">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-4 pb-6 border-b border-slate-800/60 last:border-0 last:pb-0"
              >
                <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0 border border-slate-700/60">
                  {act.type === "risk_flagged" ? (
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  ) : act.type === "analysis_completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-cyan-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">{act.documentTitle}</h3>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {act.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{act.description}</p>
                  <div className="mt-2">
                    <Link
                      href={`/documents/${act.documentId}`}
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Open Workspace <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

