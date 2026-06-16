import Image from "next/image";
import { MapPin, Users, ExternalLink, Pencil, Building } from "lucide-react";

export default function CompanyCard({ company, onEdit }) {
  const isApproved = company.status === "approved";
  const isPending = company.status === "pending";

  // 🌟 Dynamic Logo Color Logic: Company data theke brandColor nibe (e.g. #3b82f6 or #d4a359), na thakle default gold/amber
  const brandColor = company.brandColor || "#d4a359"; 

  return (
    <div className="group relative w-full bg-white dark:bg-[#0d0d0f] rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-700/80 overflow-hidden">
      
      {/* 🌟 Dynamic Top Premium Banner Layout */}
      <div 
        className="w-full h-32 sm:h-44 relative bg-zinc-100 dark:bg-[#131316] border-b border-zinc-200/60 dark:border-zinc-800/40 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 120%, var(--glow-color), transparent 70%)',
          '--glow-color': `${brandColor}15` // Dynamic brand color glow background
        }}
      >
        {/* Abstract pattern to look high-end */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Floating Top Glow Component */}
        <div 
          className="absolute -top-20 right-10 w-72 h-72 blur-[100px] rounded-full opacity-40 pointer-events-none transition-all duration-700 group-hover:opacity-60"
          style={{ backgroundColor: brandColor }}
        />
      </div>

      {/* 🌟 Absolute Floating Edit Pill */}
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          onEdit(company);
        }}
        className="absolute top-6 right-6 group/btn flex items-center justify-center overflow-hidden h-10 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 hover:border-transparent dark:hover:border-transparent rounded-full text-zinc-600 dark:text-zinc-300 hover:text-white transition-all duration-500 z-10 shadow-sm"
        style={{ '--hover-bg': brandColor }}
        aria-label="Edit Company"
      >
        {/* CSS trick to inject brand color on hover safely without tailwind compilation limits */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: brandColor }}
        />
        <div className="relative flex items-center gap-1.5 px-3.5 w-10 group-hover/btn:w-[88px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] text-zinc-700 dark:text-zinc-300 group-hover/btn:text-zinc-950">
          <Pencil size={15} className="shrink-0 transition-transform duration-300 group-hover/btn:rotate-12" />
          <span className="text-[12px] font-bold tracking-wider uppercase whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 delay-75">
            Edit
          </span>
        </div>
      </button>

      {/* Main Grid Content: Fits everything perfectly on wide displays */}
      <div className="px-6 pb-8 sm:px-10 sm:pb-10 -mt-12 sm:-mt-16 relative z-10">
        
        {/* Profile Identity Row split on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Giant Luxury Logo Slot */}
            <div 
              className="w-24 h-24 sm:w-28 sm:h-28 bg-white dark:bg-[#111113] rounded-[24px] overflow-hidden flex items-center justify-center p-3 border-2 border-white dark:border-[#0d0d0f] shadow-md transition-all duration-500 group-hover:scale-[1.03]"
              style={{ boxShadow: `0 10px 30px -10px ${brandColor}30` }}
            >
              {company.logo ? (
                <Image 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  width={96} 
                  height={96} 
                  className="object-contain w-full h-full" 
                />
              ) : (
                <Building className="w-10 h-10 text-zinc-400" />
              )}
            </div>

            {/* Title & Industry */}
            <div className="space-y-1 sm:pt-4">
              <h3 
                className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
                style={{ '--brand-hover': brandColor }}
              >
                <span className="group-hover:text-[var(--brand-hover)] transition-colors duration-300">
                  {company.name}
                </span>
              </h3>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {company.industry}
              </p>
            </div>
          </div>

          {/* Status Badge right aligned */}
          <div className="lg:mb-2">
            <span className={`inline-flex items-center text-[11px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-xl border ${
              isApproved ? "text-emerald-700 bg-emerald-50/40 border-emerald-200/50 dark:text-emerald-400 dark:bg-emerald-500/5 dark:border-emerald-500/20" 
              : isPending ? "text-amber-600 bg-amber-50/40 border-amber-200/50 dark:text-amber-400 dark:bg-amber-500/5 dark:border-amber-500/20"
              : "text-rose-700 bg-rose-50/40 border-rose-200/50 dark:text-rose-400 dark:bg-rose-500/5 dark:border-rose-500/20"
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                isApproved ? "bg-emerald-500" : isPending ? "bg-amber-500" : "bg-rose-500"
              }`}></span>
              {company.status}
            </span>
          </div>
        </div>

        {/* Info Split Column (About text on left, details meta on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/40">
          
          {/* About Company Column */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Corporate Overview
            </h4>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {company.description}
            </p>
          </div>

          {/* Meta specs system right sidebar column */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between bg-zinc-50/50 dark:bg-[#131316]/40 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <MapPin size={12} style={{ color: brandColor }} /> Location
                </span>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 truncate">
                  {company.location}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <Users size={12} style={{ color: brandColor }} /> Workforce
                </span>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 truncate">
                  {company.employeeRange} Employees
                </p>
              </div>
            </div>

            {/* Visit Website Anchor button stylized dynamically */}
            <div className="pt-4 border-t border-zinc-200/40 dark:border-zinc-800/30 flex items-center justify-between">
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 group/link"
                style={{ '--link-color': brandColor }}
              >
                <span className="text-zinc-900 dark:text-zinc-400 group-hover/link:text-[var(--link-color)] transition-colors">
                  Launch Enterprise Website
                </span>
                <ExternalLink size={14} className="text-zinc-400 group-hover/link:text-[var(--link-color)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" /> 
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}