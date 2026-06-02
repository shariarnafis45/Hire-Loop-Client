

import { FiSearch, FiMapPin, FiBriefcase, FiStar, FiActivity } from "react-icons/fi";
import { HiMiniMagnifyingGlass, HiOutlineBuildingOffice2 } from "react-icons/hi2";

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const statsData = [
  { value: "50K", label: "Active Jobs", icon: <FiBriefcase size={22} /> },
  { value: "12K", label: "Companies", icon: <HiOutlineBuildingOffice2 size={24} /> },
  { value: "2M", label: "Job Seekers", icon: <FiActivity size={22} /> },
  { value: "97%", label: "Satisfaction Rate", icon: <FiStar size={22} /> },
];

const HeroWithStats = () => {
  return (
    <div className="relative w-full bg-[#f8fafc] dark:bg-[#030303] pt-40 pb-24 overflow-hidden font-sans transition-colors duration-500">
      
      {/* 1. Universal Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Top Ambient Glow (Subtle in light, deep in dark) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-20">
          
          {/* Top Badge (Glassy) */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-sm mb-8 transition-all">
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#e0580c] text-[10px] shadow-[0_0_10px_rgba(224,88,12,0.4)]">
              💼
            </span>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
              <span className="text-zinc-900 dark:text-white font-bold">50,000+</span> New Jobs This Month
            </p>
          </div>

          {/* Epic Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black tracking-[-0.03em] leading-[1.05] text-zinc-900 dark:text-white max-w-[900px] mb-6 drop-shadow-sm dark:drop-shadow-none transition-colors">
            Find Your Dream <br className="hidden sm:block" /> Job Today
          </h1>

          {/* Subtitle */}
          <p className="max-w-[640px] text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-12 transition-colors">
            HireLoop connects top talent with world-class companies. Browse thousands of 
            curated opportunities and land your next role — faster.
          </p>

          {/* The Ultimate Glass Search Bar */}
          <div className="w-full max-w-[760px] p-2 rounded-2xl border border-white dark:border-white/[0.08] bg-white/70 dark:bg-[#0a0a0c]/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-1 mb-8 transition-all">
            
            {/* Input 1 */}
            <div className="flex-1 flex items-center px-4 py-2.5 w-full">
              <FiSearch className="text-zinc-400 dark:text-zinc-500 mr-3 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="Job title, skill or company"
                className="bg-transparent border-none outline-none w-full text-[14.5px] text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-medium"
              />
            </div>

            {/* Premium Divider Line */}
            <div className="hidden md:block w-px h-8 bg-zinc-200 dark:bg-white/[0.08] mx-1" />

            {/* Input 2 */}
            <div className="flex-1 flex items-center px-4 py-2.5 w-full">
              <FiMapPin className="text-zinc-400 dark:text-zinc-500 mr-3 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="Location or Remote"
                className="bg-transparent border-none outline-none w-full text-[14.5px] text-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-medium"
              />
            </div>

            {/* Glowing Action Button */}
            <button className="w-full md:w-auto h-12 px-7 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white transition-all duration-300 flex items-center justify-center shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.5)] hover:scale-[1.02] active:scale-[0.98] shrink-0">
              <HiMiniMagnifyingGlass size={20} />
            </button>
          </div>

          {/* Trending Tags (Frosted Glass) */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-500 tracking-wide">Trending Position:</span>
            {trendingPositions.map((tag) => (
              <button 
                key={tag} 
                className="px-4 py-1.5 rounded-full text-[12px] font-medium border border-white dark:border-white/[0.05] bg-white/50 dark:bg-white/[0.02] backdrop-blur-md text-zinc-600 dark:text-zinc-300 shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-white/[0.06] hover:text-indigo-600 dark:hover:text-white transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>


        {/* ================= GLOBE ARC & TEXT ================= */}
        <div className="relative w-full h-[320px] flex flex-col items-center justify-end overflow-visible mt-16 mb-8">
          
          {/* Glassy Globe Arc */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[180%] sm:w-[130%] max-w-[2000px] aspect-square rounded-full border border-indigo-600/10 dark:border-indigo-500/20 bg-gradient-to-b from-white/40 to-transparent dark:from-[#060608]/80 dark:to-transparent backdrop-blur-[2px] shadow-[0_-20px_60px_rgba(79,70,229,0.05)] dark:shadow-[0_-40px_100px_rgba(99,102,241,0.15)] pointer-events-none transition-all duration-500 z-0">
            {/* Inner Globe Light Reflection */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_40%)]" />
          </div>
          
          {/* Text over the globe */}
          <div className="relative text-center z-10 px-4 pb-4">
            <h2 className="text-2xl sm:text-[32px] font-bold tracking-tight text-zinc-800 dark:text-zinc-200 mb-1.5 transition-colors">
              Assisting over <span className="text-indigo-600 dark:text-white font-extrabold drop-shadow-sm">15,000 job seekers</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15.5px] sm:text-[17px] font-medium transition-colors">
              find their dream positions.
            </p>
          </div>
        </div>


        {/* ================= STATS CARDS (Premium Glass) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {statsData.map((stat, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col justify-between h-[210px] p-7 rounded-[24px] border border-white dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/90 dark:hover:bg-white/[0.04] hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] hover:border-indigo-100 dark:hover:border-indigo-500/30 overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/[0.03] dark:group-hover:from-indigo-500/[0.05] transition-all duration-500 pointer-events-none" />

              {/* Top Left - Icon */}
              <div className="text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 self-start">
                {stat.icon}
              </div>
              
              {/* Bottom Left - Details */}
              <div className="flex flex-col items-start mt-auto relative z-10">
                <span className="text-[44px] font-black tracking-[-0.02em] text-zinc-900 dark:text-white leading-none mb-2.5 select-none transition-colors">
                  {stat.value}
                </span>
                <span className="text-[12px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.1em] transition-colors">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HeroWithStats;