"use client";

import { useSession } from "@/lib/auth-client"; 
import StatCard from "@/components/dashboard/StatCard";
import { FileText, Users, Zap, CheckCircle2 } from "lucide-react";
import RecentApplications from "@/components/dashboard/RecentApplications";
import TopCompanies from "@/components/dashboard/TopCompanies";

// Mock Data (Future-e eita API theke asbe)
const statsData = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: FileText,
    trend: "12%",
    trendUp: true,
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Users,
    trend: "8.5%",
    trendUp: true,
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Zap,
    trend: "2",
    trendUp: false,
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: CheckCircle2,
    trend: "24%",
    trendUp: true,
  },
];

const RecruiterDashboard = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Recruiter";
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Welcome back, {userName}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Here is what's happening with your job postings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendUp={stat.trendUp}
            delay={index * 0.1} 
          />
        ))}
      </div>

      {/* Grid for Charts & Tables  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 min-h-[450px]">
          <RecentApplications />
        </div>
        <div className="min-h-[450px]">
          <TopCompanies />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
