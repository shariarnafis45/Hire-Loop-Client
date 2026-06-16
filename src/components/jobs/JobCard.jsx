import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Briefcase, Globe2, Building2, Timer, ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => {
    // 🌟 Safely extract data from MongoDB raw JSON format
    const actualId = job._id?.$oid || job._id || job.id;
    const isRemote = job.isRemote;
    
    // Format Salary securely (e.g. Extracting currency symbol and joining min-max)
    const currencySymbol = job.salaryCurrency?.match(/[$€£৳₹]/)?.[0] || '$';
    const hasSalary = job.salaryMin && job.salaryMax;
    
    // Format Dates
    const deadlineDate = job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
    const createdDateRaw = job.createdAt?.$date || job.createdAt;
    const isNew = createdDateRaw && (new Date() - new Date(createdDateRaw)) < 3 * 24 * 60 * 60 * 1000; // 3 days

    return (
        <div className="group relative w-full bg-white/40 dark:bg-[#0a0a0c]/40 backdrop-blur-xl border border-zinc-200/60 dark:border-white/[0.04] hover:border-indigo-500/40 dark:hover:border-indigo-500/30 rounded-[20px] p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] dark:shadow-none dark:hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.1)] flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-center">
            
            {/* 🌟 Subtle Ambient Glow (Visible on hover) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* 🏢 Logo Area (Left) */}
            <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-[#121214] border border-zinc-200/80 dark:border-white/[0.08] rounded-2xl flex items-center justify-center p-2.5 shadow-sm group-hover:scale-[1.03] transition-transform duration-500 z-10">
                {job.companyLogo ? (
                    <Image 
                        src={job.companyLogo} 
                        alt={`${job.companyName} logo`} 
                        width={48} 
                        height={48} 
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <Building2 className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
                )}
            </div>

            {/* 📝 Core Job Details (Middle) */}
            <div className="flex-1 min-w-0 z-10">
                {/* Meta Header */}
                <div className="flex items-center gap-3 mb-1.5">
                    <Link href={`/companies/${job.companyId}`} className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {job.companyName}
                    </Link>
                    {isNew && (
                        <span className="px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                            New
                        </span>
                    )}
                </div>
                
                {/* Job Title */}
                <Link href={`/jobs/${actualId}`} className="block group/title w-fit mb-3 sm:mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition-colors truncate">
                        {job.title}
                    </h2>
                </Link>

                {/* Badges / Tags (UX Optimized for Scanning) */}
                <div className="flex flex-wrap gap-2.5">
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.03] text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                        <MapPin size={14} className="text-zinc-400 dark:text-zinc-500" />
                        <span className="truncate max-w-[150px]">{job.location}</span>
                    </div>

                    {/* Remote Badge */}
                    {isRemote && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            <Globe2 size={14} className="text-emerald-500" />
                            <span>Remote</span>
                        </div>
                    )}

                    {/* Job Type Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.03] text-xs font-semibold text-zinc-600 dark:text-zinc-400 capitalize">
                        <Briefcase size={14} className="text-zinc-400 dark:text-zinc-500" />
                        <span>{job.jobType}</span>
                    </div>
                </div>
            </div>

            {/* 💰 Salary & Action (Right side on Desktop, Bottom on Mobile) */}
            <div className="flex flex-col sm:items-end justify-center shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-200/80 dark:border-white/[0.05] z-10 w-full sm:w-auto">
                
                {/* Salary Info */}
                <div className="flex sm:flex-col justify-between items-center sm:items-end mb-4 sm:mb-5">
                    {hasSalary ? (
                        <p className="text-base sm:text-[17px] font-black text-zinc-900 dark:text-white flex items-baseline gap-0.5">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{currencySymbol}</span>
                            {job.salaryMin} - {job.salaryMax}
                        </p>
                    ) : (
                        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Negotiable</p>
                    )}
                    
                    {/* Deadline */}
                    {deadlineDate && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 mt-1 sm:mt-1.5 bg-zinc-100/50 dark:bg-white/[0.02] px-2 py-0.5 rounded-md">
                            <Timer size={12} className="text-rose-500" />
                            <span>Apply by {deadlineDate}</span>
                        </div>
                    )}
                </div>

                {/* Apply Button */}
                <Link 
                    href={`/jobs/${actualId}`}
                    className="group/btn w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-bold rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98]"
                >
                    <span>View Details</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>

            </div>

        </div>
    );
};

export default JobCard;