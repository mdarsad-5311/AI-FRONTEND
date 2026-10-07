import Link from "next/link";
import { ShieldCheck, ArrowRight, FileSearch, Sparkles, Layers, ShieldAlert, Cpu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              DocuSense <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/50">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors shadow-md shadow-cyan-950/30"
            >
              Launch Platform <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation Enterprise Document Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          AI-Powered Contract & Document Intelligence for Modern Legal Operations
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
          Instantly audit complex MSAs, SLAs, SaaS agreements, and technical contracts. Extract high-risk clauses, uncapped indemnities, and governing law variances with deterministic precision.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all shadow-lg shadow-cyan-500/20"
          >
            Open Interactive Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/documents/doc-1"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors"
          >
            <FileSearch className="w-4 h-4 text-cyan-400" /> View Sample Workspace
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="h-10 w-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Automated Risk Scoring</h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Calculate empirical risk vectors across unlimited liability clauses, intellectual property transfers, and unilateral termination triggers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="h-10 w-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">3-Column Workspace</h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Side-by-side synchronized review of source contract text with simultaneous AI risk assessment and clause breakdowns.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="h-10 w-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Structured JSON Architecture</h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Enterprise-grade backend pipelines built on Django REST Framework with strict schema validation and server-side model orchestration.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 DocuSense AI Platform. Enterprise Document Intelligence.</p>
      </footer>
    </div>
  );
}
