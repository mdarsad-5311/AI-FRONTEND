import React from "react";
import Link from "next/link";
import { DocumentItem } from "@/types/document";
import { FileText, ArrowRight, ShieldAlert, CheckCircle2, Clock } from "lucide-react";

interface DocumentCardProps {
  document: DocumentItem;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getRiskBadge = (score: number) => {
    if (score >= 70) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/60 text-rose-300 border border-rose-500/30">
          <ShieldAlert className="w-3 h-3" />
          High Risk ({score})
        </span>
      );
    }
    if (score >= 45) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
          <ShieldAlert className="w-3 h-3" />
          Medium ({score})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
        <CheckCircle2 className="w-3 h-3" />
        Low Risk ({score})
      </span>
    );
  };

  const formattedDate = new Date(document.uploadedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col justify-between rounded-xl bg-slate-900/90 border border-slate-800 p-5 shadow-md transition-all hover:border-cyan-500/40 hover:shadow-cyan-950/20 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-500/50">
            <FileText className="h-5 w-5" />
          </div>
          {getRiskBadge(document.riskScore)}
        </div>

        <h3 className="mt-3.5 text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
          {document.title}
        </h3>

        <p className="mt-1 text-xs text-slate-400 font-mono">
          {document.filename}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <span className="inline-flex items-center gap-1 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            {document.documentType}
          </span>
          <span>{document.fileSize}</span>
          <span>{document.pageCount} pages</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {formattedDate}
        </span>

        <Link
          href={`/documents/${document.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Open Workspace
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
