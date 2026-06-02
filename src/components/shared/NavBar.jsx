"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeSwitch from "../ui/ThemeSwitch";

const navLinks = [
  {
    name: "Browse Jobs",
    href: "/jobs",
  },
  {
    name: "Companies",
    href: "/companies",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
          <Link href="/" className="flex items-center select-none">
            <span className="text-[30px] font-black tracking-[-0.04em] text-blue-500">
              hire
            </span>

            <span className="text-[30px] font-black tracking-[-0.04em] text-orange-500">
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
                  className={`relative text-sm font-medium transition-all duration-300
                  ${
                    active
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400"
                  }
                  hover:text-zinc-950 dark:hover:text-white`}
                >
                  {item.name}

                  {active && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-violet-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitch />

            <div className="h-5 w-px bg-zinc-200 dark:bg-white/10" />

            <Link
              href="/auth/signin"
              className="
                text-sm font-medium
                text-violet-600 dark:text-violet-400
                transition-colors
                hover:text-violet-700 dark:hover:text-violet-300
              "
            >
              Sign In
            </Link>

            <div className="h-5 w-px bg-zinc-200 dark:bg-white/10" />

            <Link
              href="/auth/signup"
              className="
                inline-flex h-11 items-center justify-center
                rounded-xl
                bg-violet-600
                px-6
                text-sm font-semibold text-white
                transition-all duration-300
                hover:bg-violet-500
                hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]
                active:scale-[0.98]
              "
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitch />

            <button
              onClick={() => setOpen(!open)}
              className="
      flex h-10 w-10 items-center justify-center
      rounded-xl
      border border-zinc-200/60
      dark:border-white/10

      bg-white/80
      dark:bg-white/[0.03]

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

        {/* Mobile Menu */}
        {open && (
          <div
            className="
              mt-3
              overflow-hidden
              rounded-2xl
              border border-zinc-200/80 dark:border-white/10
              bg-white/90 dark:bg-black/80
              backdrop-blur-xl
              p-4
              shadow-xl
              md:hidden
            "
          >
            {/* Links */}
            <div className="flex flex-col gap-1">
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

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/signin"
                className="
                  rounded-xl
                  px-4 py-3
                  text-center
                  text-sm font-medium
                  text-violet-600 dark:text-violet-400
                "
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="
                  rounded-xl
                  bg-violet-600
                  px-4 py-3
                  text-center
                  text-sm font-semibold
                  text-white
                  transition-all
                  hover:bg-violet-500
                "
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
