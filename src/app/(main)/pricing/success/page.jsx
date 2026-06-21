import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Check, Mail, ArrowRight, Sparkles, Home } from "lucide-react";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const session_id = resolvedSearchParams.session_id;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subscriberInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    const result = await createSubscription(subscriberInfo);
    console.log(result);
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#030303] text-neutral-900 dark:text-zinc-100 flex items-center justify-center p-4 mt-10 relative overflow-hidden font-sans transition-colors duration-500">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] dark:bg-amber-500/[0.02] blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <div className="relative bg-white dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/60 dark:border-white/[0.06] rounded-[32px] p-8 sm:p-12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.02)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden text-center">
            {/* Premium Gold Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/[0.05] border border-amber-500/20 dark:border-amber-400/20 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 select-none">
              <Sparkles size={11} className="animate-pulse" />
              Payment Confirmed
            </div>

            {/* Success Icon with Minimal Gold Touch */}
            <div className="relative w-20 h-20 bg-amber-500/[0.06] dark:bg-amber-400/[0.03] text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 dark:border-amber-400/10 mb-8">
              <Check size={32} strokeWidth={1.5} />
            </div>

            {/* Typography */}
            <div className="space-y-3 mb-8">
              <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight sm:text-4xl">
                Thank You for Your Order
              </h2>
              <p className="text-neutral-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                We appreciate your business. Your premium access has been
                provisioned instantly.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-neutral-50 dark:bg-zinc-900/30 border border-neutral-200/50 dark:border-white/[0.04] rounded-2xl p-5 mb-8 text-left flex items-start gap-4">
              <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl text-neutral-400 dark:text-zinc-500 shrink-0 border border-neutral-200/60 dark:border-white/[0.02] shadow-sm">
                <Mail size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-zinc-500">
                  Confirmation Sent To
                </p>
                <p className="text-neutral-800 dark:text-zinc-200 text-sm font-semibold break-all">
                  {customerEmail || "Your Email"}
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-zinc-500 font-medium pt-1">
                  Have questions? Contact us at{" "}
                  <a
                    href="mailto:orders@example.com"
                    className="text-amber-600 dark:text-amber-400 hover:underline font-bold transition-colors"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 order-2 sm:order-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-all border border-transparent dark:border-white/[0.04]"
              >
                <Home size={14} className="opacity-70" />
                Go to Home
              </Link>

              <Link
                href="/jobs"
                className="flex-1 order-1 sm:order-2 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md dark:shadow-none group"
              >
                Explore Jobs
                <ArrowRight
                  size={14}
                  className="opacity-70 group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
