"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Briefcase,
  Building2,
  User,
  Mail,
  Link2,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/MotionWrappers";
import { addJobApplication } from "@/lib/actions/application";

const JobApplyForm = ({ jobData, applicant }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    coverLetter: "",
  });

  const currencySymbol = jobData?.salaryCurrency?.match(/[$€£৳₹]/)?.[0] || "$";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading("Submitting application...", {
      style: {
        background: "transparent",
        boxShadow: "none",
        color: "transparent",
      },
    });
    const newApplicationData = {
      ...formData,
      jobId: jobData._id,
      jobTitle: jobData.title,
      companyName: jobData.companyName,
      applicantName: applicant.name,
      applicantEmail: applicant.email,
    };

    try {
      const applicantionData = await addJobApplication(newApplicationData);
      toast.dismiss(loadingToast);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
        >
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Application Submitted!
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              Your profile has been shared with {jobData?.companyName}.
            </p>
          </div>
        </div>
      ));

      router.push("/jobs");
      
    } catch (error) {
      toast.dismiss(loadingToast);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-red-100 dark:border-red-900/30`}
        >
          <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/20 p-2 rounded-full">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Submission Failed
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              Something went wrong. Please try again later.
            </p>
          </div>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-28 max-w-3xl mx-auto px-4 relative z-10 font-sans">
      <StaggerContainer className="space-y-8">
        <StaggerItem>
          <div className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.05] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 w-12 h-12 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-white/[0.08] rounded-xl flex items-center justify-center p-2 shadow-xs">
                {jobData?.companyLogo ? (
                  <Image
                    src={jobData.companyLogo}
                    alt={jobData.companyName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-zinc-400" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-0.5">
                  Applying For
                </span>
                <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                  {jobData?.title}
                </h2>
                {/* Fixed missing opening bracket below */}
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                  {jobData?.companyName} • {jobData?.location}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Compensation
              </span>
              <span className="text-sm font-black text-zinc-800 dark:text-zinc-200">
                {currencySymbol}
                {jobData?.salaryMin} - {currencySymbol}
                {jobData?.salaryMax}{" "}
                <span className="text-[11px] font-medium text-zinc-400">
                  /mo
                </span>
              </span>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.05] rounded-[24px] p-6 sm:p-10 shadow-md space-y-6"
          >
            {/* Read-Only Profile Segment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-6 border-b border-zinc-200 dark:border-white/[0.05]">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2">
                  <User size={12} /> Full Name
                </label>
                <input
                  type="text"
                  value={applicant?.name}
                  readOnly
                  className="w-full bg-zinc-100/80 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.04] text-zinc-600 dark:text-zinc-400 text-sm font-semibold rounded-xl px-4 py-3 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  type="email"
                  value={applicant?.email}
                  readOnly
                  className="w-full bg-zinc-100/80 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.04] text-zinc-600 dark:text-zinc-400 text-sm font-semibold rounded-xl px-4 py-3 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <FileText size={12} className="text-indigo-500" /> Resume Link{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                name="resumeLink"
                required
                value={formData.resumeLink}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/file/d/.../view"
                className="w-full bg-white dark:bg-[#030303]/40 border border-zinc-200 dark:border-white/[0.06] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Link2 size={12} className="text-indigo-500" /> Portfolio or
                GitHub URL
              </label>
              <input
                type="url"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
                className="w-full bg-white dark:bg-[#030303]/40 border border-zinc-200 dark:border-white/[0.06] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-medium rounded-xl px-4 py-3.5 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Briefcase size={12} className="text-indigo-500" /> Cover Letter
                / Summary
              </label>
              <textarea
                name="coverLetter"
                rows={5}
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell the hiring team why you're a great fit for this role..."
                className="w-full bg-white dark:bg-[#030303]/40 border border-zinc-200 dark:border-white/[0.06] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-medium rounded-xl p-4 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none leading-relaxed shadow-xs"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/70 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/10 transition-all duration-200 active:scale-[0.99] group/btn"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Premium Application</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
};

export default JobApplyForm;
