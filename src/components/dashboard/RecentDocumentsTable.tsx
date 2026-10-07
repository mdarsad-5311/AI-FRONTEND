import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { DocumentItem } from "@/types/document";

interface RecentDocumentsTableProps {
  documents: DocumentItem[];
  loading?: boolean;
  onOpenWorkspaceModal?: (doc: DocumentItem) => void;
}

export function RecentDocumentsTable({
  documents,
  loading = false,
  onOpenWorkspaceModal,
}: RecentDocumentsTableProps) {
  const getRiskBadge = (score: number, level: string) => {
    if (score >= 70 || level === "CRITICAL" || level === "HIGH") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-950/60 text-rose-300 border border-rose-500/30">
          <ShieldAlert className="w-3.5 h-3.5" />
          High Risk ({score})
        </span>
      );
    }
    if (score >= 45 || level === "MEDIUM") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-950/50 text-amber-300 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" />
          Medium ({score})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Low Risk ({score})
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
      case "analyzed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Audited & Ready
          </span>
        );
      case "processing":
      case "analyzing":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Extracting / Processing
          </span>
        );
      case "uploaded":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Uploaded
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Pending
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#070b14]/70 overflow-hidden shadow-lg backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Document</th>
              <th scope="col" className="py-3.5 px-4 hidden md:table-cell">Agreement Type</th>
              <th scope="col" className="py-3.5 px-4 hidden lg:table-cell">Last Updated</th>
              <th scope="col" className="py-3.5 px-4">Risk Severity</th>
              <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">Analysis Status</th>
              <th scope="col" className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-800"></div>
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3.5 w-40 bg-slate-800 rounded"></div>
                        <div className="h-2.5 w-24 bg-slate-800/60 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="h-3 w-28 bg-slate-800 rounded"></div>
                  </td>
                  <td className="py-4 px-4 hidden lg:table-cell">
                    <div className="h-3 w-20 bg-slate-800 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-5 w-24 bg-slate-800 rounded"></div>
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    <div className="h-3 w-16 bg-slate-800 rounded"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-7 w-20 bg-slate-800 rounded ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="font-medium text-slate-300">No documents found</p>
                  <p className="text-[11px] text-slate-500 mt-1">Upload an agreement above to initiate intelligent review.</p>
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/90 border border-slate-700/60 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/documents/${doc.id}`}
                          className="font-semibold text-slate-100 truncate group-hover:text-cyan-300 transition-colors max-w-xs md:max-w-sm block"
                        >
                          {doc.title}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span className="truncate">{doc.filename}</span>
                          <span className="text-slate-600">•</span>
                          <span>{doc.fileSize}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {doc.documentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden lg:table-cell text-slate-400 text-[11px]">
                    {formatDate(doc.uploadedAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    {getRiskBadge(doc.riskScore, doc.riskLevel)}
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/documents/${doc.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-slate-700/80 hover:border-cyan-400 text-xs font-semibold transition-all shadow-sm"
                      title="Open Document Intelligence Workspace"
                    >
                      <span>Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
