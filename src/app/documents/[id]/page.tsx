"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { DocumentService } from "@/services/documentService";
import { DocumentItem } from "@/types/document";
import { DocumentWorkspace } from "@/components/documents/DocumentWorkspace";
import { AlertCircle, FileSearch, ArrowLeft, Loader2 } from "lucide-react";

function DocumentDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchDoc() {
      if (!id) return;
      try {
        setLoading(true);
        const result = await DocumentService.getDocumentById(id);
        if (result) {
          setDocument(result);
          setNotFound(false);
        } else {
          setDocument(null);
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to load document", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDoc();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <h3 className="text-base font-semibold text-white">
          Loading Document Intelligence Workspace...
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Fetching covenant extractions for &quot;{id}&quot;
        </p>
      </div>
    );
  }

  if (notFound || !document) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 rounded-2xl border border-slate-800 bg-[#070b14] text-center shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">
          Document Not Found
        </h2>

        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          The requested document identifier <code className="text-cyan-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">&quot;{id}&quot;</code> does not exist in the enterprise repository, or it has been purged from the active audit cache.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all shadow-md shadow-cyan-950/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Document Repository
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <DocumentWorkspace document={document} />;
}

export default function DocumentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[70vh] flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
          <h3 className="text-base font-semibold text-white">
            Initializing Intelligence Workspace...
          </h3>
        </div>
      }
    >
      <DocumentDetailContent />
    </Suspense>
  );
}
