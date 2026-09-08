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
import { DEPARTMENT_METRICS, HIRING_REPORTS } from "@/lib/data";
import {
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";

export default function DataShowcase() {
  return (
    <section id="data-insights" className="py-20 sm:py-28 bg-zinc-100/80 dark:bg-zinc-950/80 border-t border-zinc-200/60 dark:border-zinc-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="purple"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60"
          >
            Data Insights
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Transform Hiring Data Into Smarter Decisions
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Gain deep visibility into your talent pipeline with automated analytics, department benchmarking, and verified bias-elimination audits.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Bar Chart Card (7 cols) */}
          <Card className="lg:col-span-7 bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-7 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-[#6D28D9] dark:text-purple-400">
                    <BarChart2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Interview Performance & Cohort Distribution
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Evaluated against 10,000+ calibrated industry interviews
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-950/60 self-start sm:self-auto">
                  +38% Velocity
                </Badge>
              </div>

              {/* Chart Visual */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  <span>Score Bands</span>
                  <span>Candidates Qualified</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#6D28D9]"></span>
                        Top Tier (90 - 100) — Immediate Offer
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">184 candidates (22%)</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#6D28D9] rounded-full" style={{ width: "22%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#8B5CF6]"></span>
                        Strong Match (80 - 89) — Team Calibration
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">396 candidates (47%)</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: "47%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                        Potential Fit (70 - 79) — Additional Screen
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">178 candidates (21%)</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 rounded-full" style={{ width: "21%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                        Below Threshold (&lt; 70) — Polite Rejection
                      </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">84 candidates (10%)</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-300 dark:bg-zinc-600 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption text */}
            <p className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">Analytics Caption:</span> Continuous cohort evaluation across engineering, design, and product candidates with multi-variable rubric normalization.
            </p>
          </Card>

          {/* Card 2: Department / Team Comparison Card (5 cols) */}
          <Card className="lg:col-span-5 bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-7 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Department Velocity
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Time-to-hire & pass rates
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/50 dark:border-emerald-800/40">
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {DEPARTMENT_METRICS.map((dept) => (
                  <div
                    key={dept.name}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {dept.name}
                      </span>
                      <span className="text-xs font-semibold text-[#6D28D9] dark:text-purple-400">
                        {dept.timeToHire}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200/40 dark:border-zinc-800">
                      <div>
                        <span className="block text-[10px] text-zinc-400 dark:text-zinc-500">Screened</span>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{dept.candidates}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-400 dark:text-zinc-500">Avg Score</span>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{dept.score}/100</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-400 dark:text-zinc-500">Fill Rate</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{dept.fillRate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption text */}
            <p className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">Analytics Caption:</span> Cross-functional performance tracking allows talent leaders to identify pipeline bottlenecks before they impact roadmaps.
            </p>
          </Card>

          {/* Card 3: Reports List Card (12 cols full width across bottom) */}
          <Card className="lg:col-span-12 bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-7 rounded-2xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Automated Executive & Compliance Reports
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    One-click audit documentation ready for hiring committees & compliance teams
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Download All Pack
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {HIRING_REPORTS.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 p-4 hover:border-purple-200 dark:hover:border-purple-700 hover:bg-purple-50/20 dark:hover:bg-purple-950/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                        {report.category}
                      </span>
                      <span className="rounded bg-emerald-100/80 dark:bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200/40 dark:border-emerald-800/40">
                        {report.status}
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {report.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {report.format} • {report.date}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-zinc-200/50 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-[#6D28D9] dark:text-purple-400">
                    <span>View Analysis</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Caption text */}
            <p className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <span className="font-semibold text-zinc-700 dark:text-zinc-200">Analytics Caption:</span> Automated compliance and bias-free hiring audits generated after every 25 interview completions with verifiable audit trails.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
