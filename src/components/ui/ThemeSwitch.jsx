"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-xl

        border
        border-zinc-200/80
        dark:border-white/10

        bg-white/80
        dark:bg-white/5

        backdrop-blur-xl

        text-zinc-700
        dark:text-zinc-200

        transition-all
        duration-300

        hover:border-violet-500/50
        hover:text-violet-600
        dark:hover:text-violet-400

        hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]

        active:scale-95
      "
      aria-label="Toggle Theme"
    >
      <span className="transition-transform duration-300">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
