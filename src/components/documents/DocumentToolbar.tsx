"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Maximize2,
  FileText,
  Minimize2,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";

interface DocumentToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  zoomLevel: number;
  onZoomChange: (newZoom: number) => void;
  documentTitle: string;
  onFitWidth?: () => void;
  onFitPage?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  matchCount?: number;
  currentMatchIndex?: number;
  onNextMatch?: () => void;
  onPrevMatch?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function DocumentToolbar({
  currentPage,
  totalPages,
  onPageChange,
  zoomLevel,
  onZoomChange,
  documentTitle,
  onFitWidth,
  onFitPage,
  searchQuery = "",
  onSearchChange,
  matchCount = 0,
  currentMatchIndex = 0,
  onNextMatch,
  onPrevMatch,
  isFullscreen = false,
  onToggleFullscreen,
}: DocumentToolbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 75) {
      onZoomChange(Math.max(75, zoomLevel - 15));
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      onZoomChange(Math.min(150, zoomLevel + 15));
    }
  };

  const handleResetZoom = () => {
    onZoomChange(100);
  };

  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-slate-800 bg-[#070b14]/95 backdrop-blur-md text-xs text-slate-300 select-none z-10">
      {/* Left: Document Name, Type Badge & In-Viewer Search Toggle */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
          <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold truncate max-w-[110px] sm:max-w-[180px] text-white">
            {documentTitle}
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase shrink-0">
            PDF
          </span>
        </div>

        {/* Toolbar in-document search toggle */}
        {onSearchChange && (
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-1 bg-slate-900 border border-cyan-500/50 rounded-lg px-2 py-0.5 shadow-lg">
                <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Find in PDF..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-24 sm:w-36 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                />

                {matchCount > 0 && (
                  <span className="text-[10px] text-cyan-300 font-mono px-1">
                    {currentMatchIndex + 1}/{matchCount}
                  </span>
                )}

                {matchCount > 0 && onPrevMatch && onNextMatch && (
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={onPrevMatch}
                      className="p-0.5 hover:text-white text-slate-400"
                      title="Previous match"
                      aria-label="Previous match"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={onNextMatch}
                      className="p-0.5 hover:text-white text-slate-400"
                      title="Next match"
                      aria-label="Next match"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    onSearchChange("");
                    setIsSearchOpen(false);
                  }}
                  className="p-0.5 text-slate-400 hover:text-white"
                  title="Close search"
                  aria-label="Close search"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Search inside PDF"
                aria-label="Search inside PDF"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Center: Pagination Controls */}
      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg shrink-0">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <span className="px-1.5 text-[11px] font-mono text-slate-300">
          Page <strong className="text-white">{currentPage}</strong> of{" "}
          <span className="text-slate-400">{totalPages}</span>
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white"
          title="Next Page"
          aria-label="Next Page"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Zoom & Viewport Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-lg">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 75}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors text-slate-300 hover:text-white"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span
            onClick={handleResetZoom}
            className="px-1.5 text-[11px] font-mono text-slate-300 hover:text-cyan-400 cursor-pointer"
            title="Click to reset zoom to 100%"
          >
            {zoomLevel}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 transition-colors text-slate-300 hover:text-white"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Fit Width button */}
        {onFitWidth && (
          <button
            onClick={onFitWidth}
            className="hidden md:inline-flex px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Fit to Width"
          >
            Fit Width
          </button>
        )}

        {/* Fit Page button */}
        {onFitPage && (
          <button
            onClick={onFitPage}
            className="hidden md:inline-flex px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Fit whole Page"
          >
            Fit Page
          </button>
        )}

        {/* Fullscreen control */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}
