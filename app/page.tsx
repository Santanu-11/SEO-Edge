"use client";

import { motion } from "framer-motion";
import { SeoForm } from "@/components/seo-form";
import { BarChart3, Globe2, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#FFF7D1] to-[#FFD966] p-4 md:p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto text-center space-y-12"
      >
        {/* Hero Section */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black uppercase tracking-tight bg-linear-to-r from-[#FF5757] to-[#FF914D] text-transparent bg-clip-text"
          >
            SEO Edge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl font-semibold text-foreground/80"
          >
            Analyze your website. Boost visibility. Outrank competitors.
          </motion.p>
        </div>

        {/* Animated Highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium text-foreground/70"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {[
            { icon: <Globe2 className="h-5 w-5 text-[#FF5757]" />, text: "Real-time site audit" },
            { icon: <Rocket className="h-5 w-5 text-[#FF914D]" />, text: "Actionable recommendations" },
            { icon: <BarChart3 className="h-5 w-5 text-[#00C853]" />, text: "Performance & content insights" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-full shadow-sm backdrop-blur-sm border"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* SEO Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <SeoForm />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground mt-8"
        >
          Built for modern web creators. © {new Date().getFullYear()}{" "}
          <Link href="/" className="text-primary font-semibold hover:underline">
            SEO Edge
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Sparkle Animation */}
      <SparklesBackground />
    </main>
  );
}

/* Subtle floating sparkles for depth and polish */
function SparklesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FF5757]/20"
          style={{
            width: Math.random() * 20 + 8,
            height: Math.random() * 20 + 8,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
