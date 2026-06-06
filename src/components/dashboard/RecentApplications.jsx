"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const recentApplicants = [
  { id: 1, name: "Julianne Moore", role: "Senior Product Designer", date: "Oct 24, 2023", experience: "6 years", status: "Interviewing", statusColor: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10" },
  { id: 2, name: "Robert Downey", role: "Backend Engineer", date: "Oct 23, 2023", experience: "4 years", status: "New", statusColor: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10" },
  { id: 3, name: "Emma Stone", role: "Marketing Lead", date: "Oct 22, 2023", experience: "8 years", status: "Reviewing", statusColor: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10" },
  { id: 4, name: "Chris Pratt", role: "Product Manager", date: "Oct 21, 2023", experience: "5 years", status: "Rejected", statusColor: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10" },
];

export default function RecentApplications() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0c0c0e] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-white/[0.05]">
        <h2 className="text-[16px] font-semibold text-zinc-900 dark:text-white">Recent Applications</h2>
        <button className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          View all
        </button>
      </div>

      {/* Table Headers (Desktop only) */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.02] text-[12px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        <div className="col-span-2">Candidate Name & Role</div>
        <div>Date Applied</div>
        <div>Experience</div>
        <div className="text-right">Status</div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {recentApplicants.map((applicant, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={applicant.id}
            className="group flex flex-col md:grid md:grid-cols-5 gap-4 items-start md:items-center px-6 py-4 border-b border-zinc-100 dark:border-white/[0.05] last:border-0 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
          >
            {/* Name & Role */}
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200/50 dark:border-white/10">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  {applicant.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {applicant.name}
                </p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">{applicant.role}</p>
              </div>
            </div>

            {/* Date */}
            <div className="text-[13px] text-zinc-600 dark:text-zinc-300 w-full md:w-auto">
              <span className="md:hidden inline-block w-20 text-zinc-400 text-xs">Applied:</span>
              {applicant.date}
            </div>

            {/* Experience */}
            <div className="text-[13px] text-zinc-600 dark:text-zinc-300 w-full md:w-auto">
              <span className="md:hidden inline-block w-20 text-zinc-400 text-xs">Exp:</span>
              {applicant.experience}
            </div>

            {/* Status */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto">
              <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${applicant.statusColor}`}>
                {applicant.status}
              </span>
              <button className="md:hidden p-1 text-zinc-400 hover:text-zinc-900">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}