import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PRICING_PLANS } from "@/lib/data";
import { CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white dark:bg-zinc-950 relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="purple"
            className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60"
          >
            Growth Plans
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Transparent Pricing for Modern Hiring Teams
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Choose a plan designed to scale with your recruitment volume. Every tier includes our core conversational voice agent with zero setup fees.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900 p-7 transition-all duration-300",
                plan.popular
                  ? "border-2 border-[#6D28D9] dark:border-purple-500 shadow-2xl shadow-purple-950/15 dark:shadow-purple-950/40 lg:-translate-y-2 ring-1 ring-[#6D28D9]/20 dark:ring-purple-500/30"
                  : "border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#6D28D9] text-white hover:bg-[#5B21B6] border-0 px-3 py-1 text-xs font-semibold shadow-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div>
                {/* Plan Name & Desc */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 min-h-[32px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-100">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <div className="mt-7">
                  <a
                    href="#hero"
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200",
                      plan.popular
                        ? "bg-[#6D28D9] text-white hover:bg-[#5B21B6] shadow-md shadow-purple-600/25"
                        : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    )}
                  >
                    {plan.ctaText}
                  </a>
                </div>

                {/* Feature Checklist */}
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Included with {plan.name}:
                  </span>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2
                          className={cn(
                            "h-4 w-4 shrink-0 mt-0.5",
                            plan.popular ? "text-[#6D28D9] dark:text-purple-400" : "text-zinc-400 dark:text-zinc-500"
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Guarantee microcopy */}
              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  14-day full refund policy • Cancel anytime
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
