"use client";

import React, { useState } from "react";
import DotBackground from "@/components/ui/DotBackground";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardPreview from "./DashboardPreview";
import { Sparkles, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
      <DotBackground className="py-8 sm:py-12">
        {/* Subtle decorative purple gradient aura */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-200/40 dark:from-purple-900/30 via-purple-300/25 dark:via-purple-800/20 to-indigo-100/30 dark:to-indigo-950/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Hero Header */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill Badge */}
            <div className="flex justify-center mb-6">
              <Badge
                variant="purple"
                className="px-3.5 py-1 text-xs sm:text-sm font-medium rounded-full shadow-xs border-purple-200/80 dark:border-purple-800/60 dark:bg-purple-950/60 dark:text-purple-300 transition-all hover:bg-purple-100 dark:hover:bg-purple-900/60"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#6D28D9] dark:text-purple-400" />
                Built For Modern Hiring
              </Badge>
            </div>

            {/* Headline (2 lines, bold, large) */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl sm:leading-[1.15] leading-[1.2]">
              AI-Powered Interviews for{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                Modern Hiring Teams
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Empower your hiring team with AI-driven interview insights and seamless candidate evaluation to make confident hiring decisions faster.
            </p>

            {/* Email Input + Join Waitlist Button inline */}
            <div className="mt-8 max-w-md mx-auto">
              {submitted ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 p-3.5 text-sm font-medium text-[#6D28D9] dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 animate-in fade-in zoom-in-95 duration-200">
                  <CheckCircle2 className="h-4 w-4 text-[#6D28D9] dark:text-purple-400" />
                  <span>You are on the priority access waitlist! We will be in touch shortly.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl bg-white dark:bg-zinc-900/90 p-1.5 shadow-lg shadow-purple-950/5 dark:shadow-purple-950/20 ring-1 ring-zinc-200 dark:ring-zinc-800 sm:rounded-full transition-all"
                >
                  <Input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 border-0 bg-transparent px-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
                  />
                  <Button
                    type="submit"
                    className="h-11 w-full sm:w-auto rounded-xl sm:rounded-full bg-[#6D28D9] px-6 font-medium text-white shadow-sm shadow-purple-500/30 transition-all hover:bg-[#5B21B6] hover:shadow-md hover:shadow-purple-600/30 shrink-0"
                  >
                    <span>Join Waitlist</span>
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </form>
              )}

              {/* Trust micro-text */}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6D28D9] dark:text-purple-400" /> Free 14-day trial
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-[#6D28D9] dark:text-purple-400" /> SOC-2 Type II compliant
                </span>
              </div>
            </div>
          </div>

          {/* Browser-Frame Dashboard Preview */}
          <div className="mt-14 sm:mt-18 lg:mt-20">
            <DashboardPreview />
          </div>
        </div>
      </DotBackground>
    </section>
  );
}
