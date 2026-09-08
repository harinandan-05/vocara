import { cn } from "@/lib/utils";
import React from "react";

export default function DotBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex w-full items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-200", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#27272a_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] transition-colors duration-200"></div>
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
