import React from "react";
import { StaggerContainer, StaggerItem } from "../animation/MotionWrappers";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { PiUserSwitch } from "react-icons/pi";

const RecruiterApplyError = ({jobId}) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] relative overflow-hidden flex items-center justify-center py-20 px-4 transition-colors duration-500 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] dark:bg-amber-500/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/[0.02] dark:bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <StaggerContainer className="space-y-6 text-center">
          <StaggerItem className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/40 dark:bg-[#09090b]/40 backdrop-blur-xl border border-amber-200/60 dark:border-amber-500/10 flex items-center justify-center shadow-sm">
              <ShieldAlert
                size={28}
                className="text-amber-600 dark:text-amber-500 animate-pulse"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-white/40 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.05] rounded-[24px] p-8 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-4">
                Access Restricted
              </span>

              <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                You are not a Job Seeker
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  Employer/Admin
                </span>{" "}
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-[#121215] border border-zinc-200 dark:border-white/[0.08] text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 rounded-xl transition-all active:scale-[0.98]"
            >
              <ArrowLeft size={14} />
              Back to Jobs
            </Link>

            <Link
              href={`/auth/signin?redirect=/jobs/${jobId}/apply`}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]"
            >
              <PiUserSwitch size={14} />
              Switch Account
            </Link>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
              Need help? Contact our premium talent support panel.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
};

export default RecruiterApplyError;
