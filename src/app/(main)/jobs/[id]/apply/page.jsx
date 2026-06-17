import RecruiterApplyError from "@/components/jobs/RecruiterApplyError";
import { getSpecificJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApplyForm from "./JobApplyForm";

// 🎬 Importing your custom framer-motion wrapper
import { FadeUpWrapper } from "@/components/animation/MotionWrappers";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;

  // 1. Authentication Check
  const user = await getUserSession();
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // 2. Determine Role Condition & Resolve Core Data Fetching
  const isSeeker = user.role === "seeker";
  const job = isSeeker ? await getSpecificJobById(id) : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 relative overflow-hidden transition-colors duration-500 font-sans">
      
      {/* Premium Ambient Top Aura - Consistent Across Both Views */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-indigo-500/[0.04] dark:bg-indigo-600/[0.05] blur-[160px] rounded-full pointer-events-none" />

      {/* Main Content Render Box */}
      <div className="relative z-10">
        <FadeUpWrapper delay={0.1}>
          {isSeeker ? (
            <JobApplyForm jobData={job} applicant={user} />
          ) : (
            <RecruiterApplyError jobId={id} />
          )}
        </FadeUpWrapper>
      </div>

    </div>
  );
};

export default JobApplyPage;