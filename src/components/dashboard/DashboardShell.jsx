
"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNavBar from "@/components/dashboard/DashBoardNavBar";
import { useState } from "react";

export default function DashboardShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#050505] overflow-hidden transition-colors duration-500 relative font-sans">
      
      {/* Premium Mesh Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent dark:from-[#050505] dark:via-transparent dark:to-transparent" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Right Side Content Area */}
      <div className="relative flex-1 flex flex-col min-w-0 z-10">
        <DashboardNavBar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Scrollable Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}