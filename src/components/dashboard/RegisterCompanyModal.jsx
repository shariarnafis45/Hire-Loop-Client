"use client";

import { X, UploadCloud, ChevronDown, Building2, Globe, MapPin, Users } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterCompanyModal({ isOpen, onClose }) {
  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop with sophisticated blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/40 dark:bg-black/80 backdrop-blur-[6px]"
            onClick={onClose}
          />

          {/* Top-Level Luxury Card Structure */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0e] rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-none border border-zinc-200/80 dark:border-white/[0.06] overflow-hidden flex flex-col max-h-[90vh]"
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-zinc-100 dark:border-white/[0.04]">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Register New Company
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-50 dark:bg-white/[0.03] hover:bg-zinc-100 dark:hover:bg-white/[0.08] rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable form) */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Building2 size={14} className="text-zinc-400" />
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vercel Inc." 
                      className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 focus:border-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 transition-all"
                    />
                  </div>

                  {/* Industry Select with Indicator */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                      Industry / Category
                    </label>
                    <div className="relative group">
                      <select className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 focus:border-transparent text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer transition-all pr-10">
                        <option value="tech" className="dark:bg-[#0c0c0e]">Technology</option>
                        <option value="health" className="dark:bg-[#0c0c0e]">Healthcare</option>
                        <option value="finance" className="dark:bg-[#0c0c0e]">Finance</option>
                        <option value="ecommerce" className="dark:bg-[#0c0c0e]">E-commerce</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Globe size={14} className="text-zinc-400" />
                      Website URL
                    </label>
                    <div className="flex border border-zinc-200 dark:border-white/[0.06] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-white/20 focus-within:border-transparent transition-all">
                      <span className="px-3.5 bg-zinc-100 dark:bg-white/[0.02] text-zinc-400 text-sm border-r border-zinc-200 dark:border-white/[0.06] flex items-center select-none font-medium text-[13px]">
                        https://
                      </span>
                      <input 
                        type="text" 
                        placeholder="vercel.com" 
                        className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-white/[0.01] text-sm focus:outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <MapPin size={14} className="text-zinc-400" />
                      Location
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. San Francisco, CA" 
                      className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 focus:border-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 transition-all"
                    />
                  </div>

                  {/* Employee Range Select with Indicator */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Users size={14} className="text-zinc-400" />
                      Employee Count Range
                    </label>
                    <div className="relative group">
                      <select className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 focus:border-transparent text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer transition-all pr-10">
                        <option value="1-10" className="dark:bg-[#0c0c0e]">1-10 employees</option>
                        <option value="11-50" className="dark:bg-[#0c0c0e]">11-50 employees</option>
                        <option value="51-200" className="dark:bg-[#0c0c0e]">51-200 employees</option>
                        <option value="201-500" className="dark:bg-[#0c0c0e]">201-500 employees</option>
                        <option value="500+" className="dark:bg-[#0c0c0e]">500+ employees</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Clean Interactive Logo Upload Zone */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                      Company Logo
                    </label>
                    <div className="group/upload w-full flex items-center gap-4 p-3 bg-zinc-50/30 dark:bg-white/[0.01] border border-dashed border-zinc-200 dark:border-white/[0.08] hover:border-zinc-400 dark:hover:border-white/20 rounded-xl cursor-pointer transition-colors duration-200">
                      <div className="w-10 h-10 bg-white dark:bg-white/[0.03] shadow-sm rounded-lg flex items-center justify-center shrink-0 border border-zinc-100 dark:border-white/[0.05] group-hover/upload:scale-95 transition-transform">
                        <UploadCloud size={16} className="text-zinc-400 group-hover/upload:text-zinc-600 dark:group-hover/upload:text-zinc-200 transition-colors" />
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">Upload corporate mark</p>
                        <p className="text-zinc-400 dark:text-zinc-500 mt-0.5">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brief Description */}
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                    Brief Description
                  </label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about your company's mission, stack, and workplace culture..." 
                    className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 focus:border-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 resize-none custom-scrollbar transition-all"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer with Pristine Actions */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
              <button 
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Register Company
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}