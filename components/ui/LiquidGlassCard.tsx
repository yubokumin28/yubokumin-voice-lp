import { ReactNode } from "react";

export function LiquidGlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative rounded-3xl bg-white/55 backdrop-blur-xl border border-white/60 " +
        "shadow-[0_18px_50px_rgba(7,59,76,.14)] overflow-hidden " + className
      }
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
      {children}
    </div>
  );
}
