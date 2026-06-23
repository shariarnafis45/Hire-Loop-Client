"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function RecruiterJobsTable({ jobs }) {
  const handleEdit = (id) => {
    toast.success(`Redirecting to edit job: ${id}`);
   
  };

  const handleCloseJob = (id) => {
    toast.error(`Closing action triggered for: ${id}`);
    
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#0c0c0e] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05]">
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-zinc-400 mb-4">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
          No jobs posted yet
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
          Get started by creating your first job post to attract top talent.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-[#0c0c0e] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">
      {/* Table Title Block */}
      <div className="p-6 border-b border-zinc-100 dark:border-white/[0.05]">
        <h2 className="text-[16px] font-semibold text-zinc-900 dark:text-white">
          Active Postings ({jobs.length})
        </h2>
      </div>

      {/* Grid Header Configuration (Hidden on Mobile) */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50/50 dark:bg-white/[0.02] border-b border-zinc-100 dark:border-white/[0.02] text-[12px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        <div className="col-span-4">Job Details</div>
        <div className="col-span-3">Salary Matrix</div>
        <div className="col-span-2">Deadline</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Dynamic Rows Container */}
      <div className="flex-1 divide-y divide-zinc-100 dark:divide-white/[0.05]">
        {jobs.map((job, index) => {
          const isClosed = job.status === "closed";

          return (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start lg:items-center px-6 py-5 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-colors duration-200"
            >
              {/* Col 1: Job Details Section */}
              <div className="col-span-4 flex items-start gap-3 w-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-100/50 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">
                    <span className="capitalize font-medium text-zinc-700 dark:text-zinc-300">
                      {job.category}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-zinc-400" />
                      {job.location}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {job.jobType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 2: Salary Matrix Info */}
              <div className="col-span-3 text-[13px] text-zinc-600 dark:text-zinc-300 flex lg:flex-col items-center lg:items-start justify-between w-full lg:w-auto">
                <span className="lg:hidden text-zinc-400 text-[12px] font-medium uppercase tracking-wider">
                  Salary:
                </span>
                <span className="font-semibold flex items-center gap-0.5 text-zinc-900 dark:text-zinc-100">
                  {job.salaryCurrency.split(" ")[0]}{" "}
                  {Number(job.salaryMin).toLocaleString()} -{" "}
                  {Number(job.salaryMax).toLocaleString()}
                </span>
              </div>

              {/* Col 3: Deadlines System */}
              <div className="col-span-2 text-[13px] text-zinc-600 dark:text-zinc-300 flex lg:flex-col items-center lg:items-start justify-between w-full lg:w-auto">
                <span className="lg:hidden text-zinc-400 text-[12px] font-medium uppercase tracking-wider">
                  Deadline:
                </span>
                <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
                  <Calendar size={14} className="text-zinc-400 shrink-0" />
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Col 4: Badge Status */}
              <div className="col-span-1 flex items-center justify-between lg:justify-center w-full lg:w-auto">
                <span className="lg:hidden text-zinc-400 text-[12px] font-medium uppercase tracking-wider">
                  Status:
                </span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isClosed
                      ? "text-zinc-500 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800/60"
                      : "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10"
                  }`}
                >
                  {job.status || "active"}
                </span>
              </div>

              {/* Col 5: Micro Action Hub */}
              <div className="col-span-2 flex items-center justify-end gap-2 w-full lg:w-auto border-t lg:border-t-0 border-zinc-100 dark:border-white/[0.05] pt-3 lg:pt-0 mt-1 lg:mt-0">
                {/* View Applications */}
                <button
                  onClick={() => toast(`Viewing applicants for ${job._id}`)}
                  title="View Applications"
                  className="flex-1 lg:flex-none flex items-center justify-center p-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 transition-all duration-200"
                >
                  <Eye size={16} />
                  <span className="lg:hidden ml-2 text-[13px] font-medium">
                    View Applicants
                  </span>
                </button>

                {/* Edit Post */}
                <button
                  onClick={() => handleEdit(job._id)}
                  title="Edit Post"
                  className="flex-1 lg:flex-none flex items-center justify-center p-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 transition-all duration-200"
                >
                  <Pencil size={16} />
                  <span className="lg:hidden ml-2 text-[13px] font-medium">
                    Edit Job
                  </span>
                </button>

                {/* Close/Delete Post */}
                <button
                  onClick={() => handleCloseJob(job._id)}
                  title="Close Post"
                  className="flex-1 lg:flex-none flex items-center justify-center p-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 transition-all duration-200"
                >
                  <Trash2 size={16} />
                  <span className="lg:hidden ml-2 text-[13px] font-medium">
                    Close Listing
                  </span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
