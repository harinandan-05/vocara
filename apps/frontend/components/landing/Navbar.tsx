"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import { Menu, X, AudioWaveform } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getStoredUser, removeAuthToken, fetchCurrentUser, AuthUser } from "@/lib/auth";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    fetchCurrentUser().then((u) => {
      if (u) setUser(u);
    });
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-100/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Vocara Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-150 hover:scale-[1.01]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white shadow-sm shadow-purple-500/20 ring-1 ring-purple-600/30">
            <AudioWaveform className="h-5 w-5 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Vocara
            </span>
            <span className="rounded-full bg-purple-100 dark:bg-purple-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-[#6D28D9] dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/40">
              AI
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle, Auth & Primary Action */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-[#6D28D9] dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="max-w-[120px] truncate">{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-zinc-400 hover:text-rose-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-950 dark:hover:text-white px-2 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "h-9 rounded-xl bg-[#6D28D9] px-4 font-medium text-white shadow-sm shadow-purple-500/25 transition-all duration-200 hover:bg-[#5B21B6] hover:shadow-md hover:shadow-purple-600/30 active:scale-[0.98]"
                )}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls: Theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-6 sm:px-6 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="my-2 border-t border-zinc-100 dark:border-zinc-800 pt-3 flex flex-col gap-2.5">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-semibold text-zinc-900 dark:text-white"
                  >
                    Go to Dashboard ({user.name})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-xs text-rose-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full h-10 rounded-xl bg-[#6D28D9] text-white hover:bg-[#5B21B6]"
                    )}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
