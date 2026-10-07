"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Shield,
  Upload,
  ChevronRight,
  Sparkles,
  X,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface TopNavbarProps {
  onOpenUpload?: () => void;
}

export function TopNavbar({ onOpenUpload }: TopNavbarProps) {
  const [searchVal, setSearchVal] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: "n-1",
      title: "Critical Clause Flagged",
      desc: "MSA_AcmeCorp contains uncapped data liability in Section 12.2.",
      time: "10m ago",
      unread: true,
    },
    {
      id: "n-2",
      title: "Document Analysis Ready",
      desc: "CloudStream SaaS Vendor Agreement completed with Low risk.",
      time: "2h ago",
      unread: false,
    },
    {
      id: "n-3",
      title: "Model Update Applied",
      desc: "Contract Intelligence engine upgraded with Anthropic Claude 3.7 schema parser.",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#070b14]/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left Breadcrumb & Page title (hidden on small screens if search is active) */}
      <div className="flex items-center gap-3 ml-12 lg:ml-0 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-200 transition-colors">
            DocuSense
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="font-semibold text-slate-200 truncate">
            Executive Overview
          </span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-sm mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search contracts, clauses, parties..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full rounded-lg bg-slate-900/90 border border-slate-800 pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Upload Action Button */}
        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition-all shadow-sm shadow-cyan-950/40 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Document</span>
            <span className="sm:hidden">Upload</span>
          </button>
        )}

        {/* Demo Environment Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/40 px-2.5 py-1 text-[11px] text-cyan-300">
          <Sparkles className="h-3 w-3 text-cyan-400" />
          <span className="font-mono">Demo AI Environment</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-800 bg-[#070b14] p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-white">System Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-500 hover:text-white"
                  aria-label="Close notifications"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border text-xs transition-colors ${
                      n.unread
                        ? "bg-cyan-950/30 border-cyan-500/30 text-slate-200"
                        : "bg-slate-900/40 border-slate-800/80 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-white truncate">{n.title}</span>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">{n.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800 text-center">
                <Link
                  href="/analysis"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  View all system logs →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar / Menu */}
        <div className="relative border-l border-slate-800 pl-2.5 sm:pl-3">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="User profile menu"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-cyan-400/30">
              DS
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-[#070b14] p-2.5 shadow-2xl z-50">
              <div className="px-2 py-1.5 border-b border-slate-800/80 mb-1.5">
                <p className="text-xs font-semibold text-white">Enterprise Legal Ops</p>
                <p className="text-[10px] text-slate-400 font-mono">legal-ops@docusense.internal</p>
              </div>

              <Link
                href="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center justify-between px-2 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <span>Platform Settings</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>

              <Link
                href="/documents"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center justify-between px-2 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <span>Document Repository</span>
                <FileText className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
