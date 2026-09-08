import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/lib/data";
import {
  Bot,
  BarChart3,
  Users2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Activity,
  Layers,
} from "lucide-react";

export default function FeatureGrid() {
  const iconMap = {
    Bot: Bot,
    BarChart3: BarChart3,
    Users2: Users2,
    Sparkles: Sparkles,
    Video: Activity,
    ShieldCheck: Layers,
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-zinc-50/50 dark:bg-zinc-950/70 border-t border-zinc-100 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="purple"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60"
          >
            Why Vocara
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Your Complete Interview Solution
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Everything your talent team needs to conduct unbiased, thorough, and high-velocity candidate screenings without manual calendar bottleneck.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.iconName] || Bot;
            return (
              <Card
                key={feature.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-xl hover:shadow-purple-950/5 dark:hover:shadow-purple-950/30"
              >
                <div>
                  {/* Top: Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-[#6D28D9] dark:text-purple-400 group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>

                  {/* Feature Sub-Elements Visual Preview */}
                  <div className="mt-6 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-800">
                    {feature.id === "smart-screening" && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                          <span>Dynamic probing depth</span>
                          <span className="font-semibold text-purple-700 dark:text-purple-400">Level 4</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#6D28D9] dark:bg-purple-500 w-4/5 rounded-full"></div>
                        </div>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                          Adapts questions in real-time to candidate answers
                        </p>
                      </div>
                    )}

                    {feature.id === "real-time-insights" && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                          <span>Sentiment & Clarity index</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">96.4%</span>
                        </div>
                        <div className="flex gap-1 items-end h-6 pt-1">
                          {[30, 60, 45, 80, 95, 70, 85, 90, 75, 100].map((val, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-purple-200 dark:bg-purple-900/50 group-hover:bg-[#7C3AED] dark:group-hover:bg-purple-500 transition-colors rounded-t"
                              style={{ height: `${val}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.id === "candidate-hub" && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-300">
                          <span>Pipeline sync status</span>
                          <span className="font-semibold text-purple-700 dark:text-purple-400">100% Synced</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Greenhouse, Lever & Ashby integrated</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Read More Link */}
                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={feature.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] dark:text-purple-400 hover:text-[#5B21B6] dark:hover:text-purple-300 transition-colors group/link"
                  >
                    <span>{feature.linkText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
