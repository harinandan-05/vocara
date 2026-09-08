import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 transition-colors duration-200">
      {/* 
        Clean modern background with subtle purple ambient glow,
        perfectly setting up the half-round dispersing footer dome directly below.
      */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-purple-50/70 to-white dark:from-zinc-950 dark:via-purple-950/25 dark:to-zinc-950 transition-colors duration-200"
        aria-hidden="true"
      />
      {/* Soft ambient center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[380px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/40 dark:bg-purple-900/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Badge */}
        <div className="flex justify-center mb-5">
          <Badge
            variant="outline"
            className="border-purple-300/80 dark:border-purple-800/80 bg-white/80 dark:bg-zinc-900/80 text-[#6D28D9] dark:text-purple-300 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs shadow-xs"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#6D28D9] dark:text-purple-400" />
            Accelerate Your Pipeline
          </Badge>
        </div>

        {/* Centered Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:leading-tight">
          Hire Better Talent With{" "}
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] bg-clip-text text-transparent">
            Intelligent AI Interviews
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Join high-performing recruitment teams saving 80% of screening hours while elevating candidate engagement and eliminating hiring bias.
        </p>

        {/* Two Buttons: Filled Purple + Outline */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#hero"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto h-12 rounded-xl bg-[#6D28D9] px-7 font-semibold text-white shadow-lg shadow-purple-950/20 dark:shadow-purple-950/50 hover:bg-[#5B21B6] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <span>Start Free Trial</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>

          <a
            href="mailto:sales@vocara.ai"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto h-12 rounded-xl border-zinc-300/90 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 px-7 font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all duration-200"
            )}
          >
            <PhoneCall className="mr-2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span>Contact Sales</span>
          </a>
        </div>

        {/* Reassurance text */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#6D28D9] dark:text-purple-400" /> No credit card required
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#6D28D9] dark:text-purple-400" /> 14-day full access trial
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#6D28D9] dark:text-purple-400" /> Setup in under 5 minutes
          </span>
        </div>
      </div>
    </section>
  );
}
