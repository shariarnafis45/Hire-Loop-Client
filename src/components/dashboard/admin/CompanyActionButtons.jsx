"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function CompanyActionButtons({ companyId, initialStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [loadingAction, setLoadingAction] = useState(null); 

  const handleAction = async (actionType) => {
    setLoadingAction(actionType);
    try {
      const targetStatus = actionType === 'approve' ? 'approved' : 'rejected';
      
      // তোমার API / Server Action এখানে কল হবে:
      // await updateCompanyStatus(companyId, targetStatus);
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      setStatus(targetStatus);
      toast.success(`Company successfully ${targetStatus}!`);
      router.refresh(); 
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingAction(null);
    }
  };

  if (status !== 'pending') {
    return (
      <span className="text-[12px] text-neutral-400 dark:text-zinc-600 font-medium italic pr-2 flex items-center gap-1.5 justify-end">
        <ShieldCheck size={14} className="text-neutral-400 dark:text-zinc-700" /> Processed
      </span>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2.5">
      {/* Approve Button (Premium Gold - Light & Dark Adaptive) */}
      <button
        disabled={loadingAction !== null}
        onClick={() => handleAction('approve')}
        className="text-[11px] font-bold uppercase tracking-wider text-white dark:text-black bg-amber-600 hover:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-500 px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 min-w-[80px] flex items-center justify-center"
      >
        {loadingAction === 'approve' ? <Loader2 size={12} className="animate-spin" /> : 'Approve'}
      </button>

      {/* Reject Button (Minimal Luxury Border) */}
      <button
        disabled={loadingAction !== null}
        onClick={() => handleAction('reject')}
        className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-800 transition-all duration-300 disabled:opacity-50 min-w-[70px] flex items-center justify-center"
      >
        {loadingAction === 'reject' ? <Loader2 size={12} className="animate-spin" /> : 'Reject'}
      </button>
    </div>
  );
}