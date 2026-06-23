import ApplicationRow from "@/components/dashboard/seeker/ApplicationRow";
import StatCard from "@/components/dashboard/seeker/StatCard";
import { getapplicatAppliedJobs } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import { Download, Briefcase, Sparkles } from "lucide-react";



const SeekerApplicationsPage = async () => {
  const user = await getUserSession();
  const applications = await getapplicatAppliedJobs(user?.id);

  const totalApplied = applications?.length || 0;
  const dummyShortlisted = Math.floor(totalApplied * 0.3); 
  const dummyInterviews = Math.floor(totalApplied * 0.1);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8 p-1">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1">
            <Sparkles size={10} /> Dashboard
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            My Applications
          </h1>
          <p className="text-neutral-500 dark:text-zinc-400 text-sm font-medium">
            Track your job applications and interview progress in real-time.
          </p>
        </div>
        
        {/* Actions Button / Tabs */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="bg-neutral-100 dark:bg-[#09090b]/80 p-1 rounded-xl border border-neutral-200/60 dark:border-white/[0.06] flex items-center">
            <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-white dark:bg-zinc-900 text-neutral-900 dark:text-white shadow-sm border border-neutral-200/40 dark:border-transparent">
              Active
            </button>
            <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg text-neutral-400 dark:text-zinc-500 hover:text-neutral-600 dark:hover:text-zinc-300 transition-colors">
              Archived
            </button>
          </div>
          
          <button className="flex items-center gap-2 h-9 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm">
            <Download size={14} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Applied" value={totalApplied} />
        <StatCard title="Shortlisted" value={dummyShortlisted} />
        <StatCard title="Interviews" value={dummyInterviews} valueColor="text-amber-600 dark:text-amber-400" />
        <StatCard title="Success Rate" value="12%" valueColor="text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Luxury Table Container */}
      <div className="bg-white dark:bg-[#09090b]/20 backdrop-blur-xl border border-neutral-200/60 dark:border-white/[0.06] rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50/70 dark:bg-[#09090b]/60 border-b border-neutral-200/60 dark:border-white/[0.06] text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-bold">Job Title</th>
                <th className="px-6 py-4 font-bold">Company</th>
                <th className="px-6 py-4 font-bold">Applied Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/20 dark:divide-white/[0.02]">
              {applications?.length > 0 ? (
                applications.map((app) => (
                  <ApplicationRow key={app._id} app={app} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-neutral-400 dark:text-zinc-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-zinc-900 flex items-center justify-center border border-neutral-200/40 dark:border-white/[0.04]">
                        <Briefcase size={20} className="text-neutral-400 dark:text-zinc-600" />
                      </div>
                      <p className="text-sm font-medium">You haven't applied to any jobs yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SeekerApplicationsPage;