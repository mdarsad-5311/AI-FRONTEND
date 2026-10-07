"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DocumentService } from "@/services/documentService";
import { DocumentItem } from "@/types/document";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { Search, Filter, Plus, ArrowLeft } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await DocumentService.getDocuments({
        searchQuery: search,
        documentType: typeFilter,
        riskLevel: riskFilter,
      });
      setDocuments(res);
      setLoading(false);
    }
    load();
  }, [search, typeFilter, riskFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight">Enterprise Document Repository</h1>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            View, filter, and inspect risk profiles across all corporate agreements and contracts.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, filename, or document type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Filter className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg bg-slate-900 border border-slate-800 pl-8 pr-4 py-2 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Document Types</option>
              <option value="Master Services Agreement">Master Services Agreement</option>
              <option value="SaaS Vendor Agreement">SaaS Vendor Agreement</option>
              <option value="Employment Agreement">Employment Agreement</option>
            </select>
          </div>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="HIGH">High Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-slate-900/40 border border-slate-800 animate-pulse"></div>
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
          No documents match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
