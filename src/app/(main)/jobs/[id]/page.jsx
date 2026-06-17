import { getSpecificJobById } from "@/lib/api/jobs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    MapPin, Briefcase, Globe2, Calendar, 
    ArrowLeft, Building2, CheckCircle2, 
    Star, ShieldCheck, ArrowUpRight 
} from "lucide-react";
import { AnimatedCounter, FadeUpWrapper, StaggerContainer, StaggerItem } from "@/components/animation/MotionWrappers";



const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const jobData = await getSpecificJobById(id);

    // 🛡️ Safety Check
    if (!jobData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#030303]">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Job Not Found</h2>
                    <Link href="/jobs" className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 justify-center">
                        <ArrowLeft size={16} /> Back to Browse Jobs
                    </Link>
                </div>
            </div>
        );
    }

    // 💰 Parsing Tools
    const currencySymbol = jobData.salaryCurrency?.match(/[$€£৳₹]/)?.[0] || '$';
    const deadlineDate = jobData.deadline ? new Date(jobData.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
    const postedDate = jobData.createdAt?.$date ? new Date(jobData.createdAt.$date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : null;

    // Convert Salary for AnimatedCounter
    const minSalary = parseInt(jobData.salaryMin) || 0;
    const maxSalary = parseInt(jobData.salaryMax) || 0;

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030303] relative overflow-hidden py-28 transition-colors duration-500 font-sans">
            
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-indigo-500/[0.05] dark:bg-indigo-600/[0.06] blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* ⬅️ Navigation */}
                <FadeUpWrapper delay={0.1}>
                    <Link 
                        href="/jobs" 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to all roles
                    </Link>
                </FadeUpWrapper>

                {/* 👑 Top Glassmorphic Box */}
                <FadeUpWrapper delay={0.2}>
                    <div className="bg-white/40 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.05] rounded-[24px] p-6 sm:p-8 shadow-sm mb-8">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                            
                            <div className="flex items-center gap-5">
                                {/* Company Logo */}
                                <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-[#121214] border border-zinc-200/80 dark:border-white/[0.08] rounded-2xl flex items-center justify-center p-3 shadow-sm">
                                    {jobData.companyLogo ? (
                                        <Image 
                                            src={jobData.companyLogo} 
                                            alt={`${jobData.companyName} logo`} 
                                            width={64} 
                                            height={64} 
                                            className="object-contain w-full h-full"
                                        />
                                    ) : (
                                        <Building2 className="w-8 h-8 text-zinc-400" />
                                    )}
                                </div>

                                {/* Title & Meta */}
                                <div>
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">
                                        {jobData.category}
                                    </span>
                                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                                        {jobData.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        <span className="font-bold text-zinc-800 dark:text-zinc-200">{jobData.companyName}</span>
                                        {postedDate && <span>• Posted {postedDate}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Badges Layout */}
                            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/[0.03] text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    <MapPin size={14} className="text-zinc-400" />
                                    {jobData.location}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/[0.03] text-xs font-bold text-zinc-700 dark:text-zinc-300 capitalize">
                                    <Briefcase size={14} className="text-zinc-400" />
                                    {jobData.jobType}
                                </div>
                                {jobData.isRemote && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                        <Globe2 size={14} />
                                        Remote Friendly
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </FadeUpWrapper>

                {/* 📊 Split Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column (Using Stagger Container) */}
                    <StaggerContainer className="lg:col-span-2 space-y-6">
                        
                        <StaggerItem>
                            <div className="bg-white/30 dark:bg-[#060608]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.04] rounded-[24px] p-6 sm:p-8 shadow-sm">
                                <h3 className="text-base font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Star size={16} className="text-indigo-500" />
                                    Core Responsibilities
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                    {jobData.responsibilities}
                                </p>
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <div className="bg-white/30 dark:bg-[#060608]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.04] rounded-[24px] p-6 sm:p-8 shadow-sm">
                                <h3 className="text-base font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-indigo-500" />
                                    Requirements & Capabilities
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                    {jobData.requirements}
                                </p>
                            </div>
                        </StaggerItem>

                        {jobData.benefits && (
                            <StaggerItem>
                                <div className="bg-white/30 dark:bg-[#060608]/40 backdrop-blur-xl border border-zinc-200/80 dark:border-white/[0.04] rounded-[24px] p-6 sm:p-8 shadow-sm">
                                    <h3 className="text-base font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-indigo-500" />
                                        Compensations & Perks
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                        {jobData.benefits}
                                    </p>
                                </div>
                            </StaggerItem>
                        )}
                    </StaggerContainer>

                    {/* Right Column: Sticky Action Panel */}
                    <FadeUpWrapper delay={0.4} className="lg:sticky lg:top-24 space-y-6">
                        <div className="bg-white/60 dark:bg-[#09090b]/50 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.05] rounded-[24px] p-6 shadow-md shadow-zinc-200/5 dark:shadow-none">
                            
                            {/* Animated Salary Matrix */}
                            <div className="mb-6 pb-6 border-b border-zinc-200/60 dark:border-white/[0.05]">
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5">Offered Compensation</span>
                                <h4 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-1">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{currencySymbol}</span>
                                    <AnimatedCounter value={minSalary} />
                                    <span className="mx-1 text-zinc-300 dark:text-zinc-700 font-light">-</span>
                                    <AnimatedCounter value={maxSalary} />
                                    <span className="text-xs font-semibold text-zinc-400 lowercase ml-1">/ month</span>
                                </h4>
                            </div>

                            {/* Info Layout */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                        <Calendar size={14} />
                                        <span>Application Deadline</span>
                                    </div>
                                    <span className="text-sm font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-lg">
                                        {deadlineDate}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                        <Briefcase size={14} />
                                        <span>Employment Structure</span>
                                    </div>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 capitalize">
                                        {jobData.jobType}
                                    </span>
                                </div>
                            </div>

                            {/* 🔥 Action Button */}
                            <Link href={`/jobs/${id}/apply`} className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 group/apply">
                                <span>Apply For This Position</span>
                                <ArrowUpRight size={16} className="group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5 transition-transform" />
                            </Link>

                            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 text-center mt-3">
                                Secure processing via {jobData.companyName} portal.
                            </p>
                        </div>
                    </FadeUpWrapper>

                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;