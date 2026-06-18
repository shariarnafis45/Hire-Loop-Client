import RecruiterApplyError from "@/components/jobs/RecruiterApplyError";
import { getSpecificJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApplyForm from "./JobApplyForm";

import { FadeUpWrapper } from "@/components/animation/MotionWrappers";
import { getapplicatAppliedJobs } from "@/lib/api/application";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;

  // 1. Authentication Check
  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  const isSeeker = user.role === "seeker";
  const job = isSeeker ? await getSpecificJobById(id) : null;
  const applicantAppliedJobs = await getapplicatAppliedJobs(user.id);
  console.log(applicantAppliedJobs);
  const plan = {
    type: "free",
    maxApplicationsCount: 3,
  };
  const isLimitOver = applicantAppliedJobs.length >= plan.maxApplicationsCount;
  let renderContent;

  if (!isSeeker) {
    renderContent = <RecruiterApplyError userRole={user.role} jobId={id} />;
  } else if (isLimitOver) {
    renderContent = (
      <div className="py-28 max-w-xl mx-auto px-4 text-center font-sans">
        <div className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.05] rounded-[32px] p-8 sm:p-12 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
              Application Limit Reached
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
              You have already applied to <span className="font-bold text-zinc-800 dark:text-zinc-200">{applicantAppliedJobs.length}/{plan.maxApplicationsCount}</span> jobs allowed on your current <span className="capitalize font-bold text-indigo-500">{plan.type}</span> tier.
            </p>
          </div>
          <div className="pt-2">
            <button className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99]">
              Upgrade Membership
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    renderContent = <JobApplyForm jobData={job} applicant={user} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 relative overflow-hidden transition-colors duration-500 font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-indigo-500/[0.04] dark:bg-indigo-600/[0.05] blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <FadeUpWrapper delay={0.1}>
         {renderContent}
        </FadeUpWrapper>
      </div>
    </div>
  );
};

export default JobApplyPage;
