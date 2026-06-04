import React from "react";
// Import your custom wrapper
import { FadeUpWrapper } from "@/components/animation/MotionWrappers";

const CTASection = () => {
  return (
    <section className="relative w-full bg-[#f8fafc] dark:bg-[#030303] pt-40 pb-32 overflow-hidden font-sans transition-colors duration-500 flex flex-col items-center justify-center text-center">
      
      {/* ================= THE GLOWING DOME (ARC) ================= */}
      {/* Outer static div handles the absolute positioning to prevent transform conflicts with Framer Motion */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[250%] sm:w-[160%] lg:w-[120%] max-w-[2000px] aspect-[2/1] pointer-events-none transition-all duration-500 z-0">
        <FadeUpWrapper delay={0.1} className="w-full h-full">
          <div className="w-full h-full rounded-t-[100%] border-t border-indigo-600/15 dark:border-indigo-500/40 bg-gradient-to-b from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/30 dark:via-transparent dark:to-transparent">
            {/* Inner Radial Glow to highlight the top curve */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_70%)] rounded-t-[100%]" />

            {/* Perspective Grid Pattern Masked over the Dome */}
            <div
              className="absolute inset-0 rounded-t-[100%] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:64px_64px]"
              style={{
                maskImage:
                  "radial-gradient(ellipse at top, black 20%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at top, black 20%, transparent 75%)",
              }}
            />
          </div>
        </FadeUpWrapper>
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 flex flex-col items-center mt-8">
        
        {/* Main Heading */}
        <FadeUpWrapper delay={0.2}>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-[-0.02em] text-zinc-900 dark:text-white mb-5 leading-[1.15] drop-shadow-sm dark:drop-shadow-none transition-colors duration-500">
            Your next role is <br className="hidden sm:block" /> already looking
            for you
          </h2>
        </FadeUpWrapper>

        {/* Subtitle */}
        <FadeUpWrapper delay={0.3}>
          <p className="text-[16px] sm:text-[18px] text-zinc-600 dark:text-zinc-400 font-medium mb-10 max-w-[540px] leading-relaxed transition-colors duration-500 mx-auto">
            Build a profile in three minutes. The matches start arriving tomorrow
            morning.
          </p>
        </FadeUpWrapper>

        {/* Action Buttons */}
        <FadeUpWrapper delay={0.4} className="w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Primary Button */}
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-[12px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-[15px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]">
              Create a free account
            </button>

            {/* Secondary Button */}
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-[12px] bg-white/50 dark:bg-transparent backdrop-blur-sm border border-zinc-300 dark:border-white/[0.15] text-zinc-700 dark:text-zinc-200 font-bold text-[15px] hover:bg-zinc-100 dark:hover:bg-white/[0.05] hover:border-zinc-400 dark:hover:border-white/[0.3] active:scale-[0.98] transition-all duration-300">
              View pricing
            </button>
          </div>
        </FadeUpWrapper>
      </div>
    </section>
  );
};

export default CTASection;