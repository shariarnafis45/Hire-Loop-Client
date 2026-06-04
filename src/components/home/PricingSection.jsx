"use client";

import { useState } from "react";
import { Crown, BarChart3, Zap, Plus, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      icon: Crown,
      iconColor: "text-pink-600 dark:text-pink-500",
      iconBg: "bg-pink-100 dark:bg-pink-500/10",
      price: { monthly: 0, yearly: 0 },
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      buttonText: "Choose This Plan",
      featured: false,
    },
    {
      name: "Growth",
      icon: BarChart3,
      iconColor: "text-violet-600 dark:text-violet-500",
      iconBg: "bg-violet-100 dark:bg-violet-500/10",
      price: { monthly: 17, yearly: 12 },
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      buttonText: "Choose This Plan",
      featured: true,
    },
    {
      name: "Premium",
      icon: Zap,
      iconColor: "text-indigo-600 dark:text-indigo-500",
      iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
      price: { monthly: 99, yearly: 74 },
      description: "Start building your insights hub:",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
      buttonText: "Choose This Plan",
      featured: false,
    },
  ];

  return (
    <section className="relative w-full bg-zinc-50 dark:bg-[#09090b] py-24 px-4 font-sans transition-colors duration-300">
      
      {/* Background Subtle Gradient for Premium Feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[50%] -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.08] dark:opacity-[0.15] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1140px] flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 bg-violet-600 dark:bg-violet-500 rounded-sm" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Pricing
          </span>
          <span className="h-1.5 w-1.5 bg-violet-600 dark:bg-violet-500 rounded-sm" />
        </div>

        {/* Main Heading */}
        <h2 className="text-center text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-zinc-900 dark:text-white max-w-2xl leading-[1.1] mb-12">
          Pay for the leverage, <br /> not the listings
        </h2>

        {/* --- Premium Toggle Switch (Light + Dark Support) --- */}
        <div className="inline-flex items-center gap-1 rounded-full bg-zinc-200/50 dark:bg-zinc-900/80 border border-zinc-300/50 dark:border-zinc-800/50 p-1 mb-16 backdrop-blur-md">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              billingPeriod === "monthly"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Monthly
          </button>
          
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              billingPeriod === "yearly"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <span>Yearly</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${
              billingPeriod === "yearly" 
                ? "bg-violet-600 text-white dark:bg-violet-500" 
                : "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"
            }`}>
              25% OFF
            </span>
          </button>
        </div>

        {/* --- Pricing Cards Grid --- */}
        <div className="grid w-full gap-8 md:grid-cols-3 items-center max-w-[1060px]">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly;

            return (
              <div
                key={index}
                className={`
                  relative flex flex-col justify-between rounded-[2rem] p-8
                  transition-all duration-500 ease-out
                  ${
                    plan.featured
                      ? "md:scale-105 bg-white dark:bg-zinc-900/60 border-2 border-violet-500/20 dark:border-zinc-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.15)] z-10 backdrop-blur-xl"
                      : "bg-white/60 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md dark:shadow-none"
                  }
                `}
              >
                {/* Popular Badge for Featured Plan */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.iconBg}`}>
                        <Icon size={18} className={plan.iconColor} />
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {plan.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-baseline">
                      <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        ${currentPrice}
                      </span>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-1">
                        /mo
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-[13px] text-zinc-700 dark:text-zinc-300 font-medium">
                        <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                          <Plus size={10} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <button
                  className={`
                    flex h-12 w-full items-center justify-center gap-2 rounded-xl
                    text-sm font-bold transition-all duration-300 active:scale-[0.98]
                    ${
                      plan.featured
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-zinc-200"
                        : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border dark:border-zinc-800/60 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }
                  `}
                >
                  {plan.buttonText}
                  <ArrowRight size={16} strokeWidth={2.5} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;