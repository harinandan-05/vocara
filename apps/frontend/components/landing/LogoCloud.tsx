import React from "react";
import {
  Layers,
  Hexagon,
  Cpu,
  Compass,
  Command,
} from "lucide-react";

export default function LogoCloud() {
  const logos = [
    {
      name: "ApexScale",
      icon: Layers,
      sub: "SYSTEMS",
    },
    {
      name: "Synthetix",
      icon: Hexagon,
      sub: "AI LABS",
    },
    {
      name: "TalentGrid",
      icon: Cpu,
      sub: "OPERATIONS",
    },
    {
      name: "Vanguardia",
      icon: Compass,
      sub: "GLOBAL",
    },
    {
      name: "OmniTech",
      icon: Command,
      sub: "PLATFORMS",
    },
  ];

  return (
    <section className="border-y border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-12 sm:py-16 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Trusted by leading hiring teams
        </p>
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-5 items-center justify-center">
          {logos.map((logo) => {
            const Icon = logo.icon;
            return (
              <div
                key={logo.name}
                className="group flex flex-col items-center justify-center gap-1 grayscale opacity-60 dark:opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-400 transition-colors group-hover:text-[#6D28D9] dark:group-hover:text-purple-400" />
                  <span className="font-bold text-base tracking-tight text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-zinc-950 dark:group-hover:text-white">
                    {logo.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500">
                  {logo.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
