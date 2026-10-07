import React, { Suspense } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { TopNavbar } from "@/components/navigation/TopNavbar";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex">
      <Suspense fallback={<div className="w-64 border-r border-slate-800 bg-[#070b14] hidden lg:block" />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Suspense fallback={<div className="h-16 border-b border-slate-800 bg-[#070b14]" />}>
          <TopNavbar />
        </Suspense>
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
