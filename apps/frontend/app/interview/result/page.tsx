"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  AudioWaveform,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Share2,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquare,
  FileCode2,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface QnAEvaluationItem {
  question: string;
  answer: string;
  score: number;
  critique: string;
}

interface EvaluationData {
  id: string;
  interviewId: string;
  overallScore: number;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  projectKnowledgeScore: number;
  verdict: "Strong Hire" | "Hire" | "Borderline" | "Needs Improvement";
  summary: string;
  strengths: string[];
  improvements: string[];
  qnaEvaluation: QnAEvaluationItem[];
  createdAt: string;
}

interface InterviewData {
  id: string;
  githubUrl: string;
  createdAt: string;
  transcriptCount?: number;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const interviewId = searchParams.get("interviewId");

  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [copied, setCopied] = useState(false);
  const [expandedQnA, setExpandedQnA] = useState<Record<number, boolean>>({});

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

  useEffect(() => {
    if (!interviewId) {
      setError("No interview ID provided in URL.");
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadResult() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${apiBaseUrl}/api/v1/interview/${interviewId}/result`);

        if (res.data.hasEvaluation && res.data.evaluation) {
          if (isMounted) {
            setEvaluation(res.data.evaluation);
            setInterview(res.data.interview);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setEvaluating(true);
        }

        const evalRes = await axios.post(
          `${apiBaseUrl}/api/v1/interview/${interviewId}/evaluate`,
          {}
        );

        if (isMounted) {
          setEvaluation(evalRes.data.evaluation);
          setInterview(evalRes.data.interview);
          setLoading(false);
          setEvaluating(false);
        }
      } catch (err: any) {
        console.error("Failed to load interview result:", err);
        if (isMounted) {
          setError(
            err?.response?.data?.error ||
              err?.message ||
              "Could not evaluate or fetch interview result. Please verify server is running."
          );
          setLoading(false);
          setEvaluating(false);
        }
      }
    }

    loadResult();

    return () => {
      isMounted = false;
    };
  }, [interviewId, apiBaseUrl]);

  const toggleQnA = (index: number) => {
    setExpandedQnA((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "Strong Hire":
        return {
          bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
          icon: ShieldCheck,
        };
      case "Hire":
        return {
          bg: "bg-purple-500/10 text-[#6D28D9] dark:text-purple-300 border-purple-500/20",
          icon: CheckCircle2,
        };
      case "Borderline":
        return {
          bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
          icon: AlertTriangle,
        };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "bg-emerald-500";
    if (score >= 7.0) return "bg-purple-600";
    if (score >= 5.5) return "bg-amber-500";
    return "bg-rose-500";
  };

  if (loading || evaluating) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-4">
          <Loader2 className="w-5 h-5 text-[#6D28D9] dark:text-purple-400 animate-spin" />
        </div>

        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Generating Performance Evaluation
        </h2>
        <p className="mt-1 text-xs text-zinc-500 max-w-sm">
          Analyzing spoken dialog, scoring competencies out of 10, and drafting candidate evaluation.
        </p>

        <div className="mt-5 w-64 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#6D28D9] rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !evaluation) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-3">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Evaluation Unavailable
        </h2>
        <p className="mt-1 text-xs text-zinc-500 max-w-sm">
          {error || "Unable to locate interview records."}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="rounded-lg text-xs h-9"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Dashboard
          </Button>
          <Button
            size="sm"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#6D28D9] text-white hover:bg-[#5B21B6] text-xs h-9"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const verdictMeta = getVerdictBadge(evaluation.verdict);
  const VerdictIcon = verdictMeta.icon;
  const overallPercentage = Math.round(evaluation.overallScore * 10);
  const formattedDate = new Date(evaluation.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const rubrics = [
    {
      title: "Technical Depth",
      score: evaluation.technicalScore,
      desc: "Architectural accuracy and core CS domain vocabulary.",
      icon: FileCode2,
    },
    {
      title: "Problem Solving",
      score: evaluation.problemSolvingScore,
      desc: "Structured thinking, trade-offs, and edge case handling.",
      icon: Brain,
    },
    {
      title: "Communication",
      score: evaluation.communicationScore,
      desc: "Pacing, clarity of explanation, and conciseness.",
      icon: MessageSquare,
    },
    {
      title: "Project Alignment",
      score: evaluation.projectKnowledgeScore,
      desc: "Hands-on experience reflected in GitHub repositories.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors pb-16">
      <header className="sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <AudioWaveform className="h-4 w-4 text-[#6D28D9] dark:text-purple-400" />
              <span>Evaluation Summary</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="h-8 rounded-lg border-zinc-200 dark:border-zinc-800 text-xs"
            >
              <Share2 className="h-3 w-3 mr-1.5" />
              {copied ? "Copied" : "Share"}
            </Button>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="h-8 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-medium"
              >
                <RotateCcw className="h-3 w-3 mr-1.5" />
                New Interview
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Technical Screening Result
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                {interviewId?.slice(0, 8)}
              </span>
            </div>
            {interview?.githubUrl && (
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <a
                  href={interview.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#6D28D9] dark:text-purple-400 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{interview.githubUrl.replace("https://", "")}</span>
                </a>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${verdictMeta.bg}`}
            >
              <VerdictIcon className="w-3.5 h-3.5" />
              <span>{evaluation.verdict}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Card className="md:col-span-4 rounded-xl border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col justify-between shadow-none">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                <span>Overall Rating</span>
                <span className="font-mono text-zinc-500">Scale 0 - 10</span>
              </div>

              <div className="my-5 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {evaluation.overallScore.toFixed(1)}
                  </span>
                  <span className="text-base text-zinc-400 font-medium ml-1">/ 10</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  {overallPercentage >= 85
                    ? "Top Tier Performance"
                    : overallPercentage >= 75
                    ? "Qualified for Role"
                    : "Development Recommended"}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Recommendation</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {evaluation.verdict}
              </span>
            </div>
          </Card>

          <Card className="md:col-span-8 rounded-xl border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col justify-between shadow-none">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                <Brain className="w-4 h-4 text-[#6D28D9] dark:text-purple-400" />
                <span>Executive Evaluation</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                {evaluation.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-4 flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Live Audio Transcribed
              </span>
              <span>•</span>
              <span>Grounded in GitHub Context</span>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Competency Breakdown
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {rubrics.map((r) => {
              const Icon = r.icon;
              const barWidth = Math.round((r.score / 10) * 100);
              return (
                <div
                  key={r.title}
                  className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {r.title}
                    </span>
                    <span className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {r.score.toFixed(1)}
                    </span>
                  </div>

                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreColor(r.score)}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Key Strengths</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {evaluation.strengths.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <TrendingUp className="w-4 h-4 text-[#6D28D9] dark:text-purple-400" />
              <span>Areas for Improvement</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {evaluation.improvements.map((im, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold shrink-0 mt-0.5">→</span>
                  <span>{im}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {Array.isArray(evaluation.qnaEvaluation) && evaluation.qnaEvaluation.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Dialogue Breakdown ({evaluation.qnaEvaluation.length} Questions)
              </h3>
            </div>

            <div className="space-y-2.5">
              {evaluation.qnaEvaluation.map((item, idx) => {
                const isOpen = expandedQnA[idx] ?? true;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
                  >
                    <div
                      onClick={() => toggleQnA(idx)}
                      className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 pr-3">
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                          {item.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                          {item.score.toFixed(1)}/10
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-0.5">
                            Candidate Response
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300 italic">
                            &ldquo;{item.answer}&rdquo;
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200/40 dark:border-purple-900/30">
                          <span className="text-[10px] font-bold text-[#6D28D9] dark:text-purple-400 uppercase tracking-wider block mb-0.5">
                            Feedback
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300">
                            {item.critique}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function InterviewResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center text-xs text-zinc-400">
          Loading...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
