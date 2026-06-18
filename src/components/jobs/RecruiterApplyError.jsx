import React from "react";
import { StaggerContainer, StaggerItem } from "../animation/MotionWrappers";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { PiUserSwitch } from "react-icons/pi";

const RecruiterApplyError = ({ jobId,userRole }) => {
  return (
   
    <div className="py-24 max-w-md mx-auto px-4 font-sans flex items-center justify-center min-h-[calc(100vh-120px)]">
      
      <StaggerContainer className="space-y-6 text-center w-full">
        
        
        <StaggerItem className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200 dark:border-amber-500/10 flex items-center justify-center shadow-xs">
            <ShieldAlert
              size={28}
              className="text-amber-600 dark:text-amber-500 animate-pulse"
            />
          </div>
        </StaggerItem>

       
        <StaggerItem>
          <div className="bg-white/95 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.05] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-4">
              Access Restricted
            </span>

            <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
              You are not a Job Seeker
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-semibold">
              This action is strictly permitted for candidates. Current role:{" "}
              <span className="font-black text-rose-600 dark:text-amber-400 bg-rose-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md text-xs tracking-wide inline-block mt-1 sm:mt-0">
               {userRole}
              </span>
            </p>
          </div>  
        </StaggerItem>

  
        <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-[#121215] border border-zinc-200 dark:border-white/[0.08] text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 rounded-xl transition-all shadow-xs active:scale-[0.98]"
          >
            <ArrowLeft size={14} />
            Back to Jobs
          </Link>

          <Link
            href={`/auth/signin?redirect=/jobs/${jobId}/apply`}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]"
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
  );
};

export default RecruiterApplyError;