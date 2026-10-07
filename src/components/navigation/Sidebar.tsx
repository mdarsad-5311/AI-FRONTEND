"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  FolderOpen,
  LineChart,
  Settings,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/documents", icon: FolderOpen },
    { name: "Analysis History", href: "/analysis", icon: LineChart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="lg:hidden fixed top-3.5 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white shadow-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar background overlay on mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-[#070b14] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <Link
            href="/"
            className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80 hover:bg-slate-900/40 transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-950/50">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                DocuSense<span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50 font-mono">AI</span>
              </span>
              <p className="text-[11px] text-slate-400">Document Intelligence</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="mt-6 px-3 space-y-1.5" aria-label="Main Navigation">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/40"
                      : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-300"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Quick links */}
          <div className="mt-8 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Contract Intelligence
            </span>
            <div className="mt-3 p-3 rounded-lg border border-slate-800/80 bg-slate-900/40 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic Auditing</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Automated covenant extraction, liability risk profiling, and governing law analysis.
              </p>
            </div>
          </div>
        </div>

        {/* User / Workspace profile section */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-xs font-bold text-cyan-300 border border-cyan-500/40">
              DS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Enterprise Legal Lab</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <p className="text-[10px] text-slate-400 truncate">Demo Environment</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
