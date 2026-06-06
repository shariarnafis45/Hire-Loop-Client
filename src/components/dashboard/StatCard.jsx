"use client";

import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend, trendUp, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`
        group relative overflow-hidden rounded-2xl bg-white dark:bg-[#0c0c0e] p-6 
        border border-zinc-200/60 dark:border-white/[0.05] 
        shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none 
        hover:-translate-y-0.5 transition-all duration-300
      `}
    >
      {/* Super subtle hover gradient (Light mode e ekta frosty feel dibe) */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 via-transparent to-transparent dark:from-white/[0.02] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          
          {/* Icon Box: Added very soft background and border for crispness */}
          <div className="p-2.5 rounded-xl bg-zinc-50/80 border border-zinc-100/80 dark:bg-white/[0.04] dark:border-white/[0.05] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
            <Icon size={20} strokeWidth={2} />
          </div>
          
          {/* Trend Indicator: Made borders subtle and background softer for light theme */}
          {trend && (
            <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full border ${
              trendUp 
                ? "bg-emerald-50/80 text-emerald-600 border-emerald-100/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/10" 
                : "bg-rose-50/80 text-rose-600 border-rose-100/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/10"
            }`}>
              {trendUp ? "+" : "-"}{trend}
            </span>
          )}
        </div>

        <div>
          {/* Typography upgrade: Smaller, uppercase title with tracking */}
          <p className="text-[12px] font-bold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;