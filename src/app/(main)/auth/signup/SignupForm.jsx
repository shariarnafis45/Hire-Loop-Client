"use client";

import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiXCircle,
  FiBriefcase,
  FiSearch,
} from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = ({ redirectTo = "/" }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const loadingToast = toast.loading("Creating your account...", {
      style: {
        background: "transparent",
        boxShadow: "none",
        color: "transparent",
      },
    });

    const plan = formData.role === "seeker" ? "seeker_free" : "recruiter_free";

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        tempRole: formData.role,
        plan: plan,
      });

      toast.dismiss(loadingToast);

      if (error) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-red-100 dark:border-red-900/30`}
          >
            <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/20 p-2 rounded-full">
              <FiXCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
                Signup Failed
              </p>
              <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                {error.message || "Something went wrong. Try again."}
              </p>
            </div>
          </div>
        ));
        return;
      }

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
        >
          <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full">
            <FiCheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Welcome to HireLoop!
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              Your account has been created successfully.
            </p>
          </div>
        </div>
      ));

      router.push(redirectTo);

      setFormData({ name: "", email: "", password: "", role: "seeker" });
    } catch (error) {
      toast.dismiss(loadingToast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] dark:bg-[#030303] flex items-center justify-center py-20 px-4 overflow-hidden font-sans transition-colors duration-500">
      {/* Consistent Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Ambient Blur Glows - Animated for a premium organic feel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.06),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(79,70,229,0.06),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(79,70,229,0.09),transparent_60%)] pointer-events-none"
      />

      {/* ================= MAIN SIGNUP CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-[460px] p-8 sm:p-10 rounded-[28px] border border-white dark:border-white/[0.06] bg-white/70 dark:bg-[#0c0c0e]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Header Block */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              Join HireLoop
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
            Create account
          </h1>
          <p className="text-[14px] font-medium text-zinc-500 dark:text-zinc-400">
            Start tracking your analytics and applications.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Custom Segmented Radio Toggle for Role */}
          <div className="flex flex-col space-y-2">
            <label className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              I am a
            </label>
            <div className="flex p-1 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-100/50 dark:bg-white/[0.02]">
              <button
                type="button"
                onClick={() => handleRoleChange("seeker")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-bold rounded-lg transition-all duration-300 ${
                  formData.role === "seeker"
                    ? "bg-white dark:bg-[#1a1a1f] text-indigo-600 dark:text-indigo-400 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-zinc-200/50 dark:border-white/[0.05]"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transparent border border-transparent"
                }`}
              >
                <FiSearch size={16} /> Job Seeker
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("recruiter")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-bold rounded-lg transition-all duration-300 ${
                  formData.role === "recruiter"
                    ? "bg-white dark:bg-[#1a1a1f] text-indigo-600 dark:text-indigo-400 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-zinc-200/50 dark:border-white/[0.05]"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transparent border border-transparent"
                }`}
              >
                <FiBriefcase size={16} /> Recruiter
              </button>
            </div>
          </div>

          {/* Input: Full Name */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative flex items-center group">
              <FiUser
                className="absolute left-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200"
                size={18}
              />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.01] text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-[14.5px] font-medium outline-none transition-all duration-200 focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/[0.03] focus:shadow-[0_4px_20px_rgba(99,102,241,0.03)]"
              />
            </div>
          </div>

          {/* Input: Email */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center group">
              <FiMail
                className="absolute left-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200"
                size={18}
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.01] text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-[14.5px] font-medium outline-none transition-all duration-200 focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/[0.03] focus:shadow-[0_4px_20px_rgba(99,102,241,0.03)]"
              />
            </div>
          </div>

          {/* Input: Password */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[12px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center group">
              <FiLock
                className="absolute left-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full pl-11 pr-12 py-3 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.01] text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-[14.5px] font-medium outline-none transition-all duration-200 focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/[0.03] focus:shadow-[0_4px_20px_rgba(99,102,241,0.03)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white transition-all duration-300 flex items-center justify-center gap-2 font-bold text-[15px] shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none group"
          >
            {isLoading ? "Creating account..." : "Sign up"}
            {!isLoading && (
              <FiArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            )}
          </button>
        </form>

        {/* Divider Line */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-zinc-200 dark:border-white/[0.06]" />
          <span className="flex-shrink mx-4 text-[12px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Or continue with
          </span>
          <div className="flex-grow border-t border-zinc-200 dark:border-white/[0.06]" />
        </div>

        {/* Social Providers Block (Glassy Buttons with scale interaction) */}
        <div className="grid grid-cols-2 gap-3.5">
          <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-300 text-[14px] font-bold hover:bg-zinc-50 dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-white active:scale-[0.98] transition-all duration-200 shadow-sm dark:shadow-none">
            <FaGoogle className="text-red-500" size={16} />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-zinc-200 dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.02] text-zinc-700 dark:text-zinc-300 text-[14px] font-bold hover:bg-zinc-50 dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-white active:scale-[0.98] transition-all duration-200 shadow-sm dark:shadow-none">
            <FaGithub size={16} />
            <span>GitHub</span>
          </button>
        </div>

        {/* Footer Redirect */}
        <p className="text-center mt-8 text-[14px] font-medium text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupForm;
