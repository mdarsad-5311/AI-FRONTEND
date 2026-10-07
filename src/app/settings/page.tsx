"use client";

import React from "react";
import { Sliders, Cpu, Database, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="mt-1 text-xs text-slate-400">
          Configure AI extraction engines, risk scoring thresholds, and enterprise integration options.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-white">AI Engine Configuration</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Manage LLM model orchestration, temperature settings, and structured JSON parsing behavior.
          </p>
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Default Analysis Model</label>
              <select className="w-full rounded-lg bg-slate-800 border border-slate-700 p-2 text-xs text-white">
                <option>Anthropic Claude 3.7 Sonnet (Reasoning)</option>
                <option>OpenAI GPT-4o Enterprise</option>
                <option>Llama 3.3 70B Instruct (Self-Hosted)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Risk Detection Sensitivity</label>
              <select className="w-full rounded-lg bg-slate-800 border border-slate-700 p-2 text-xs text-white">
                <option>High (Strict legal scrutiny for unlimited liability & IP)</option>
                <option>Medium (Standard enterprise negotiation guidelines)</option>
                <option>Low (Basic clause extraction only)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-white">Backend Connection</h2>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
            <div>
              <p className="text-xs font-medium text-white">Django REST API Sync</p>
              <p className="text-[11px] text-slate-400">Current mode: Hybrid client simulation with server endpoint readiness</p>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
