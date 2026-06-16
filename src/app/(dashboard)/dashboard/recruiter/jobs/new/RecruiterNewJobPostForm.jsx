"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Info,
  Building2,
  ChevronLeft,
  Loader2,
  LayoutGrid,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createNewJob } from "@/lib/actions/jobs";

export default function RecruiterNewJobPostForm({company}) {
  console.log(company);
  const router = useRouter();

  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    deadline: "",
    salaryCurrency: "USD ($)",
    salaryMin: "",
    salaryMax: "",
    location: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    const status = "active";

    const finalJobData = {
      ...formData,
      jobType,
      isRemote,
      location: isRemote ? "Remote Worldwide" : formData.location,
      companyId: company[0]._id, 
      companyName : company[0].name,
      companyLogo : company[0].logo,
      status: status,
    };

    try {
      const newJobAdd = await createNewJob(finalJobData);
      console.log('final data ', finalJobData);
      console.log("company data", company);

      if (newJobAdd.acknowledged) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
          >
            <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                Job Posted Successfully!
              </p>
              <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                "{finalJobData.title}" is now live.
              </p>
            </div>
          </div>
        ));
      }
      router.push("/dashboard/recruiter/jobs");
      router.refresh();
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-red-100 dark:border-red-900/30`}
        >
          <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/20 p-2 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Submission Failed
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              {error.message || "Something went wrong. Please try again."}
            </p>
          </div>
        </div>
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClassName =
    "w-full min-h-[50px] px-4 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-700/50 rounded-2xl text-[14px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500/70 dark:placeholder:text-zinc-500 backdrop-blur-md focus:outline-none focus:bg-white/90 dark:focus:bg-[#18181B]/90 focus:border-indigo-500/50 dark:focus:border-indigo-400/50 focus:ring-[4px] focus:ring-indigo-500/15 dark:focus:ring-indigo-400/15 transition-all duration-300";

  // Reusable label component for pixel-perfect vertical alignment
  const Label = ({ children, optional }) => (
    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center justify-between">
      {children}
      {optional && (
        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100/80 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
          Optional
        </span>
      )}
    </label>
  );

  return (
    <div className="relative max-w-4xl mx-auto pb-12">
      {/* Subtle Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-600/10 dark:via-purple-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header & Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/recruiter/jobs"
          className="flex items-center justify-center w-[50px] h-[50px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft size={22} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Post a New Job
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Design your ideal role to attract top-tier talent.
          </p>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Context Banner */}
        <div className="flex items-start sm:items-center justify-between gap-4 p-5 rounded-[1.5rem] bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100/50 dark:border-indigo-800/30 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/80 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-sm">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">
                Google Inc.
              </p>
              <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                Growth Plan •{" "}
                <span className="text-zinc-700 dark:text-zinc-300">
                  7/10 active jobs used
                </span>
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            Approved
          </span>
        </div>

        {/* SECTION 1: Job Info */}
        <div className="p-6 md:p-8 rounded-[2rem] bg-white/60 dark:bg-[#121212]/60 border border-white/80 dark:border-zinc-800/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20" />
          <h2 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2.5">
            <div className="w-2 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            {/* Job Title */}
            <div className="md:col-span-2">
              <Label>Job Title *</Label>
              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  className={`${baseInputClassName} pl-11`}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <Label>Category *</Label>
              <div className="relative">
                <LayoutGrid
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  size={18}
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`${baseInputClassName} pl-11 pr-10 appearance-none cursor-pointer`}
                >
                  <option value="">Select a category</option>
                  <option value="engineering">Software Engineering</option>
                  <option value="design">Design & UI/UX</option>
                  <option value="marketing">Marketing</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <Label>Application Deadline *</Label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className={`${baseInputClassName} pl-11 cursor-pointer`}
                />
              </div>
            </div>

            {/* Job Type Pills */}
            <div className="md:col-span-2">
              <Label>Job Type *</Label>
              <div className="flex flex-wrap gap-2.5">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`h-[42px] px-5 rounded-xl text-[13px] font-medium transition-all duration-300 border
                      ${
                        jobType === type
                          ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-md transform scale-[1.02]"
                          : "bg-white/50 border-zinc-200/80 text-zinc-600 hover:bg-white dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-400 dark:hover:bg-zinc-800/80 backdrop-blur-sm"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Grid Container */}
            <div className="md:col-span-2 p-5 rounded-[1.5rem] bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/50 backdrop-blur-sm">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-3">
                Salary Range
                <Info size={14} className="text-zinc-400" />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                  />
                  <select
                    name="salaryCurrency"
                    value={formData.salaryCurrency}
                    onChange={handleChange}
                    className={`${baseInputClassName} pl-11 pr-10 appearance-none cursor-pointer`}
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="BDT (৳)">BDT (৳)</option>
                    <option value="EUR (€)">EUR (€)</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={16}
                  />
                </div>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="Minimum"
                  className={baseInputClassName}
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="Maximum"
                  className={baseInputClassName}
                />
              </div>
            </div>

            {/* Location & Remote Toggle */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={18}
                  />
                  <input
                    type="text"
                    name="location"
                    value={isRemote ? "" : formData.location}
                    onChange={handleChange}
                    disabled={isRemote}
                    placeholder={
                      isRemote ? "Remote Worldwide" : "e.g. San Francisco, CA"
                    }
                    className={`${baseInputClassName} pl-11 ${
                      isRemote &&
                      "opacity-50 cursor-not-allowed bg-zinc-100/50 dark:bg-zinc-950/50 border-dashed"
                    }`}
                  />
                </div>
              </div>

              {/* Fully Remote Button */}
              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`shrink-0 flex items-center gap-3 min-h-[50px] px-5 rounded-2xl border transition-all duration-300
                  ${
                    isRemote
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-md"
                      : "bg-white/50 border-zinc-200/80 text-zinc-700 hover:bg-white dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-400 dark:hover:bg-zinc-800/80 backdrop-blur-sm"
                  }
                `}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center transition-colors
                  ${isRemote ? "border-white dark:border-zinc-900" : "border-zinc-400 dark:border-zinc-600"}
                `}
                >
                  {isRemote && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white dark:bg-zinc-900 rounded-full"
                    />
                  )}
                </div>
                <span className="text-[14px] font-semibold">Fully Remote</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Job Description */}
        <div className="p-6 md:p-8 rounded-[2rem] bg-white/60 dark:bg-[#121212]/60 border border-white/80 dark:border-zinc-800/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
          <h2 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2.5">
            <div className="w-2 h-6 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            Job Description
          </h2>

          <div className="space-y-6">
            <div>
              <Label>Responsibilities *</Label>
              <textarea
                name="responsibilities"
                required
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="What will this person do day-to-day?"
                className={`${baseInputClassName} py-4 min-h-[140px] resize-y`}
              />
            </div>

            <div>
              <Label>Requirements *</Label>
              <textarea
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Must-haves and nice-to-haves..."
                className={`${baseInputClassName} py-4 min-h-[140px] resize-y`}
              />
            </div>

            <div>
              <Label optional>Benefits & Perks</Label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Health insurance, PTO, gym memberships..."
                className={`${baseInputClassName} py-4 min-h-[100px] resize-y`}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Link
            href="/dashboard/recruiter/jobs"
            className="px-6 min-h-[50px] flex items-center rounded-2xl text-[14px] font-semibold text-zinc-600 hover:text-zinc-900 bg-transparent hover:bg-zinc-100/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/80 transition-all duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden group flex items-center justify-center min-w-[180px] gap-2 px-8 min-h-[50px] rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-bold shadow-[0_8px_20px_rgb(0,0,0,0.15)] dark:shadow-[0_8px_20px_rgb(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin relative z-10" />
                <span className="relative z-10">Posting...</span>
              </>
            ) : (
              <span className="relative z-10">Post Job Publicly</span>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
