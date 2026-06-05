"use client";

import { Menu, Search, Bell } from "lucide-react";
import ThemeSwitch from "../ui/ThemeSwitch"; 

const DashboardNavBar = ({ onMenuClick }) => {
  return (
    <header className="h-[72px] px-4 md:px-6 flex items-center justify-between border-b border-zinc-200/50 dark:border-white/[0.05] bg-white/60 dark:bg-[#0c0c0c]/80 backdrop-blur-2xl sticky top-0 z-30 transition-colors duration-500">
      
      {/* Left: Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2.5 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors focus:outline-none"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Center/Left: Global Search Bar (Figma Style) */}
      <div className="flex-1 max-w-2xl mx-4 md:mx-6 hidden sm:flex">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search size={16} className="text-zinc-400 group-focus-within:text-violet-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="w-full bg-zinc-100/50 dark:bg-[#121212]/80 border border-zinc-200/50 dark:border-white/[0.04] rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all shadow-sm dark:shadow-none"
          />
          {/* Optional: Command K hint for desktop */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 bg-white dark:bg-white/5 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-white/5">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions (Theme & Notifications) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <ThemeSwitch />
        
        {/* Notification Bell with Ping Animation */}
        <button className="relative p-2.5 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-all outline-none">
          <Bell size={18} />
          {/* Notification Indicator */}
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white dark:border-[#0c0c0c]"></span>
          </span>
        </button>
      </div>
      
    </header>
  );
};

export default DashboardNavBar;