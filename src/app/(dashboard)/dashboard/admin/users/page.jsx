import { getUsersList } from '@/lib/api/users';
import React from 'react';
import { ChevronDown, Download } from 'lucide-react';

import { UsersTable } from './UsersTable'; 
import { AnimatedCounter, FadeUpWrapper, StaggerContainer, StaggerItem } from '@/components/animation/MotionWrappers';

const AdminUsersPage = async () => {
  const users = await getUsersList() || [];

  const totalUsers = users.length;
  const totalRecruiters = users.filter(u => u.role === 'recruiter').length;
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const newSignups24h = users.filter(u => {
    const joinDate = new Date(u.createdAt?.$date || u.createdAt);
    return joinDate > twentyFourHoursAgo;
  }).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#030303] p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-500">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/[0.04] dark:bg-amber-500/[0.02] blur-[80px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <FadeUpWrapper>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                User Management
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-zinc-400 mt-1">
                Review, filter, and manage platform access for all users in real-time.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto w-full sm:w-auto">
              <button className="flex-1 sm:flex-none h-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-neutral-200/80 dark:border-white/[0.06] text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800/80 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                All Roles <ChevronDown size={13} className="opacity-60" />
              </button>
              <button className="flex-1 sm:flex-none h-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md dark:shadow-none group">
                <Download size={13} className="group-hover:translate-y-0.5 transition-transform" /> Export List
              </button>
            </div>
          </div>
        </FadeUpWrapper>

        {/* STATS METRIC CARDS */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/80 dark:border-white/[0.06] rounded-[24px] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">Total Active Users</p>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1.5">
              <AnimatedCounter value={totalUsers} />
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/80 dark:border-white/[0.06] rounded-[24px] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">Total Recruiters</p>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1.5">
              <AnimatedCounter value={totalRecruiters} />
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/80 dark:border-white/[0.06] rounded-[24px] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">Suspended Accounts</p>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1.5">
              <AnimatedCounter value={0} />
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white/70 dark:bg-[#09090b]/40 backdrop-blur-xl border border-neutral-200/80 dark:border-white/[0.06] rounded-[24px] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">New Signups (24h)</p>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1.5">
              <AnimatedCounter value={newSignups24h} />
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* ─── CLIENT TABLE COMPONENTS (Passing Initial Users Data) ─── */}
        <UsersTable  initialUsers={users} />

      </div>
    </div>
  );
};

export default AdminUsersPage;