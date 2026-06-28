"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  Crown,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { deleteUser, updateUserRole } from "@/lib/actions/users";

import { FadeUpWrapper } from "@/components/animation/MotionWrappers";
import { useRouter } from "next/navigation";

export const UsersTable = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const [modal, setModal] = useState({
    isOpen: false,
    user: null,
    actionType: null,
    targetRole: null,
  });

  const triggerAction = (user, actionType, targetRole = null) => {
    setModal({ isOpen: true, user, actionType, targetRole });
    setOpenDropdownId(null);
  };

  const closeModal = () => {
    setModal({ isOpen: false, user: null, actionType: null, targetRole: null });
  };

  const showSuccessToast = (title, description) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
      >
        <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full">
          <FiCheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
            {title}
          </p>
          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {description}
          </p>
        </div>
      </div>
    ));
  };

  const showErrorToast = (title, errorMessage) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-red-100 dark:border-red-900/30`}
      >
        <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/20 p-2 rounded-full">
          <FiXCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
            {title}
          </p>
          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {errorMessage}
          </p>
        </div>
      </div>
    ));
  };
  console.log(users);

  const handleConfirm = async () => {
    if (!modal.user) return;
    setIsPending(true);

    const userId = modal.user._id?.$oid || modal.user.id || modal.user.uniqueId;
    const userName = modal.user.name || "User";
    

    try {
      if (modal.actionType === "change_role") {
        const response = await updateUserRole(userId, modal.targetRole);
        if (response) {
          setUsers((prev) =>
            prev.map((u) => {
              const currentId = u._id?.$oid || u.id || u.uniqueId;
              return currentId === userId
                ? { ...u, role: modal.targetRole }
                : u;
            }),
          );
          showSuccessToast(
            "Privilege Updated",
            `"${userName}" is now assigned as ${modal.targetRole.toUpperCase()}.`,
          );
        }
      } else if (modal.actionType === "delete") {
        const response = await deleteUser(userId);
        if (response) {
          setUsers((prev) =>
            prev.filter((u) => (u._id?.$oid || u.id || u.uniqueId) !== userId),
          );
          showSuccessToast(
            "Account Removed",
            `"${userName}" has been permanently deleted.`,
          );
        }
      }
      router.refresh();
    } catch (error) {
      showErrorToast(
        "Operation Failed",
        error?.message || "Something went wrong.",
      );
    } finally {
      setIsPending(false);
      closeModal();
    }
  };

  return (
    <>
      <FadeUpWrapper delay={0.2}>
        <div className="bg-white/40 dark:bg-[#09090b]/20 backdrop-blur-md border border-neutral-200/80 dark:border-white/[0.06] rounded-[28px] overflow-hidden shadow-2xl relative">
          <div className="overflow-x-auto min-h-[400px]">
            {/* Added pb-32 to allow dropdowns to render without getting cut off at the bottom */}
            <table className="w-full text-left border-collapse min-w-[850px] mb-32">
              <thead>
                <tr className="border-b border-neutral-200/60 dark:border-white/[0.04] bg-neutral-100/40 dark:bg-zinc-900/20 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                  <th className="py-4 px-6">User Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Role Status</th>
                  <th className="py-4 px-6">Join Date</th>
                  <th className="py-4 px-6">Access</th>
                  <th className="py-4 px-6 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/40 dark:divide-white/[0.04] text-[13px] font-medium text-neutral-800 dark:text-zinc-300">
                {users.map((user, index) => {
                  // 🛠️ BUG FIX: Ensure a fallback unique ID so dropdowns don't clash
                  const uniqueId =
                    user._id?.$oid || user._id || `fallback-id-${index}`;

                  const rawDate = user.createdAt?.$date || user.createdAt;
                  const joinDate = rawDate
                    ? new Date(rawDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A";

                  // We inject the uniqueId temporarily for operations if original id is weirdly mapped
                  const safeUser = { ...user, uniqueId };

                  return (
                    <tr
                      key={uniqueId}
                      className="hover:bg-white/40 dark:hover:bg-white/[0.01] transition-all duration-200 group"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center text-[11px] font-bold text-neutral-800 dark:text-white uppercase">
                          {user.name ? user.name.slice(0, 2) : "US"}
                        </div>
                        <span className="font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                          {user.name || "Unknown"}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-neutral-500 dark:text-zinc-400 font-mono text-[12px]">
                        {user.email}
                      </td>

                      <td className="py-4 px-6">
                        {user.role === "admin" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 dark:bg-rose-500/5 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]">
                            <Crown size={11} className="animate-pulse" /> Admin
                          </span>
                        ) : user.role === "recruiter" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                            <Briefcase size={11} /> Recruiter
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-zinc-300 border border-neutral-200 dark:border-white/[0.04]">
                            <Users size={11} /> Seeker
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-neutral-500 dark:text-zinc-400">
                        {joinDate}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                          Active
                        </span>
                      </td>

                      {/* 🛠️ BUG FIX: Added whitespace-nowrap safely and handled dropdown box wrapper */}
                      <td className="py-4 px-6 text-right whitespace-nowrap relative">
                        <div className="inline-flex items-center gap-3">
                          <div className="relative">
                            <button
                              onClick={() =>
                                setOpenDropdownId(
                                  openDropdownId === uniqueId ? null : uniqueId,
                                )
                              }
                              className="h-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-zinc-300 border border-neutral-200 dark:border-white/[0.04] transition-all"
                            >
                              Change Role
                              <ChevronDown
                                size={11}
                                className={`opacity-60 transition-transform duration-200 ${openDropdownId === uniqueId ? "rotate-180" : ""}`}
                              />
                            </button>

                            {/* 🛠️ BUG FIX: Added flex-col, whitespace-normal, top-full to force a clean vertical stack */}
                            {openDropdownId === uniqueId && (
                              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.08] rounded-xl shadow-2xl z-50 p-1.5 flex flex-col gap-1 whitespace-normal">
                                {["seeker", "recruiter", "admin"].map(
                                  (roleOption) => (
                                    <button
                                      key={roleOption}
                                      disabled={user.role === roleOption}
                                      onClick={() =>
                                        triggerAction(
                                          safeUser,
                                          "change_role",
                                          roleOption,
                                        )
                                      }
                                      // 🛠️ BUG FIX: w-full and block ensures they take full width inside the box
                                      className="block w-full text-left px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-white/[0.04] text-neutral-700 dark:text-zinc-300"
                                    >
                                      As {roleOption}
                                    </button>
                                  ),
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => triggerAction(safeUser, "delete")}
                            className="text-[11px] font-bold uppercase tracking-wider text-red-600/80 hover:text-red-500 transition-colors py-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUpWrapper>

      {/* CONFIRMATION MODAL */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
          <div
            onClick={!isPending ? closeModal : undefined}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-white dark:bg-[#0c0c0e] border border-neutral-200 dark:border-white/[0.08] rounded-[24px] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2 rounded-xl border shrink-0 ${modal.actionType === "delete" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}
              >
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {modal.actionType === "change_role"
                    ? "Confirm Role Privilege Change"
                    : "Terminate User Account"}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {modal.actionType === "change_role" ? (
                    <>
                      Are you sure you want to change{" "}
                      <span className="font-bold text-neutral-800 dark:text-zinc-200">
                        "{modal.user?.name}"
                      </span>
                      's permission role to{" "}
                      <span
                        className={`font-bold uppercase ${modal.targetRole === "admin" ? "text-rose-500" : "text-amber-500"}`}
                      >
                        {modal.targetRole}
                      </span>
                      ?
                    </>
                  ) : (
                    <>
                      Warning: Are you absolutely sure you want to delete{" "}
                      <span className="font-bold text-neutral-800 dark:text-zinc-200">
                        "{modal.user?.name}"
                      </span>
                      ? This action is irreversible.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6">
              <button
                disabled={isPending}
                onClick={closeModal}
                className="h-9 px-4 rounded-xl border border-neutral-200 dark:border-white/[0.06] bg-transparent text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={handleConfirm}
                className={`h-9 px-5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-1.5 min-w-[95px] justify-center ${
                  modal.actionType === "delete"
                    ? "bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/20"
                    : "bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90"
                }`}
              >
                {isPending ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
