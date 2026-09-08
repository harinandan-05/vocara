import type { Metadata } from "next";
import AnnouncementBar from "@/components/landing/AnnouncementBar";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoCloud from "@/components/landing/LogoCloud";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureGrid from "@/components/landing/FeatureGrid";
import DataShowcase from "@/components/landing/DataShowcase";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Vocara — AI-Powered Interviews for Modern Hiring Teams",
  description:
    "Empower your hiring team with AI-driven interview insights and seamless candidate evaluation to make confident hiring decisions faster.",
  openGraph: {
    title: "Vocara — AI-Powered Interviews for Modern Hiring Teams",
    description:
      "Empower your hiring team with AI-driven interview insights and seamless candidate evaluation to make confident hiring decisions faster.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 flex flex-col antialiased selection:bg-purple-100 dark:selection:bg-purple-900/50 selection:text-[#6D28D9] dark:selection:text-purple-300 transition-colors duration-200">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 3. Hero (wrapped in DotBackground) */}
        <Hero />

        {/* 4. Logo Cloud */}
        <LogoCloud />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Feature Grid */}
        <FeatureGrid />

        {/* 7. Data Showcase (light gray section bg) */}
        <DataShowcase />

        {/* 8. Pricing */}
        <Pricing />

        {/* 9. Final CTA (with purple gradient bleeding into footer) */}
        <FinalCTA />
      </main>

      {/* 10. Footer (solid purple #6D28D9 background) */}
      <Footer />
    </div>
  );
}
