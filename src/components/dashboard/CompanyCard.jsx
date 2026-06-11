import Image from "next/image";
import { MapPin, Users, ExternalLink } from "lucide-react";

export default function CompanyCard({ company }) {
  const isApproved = company.status === "approved";

  return (
    <div className="flex flex-col bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05] p-6 hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-zinc-100 dark:border-white/10 shrink-0">
            <Image 
              src={company.logo} 
              alt={`${company.name} logo`} 
              width={40} 
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white leading-tight">
              {company.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {company.industry}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md ${
          isApproved 
            ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10" 
            : "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10"
        }`}>
          {company.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
        {company.description}
      </p>

      {/* Meta Info (Location & Employees) */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Users size={14} className="shrink-0" />
          <span className="truncate">{company.employeeRange}</span>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.05]">
        <a 
          href={company.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ExternalLink size={14} />
          Visit Website
        </a>
      </div>
    </div>
  );
}