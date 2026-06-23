"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { updateCompanyStatus } from "@/lib/actions/company";

export default function CompanyActionButtons({ companyId, initialStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (actionType) => {
    setLoadingAction(actionType);
    const isApprove = actionType === "approve";
    const targetStatus = isApprove ? "approved" : "rejected";

    try {
      const result = await updateCompanyStatus(companyId, {
        status: targetStatus,
      });

      setStatus(targetStatus);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-neutral-200 dark:border-white/[0.06]`}
        >
          <div
            className={`flex-shrink-0 p-2 rounded-full ${
              isApprove
                ? "bg-amber-100 dark:bg-amber-500/20"
                : "bg-neutral-100 dark:bg-zinc-800/50"
            }`}
          >
            {isApprove ? (
              <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            ) : (
              <XCircle className="w-5 h-5 text-neutral-500 dark:text-zinc-400" />
            )}
          </div>
          <div>
            <p className="text-[14px] font-bold text-neutral-900 dark:text-white capitalize">
              Company {targetStatus}!
            </p>
            <p className="text-[12px] font-medium text-neutral-500 dark:text-zinc-400 mt-0.5">
              {isApprove
                ? "The corporate entity has been successfully approved into the ecosystem."
                : "The registration request has been declined and archived."}
            </p>
          </div>
        </div>
      ));

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center gap-3 max-w-sm w-full bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-red-100 dark:border-red-900/30`}
        >
          <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/20 p-2 rounded-full">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
              Action Failed
            </p>
            <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
              {error?.message ||
                "Something went wrong. Please try again later."}
            </p>
          </div>
        </div>
      ));
    } finally {
      setLoadingAction(null);
    }
  };

  if (status !== "pending") {
    return (
      <span className="text-[12px] text-neutral-400 dark:text-zinc-600 font-medium italic pr-2 flex items-center gap-1.5 justify-end">
        <ShieldCheck
          size={14}
          className="text-neutral-400 dark:text-zinc-700"
        />{" "}
        Processed
      </span>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2.5">
      {/* Approve Button */}
      <button
        disabled={loadingAction !== null}
        onClick={() => handleAction("approve")}
        className="text-[11px] font-bold uppercase tracking-wider text-white dark:text-black bg-amber-600 hover:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-500 px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 min-w-[80px] flex items-center justify-center"
      >
        {loadingAction === "approve" ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          "Approve"
        )}
      </button>

      {/* Reject Button */}
      <button
        disabled={loadingAction !== null}
        onClick={() => handleAction("reject")}
        className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-800 transition-all duration-300 disabled:opacity-50 min-w-[70px] flex items-center justify-center"
      >
        {loadingAction === "reject" ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          "Reject"
        )}
      </button>
    </div>
  );
}
