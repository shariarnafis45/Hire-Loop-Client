'use client'
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, Sparkles } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-500">
      
      {/* Subtle Luxury Gold Glow Effects for Error/Warning */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/[0.03] dark:bg-amber-500/[0.02] blur-[140px] rounded-full pointer-events-none" />
      
      {/* Clean Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Minimalist Premium Card */}
        <div className="relative bg-white dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/60 dark:border-white/[0.06] rounded-[32px] p-8 sm:p-12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.02)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden text-center">
          
          {/* Warning Badge */}
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/[0.05] border border-amber-500/20 dark:border-amber-400/20 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 select-none">
            <Sparkles size={11} />
            Access Denied
          </div>

          {/* Alert Icon */}
          <div className="relative w-20 h-20 bg-amber-500/[0.06] dark:bg-amber-400/[0.03] text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 dark:border-amber-400/10 mb-8">
            <ShieldAlert size={32} strokeWidth={1.5} />
            {/* Ping effect behind the shield */}
            <div className="absolute inset-0 border border-amber-400/30 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Typography */}
          <div className="space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight sm:text-4xl">
              Unauthorized Area
            </h2>
            <p className="text-neutral-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
              You do not have the required permissions to view this page. Please log in with an authorized account or upgrade your plan.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Go Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="flex-1 order-2 sm:order-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all border border-transparent dark:border-white/[0.04]"
            >
              <ArrowLeft size={14} className="opacity-70" />
              Go Back
            </button>

            {/* Home Button */}
            <Link 
              href="/" 
              className="flex-1 order-1 sm:order-2 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md dark:shadow-none group"
            >
              <Home size={14} className="opacity-70 group-hover:-translate-y-0.5 transition-transform" />
              Return Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;