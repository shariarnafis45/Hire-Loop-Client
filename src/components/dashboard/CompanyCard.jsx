import Image from "next/image";
import { MapPin, Users, ExternalLink, Pencil } from "lucide-react";

export default function CompanyCard({ company, onEdit }) {
  const isApproved = company.status === "approved";
  const isPending = company.status === "pending";

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200/60 dark:border-white/[0.05] p-6 hover:border-zinc-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm hover:shadow-md dark:shadow-none">
      
      {/* 
        Top-Tier UX Edit Button (Expandable Pill)
        - Visible on touch screens (opacity-100)
        - Hidden on desktop until hover (lg:opacity-0 lg:group-hover:opacity-100)
      */}
      <button 
        onClick={(e) => {
          e.preventDefault(); // Event propagation prevent kore, futute e card e link add korle problem hobe na
          onEdit(company);
        }}
        className="absolute top-4 right-4 group/btn flex items-center justify-center overflow-hidden h-8 bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 z-10"
        aria-label="Edit Company"
      >
        <div className="flex items-center gap-1.5 px-2 w-8 group-hover/btn:w-[68px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Pencil size={14} className="shrink-0" />
          <span className="text-[13px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 delay-75">
            Edit
          </span>
        </div>
      </button>

      {/* Top Header Row */}
      <div className="flex justify-between items-start mb-4 pr-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white dark:bg-zinc-900/50 rounded-xl overflow-hidden flex items-center justify-center p-1.5 border border-zinc-100 dark:border-white/10 shrink-0">
            {company.logo ? (
              <Image 
                src={company.logo} 
                alt={`${company.name} logo`} 
                width={40} 
                height={40} 
                className="object-contain w-full h-full" 
              />
            ) : (
              <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-xs font-bold text-zinc-400">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {company.name}
            </h3>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              {company.industry}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Status Badge */}
      <div className="mb-5 mt-1">
        <span className={`inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${
          isApproved ? "text-emerald-700 bg-emerald-50 border-emerald-200/60 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20" 
          : isPending ? "text-amber-700 bg-amber-50 border-amber-200/60 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20"
          : "text-rose-700 bg-rose-50 border-rose-200/60 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20"
        }`}>
          {/* Chotto status dot add kora holo extra detailing er jonno */}
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            isApproved ? "bg-emerald-500" : isPending ? "bg-amber-500" : "bg-rose-500"
          }`}></span>
          {company.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
        {company.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-zinc-100 dark:border-white/[0.02]">
          <MapPin size={13} className="shrink-0 text-zinc-400" />
          <span className="truncate">{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-white/[0.02] px-2.5 py-1.5 rounded-lg border border-zinc-100 dark:border-white/[0.02]">
          <Users size={13} className="shrink-0 text-zinc-400" />
          <span className="truncate">{company.employeeRange}</span>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-zinc-100 dark:border-white/[0.05]">
        <a 
          href={company.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-900 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
        >
          <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /> 
          Visit Website
        </a>
      </div>
    </div>
  );
}