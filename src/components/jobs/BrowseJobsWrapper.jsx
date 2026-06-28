"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "@/components/jobs/JobCard";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

export default function BrowseJobsWrapper({ jobs = [], filter, total }) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(() => {
    if (!filter || !filter.jobType) return [];
    return typeof filter.jobType === "string" ? filter.jobType.split(",") : [];
  });
  const [searchQuery, setSearchQuery] = useState(filter.search || "");
  const [locationQuery, setLocationQuery] = useState(filter.location || "");

  const [page, setPage] = useState(Number(filter.page) || 1);
  
  // ⚡ Backend এর সাথে ঠিক রাখার জন্য ৫ টাই রাখা হলো
  const totalItems = total;
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const router = useRouter();
  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSearchQuery("");
    setLocationQuery("");
    setPage(1);
  };

  useEffect(() => {
    const sp = new URLSearchParams();
    if (selectedTypes.length > 0) {
      sp.set("jobType", selectedTypes); // আপনার অরিজিনাল লজিক
    }
    if (selectedTypes.includes("Remote")) {
      sp.set("isRemote", "true");
    }
    if (searchQuery) {
      sp.set("search", searchQuery);
    }
    if (locationQuery) {
      sp.set("location", locationQuery);
    }
    if (page) {
      sp.set("page", page); // Backend-এ পেজ নাম্বার পাঠানো নিশ্চিত করা হলো
    }
    
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [selectedTypes, router, searchQuery, locationQuery, page]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] relative overflow-hidden py-20 transition-colors duration-500 font-sans">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-indigo-500/[0.07] dark:bg-indigo-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 relative z-10">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="mb-10"
        >
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-3">
              Find Your Dream Role
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-medium">
              Discover premium, hand-picked career opportunities tailored to
              your exceptional skill set.
            </p>
          </div>

          {/* Dynamic Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 p-2 bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.05] rounded-2xl sm:rounded-full shadow-sm hover:border-zinc-300 dark:hover:border-white/[0.08] transition-all duration-300">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-zinc-200/60 dark:border-white/[0.05]">
              <Search className="text-zinc-400 shrink-0" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, tech stack, or companies..."
                className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm font-semibold"
              />
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <MapPin className="text-zinc-400 shrink-0" size={18} />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="City, country, or 'Remote'"
                className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm font-semibold"
              />
            </div>

            <button className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-bold rounded-xl sm:rounded-full shadow-md shadow-indigo-600/10 transition-all duration-200">
              Search Jobs
            </button>
          </div>
        </motion.div>

        {/* Main Workspace Setup */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* MOBILE FILTER TOGGLE */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.05] rounded-xl text-zinc-900 dark:text-white font-bold text-sm shadow-sm"
          >
            <SlidersHorizontal size={16} className="text-indigo-500" />
            Filters {selectedTypes.length > 0 && `(${selectedTypes.length})`}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`w-full lg:w-[300px] shrink-0 lg:sticky lg:top-24 transition-all duration-300 ${showMobileFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white/40 dark:bg-[#060608]/40 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.04] rounded-[24px] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-white/[0.05] pb-4 mb-6">
                <h3 className="text-zinc-900 dark:text-white font-black text-base flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-indigo-500" />
                  Advanced Filters
                </h3>
                {(selectedTypes.length > 0 || searchQuery || locationQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:underline transition-all uppercase tracking-wider"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                    Job Type
                  </h4>
                  <div className="space-y-3">
                    {jobTypes.map((type) => {
                      const isChecked = selectedTypes.includes(type);
                      return (
                        <div
                          key={type}
                          onClick={() => handleTypeToggle(type)}
                          className="flex items-center gap-3 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200 ${
                              isChecked
                                ? "bg-indigo-600 border-indigo-600 shadow-sm shadow-indigo-600/20"
                                : "border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500"
                            }`}
                          >
                            {isChecked && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Check size={10} className="text-white stroke-[4]" />
                              </motion.div>
                            )}
                          </div>
                          <span
                            className={`text-sm font-semibold transition-colors duration-200 ${
                              isChecked
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                            }`}
                          >
                            {type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Core Job Feed Panel */}
          <main className="flex-1 w-full">
            <div className="flex flex-col gap-4 mb-6 px-1">
              <div className="flex items-center justify-between">
                <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm">
                  Found <span className="font-black text-zinc-900 dark:text-white">{totalItems}</span> luxury roles
                </p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900/20 border border-zinc-200/60 dark:border-white/[0.04] rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <span>Most Recent</span>
                  <ChevronDown size={13} className="text-zinc-400" />
                </div>
              </div>

              {/* Active Filter Pills */}
              <AnimatePresence>
                {selectedTypes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-wrap gap-2 items-center"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1">
                      Active:
                    </span>
                    {selectedTypes.map((type) => (
                      <motion.button
                        layout
                        key={type}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={() => handleTypeToggle(type)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 group"
                      >
                        <span className="capitalize">{type}</span>
                        <X size={12} className="text-indigo-400 group-hover:text-rose-400 transition-colors" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Job List & Pagination Wrapper */}
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="wait">
                {jobs.length > 0 ? (
                  // ⚡ Framer Motion Bug Fix: Fragment (<>) সরানো হয়েছে, এর বদলে div with key দেওয়া হয়েছে 
                  <motion.div 
                    key="job-list-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {jobs.map((job) => (
                      <motion.div
                        layout
                        key={job._id?.$oid || job._id || job.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 240, damping: 26 }}
                      >
                        <JobCard job={job} />
                      </motion.div>
                    ))}

                    {/* ✨ ULTRA-PREMIUM PAGINATION */}
                    {totalPages > 1 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/60 dark:bg-[#060608]/60 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.05] rounded-[20px] shadow-sm"
                      >
                        {/* Summary Mobile & Desktop */}
                        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                          Showing <span className="font-bold text-zinc-900 dark:text-white">{startItem}</span> to <span className="font-bold text-zinc-900 dark:text-white">{endItem}</span> of <span className="font-bold text-zinc-900 dark:text-white">{totalItems}</span> results
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            <ChevronLeft size={16} />
                            <span className="hidden sm:inline">Prev</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {getPageNumbers().map((p, i) =>
                              p === "ellipsis" ? (
                                <span key={`ellipsis-${i}`} className="px-2 text-zinc-400 dark:text-zinc-500 tracking-widest">
                                  ...
                                </span>
                              ) : (
                                <button
                                  key={p}
                                  onClick={() => setPage(p)}
                                  className={`min-w-[36px] h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                                    p === page
                                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105"
                                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white"
                                  }`}
                                >
                                  {p}
                                </button>
                              )
                            )}
                          </div>

                          <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* Magical Empty State */
                  <motion.div
                    key="empty-state"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-white/40 dark:bg-[#060608]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.04] rounded-[24px] py-24 text-center mt-2"
                  >
                    <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <Search size={24} className="text-zinc-400" />
                    </div>
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">
                      No vacancies match your matrix
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium">
                      Try refining your tags, adjusting your location, or typing alternative tech keywords.
                    </p>
                    <button 
                      onClick={clearAllFilters}
                      className="mt-6 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-full hover:scale-105 transition-transform"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}