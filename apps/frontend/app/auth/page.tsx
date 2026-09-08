"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AudioWaveform, ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setAuthToken, setStoredUser, getAuthToken } from "@/lib/auth";

declare global {
  interface Window {
    google?: any;
  }
}

export default function AuthPage() {
  const router = useRouter();
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "1060244187661-6frrffostv2phcf0qjqu3fot7o215nke.apps.googleusercontent.com";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    if (getAuthToken()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleCredentialResponse = async (response: any) => {
    try {
      setLoading(true);
      setError(null);

      const credential = response.credential;
      if (!credential) {
        throw new Error("No credential returned from Google.");
      }

      const res = await axios.post(`${apiBaseUrl}/api/v1/auth/google`, {
        credential,
      });

      if (res.data?.token && res.data?.user) {
        setAuthToken(res.data.token);
        setStoredUser(res.data.user);
        router.push("/dashboard");
      } else {
        throw new Error("Invalid response from auth server.");
      }
    } catch (err: any) {
      console.error("Google Sign-In failed:", err);
      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Failed to complete Google Sign-In. Please try again."
      );
      setLoading(false);
    }
  };

  const initGoogleButton = () => {
    if (typeof window !== "undefined" && window.google && googleBtnRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
        });

        googleBtnRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left",
          width: 280,
        });
        setScriptLoaded(true);
      } catch (e) {
        console.warn("Error rendering Google button:", e);
      }
    }
  };

  useEffect(() => {
    if (scriptLoaded) {
      initGoogleButton();
    }
  }, [scriptLoaded]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between p-4 sm:p-6 transition-colors">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptLoaded(true);
          initGoogleButton();
        }}
      />

      <header className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs text-center space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white shadow-sm shadow-purple-500/20">
              <AudioWaveform className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Sign in to Vocara
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Authenticate with Google to start and track your AI technical interviews.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col items-center justify-center min-h-[44px]">
            {loading ? (
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium py-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#6D28D9]" />
                <span>Verifying with Neon DB...</span>
              </div>
            ) : (
              <div ref={googleBtnRef} className="flex justify-center w-full" />
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure OAuth 2.0 • Data stored in Neon DB</span>
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-zinc-400 py-2">
        Vocara AI Technical Interview Platform
      </footer>
    </div>
  );
}