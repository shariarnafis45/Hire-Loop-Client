"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const companies = [
  { id: 1, name: "Google Inc.", industry: "Technology", location: "Mountain View", activeJobs: 24, logoColor: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
  { id: 2, name: "Meta Platforms", industry: "Social Media", location: "Menlo Park", activeJobs: 18, logoColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400" },
  { id: 3, name: "Stripe", industry: "Fintech", location: "San Francisco", activeJobs: 12, logoColor: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400" },
  { id: 4, name: "Tesla", industry: "Automotive", location: "Austin", activeJobs: 31, logoColor: "bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300" },
];

export default function TopCompanies() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0c0c0e] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-semibold text-zinc-900 dark:text-white">My Top Companies</h2>
        <button className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          View all
        </button>
      </div>

      {/* Company List */}
      <div className="flex flex-col gap-5 flex-1">
        {companies.map((company, index) => (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={company.id} 
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              {/* Logo Placeholder */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-200/50 dark:border-white/5 transition-transform group-hover:scale-105 ${company.logoColor}`}>
                <Building2 size={18} />
              </div>
              
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {company.name}
                </h3>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {company.industry} • {company.location}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[15px] font-bold text-zinc-900 dark:text-white">{company.activeJobs}</p>
              <p className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">Active Jobs</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <button className="mt-6 w-full py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
        View All Companies
      </button>
    </div>
  );
}