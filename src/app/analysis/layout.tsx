import React from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopNavbar } from "@/components/navigation/TopNavbar";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
