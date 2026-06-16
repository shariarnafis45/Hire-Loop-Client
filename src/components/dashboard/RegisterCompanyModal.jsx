"use client";

import {
  X,
  UploadCloud,
  ChevronDown,
  Building2,
  Globe,
  MapPin,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import { addCompany } from "@/lib/actions/company";
import { useRouter } from "next/navigation";

export default function RegisterCompanyModal({
  isOpen,
  onClose,
  initialData = null,
  recruiter,
}) {
  const isEditMode = !!initialData;
  const fileInputRef = useRef(null);
  const router = useRouter();
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeRange: "1-10",
    logo: "",
    description: "",
  });

  // Loading States
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate data if in Edit Mode
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || "",
        industry: initialData.industry || "Technology",
        website: initialData.website
          ? initialData.website.replace("https://", "")
          : "",
        location: initialData.location || "",
        employeeRange: initialData.employeeRange || "1-10",
        logo: initialData.logo || "",
        description: initialData.description || "",
      });
    } else if (isOpen && !initialData) {
      // Reset form for new registration
      setFormData({
        name: "",
        industry: "Technology",
        website: "",
        location: "",
        employeeRange: "1-10",
        logo: "",
        description: "",
      });
    }
  }, [isOpen, initialData]);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Imgbb Upload Logic with Custom Toast
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading logo...");

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imageFormData,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.display_url }));

        // Custom Success Toast for Image
        toast.dismiss(toastId);
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
                Logo Uploaded Successfully!
              </p>
              <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                Your company logo is ready.
              </p>
            </div>
          </div>
        ));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      // Custom Error Toast for Image
      toast.dismiss(toastId);
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
              Upload Failed
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              Failed to upload image. Check your connection.
            </p>
          </div>
        </div>
      ));
    } finally {
      setIsUploading(false);
    }
  };

  // Form Submit Handler with Custom Toast & Edit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      website: formData.website ? `https://${formData.website}` : "",
      status: isEditMode ? initialData.status : "pending",
      recruiterId: recruiter.id,
    };

    try {
      if (isEditMode) {
        await updateCompany(initialData._id, payload);
      } else {
        await addCompany(payload);
      }

      // Simulate API delay (Remove this if your action returns a fast promise)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Custom Success Toast
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
              {isEditMode ? "Company Updated!" : "Registration Successful!"}
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
              {isEditMode
                ? `"${formData.name}" has been updated.`
                : `"${formData.name}" is pending approval.`}
            </p>
          </div>
        </div>
      ));

      onClose();
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
              {isEditMode ? "Update Failed" : "Submission Failed"}
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              {error?.message || "Something went wrong. Please try again."}
            </p>
          </div>
        </div>
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/40 dark:bg-black/80 backdrop-blur-[6px]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0c0c0e] rounded-2xl shadow-2xl border border-zinc-200/80 dark:border-white/[0.06] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-zinc-100 dark:border-white/[0.04]">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {isEditMode ? "Edit Company Details" : "Register New Company"}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {isEditMode
                    ? "Update your business information below."
                    : "Enter your business details to start hiring. Admin approval required."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-50 dark:bg-white/[0.03] rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              <form
                id="company-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Building2 size={14} className="text-zinc-400" />
                      Company Name
                    </label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g. Vercel Inc."
                      className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Industry / Category
                    </label>
                    <div className="relative group">
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 text-zinc-900 dark:text-zinc-100 appearance-none pr-10 cursor-pointer"
                      >
                        <option
                          value="Technology"
                          className="dark:bg-[#0c0c0e]"
                        >
                          Technology
                        </option>
                        <option
                          value="Healthcare"
                          className="dark:bg-[#0c0c0e]"
                        >
                          Healthcare
                        </option>
                        <option value="Finance" className="dark:bg-[#0c0c0e]">
                          Finance
                        </option>
                        <option
                          value="E-commerce"
                          className="dark:bg-[#0c0c0e]"
                        >
                          E-commerce
                        </option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Globe size={14} className="text-zinc-400" />
                      Website URL
                    </label>
                    <div className="flex border border-zinc-200 dark:border-white/[0.06] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-white/20">
                      <span className="px-3.5 bg-zinc-100 dark:bg-white/[0.02] text-zinc-400 text-sm border-r border-zinc-200 dark:border-white/[0.06] flex items-center font-medium">
                        https://
                      </span>
                      <input
                        required
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        type="text"
                        placeholder="vercel.com"
                        className="w-full px-3.5 py-2.5 bg-zinc-50/50 dark:bg-white/[0.01] text-sm focus:outline-none text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <MapPin size={14} className="text-zinc-400" />
                      Location
                    </label>
                    <input
                      required
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Employee Count */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Users size={14} className="text-zinc-400" />
                      Employee Range
                    </label>
                    <div className="relative group">
                      <select
                        name="employeeRange"
                        value={formData.employeeRange}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 text-zinc-900 dark:text-zinc-100 appearance-none pr-10 cursor-pointer"
                      >
                        <option value="1-10" className="dark:bg-[#0c0c0e]">
                          1-10 employees
                        </option>
                        <option value="11-50" className="dark:bg-[#0c0c0e]">
                          11-50 employees
                        </option>
                        <option value="51-200" className="dark:bg-[#0c0c0e]">
                          51-200 employees
                        </option>
                        <option value="201-500" className="dark:bg-[#0c0c0e]">
                          201-500 employees
                        </option>
                        <option value="500+" className="dark:bg-[#0c0c0e]">
                          500+ employees
                        </option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Functional Image Upload Zone */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Company Logo (Required)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />

                    <div
                      onClick={() => fileInputRef.current.click()}
                      className={`group/upload w-full flex items-center gap-4 p-3 bg-zinc-50/30 dark:bg-white/[0.01] border border-dashed rounded-xl cursor-pointer transition-colors duration-200 ${
                        formData.logo
                          ? "border-emerald-500/50"
                          : "border-zinc-200 dark:border-white/[0.08] hover:border-zinc-400 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="w-10 h-10 bg-white dark:bg-white/[0.03] shadow-sm rounded-lg flex items-center justify-center shrink-0 border border-zinc-100 dark:border-white/[0.05] overflow-hidden">
                        {isUploading ? (
                          <Loader2
                            size={16}
                            className="animate-spin text-indigo-500"
                          />
                        ) : formData.logo ? (
                          <Image
                            src={formData.logo}
                            alt="Logo preview"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <UploadCloud
                            size={16}
                            className="text-zinc-400 group-hover/upload:text-zinc-600 transition-colors"
                          />
                        )}
                      </div>
                      <div className="text-xs">
                        <p
                          className={`font-semibold ${
                            formData.logo
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-zinc-800 dark:text-zinc-200"
                          }`}
                        >
                          {formData.logo
                            ? "Logo Uploaded"
                            : "Upload corporate mark"}
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500 mt-0.5">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                    Brief Description
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your company..."
                    className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 text-zinc-900 dark:text-zinc-100 resize-none custom-scrollbar"
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                form="company-form"
                type="submit"
                disabled={isSubmitting || isUploading || !formData.logo}
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {isEditMode ? "Save Changes" : "Submit for Approval"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
