"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Upload,
  Search,
  Filter,
  Layers,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { AnalysisActivityChart } from "@/components/dashboard/AnalysisActivityChart";
import { RecentDocumentsTable } from "@/components/dashboard/RecentDocumentsTable";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DocumentUploader } from "@/components/documents/DocumentUploader";
import { DocumentService } from "@/services/documentService";
import { DocumentItem, DashboardStats, ActivityItem } from "@/types/document";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  // Document inspection modal state
  const [inspectDoc, setInspectDoc] = useState<DocumentItem | null>(null);

  // Upload drawer / anchor
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, docsData, actData] = await Promise.all([
        DocumentService.getStats(),
        DocumentService.getDocuments(),
        DocumentService.getRecentActivities(),
      ]);
      setStats(statsData);
      setDocuments(docsData);
      setActivities(actData);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUploadSuccess = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    loadData();
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered documents for the recent documents table
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || doc.documentType === typeFilter;
    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "HIGH" && (doc.riskLevel === "HIGH" || doc.riskLevel === "CRITICAL" || doc.riskScore >= 70)) ||
      (riskFilter === "MEDIUM" && (doc.riskLevel === "MEDIUM" || (doc.riskScore >= 45 && doc.riskScore < 70))) ||
      (riskFilter === "LOW" && (doc.riskLevel === "LOW" || doc.riskScore < 45));

    return matchesSearch && matchesType && matchesRisk;
  });

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Document Intelligence Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Demo AI Analysis Environment
            </span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Continuous contract audits, automated indemnification analysis, and empirical covenant risk assessment across enterprise repositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors border border-slate-800"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Browse Repository
          </Link>

          <button
            onClick={scrollToUpload}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 transition-all shadow-md shadow-cyan-950/50 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Analyze New Document
          </button>
        </div>
      </div>

      {/* 2. Quick Actions Bar */}
      <div>
        <QuickActions onOpenUpload={scrollToUpload} />
      </div>

      {/* 3. KPI Cards Grid (Accurately calculated from structured data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Documents"
          value={stats?.totalDocuments ?? (loading ? "..." : 0)}
          subtitle="Indexed in local repository"
          icon={FileText}
          badge={{ text: "Active", variant: "cyan" }}
        />
        <StatsCard
          title="Documents Analyzed"
          value={stats?.analyzedDocuments ?? (loading ? "..." : 0)}
          subtitle={
            stats && stats.totalDocuments > 0
              ? `${Math.round((stats.analyzedDocuments / stats.totalDocuments) * 100)}% audit completion`
              : "Ready for inspection"
          }
          icon={CheckCircle2}
          badge={{ text: "Ready", variant: "success" }}
        />
        <StatsCard
          title="High-Risk Documents"
          value={stats?.highRiskDocuments ?? (loading ? "..." : 0)}
          subtitle="Requires legal counsel review"
          icon={ShieldAlert}
          badge={{ text: "Attention", variant: "danger" }}
        />
        <StatsCard
          title="Average Risk Score"
          value={stats ? `${stats.averageRiskScore}/100` : (loading ? "..." : "0/100")}
          subtitle="Weighted across all clauses"
          icon={TrendingUp}
          badge={{
            text: (stats?.averageRiskScore ?? 0) >= 60 ? "Elevated" : "Moderate",
            variant: (stats?.averageRiskScore ?? 0) >= 60 ? "warning" : "neutral",
          }}
        />
      </div>

      {/* 4. Risk Analytics Section (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskDistributionChart documents={documents} />
        </div>
        <div className="lg:col-span-2">
          <AnalysisActivityChart />
        </div>
      </div>

      {/* 5. Document Upload Section */}
      <div ref={uploadSectionRef} className="rounded-xl border border-slate-800 bg-[#070b14]/70 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" /> Upload & Ingest New Document
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload agreements for automated simulated clause extraction, liability cap auditing, and risk scoring.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800 self-start sm:self-auto">
            PDF • DOCX • Max 50MB
          </span>
        </div>

        <DocumentUploader onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* 6. Recent Documents & Activity Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Documents Table with Filters */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Recent Agreements
              </h2>
              <p className="text-xs text-slate-400">
                Inspect analyzed contracts, risk severity badges, and key covenants
              </p>
            </div>

            <Link
              href="/documents"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Browse all ({documents.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#070b14]/50 p-2.5 rounded-lg border border-slate-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filter by title or filename..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="Master Services Agreement">MSA</option>
                  <option value="SaaS Vendor Agreement">SaaS</option>
                  <option value="Employment Agreement">Employment</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="rounded-md bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="all">All Risks</option>
                  <option value="HIGH">High Risk</option>
                  <option value="MEDIUM">Medium Risk</option>
                  <option value="LOW">Low Risk</option>
                </select>
              </div>
            </div>
          </div>

          <RecentDocumentsTable
            documents={filteredDocuments}
            loading={loading}
            onOpenWorkspaceModal={(doc) => setInspectDoc(doc)}
          />
        </div>

        {/* Recent Activity Feed */}
        <div className="xl:col-span-1">
          <RecentActivityFeed activities={activities} loading={loading} />
        </div>
      </div>

      {/* 7. Modal Inspection Fallback for Document Overview */}
      {inspectDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-[#070b14] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {inspectDoc.documentType}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{inspectDoc.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{inspectDoc.filename}</p>
              </div>
              <button
                onClick={() => setInspectDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Score & Risk summary card */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Calculated Risk Score</span>
                  <div className="text-2xl font-bold text-white mt-0.5 font-mono">
                    {inspectDoc.riskScore}/100
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Risk Tier</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      inspectDoc.riskScore >= 70
                        ? "bg-rose-950/60 text-rose-300 border border-rose-500/30"
                        : inspectDoc.riskScore >= 45
                        ? "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                    }`}>
                      {inspectDoc.riskLevel} SEVERITY
                    </span>
                  </div>
                </div>
              </div>

              {/* Analysis Highlights */}
              {inspectDoc.analysis ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Executive Summary
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                      {inspectDoc.analysis.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1.5 mb-1">
                        <Building className="w-3.5 h-3.5 text-cyan-400" /> Contract Parties
                      </span>
                      <p className="font-semibold text-white">
                        {inspectDoc.analysis.parties.join(" & ")}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Governing Law & Date
                      </span>
                      <p className="font-semibold text-white">
                        {inspectDoc.analysis.governingLaw}
                      </p>
                    </div>
                  </div>

                  {inspectDoc.analysis.risks.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Flagged Risk Factors ({inspectDoc.analysis.risks.length})
                      </h4>
                      <div className="space-y-2">
                        {inspectDoc.analysis.risks.map((rk) => (
                          <div
                            key={rk.id}
                            className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs"
                          >
                            <div className="flex items-center justify-between text-rose-300 font-semibold mb-1">
                              <span className="flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                {rk.title}
                              </span>
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-600/50">
                                {rk.clauseRef}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300">{rk.description}</p>
                            <p className="text-[11px] text-slate-400 mt-1 font-mono">
                              Mitigation: {rk.mitigation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                  Detailed analysis extract is currently pending for this document.
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Step 3 Document Workspace route will feature full split-screen PDF reader.
              </span>
              <button
                onClick={() => setInspectDoc(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
