"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Activity } from "lucide-react";

interface ActivityPoint {
  date: string;
  analyzed: number;
  flaggedRisks: number;
}

const DEFAULT_ACTIVITY_DATA: ActivityPoint[] = [
  { date: "Oct 1", analyzed: 4, flaggedRisks: 2 },
  { date: "Oct 2", analyzed: 7, flaggedRisks: 3 },
  { date: "Oct 3", analyzed: 5, flaggedRisks: 1 },
  { date: "Oct 4", analyzed: 9, flaggedRisks: 5 },
  { date: "Oct 5", analyzed: 6, flaggedRisks: 2 },
  { date: "Oct 6", analyzed: 11, flaggedRisks: 6 },
  { date: "Oct 7", analyzed: 8, flaggedRisks: 3 },
];

interface AnalysisActivityChartProps {
  data?: ActivityPoint[];
}

export function AnalysisActivityChart({ data = DEFAULT_ACTIVITY_DATA }: AnalysisActivityChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
          <p className="text-xs font-semibold text-slate-200 mb-1.5">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-400">Audited Contracts:</span>
              <span className="font-semibold text-white ml-auto">{payload[0]?.value}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="text-slate-400">Flagged Risk Clauses:</span>
              <span className="font-semibold text-white ml-auto">{payload[1]?.value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#070b14]/70 p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Analysis Activity Trend</h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 font-medium">
              Demo Telemetry
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Contracts audited vs clauses flagged over past 7 days</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="text-[11px]">Documents Audited</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-rose-400"></span>
            <span className="text-[11px]">Risks Identified</span>
          </div>
        </div>
      </div>

      <div className="h-56 w-full pt-4">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Activity className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-xs text-slate-400">No activity recorded for this timeline</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAudited" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorRisks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1e293b" }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1e293b" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="analyzed"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAudited)"
                name="Documents Audited"
              />
              <Area
                type="monotone"
                dataKey="flaggedRisks"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRisks)"
                name="Flagged Risks"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          Average throughput: <strong className="text-slate-200">7.1 docs/day</strong>
        </span>
        <span className="text-slate-500 font-mono">Realtime Pipeline Ready</span>
      </div>
    </div>
  );
}
