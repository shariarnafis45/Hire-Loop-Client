import { Clock, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

const StatusBadge = ({ status = "Applied" }) => {
  const statusConfig = {
    Applied: {
      className: "bg-amber-500/[0.06] dark:bg-amber-400/[0.03] text-amber-700 dark:text-amber-400 border-amber-500/20 dark:border-amber-400/20",
      icon: <Clock size={12} className="stroke-[2px]" />,
    },
    Review: {
      className: "bg-blue-500/[0.06] dark:bg-blue-400/[0.03] text-blue-700 dark:text-blue-400 border-blue-500/20 dark:border-blue-400/20",
      icon: <HelpCircle size={12} />,
    },
    Shortlisted: {
      className: "bg-emerald-500/[0.06] dark:bg-emerald-400/[0.03] text-emerald-700 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-400/20",
      icon: <CheckCircle2 size={12} />,
    },
    Rejected: {
      className: "bg-neutral-100 dark:bg-zinc-900 text-neutral-500 dark:text-zinc-400 border-neutral-200 dark:border-white/[0.06]",
      icon: <AlertCircle size={12} />,
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.Applied;

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border inline-flex items-center gap-1.5 select-none ${currentStatus.className}`}>
      {currentStatus.icon}
      {status}
    </span>
  );
};

export default StatusBadge;