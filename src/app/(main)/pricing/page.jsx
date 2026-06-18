"use client";

import { useState } from "react";
import {
  Crown,
  BarChart3,
  Zap,
  Plus,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeUpWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/MotionWrappers";

const seekerPlans = [
  {
    name: "Free",
    planId : 'seeker_free',
    icon: Crown,
    iconColor: "text-zinc-600 dark:text-zinc-400",
    iconBg: "bg-zinc-100 dark:bg-zinc-800",
    price: 0,
    description: "Essential tools to begin your search:",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile visibility",
      "Standard email alerts",
    ],
    buttonText: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    planId : 'seeker_pro',
    icon: BarChart3,
    iconColor: "text-indigo-600 dark:text-indigo-500",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
    price: 19,
    description: "Accelerate your application response strategy:",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved job listings",
      "Real-time application tracking pipeline",
      "Advanced salary & market insights",
    ],
    buttonText: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Premium",
    planId : 'seeker_premium',
    icon: Zap,
    iconColor: "text-amber-600 dark:text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-500/10",
    price: 39,
    description: "Maximum visibility and unlimited leverage:",
    features: [
      "Everything included in Pro tier",
      "Unlimited monthly job applications",
      "Instant profile boost to active recruiters",
      "Early access to newly posted openings",
      "Priority system customer support",
    ],
    buttonText: "Go Premium",
    featured: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    planId : 'recruiter_free',
    icon: Crown,
    iconColor: "text-zinc-600 dark:text-zinc-400",
    iconBg: "bg-zinc-100 dark:bg-zinc-800",
    price: 0,
    description: "Perfect for foundational organizational hiring:",
    features: [
      "Up to 3 active job postings",
      "Basic applicant management pipeline",
      "Standard listing index visibility",
    ],
    buttonText: "Start Posting",
    featured: false,
  },
  {
    name: "Growth",
    planId : 'recruiter_growth',
    icon: BarChart3,
    iconColor: "text-indigo-600 dark:text-indigo-500",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
    price: 49,
    description: "Scale up your recruitment capabilities:",
    features: [
      "Up to 10 active job postings",
      "Full applicant tracking system (ATS)",
      "Core operational talent analytics",
      "Dedicated direct email support",
    ],
    buttonText: "Choose Growth",
    featured: true,
  },
  {
    name: "Enterprise",
     planId : 'recruiter_enterprise',
    icon: Zap,
    iconColor: "text-amber-600 dark:text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-500/10",
    price: 149,
    description: "Complete control for high-volume hiring teams:",
    features: [
      "Up to 50 active job postings",
      "Advanced predictive analytics dashboard",
      "Premium featured listing placement",
      "Multi-account team collaboration tools",
      "Custom company hub branding layouts",
      "24/7 dedicated priority support",
    ],
    buttonText: "Contact Enterprise",
    featured: false,
  },
];

const faqItems = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade, downgrade, or switch between plans instantly from your account billing dashboard. Changes apply to the subsequent billing cycle.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee for all premium subscriptions if the features do not satisfy your current placement needs.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept all major global credit cards, debit cards, PayPal, and secure merchant processing endpoints powered via Stripe infrastructure.",
  },
  {
    question: "How does plan cancellation work?",
    answer:
      "Upon cancellation, your premium privileges will remain active until the end of your current paid tracking period. No auto-renewal charges will occur.",
  },
];

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("seekers");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <section className="relative w-full bg-[#f8fafc] dark:bg-[#030303] py-28 px-4 font-sans transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[50%] -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.06] dark:opacity-[0.12] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1140px] flex flex-col items-center">
        <FadeUpWrapper delay={0.1}>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-sm" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Pricing Plans
            </span>
            <span className="h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-sm" />
          </div>
        </FadeUpWrapper>

        <FadeUpWrapper delay={0.2}>
          <h2 className="text-center text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight text-zinc-900 dark:text-white max-w-2xl leading-[1.1] mb-12">
            Pay for the leverage, <br /> not the listings
          </h2>
        </FadeUpWrapper>

        <FadeUpWrapper delay={0.3}>
          <div className="inline-flex items-center gap-1 rounded-full bg-zinc-200/60 dark:bg-zinc-900/80 border border-zinc-300/40 dark:border-zinc-800/50 p-1 mb-16 backdrop-blur-md relative z-10">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === "seekers"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              For Job Seekers
            </button>

            <button
              onClick={() => setActiveTab("recruiters")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === "recruiters"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </FadeUpWrapper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            <StaggerContainer className="grid w-full gap-8 md:grid-cols-3 items-stretch max-w-[1060px] relative z-10">
              {currentPlans.map((plan, index) => {
                const Icon = plan.icon;

                return (
                  <StaggerItem className="flex" key={index}>
                    <div
                      className={`
                        relative flex flex-col justify-between rounded-[2rem] p-8 group w-full
                        transition-all duration-500 ease-out
                        ${
                          plan.featured
                            ? "md:scale-105 bg-white dark:bg-[#0c0c0e]/95 border-2 border-indigo-500/40 dark:border-indigo-500/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.15)] z-10 backdrop-blur-xl"
                            : "bg-white/95 dark:bg-[#0c0c0e]/50 border border-zinc-200/80 dark:border-white/[0.05] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md dark:shadow-none backdrop-blur-md"
                        }
                      `}
                    >
                      {plan.featured && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <div className="bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                            Most Popular
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.iconBg}`}
                            >
                              <Icon className={plan.iconColor} size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                              {plan.name}
                            </h3>
                          </div>

                          <div className="flex items-baseline relative justify-end">
                            <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                              $
                            </span>
                            <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                              {plan.price}
                            </span>
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">
                              /mo
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                          {plan.description}
                        </p>

                        <ul className="space-y-4 mb-10">
                          {plan.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start gap-3 text-[13px] text-zinc-700 dark:text-zinc-300 font-semibold"
                            >
                              <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                                <Plus size={10} strokeWidth={3} />
                              </div>
                              <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <form action="/api/checkout_sessions" method="POST">
                        <section>
                          <input type="hidden" name="plan_id" value={plan.planId} />
                          <button
                            type="submit"
                            role="link"
                            className={`
                          flex h-12 w-full items-center justify-center gap-2 rounded-xl
                          text-sm font-black transition-all duration-300 active:scale-[0.98] uppercase tracking-wider
                          ${
                            plan.featured
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 dark:bg-white dark:text-black dark:shadow-white/5 dark:hover:bg-zinc-200"
                              : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border dark:border-zinc-800/60 dark:hover:bg-zinc-800 dark:hover:text-white"
                          }
                        `}
                          >
                            {plan.buttonText}
                            <ArrowRight
                              className="opacity-70 group-hover:translate-x-1 transition-transform"
                              size={14}
                              strokeWidth={2.5}
                            />
                          </button>
                        </section>
                      </form>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[760px] mt-32 relative z-10">
          <FadeUpWrapper delay={0.1}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 font-medium">
                Everything you need to know about configurations and access
                control.
              </p>
            </div>
          </FadeUpWrapper>

          <StaggerContainer className="space-y-4">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <StaggerItem key={index}>
                  <div className="bg-white/95 dark:bg-[#0c0c0e]/40 border border-zinc-200/80 dark:border-white/[0.04] rounded-2xl overflow-hidden backdrop-blur-md transition-colors duration-300">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left font-bold text-zinc-900 dark:text-white text-sm sm:text-base select-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={16}
                        className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
