import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HOW_IT_WORKS_STEPS } from "@/lib/data";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  Mic,
  Video,
  Bot,
  FileCheck,
  ShieldCheck,  
  TrendingUp,
  Volume2,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white dark:bg-zinc-950 relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="purple"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60"
          >
            Quick Setup
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Streamline your hiring funnel in three simple steps, from automated rubric configuration to instant candidate qualification.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <Card
              key={step.stepNumber}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-950/5 dark:hover:shadow-purple-950/30"
            >
              <div>
                {/* Step number and badge */}
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-sm font-bold text-[#6D28D9] dark:text-purple-400 group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-zinc-200 dark:border-zinc-700 text-[11px] font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {step.badge}
                  </Badge>
                </div>

                {/* Mocked screenshot/UI preview */}
                <div className="mt-5 rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950 p-3.5 transition-colors group-hover:bg-purple-50/20 dark:group-hover:bg-purple-950/20">
                  {step.stepNumber === 1 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Sliders className="h-3 w-3 text-[#6D28D9] dark:text-purple-400" /> Interview Flow
                        </span>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Custom</span>
                      </div>
                      <div className="rounded-lg bg-white dark:bg-zinc-900 p-2.5 shadow-xs border border-zinc-200/50 dark:border-zinc-800 space-y-1.5">
                        <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                          Role: Senior Fullstack Engineer
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <span className="rounded bg-purple-100/70 dark:bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-medium text-[#6D28D9] dark:text-purple-300">
                            Architecture
                          </span>
                          <span className="rounded bg-purple-100/70 dark:bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-medium text-[#6D28D9] dark:text-purple-300">
                            Distributed DBs
                          </span>
                          <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                            + 4 Rubrics
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2.5 py-1.5 rounded-md border border-zinc-200/40 dark:border-zinc-800">
                        <span>Adaptive follow-ups:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Enabled</span>
                      </div>
                    </div>
                  )}

                  {step.stepNumber === 2 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                          Live Video & Audio
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500 font-mono">14:20</span>
                      </div>
                      <div className="rounded-lg bg-white dark:bg-zinc-900 p-2.5 shadow-xs border border-zinc-200/50 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-[10px] font-bold">
                            AI
                          </div>
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                            Vocara Voice Agent
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-300 italic bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded border border-zinc-100 dark:border-zinc-800 leading-snug">
                          &ldquo;Can you explain how you handle cache invalidation during sudden traffic spikes?&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-1 justify-center h-4">
                        {[40, 80, 50, 90, 60, 100, 75, 45, 85].map((h, idx) => (
                          <span
                            key={idx}
                            className="w-1 bg-[#6D28D9] dark:bg-[#8B5CF6] rounded-full"
                            style={{ height: `${h}%` }}
                          ></span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.stepNumber === 3 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <FileCheck className="h-3 w-3 text-purple-600 dark:text-purple-400" /> AI Executive Report
                        </span>
                        <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-200/40 dark:border-purple-800/40">
                          92 / 100
                        </span>
                      </div>
                      <div className="rounded-lg bg-white dark:bg-zinc-900 p-2.5 shadow-xs border border-zinc-200/50 dark:border-zinc-800 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium">Core Match</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Top 3% Tier</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">Strengths:</span> High systems agility, clear trade-off explanations.
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-600 dark:text-zinc-400 bg-emerald-50/70 dark:bg-emerald-950/50 px-2 py-1 rounded border border-emerald-200/60 dark:border-emerald-800/50">
                        <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                          <ShieldCheck className="h-3 w-3" /> Anti-Cheat Verified
                        </span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">Pass</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step Title & Description */}
                <h3 className="mt-6 text-lg font-bold text-zinc-950 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>

              {/* Step highlight footer */}
              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5 text-xs font-medium text-[#6D28D9] dark:text-purple-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#6D28D9] dark:text-purple-400" />
                <span className="truncate">{step.highlight}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
