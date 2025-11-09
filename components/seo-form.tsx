"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Globe } from "lucide-react";
import { Input } from "@/components/ui/input"; // your enhanced input component
import { Button } from "@/components/ui/button"; // your button component
import { cn } from "@/lib/utils";

export function SeoForm() {
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const validateUrl = (input: string) => {
    let formatted = input.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `https://${formatted}`;
    }
    try {
      new URL(formatted);
      return formatted;
    } catch {
      return null;
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    const validUrl = validateUrl(url);
    if (!validUrl) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300)); // mimic small delay for UX
      router.push(`/results?url=${encodeURIComponent(validUrl)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ rotate: -1, opacity: 0, y: 20 }}
      animate={{ rotate: 0, opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl border bg-white/90 backdrop-blur-sm shadow-md p-6 md:p-8 max-w-2xl mx-auto"
    >
      <form onSubmit={handleAnalyze} className="space-y-5">
        <div>
          <label
            htmlFor="url"
            className="block text-lg md:text-xl font-semibold text-foreground mb-2"
          >
            Website URL
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              
              <Input
                id="url"
                type="text"
                placeholder="e.g. example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={cn(
                  "pl-10 text-base md:text-lg border",
                  error ? "border-destructive focus-visible:ring-destructive" : ""
                )}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#FF5757] hover:bg-[#ff4545] uppercase text-lg font-bold px-6 md:px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Analyzing...
                </>
              ) : (
                "Analyze SEO"
              )}
            </Button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive font-medium mt-2"
            >
              {error}
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  );
}
