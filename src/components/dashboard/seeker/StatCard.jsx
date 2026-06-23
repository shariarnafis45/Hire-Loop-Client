const StatCard = ({ title, value, valueColor = "text-neutral-900 dark:text-amber-400" }) => {
  return (
    <div className="relative bg-white dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/60 dark:border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-amber-500/30 dark:hover:border-amber-400/30 transition-all duration-300 group overflow-hidden">
      
      {/* Subtle background glow on hover for Dark mode */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/[0.02] dark:bg-amber-400/[0.01] blur-xl rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
      
      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-zinc-500">
        {title}
      </span>
      
      <span className={`text-3xl font-extrabold mt-3 tracking-tight ${valueColor}`}>
        {value}
      </span>
    </div>
  );
};

export default StatCard;