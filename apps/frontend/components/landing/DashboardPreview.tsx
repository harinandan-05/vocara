"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Video,
  Award,
  Sparkles,
  Play,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Lock,
  RotateCw,
  Search,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-2 shadow-2xl shadow-purple-950/10 dark:shadow-purple-950/40 backdrop-blur-sm sm:p-3 lg:rounded-3xl transition-colors duration-200">
      {/* Browser chrome header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400/90 hover:opacity-80 transition-opacity"></span>
          <span className="h-3 w-3 rounded-full bg-amber-400/90 hover:opacity-80 transition-opacity"></span>
          <span className="h-3 w-3 rounded-full bg-emerald-400/90 hover:opacity-80 transition-opacity"></span>
        </div>

        {/* Browser URL pill */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-50 dark:bg-zinc-950/80 px-4 py-1 text-xs text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800 w-64 sm:w-80 justify-center">
          <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
            app.vocara.ai/interviews/fullstack-lead
          </span>
          <RotateCw className="h-2.5 w-2.5 text-zinc-400 hidden sm:inline" />
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            AI Active
          </span>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="p-3 sm:p-5 lg:p-6 bg-zinc-50/60 dark:bg-zinc-950/60 rounded-xl space-y-4 sm:space-y-5">
        {/* Sub-header inside preview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3.5 sm:p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Staff Frontend & Systems Engineer
              </h4>
              <Badge variant="purple" className="text-[11px] dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60">
                Active Pipeline
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Automated AI screening with conversational voice probes & real-time rubric scoring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs rounded-lg border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Export Report
            </Button>
            <Button
              size="sm"
              className="h-8 text-xs rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
            >
              + Invite Batch
            </Button>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card className="border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-purple-200 dark:hover:border-purple-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Total Candidates
              </span>
              <div className="h-7 w-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-[#6D28D9] dark:text-purple-400">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                1,428
              </span>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="mr-0.5 h-3 w-3" /> +18.4%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
              Screened across 14 hiring workflows
            </p>
          </Card>

          <Card className="border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-purple-200 dark:hover:border-purple-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Interviews Completed
              </span>
              <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Video className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                892
              </span>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                94.8% completion
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
              Average interview duration: 18 mins
            </p>
          </Card>

          <Card className="border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs hover:border-purple-200 dark:hover:border-purple-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Avg AI Score
              </span>
              <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                88.4
              </span>
              <span className="text-xs text-zinc-400 font-medium">/ 100</span>
              <Badge variant="outline" className="text-[10px] ml-auto border-purple-200 dark:border-purple-800 text-[#6D28D9] dark:text-purple-300">
                Top 5% Talent
              </Badge>
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
              +12 pts vs industry benchmark
            </p>
          </Card>
        </div>

        {/* Main Grid: Chart Placeholder Card & Candidate Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Chart Placeholder Card (7 cols) */}
          <Card className="lg:col-span-7 border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Candidate Competency Distribution
                </h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  AI scoring across live technical & behavioral dimensions
                </p>
              </div>
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-200/50 dark:border-purple-800/50">
                Live Cohort
              </span>
            </div>

            {/* Simulated Bar Chart & Score Breakdown */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>System Architecture & Depth</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">92%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6]"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>Algorithmic Problem Solving</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">86%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]"
                    style={{ width: "86%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>Technical Communication & Articulation</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">94%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <span>Leadership & Cross-Functional Alignment</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">88%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: "88%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Mini visual distribution bar chart */}
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span>Score Distribution (Percentiles)</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">n = 892 interviews</span>
              </div>
              <div className="flex items-end gap-1.5 h-14 pt-2">
                {[20, 35, 45, 60, 85, 95, 88, 70, 50, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-[#6D28D9] dark:hover:bg-[#8B5CF6] rounded-t transition-all duration-200 group relative cursor-pointer"
                    style={{ height: `${h}%` }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-1 rounded transition-opacity">
                      {h}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Candidate Spotlight Card (5 cols) */}
          <Card className="lg:col-span-5 border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Latest Candidate Evaluation
                </span>
                <Badge className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50">
                  Strong Hire
                </Badge>
              </div>

              {/* Candidate Info */}
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow-xs">
                  SJ
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Sarah Jenkins
                  </h6>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Staff Engineer Candidate • 9.5 Yrs Exp
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-lg font-bold text-[#6D28D9] dark:text-purple-400">94</span>
                  <span className="text-xs text-zinc-400">/100</span>
                </div>
              </div>

              {/* Audio waveform mockup */}
              <div className="mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-950/90 p-2.5 border border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                  <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                    <Sparkles className="h-3 w-3 text-[#6D28D9] dark:text-purple-400" /> AI Voice Analysis
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">18:42 min</span>
                </div>
                {/* Visual waveform bars */}
                <div className="flex items-center gap-1 h-6">
                  <div className="h-5 w-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Play className="h-2.5 w-2.5 ml-0.5 fill-white" />
                  </div>
                  <div className="flex items-center gap-0.5 flex-1 px-1">
                    {[
                      40, 65, 80, 50, 95, 75, 45, 85, 60, 90, 100, 70, 80, 55, 60, 90,
                      75, 50, 85, 40, 70, 60, 90, 50,
                    ].map((height, idx) => (
                      <span
                        key={idx}
                        className="w-1 rounded-full bg-purple-400/80 dark:bg-purple-500/60 hover:bg-[#6D28D9] transition-colors"
                        style={{ height: `${height}%` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Key Insights */}
              <div className="mt-3.5 space-y-2">
                <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Demonstrated mastery of distributed event queues & caching.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Articulate communication under technical pressure.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <span>0 anti-cheat flags. 100% human-verified audio integrity.</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full justify-between text-xs h-8 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-purple-50/50 dark:hover:bg-purple-950/40"
            >
              <span>View Full AI Transcript & Scoring</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
