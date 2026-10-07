"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, FileSearch, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

interface AiProcessingStateProps {
  onComplete?: () => void;
  documentTitle?: string;
}

const STAGES = [
  { label: "Reading & parsing document text", duration: 1200 },
  { label: "Extracting legal covenants & clauses", duration: 1500 },
  { label: "Evaluating risk vectors & liability exclusions", duration: 1600 },
  { label: "Generating redline recommendations", duration: 1200 },
];

export function AiProcessingState({ onComplete, documentTitle }: AiProcessingStateProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStageIndex < STAGES.length - 1) {
      timer = setTimeout(() => {
        setCurrentStageIndex((prev) => prev + 1);
      }, STAGES[currentStageIndex].duration);
    } else if (onComplete) {
      timer = setTimeout(() => {
        onComplete();
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [currentStageIndex, onComplete]);

  return (
    <div className="p-6 rounded-xl border border-cyan-500/30 bg-slate-900/90 shadow-xl space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800/60 animate-pulse">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              DocuSense AI Analysis Pipeline
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">
              Deterministic Contract Audit
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse">
          Processing
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold truncate max-w-[200px]">
            {documentTitle || "Active Document"}
          </span>
          <span className="text-cyan-400 font-mono text-[11px]">
            Stage {currentStageIndex + 1} of {STAGES.length}
          </span>
        </div>

        {/* Dynamic progress meter */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.round(((currentStageIndex + 1) / STAGES.length) * 100)}%`,
            }}
          />
        </div>

        {/* Stage List */}
        <div className="space-y-2 pt-2">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={stage.label}
                className={`flex items-center gap-2.5 text-xs transition-colors ${
                  isDone
                    ? "text-emerald-400 font-medium"
                    : isCurrent
                    ? "text-cyan-300 font-semibold"
                    : "text-slate-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className="text-[11.5px]">{stage.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
