"use client";

import { motion } from "framer-motion";
import { Loader2, Globe, Search, BarChart3 } from "lucide-react";

export default function Loading() {
  const steps = [
    { icon: <Globe className="h-5 w-5" />, text: "Fetching website data" },
    { icon: <Search className="h-5 w-5" />, text: "Analyzing meta tags" },
    { icon: <BarChart3 className="h-5 w-5" />, text: "Evaluating content SEO" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#FFF6E0] to-[#FFD966] text-center p-4"
      aria-busy="true"
      role="status"
    >
      <motion.div
        initial={{ rotate: -1, opacity: 0, scale: 0.9 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl border bg-white shadow-md p-10 md:p-12 max-w-2xl w-full space-y-8"
      >
        {/* Animated Loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-fit"
        >
          <Loader2 className="h-16 w-16 text-[#FF5757]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-tight"
        >
          Analyzing Website SEO...
        </motion.p>

        {/* Step indicator */}
        <div className="flex flex-col gap-3 items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="flex items-center gap-2 text-sm font-medium text-foreground/80"
            >
              <motion.span
                className="h-3 w-3 rounded-full bg-[#FF5757]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
              <span className="flex items-center gap-2">{step.icon} {step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed"
        >
          We’re crawling the site, analyzing metadata, and preparing insights.  
          This may take 15–30 seconds depending on site size.
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          className="relative w-full h-2 bg-[#FFB300]/30 rounded-full overflow-hidden mt-4"
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#FF5757]"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "25%", "50%", "75%", "100%"] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
