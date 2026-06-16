import { getCompanyJobs } from "@/lib/api/jobs";
import RecruiterJobsTable from "@/components/dashboard/RecruiterJobsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getLoggedInRecruiterCompanies } from "@/lib/api/companies";

export default async function RecruiterJobsDashBoard() {
  const company = await getLoggedInRecruiterCompanies();

  const jobsData = (await getCompanyJobs(company._id)) || [];
  console.log(jobsData);

  return (
    <div className="space-y-8">
      {/* Top Header Row with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Manage Job Postings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            View, edit, close, and track performance of your active listings.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex items-center justify-center gap-2 px-5 min-h-[46px] rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-semibold transition-all duration-300 hover:scale-[1.02] shadow-sm shrink-0"
        >
          <Plus size={18} />
          Post a New Job
        </Link>
      </div>

      {/* Main Table Component */}
      <RecruiterJobsTable jobs={jobsData} />
    </div>
  );
}
