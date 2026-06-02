"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";

const footerData = {
  product: [
    { name: "Job discovery", href: "/job-discovery" },
    { name: "Worker AI", href: "/worker-ai" },
    { name: "Companies", href: "/companies" },
    { name: "Salary data", href: "/salary-data" },
  ],
  navigations: [
    { name: "Help center", href: "/help-center" },
    { name: "Career library", href: "/career-library" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Brand Guideline", href: "/brand-guideline" },
    { name: "Newsroom", href: "/newsroom" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white dark:bg-[#09090b] pt-20 pb-10 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      {/* Subtle Background Glow / Grid matching the premium Figma vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/50 dark:from-indigo-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 md:px-5">
        {/* Top Section: Links & Info */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12 mb-16">
          
          {/* Brand & Description (Spans 5 cols on large screens) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center select-none mb-6">
              <span className="text-[30px] font-black tracking-[-0.04em] text-blue-500">
                hire
              </span>
              <span className="text-[30px] font-black tracking-[-0.04em] text-orange-500">
                loop
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed max-w-[320px]">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Links Grid (Spans 7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Product Column */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[15px] font-semibold text-indigo-600 dark:text-indigo-500">
                Product
              </h3>
              <ul className="flex flex-col gap-3.5">
                {footerData.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigations Column */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[15px] font-semibold text-indigo-600 dark:text-indigo-500">
                Navigations
              </h3>
              <ul className="flex flex-col gap-3.5">
                {footerData.navigations.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[15px] font-semibold text-indigo-600 dark:text-indigo-500">
                Resources
              </h3>
              <ul className="flex flex-col gap-3.5">
                {footerData.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-200 dark:border-white/[0.08]">
          
          {/* Social Icons using react-icons */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 text-sm"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </Link>
            
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4f46e5] text-white hover:bg-[#4338ca] transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] text-sm"
              aria-label="Pinterest"
            >
              <FaPinterestP />
            </Link>

            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 text-sm"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </Link>
          </div>

          {/* Copyright & Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[13px] text-zinc-500 dark:text-zinc-400">
            <p>Copyright 2026 —Nafis Shah</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                Privacy Guideline
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;