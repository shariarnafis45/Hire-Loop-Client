"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  FileText, 
  Settings, 
  X,
  LogOut,
  Crown,
  CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";


import { authClient, useSession } from "@/lib/auth-client"; 

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Company", href: "/dashboard/company", icon: Building2 },
  { name: "Manage Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { name: "Applications", href: "/dashboard/applications", icon: FileText, badge: "12" }, 
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Fetching real user from Better Auth
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Fallback Initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };


  const handleLogout = async () => {
    await authClient.signOut();
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-2xl rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
      >
        <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full">
          <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-zinc-900 dark:text-white">
            Logged out successfully
          </p>
          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            See you again soon!
          </p>
        </div>
      </div>
    ));
    setIsOpen(false);
    router.push('/');
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[260px] transform flex-col
        border-r border-zinc-200/50 dark:border-white/[0.05]
        bg-white/80 dark:bg-[#0c0c0c]/80 backdrop-blur-3xl
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        md:relative md:translate-x-0 flex justify-between
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}
    >
      {/* Top Section: Logo & Nav */}
      <div className="flex flex-col flex-1 overflow-hidden pt-2">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 shrink-0 mb-4">
          <Link href="/" className="flex items-center select-none group">
            <span className="text-[24px] font-black tracking-[-0.04em] text-blue-500 transition-transform group-hover:scale-105">
              hire
            </span>
            <span className="text-[24px] font-black tracking-[-0.04em] text-orange-500 transition-transform group-hover:scale-105">
              loop
            </span>
          </Link>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="md:hidden p-1.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
          {sidebarLinks.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  relative flex items-center justify-between px-6 py-3 text-[14px] font-medium
                  transition-all duration-300 group
                  ${active ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-[#888888] hover:text-zinc-800 dark:hover:text-zinc-200"}
                `}
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="sidebarActiveBg"
                      className="absolute inset-0 bg-zinc-100/50 dark:bg-white/[0.03]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <motion.div 
                        className="absolute right-0 top-0 bottom-0 w-[3px] bg-zinc-900 dark:bg-white rounded-l-full"
                        layoutId="sidebarIndicator"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon 
                    size={18} 
                    strokeWidth={active ? 2.5 : 2}
                    className={`transition-colors duration-300 ${active ? "text-zinc-900 dark:text-white" : "group-hover:text-zinc-800 dark:group-hover:text-zinc-300"}`} 
                  />
                  <span className="relative z-10 tracking-wide">{item.name}</span>
                </div>

                {item.badge && (
                  <span className={`relative z-10 text-[11px] px-2 py-0.5 rounded-full font-semibold
                    ${active ? "bg-zinc-900 text-white dark:bg-white dark:text-black" : "bg-zinc-200 text-zinc-600 dark:bg-white/10 dark:text-zinc-400"}
                  `}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Better Auth Widget */}
      <div className="px-4 pb-6 pt-4 shrink-0">
        <div className="rounded-xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/50 dark:bg-[#121212]/50 p-1.5 backdrop-blur-md">
          {isPending ? (
            <div className="w-full flex items-center gap-3 p-2 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-white/10 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-20 bg-zinc-200 dark:bg-white/10 rounded-md" />
                <div className="h-2 w-16 bg-zinc-200 dark:bg-white/10 rounded-md" />
              </div>
            </div>
          ) : user ? (
            // Added onClick={handleLogout} here
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100/80 dark:hover:bg-white/[0.04] transition-all duration-300 group outline-none text-left"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-800 dark:bg-zinc-800 flex items-center justify-center text-white font-medium text-sm shadow-sm shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700/50 relative">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-zinc-900 dark:text-white truncate leading-tight">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Crown size={10} className="text-amber-500" />
                  <p className="text-[9px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase truncate">
                    Premium Account
                  </p>
                </div>
              </div>

              <LogOut size={16} className="text-zinc-400 group-hover:text-red-500 transition-colors shrink-0 mr-1" />
            </button>
          ) : (
            <div className="w-full text-center text-xs text-zinc-500 py-3 font-medium">
              Not signed in
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;