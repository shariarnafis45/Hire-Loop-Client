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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RecruiterNewJobPost() {
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

    const finalJobData = {
      ...formData,
      jobType,
      isRemote,
      location: isRemote ? "Remote Worldwide" : formData.location,
    };

    console.log(finalJobData);
  };

  // Glassy input field styling
  const inputClassName =
    "w-full px-4 py-3 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-700/50 rounded-2xl text-[14px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500/70 dark:placeholder:text-zinc-500 backdrop-blur-md focus:outline-none focus:bg-white/80 dark:focus:bg-zinc-900/80 focus:border-blue-500/50 dark:focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-300";

  // Glassy Card container styling
  const cardClassName =
    "p-6 md:p-8 rounded-[2rem] bg-white/60 dark:bg-[#121212]/60 border border-white/80 dark:border-zinc-800/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden";

  return (
    <div className="relative max-w-4xl mx-auto pb-12">
      {/* Subtle Ambient Background for the Glass effect to pop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent dark:from-blue-600/10 dark:via-purple-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header & Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/recruiter/jobs"
          className="flex items-center justify-center w-11 h-11 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Post a New Job
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
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
        {/* Company Context Banner - Glassy Gradient */}
        <div className="flex items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100/50 dark:border-blue-800/30 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
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
        <div className={cardClassName}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20" />
          <h2 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2.5">
            <div className="w-2 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2 space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Job Title *
              </label>
              <div className="relative">
                <Briefcase
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  className={`${inputClassName} pl-11`}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`${inputClassName} appearance-none cursor-pointer`}
              >
                <option value="">Select a category</option>
                <option value="engineering">Software Engineering</option>
                <option value="design">Design & UI/UX</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            {/* Application Deadline */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Application Deadline *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className={`${inputClassName} pl-11 cursor-pointer`}
                />
              </div>
            </div>

            {/* Job Type Pills */}
            <div className="md:col-span-2 space-y-3 mt-2">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Job Type *
              </label>
              <div className="flex flex-wrap gap-2.5">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-300 border
                      ${
                        jobType === type
                          ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-md transform scale-[1.02]"
                          : "bg-white/50 border-zinc-200/60 text-zinc-600 hover:bg-white dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-400 dark:hover:bg-zinc-800 backdrop-blur-sm"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Grid Container - Inner Glass */}
            <div className="md:col-span-2 space-y-3 p-5 mt-2 rounded-[1.5rem] bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 ml-1">
                Salary Range
                <Info size={14} className="text-zinc-400" />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                  <select
                    name="salaryCurrency"
                    value={formData.salaryCurrency}
                    onChange={handleChange}
                    className={`${inputClassName} pl-10 appearance-none cursor-pointer`}
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="BDT (৳)">BDT (৳)</option>
                    <option value="EUR (€)">EUR (€)</option>
                  </select>
                </div>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="Minimum"
                  className={inputClassName}
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="Maximum"
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Location & Remote Toggle */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-end mt-2">
              <div className="flex-1 space-y-2.5 w-full">
                <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
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
                    className={`${inputClassName} pl-11 ${
                      isRemote &&
                      "opacity-50 cursor-not-allowed bg-zinc-100/50 dark:bg-zinc-950/50 border-dashed"
                    }`}
                  />
                </div>
              </div>

              {/* Fully Remote Button - Modern Toggle Look */}
              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`shrink-0 flex items-center gap-3 h-[50px] px-5 rounded-2xl border transition-all duration-300
                  ${
                    isRemote
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-md"
                      : "bg-white/50 border-zinc-200/60 text-zinc-700 hover:bg-white dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-400 dark:hover:bg-zinc-800 backdrop-blur-sm"
                  }
                `}
              >
                <div
                  className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center transition-colors
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
        <div className={cardClassName}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
          <h2 className="text-[17px] font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2.5">
            <div className="w-2 h-6 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            Job Description
          </h2>

          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Responsibilities *
              </label>
              <textarea
                name="responsibilities"
                required
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="What will this person do day-to-day?"
                className={`${inputClassName} min-h-[140px] resize-y`}
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                Requirements *
              </label>
              <textarea
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Must-haves and nice-to-haves..."
                className={`${inputClassName} min-h-[140px] resize-y`}
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between ml-1">
                Benefits & Perks
                <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100/80 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  Optional
                </span>
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Health insurance, PTO, gym memberships..."
                className={`${inputClassName} min-h-[100px] resize-y`}
              />
            </div>
          </div>
        </div>

        {/* Form Actions (Cancel & Post) */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Link
            href="/dashboard/recruiter/jobs"
            className="px-6 py-3 rounded-2xl text-[14px] font-semibold text-zinc-600 hover:text-zinc-900 bg-transparent hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden group flex items-center justify-center min-w-[180px] gap-2 px-8 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-bold shadow-[0_8px_20px_rgb(0,0,0,0.15)] dark:shadow-[0_8px_20px_rgb(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
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
