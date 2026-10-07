"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileUp, CheckCircle, AlertCircle, Loader2, Sparkles, FileText } from "lucide-react";
import { DocumentService } from "@/services/documentService";
import { DocumentItem } from "@/types/document";

interface DocumentUploaderProps {
  onUploadSuccess?: (doc: DocumentItem) => void;
}

export function DocumentUploader({ onUploadSuccess }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedDocName, setUploadedDocName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processUpload(e.target.files[0]);
    }
  };

  const processUpload = async (file: File) => {
    const lowerName = file.name.toLowerCase();
    const isSupported =
      lowerName.endsWith(".pdf") ||
      lowerName.endsWith(".docx") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".txt");

    if (!isSupported) {
      setUploadStatus("error");
      setErrorMessage("Unsupported format. Allowed formats: PDF, DOCX, DOC, TXT.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadStatus("error");
      setErrorMessage("File exceeds 50MB maximum upload limit.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus("idle");
      setErrorMessage("");
      setUploadedDocName(file.name);

      const uploadedDoc = await DocumentService.uploadDocument(file);
      setUploadStatus("success");
      if (onUploadSuccess) {
        onUploadSuccess(uploadedDoc);
      }
      setTimeout(() => {
        setUploadStatus("idle");
      }, 5000);
    } catch {
      setUploadStatus("error");
      setErrorMessage("Failed to upload document to simulation service. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-7 text-center cursor-pointer transition-all ${
        isDragging
          ? "border-cyan-400 bg-cyan-950/30"
          : "border-slate-800 bg-[#070b14]/60 hover:border-cyan-500/50 hover:bg-[#070b14]/90"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/90 text-cyan-400 border border-slate-700/80 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all shadow-md">
        {isUploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
        ) : uploadStatus === "success" ? (
          <CheckCircle className="h-6 w-6 text-emerald-400" />
        ) : uploadStatus === "error" ? (
          <AlertCircle className="h-6 w-6 text-rose-400" />
        ) : (
          <UploadCloud className="h-6 w-6" />
        )}
      </div>

      <div className="mt-3.5">
        <p className="text-sm font-semibold text-white">
          {isUploading ? "Uploading & extracting covenants..." : "Drop agreement file here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Supports <span className="text-slate-300 font-medium">PDF</span>, <span className="text-slate-300 font-medium">DOCX</span>, <span className="text-slate-300 font-medium">DOC</span>, and <span className="text-slate-300 font-medium">TXT</span> (Max 50MB per document)
        </p>
      </div>

      {uploadStatus === "success" && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Added &quot;{uploadedDocName}&quot; to repository (Demo simulated extraction)</span>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-300 font-medium bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/40">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
          <FileText className="w-3 h-3 text-cyan-400" /> Contract Parsing
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Risk Vector Audit
        </span>
      </div>
    </div>
  );
}
