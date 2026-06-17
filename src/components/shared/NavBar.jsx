"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown, LayoutDashboard, Briefcase, Settings, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import ThemeSwitch from "../ui/ThemeSwitch";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

const privateLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Applications", href: "/dashboard/applications", icon: Briefcase },
  { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
];

const NavBar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const pathname = usePathname();
  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } flex items-center gap-3 max-w-sm w-full bg-white/80 dark:bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] rounded-2xl p-4 border border-zinc-200 dark:border-white/[0.06]`}
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

    setOpen(false);
    setIsDropdownOpen(false);
    router.refresh()
  };

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-4">
      <div className="mx-auto max-w-[1180px]">
        <nav
          className="
            flex h-16 items-center justify-between
            rounded-2xl
            border border-zinc-200/60 dark:border-white/5
            bg-white/70 dark:bg-zinc-950/70
            backdrop-blur-2xl
            px-5
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center select-none group">
            <span className="text-[30px] font-black tracking-[-0.04em] text-blue-500 transition-transform group-hover:scale-105">
              hire
            </span>
            <span className="text-[30px] font-black tracking-[-0.04em] text-orange-500 transition-transform group-hover:scale-105">
              loop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredLink(item.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative text-sm font-medium transition-colors duration-300 py-1
                  ${
                    active
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400"
                  }
                  hover:text-zinc-950 dark:hover:text-white`}
                >
                  {item.name}
                  
                  {/* Floating Hover Background */}
                  {hoveredLink === item.href && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute inset-x-[-12px] inset-y-[-4px] rounded-lg bg-zinc-100 dark:bg-white/5 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Magnetic Active Underline */}
                  {active && (
                    <motion.span 
                      layoutId="activeUnderline"
                      className="absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full bg-violet-500" 
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side / Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitch />
            <div className="h-5 w-px bg-zinc-200 dark:bg-white/10" />

            {user ? (
              /* --- Premium Profile Dropdown (Logged In) --- */
              <div className="relative" ref={dropdownRef}>
                {/* Trigger */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  role="button"
                  className="
                    flex items-center gap-2.5
                    rounded-xl
                    border border-zinc-200/60 dark:border-white/5
                    bg-white/50 dark:bg-zinc-900/50
                    pl-2 pr-3 py-1.5
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:border-violet-500/30
                    hover:bg-white/80 dark:hover:bg-zinc-900/80
                    hover:shadow-[0_8px_25px_rgba(124,58,237,0.05)]
                    cursor-pointer
                  "
                >
                  <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-zinc-950">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="max-w-[90px] text-left">
                    <h4 className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {user?.name}
                    </h4>
                  </div>

                  <ChevronDown 
                    size={14} 
                    className={`text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
                  />
                </div>

                {/* Smooth Animated Desktop Dropdown Menu List */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="
                        absolute right-0 top-full z-[9999] mt-3 w-64
                        rounded-2xl border border-zinc-200/60 dark:border-white/5
                        bg-white/95 dark:bg-zinc-950/95 p-2
                        shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                        backdrop-blur-2xl origin-top-right
                      "
                    >
                      <div className="mb-2 flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/[0.02] p-3">
                        <Avatar className="h-9 w-9">
                          <Avatar.Image alt={user?.name} src={user?.image} />
                          <Avatar.Fallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-xs font-bold text-zinc-900 dark:text-white">
                            {user?.name}
                          </h3>
                          <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-0.5 flex flex-col">
                        {privateLinks.map((link, i) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={i}
                              href={link.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="
                                flex items-center gap-2.5 rounded-xl px-3 py-2.5
                                text-xs font-medium text-zinc-700 dark:text-zinc-300
                                hover:bg-zinc-100 dark:hover:bg-white/5
                                hover:text-zinc-950 dark:hover:text-white
                                transition-colors
                              "
                            >
                              <Icon size={15} className="text-zinc-500 dark:text-zinc-400" />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="my-1.5 h-px bg-zinc-200/60 dark:bg-white/5" />

                      <Button
                        onClick={handleLogout}
                        className="
                          flex h-9 w-full items-center justify-center gap-2
                          rounded-xl border-0
                          bg-red-500/10 dark:bg-red-500/5
                          text-xs font-semibold text-red-500
                          transition-all duration-200
                          hover:bg-red-500 hover:text-white
                        "
                      >
                        <LogOut size={14} />
                        Logout
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className="text-sm font-medium text-violet-600 dark:text-violet-400 transition-colors hover:text-violet-700 dark:hover:text-violet-300">
                  Sign In
                </Link>
                <div className="h-5 w-px bg-zinc-200 dark:bg-white/10" />
                <Link href="/auth/signup" className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] active:scale-[0.98]">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitch />
            <button
              onClick={() => setOpen(!open)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-zinc-200/60 dark:border-white/10
                bg-white/80 dark:bg-white/[0.03]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-violet-500/30
                hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]
                active:scale-95
              "
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Smooth Animated Mobile Sidebar Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden mt-3"
            >
              <div
                className="
                  rounded-2xl
                  border border-zinc-200/80 dark:border-white/10
                  bg-white/95 dark:bg-zinc-950/95
                  backdrop-blur-xl
                  p-4
                  shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  flex flex-col gap-4
                "
              >
                {user && (
                  <div className="flex items-center gap-3 pb-3 border-b border-zinc-200/60 dark:border-white/5">
                    <Avatar className="h-10 w-10">
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-zinc-900 dark:text-white">
                        {user?.name}
                      </h3>
                      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-4 mb-1">
                    Navigation
                  </span>
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        rounded-xl
                        px-4 py-3
                        text-sm font-medium
                        text-zinc-700 dark:text-zinc-300
                        hover:bg-zinc-100 dark:hover:bg-white/5
                      "
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {user ? (
                  <div className="flex flex-col gap-1 pt-2 border-t border-zinc-200/60 dark:border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-4 mb-1">
                      Dashboard
                    </span>
                    {privateLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="
                          rounded-xl
                          px-4 py-2.5
                          text-sm font-medium
                          text-zinc-700 dark:text-zinc-300
                          hover:bg-zinc-100 dark:hover:bg-white/5
                        "
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                    <Button
                      onClick={handleLogout}
                      className="
                        mt-4 flex h-11 w-full items-center justify-center gap-2
                        rounded-xl border-0
                        bg-red-500/10 text-sm font-semibold text-red-500
                        transition-all duration-200 hover:bg-red-500 hover:text-white
                      "
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200/60 dark:border-white/5">
                    <Link href="/auth/signin" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-center text-sm font-medium text-violet-600 dark:text-violet-400">
                      Sign In
                    </Link>
                    <Link href="/auth/signup" onClick={() => setOpen(false)} className="rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-violet-500">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};

export default NavBar;