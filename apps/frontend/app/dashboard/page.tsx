"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getStoredUser, fetchCurrentUser, AuthUser } from "@/lib/auth";
import { AudioWaveform, ArrowRight, Code2, Globe, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    setUser(getStoredUser());
    fetchCurrentUser(apiBaseUrl).then((u) => {
      if (u) setUser(u);
    });
  }, [apiBaseUrl]);

  async function getUrl() {
    if (!github.trim()) return;

    try {
      setLoading(true);
      const interviewId = crypto.randomUUID();

      await axios.post(`${apiBaseUrl}/api/v1/pre-interview/url/${interviewId}`, {
        githubUrl: github,
        userId: user?.id,
      });

      router.push(`/interview?interviewId=${interviewId}`);
    } catch (err) {
      console.error("Pre-interview setup error:", err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 transition-colors">
      <header className="max-w-5xl mx-auto w-full py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white">
            <AudioWaveform className="h-4.5 w-4.5" />
          </div>
          <span className="font-bold text-sm tracking-tight">Vocara</span>
        </Link>

        {user && (
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700"
              />
            )}
            <span>{user.name}</span>
          </div>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center py-8">
        <Card className="w-full max-w-md rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {user ? `Welcome, ${user.name}` : "Launch Technical Screening"}
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Provide your GitHub profile to generate adaptive technical interview questions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="github" className="text-xs font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-zinc-500" />
                <span>GitHub Profile URL</span>
              </Label>
              <Input
                id="github"
                type="text"
                required
                placeholder="https://github.com/username"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="h-10 text-xs rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-[#6D28D9]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="linkedin" className="text-xs font-semibold flex items-center gap-1.5 text-zinc-500">
                <Globe className="w-3.5 h-3.5" />
                <span>LinkedIn URL (Optional)</span>
              </Label>
              <Input
                id="linkedin"
                type="text"
                placeholder="https://linkedin.com/in/username"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="h-10 text-xs rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-[#6D28D9]"
              />
            </div>

            <Button
              onClick={getUrl}
              disabled={loading || !github.trim()}
              className="w-full mt-2 h-10 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-medium text-xs shadow-sm shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing GitHub Repositories...</span>
                </>
              ) : (
                <>
                  <span>Begin AI Screening</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="max-w-5xl mx-auto w-full text-center text-[11px] text-zinc-400 py-3">
        Vocara • AI Technical Screening
      </footer>
    </div>
  );
}
