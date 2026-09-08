import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 flex h-9 w-full items-center justify-center bg-zinc-950 px-4 text-xs font-medium text-zinc-200 border-b border-zinc-800/80 transition-colors"
    >
      <div className="flex items-center gap-2 tracking-wide">
        <span className="flex items-center gap-1.5">
          <span className="inline-block text-sm" role="img" aria-label="microphone">
            🎙️
          </span>
          <span className="font-semibold text-white">14-Day Free Trial</span>
          <span className="text-zinc-400">— No Credit Card Required</span>
        </span>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-1 font-medium text-purple-300 hover:text-purple-200 transition-colors ml-1 group"
        >
          <span>Get started free</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </aside>
  );
}
