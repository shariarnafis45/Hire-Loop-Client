import { Briefcase, Building2, CalendarDays, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import StatusBadge from "./StatusBadge";

const ApplicationRow = ({ app }) => {
  return (
    <tr className="hover:bg-neutral-50/60 dark:hover:bg-zinc-900/20 transition-colors group border-b border-neutral-200/40 dark:border-white/[0.04] last:border-0">
      {/* Job Title */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-900 text-neutral-600 dark:text-amber-400/90 flex items-center justify-center border border-neutral-200/60 dark:border-white/[0.06] group-hover:border-amber-500/30 dark:group-hover:border-amber-400/30 transition-colors">
            <Briefcase size={18} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-neutral-900 dark:text-zinc-100 font-semibold text-sm transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {app.jobTitle}
            </p>
            <span className="text-xs text-neutral-400 dark:text-zinc-500 mt-0.5 block font-medium">
              Full-time • Remote
            </span>
          </div>
        </div>
      </td>
      
      {/* Company */}
      <td className="px-6 py-5 text-neutral-600 dark:text-zinc-400 font-medium text-sm">
        <div className="flex items-center gap-2">
          <Building2 size={15} className="text-neutral-400 dark:text-zinc-600" />
          {app.companyName}
        </div>
      </td>
      
      {/* Applied Date */}
      <td className="px-6 py-5 text-neutral-500 dark:text-zinc-400 text-sm font-medium">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-neutral-400 dark:text-zinc-600" />
          {app.createdAt ? formatDistanceToNow(new Date(app.createdAt), { addSuffix: true }) : "N/A"}
        </div>
      </td>
      
      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={app.status} /> 
      </td>
      
      {/* Action */}
      <td className="px-6 py-5 text-right">
        <button className="text-neutral-400 hover:text-neutral-900 dark:text-zinc-500 dark:hover:text-amber-400 inline-flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wider transition-all group-hover:translate-x-0.5">
          Details
          <ChevronRight size={14} />
        </button>
      </td>
    </tr>
  );
};

export default ApplicationRow;