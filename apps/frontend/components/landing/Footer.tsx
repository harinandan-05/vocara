"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FOOTER_LINKS } from "@/lib/data";
import {
  AudioWaveform,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

// Crisp inline SVGs for social brands
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-white dark:bg-zinc-950 text-white transition-colors duration-200">
      {/* 
        HALF ROUND SECTION ARCH DESIGN:
        The purple color forms a prominent half-round dome / arch rising from the bottom.
        Radiating from this half-round shape is a dispersing gradient & ray glow effect.
      */}
      <div className="relative w-full overflow-hidden pt-16 sm:pt-24">
        {/* 1. Outer dispersing gradient aura (diffuses upward into the page above) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 h-72 sm:h-96 w-[120%] max-w-6xl rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.45)_0%,_rgba(109,40,217,0.25)_45%,_transparent_75%)] blur-3xl"
        />

        {/* 2. Dispersing radial beams / ray lines emanating from the half-round dome */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden">
          <svg
            className="w-full max-w-5xl h-48 opacity-40"
            viewBox="0 0 1000 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="beam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Dispersing rays */}
            <line x1="500" y1="160" x2="200" y2="0" stroke="url(#beam-grad)" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="500" y1="160" x2="350" y2="0" stroke="url(#beam-grad)" strokeWidth="1" strokeDasharray="3 5" />
            <line x1="500" y1="160" x2="500" y2="0" stroke="url(#beam-grad)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="500" y1="160" x2="650" y2="0" stroke="url(#beam-grad)" strokeWidth="1" strokeDasharray="3 5" />
            <line x1="500" y1="160" x2="800" y2="0" stroke="url(#beam-grad)" strokeWidth="1.5" strokeDasharray="4 6" />
          </svg>
        </div>

        {/* 3. The Grand Half-Round Dome with illuminated rim & rich gradient */}
        <div className="relative mx-auto w-[160%] sm:w-[130%] lg:w-[115%] -left-[30%] sm:-left-[15%] lg:-left-[7.5%] rounded-t-[100%] bg-gradient-to-b from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95] pt-1 border-t-2 border-purple-200/90 shadow-[0_-25px_90px_rgba(109,40,217,0.65)]">
          {/* Concentric luminous glowing arches inside the dome */}
          <div className="absolute top-2 inset-x-8 sm:inset-x-20 h-full rounded-t-[100%] border-t border-white/40 pointer-events-none" />
          <div className="absolute top-5 inset-x-16 sm:inset-x-36 h-full rounded-t-[100%] border-t border-purple-200/25 pointer-events-none" />
          <div className="absolute top-8 inset-x-24 sm:inset-x-52 h-full rounded-t-[100%] border-t border-white/10 pointer-events-none" />

          {/* Internal radial dispersion glow */}
          <div className="pointer-events-none absolute inset-0 rounded-t-[100%] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(255,255,255,0.25)_0%,_transparent_70%)]" />

          {/* 4. Footer Content Container */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-14 w-screen max-w-full -translate-x-[0%]">
            {/* Center Header Badge inside Dome */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-purple-100 border border-white/25 shadow-inner">
                <Sparkles className="h-3.5 w-3.5 text-purple-200" />
                <span>Next-Gen Autonomous Interview Intelligence</span>
              </div>
            </div>

            {/* Top area: Brand & Newsletter */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-14 border-b border-purple-400/30">
              {/* Logo + Tagline */}
              <div className="lg:col-span-4 space-y-4">
                <Link href="/" className="flex items-center gap-2.5 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#6D28D9] shadow-md shadow-black/10">
                    <AudioWaveform className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Vocara
                  </span>
                </Link>
                <p className="text-sm text-purple-100/90 leading-relaxed max-w-sm">
                  AI-powered interview platform that helps hiring teams screen candidates through AI-driven voice/video interviews and actionable predictive insights.
                </p>
                {/* Social Icons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white hover:text-[#6D28D9] transition-all flex items-center justify-center text-purple-100 backdrop-blur-xs border border-white/15 shadow-xs"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white hover:text-[#6D28D9] transition-all flex items-center justify-center text-purple-100 backdrop-blur-xs border border-white/15 shadow-xs"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white hover:text-[#6D28D9] transition-all flex items-center justify-center text-purple-100 backdrop-blur-xs border border-white/15 shadow-xs"
                  >
                    <GitHubIcon />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white hover:text-[#6D28D9] transition-all flex items-center justify-center text-purple-100 backdrop-blur-xs border border-white/15 shadow-xs"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              {/* 3 Link Columns */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Product
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm text-purple-100/80">
                    {FOOTER_LINKS.Product.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Company
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm text-purple-100/80">
                    {FOOTER_LINKS.Company.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Resources
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm text-purple-100/80">
                    {FOOTER_LINKS.Resources.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="lg:col-span-3 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  Stay In The Loop
                </h4>
                <p className="text-xs text-purple-100/80 leading-relaxed">
                  Get monthly updates on hiring trends, benchmark data, and AI interview best practices.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-md p-3 text-xs text-white border border-white/30">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <Input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 rounded-xl bg-white/10 border-white/25 text-white placeholder:text-purple-200/60 focus-visible:ring-purple-300 text-xs backdrop-blur-xs"
                    />
                    <Button
                      type="submit"
                      className="w-full h-10 rounded-xl bg-white text-[#6D28D9] hover:bg-purple-50 font-semibold text-xs transition-all shadow-md hover:shadow-lg hover:shadow-black/10"
                    >
                      <span>Subscribe to Newsletter</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Copyright & Legal */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200/70">
              <p>© 2026 Vocara Inc. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Security & Compliance
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Preferences
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
