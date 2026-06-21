import RecruiterApplyError from "@/components/jobs/RecruiterApplyError";
import { getSpecificJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApplyForm from "./JobApplyForm";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

import { FadeUpWrapper } from "@/components/animation/MotionWrappers";
import { getapplicatAppliedJobs } from "@/lib/api/application";
import { getPlanById } from "@/lib/api/plans";

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

  const planData = await getPlanById(user?.plan || "seeker_free");
  const plan = planData[0];
  console.log(plan);

  const currentCount = applicantAppliedJobs.length;
  const isLimitOver = currentCount >= plan.maxApplicationsCount;

  let renderContent;

  if (!isSeeker) {
    renderContent = <RecruiterApplyError userRole={user.role} jobId={id} />;
  } else if (isLimitOver) {
    // Premium & Clean Limit Reached UI State
    renderContent = (
      <div className="py-24 max-w-xl mx-auto px-4 text-center font-sans">
        <div className="relative bg-white/80 dark:bg-[#09090b]/60 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.06] rounded-[32px] p-8 sm:p-12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Top Decorative Subtle Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/10 dark:bg-amber-500/[0.06] blur-2xl rounded-full pointer-events-none" />

          {/* Premium Icon Badge */}
          <div className="relative w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20 mb-8 shadow-inner">
            <AlertTriangle size={28} strokeWidth={1.75} />
          </div>

          {/* Header Typography */}
          <div className="space-y-3 mb-8">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight sm:text-3xl">
              Application Limit Reached
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
              You've utilized all available slots on your current{" "}
              <span className="capitalize font-bold text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                {plan.type}
              </span>{" "}
              tier. Upgrade to unlock unlimited leverage.
            </p>
          </div>

          {/* Visual Progress Meter */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.04] rounded-2xl p-5 mb-8 text-left">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              <span>Monthly Quota</span>
              <span className="text-zinc-900 dark:text-white font-black">
                {currentCount} / {plan.maxApplicationsCount} Used
              </span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((currentCount / plan.maxApplicationsCount) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Dynamic Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/jobs"
              className="flex-1 order-2 sm:order-1 h-12 inline-flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all border border-transparent dark:border-zinc-800/60"
            >
              Explore Other Jobs
            </Link>

            <Link
              href="/pricing"
              className="flex-1 order-1 sm:order-2 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/10 dark:shadow-none group"
            >
              <Sparkles size={14} className="opacity-80" />
              Upgrade Plan
              <ArrowRight
                size={14}
                className="opacity-70 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    renderContent = <JobApplyForm jobData={job} applicant={user} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 relative overflow-hidden transition-colors duration-500 font-sans">
      {/* Premium Ambient Background Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-indigo-500/[0.03] dark:bg-indigo-600/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10">
        <FadeUpWrapper delay={0.1}>{renderContent}</FadeUpWrapper>
      </div>
    </div>
  );
};

export default JobApplyPage;
