"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { DocumentItem } from "@/types/document";

interface RiskDistributionChartProps {
  documents: DocumentItem[];
}

export function RiskDistributionChart({ documents }: RiskDistributionChartProps) {
  // Compute distribution based on documents
  const counts = {
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
  };

  documents.forEach((doc) => {
    if (doc.riskLevel === "CRITICAL" || doc.riskScore >= 80) {
      counts.CRITICAL++;
    } else if (doc.riskLevel === "HIGH" || doc.riskScore >= 70) {
      counts.HIGH++;
    } else if (doc.riskLevel === "MEDIUM" || doc.riskScore >= 45) {
      counts.MEDIUM++;
    } else {
      counts.LOW++;
    }
  });

  const total = documents.length || 1;

  const data = [
    { name: "Critical", value: counts.CRITICAL, color: "#ef4444", key: "CRITICAL" },
    { name: "High", value: counts.HIGH, color: "#f97316", key: "HIGH" },
    { name: "Medium", value: counts.MEDIUM, color: "#eab308", key: "MEDIUM" },
    { name: "Low", value: counts.LOW, color: "#10b981", key: "LOW" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = Math.round((item.value / total) * 100);
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-2.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.payload.color }}
            />
            <span className="text-xs font-semibold text-white">{item.name} Risk</span>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            <span className="font-bold text-white">{item.value}</span> agreements ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#070b14]/70 p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-sm font-semibold text-white">Risk Distribution</h3>
            <p className="text-[11px] text-slate-400">Severity categorization of agreements</p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {documents.length} Analyzed
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="h-56 flex flex-col items-center justify-center text-center p-4">
            <ShieldCheck className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-xs text-slate-400">No risk telemetry available</p>
          </div>
        ) : (
          <div className="relative h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#070b14"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold tracking-tight text-white">{documents.length}</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Contracts</span>
            </div>
          </div>
        )}
      </div>

      {/* Breakdown Legend with counts and percentages */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 mt-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
            <span className="text-[11px] text-slate-300 truncate">Critical</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-rose-400">{counts.CRITICAL}</span>
            <span className="text-[10px] text-slate-500 ml-1">
              ({Math.round((counts.CRITICAL / total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
            <span className="text-[11px] text-slate-300 truncate">High</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-orange-400">{counts.HIGH}</span>
            <span className="text-[10px] text-slate-500 ml-1">
              ({Math.round((counts.HIGH / total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0"></span>
            <span className="text-[11px] text-slate-300 truncate">Medium</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-yellow-400">{counts.MEDIUM}</span>
            <span className="text-[10px] text-slate-500 ml-1">
              ({Math.round((counts.MEDIUM / total) * 100)}%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="text-[11px] text-slate-300 truncate">Low</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400">{counts.LOW}</span>
            <span className="text-[10px] text-slate-500 ml-1">
              ({Math.round((counts.LOW / total) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
