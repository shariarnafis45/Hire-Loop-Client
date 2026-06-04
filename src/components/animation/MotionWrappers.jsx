"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

// 1. Simple Fade Up & Slide In Wrapper
export const FadeUpWrapper = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay, ease: [0.25, 0.4, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// 2. Staggered Container for Lists/Cards
export const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// 3. Individual Staggered Item
export const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// 4. Professional Number Counter (Optimized, no heavy libraries)
export const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      let startTimestamp;
      const duration = 2000; // 2 seconds
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutQuart for smooth slow-down at the end
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeProgress * value);
        
        if (ref.current) {
          ref.current.textContent = currentCount + suffix;
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else if (ref.current) {
          ref.current.textContent = value + suffix;
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};