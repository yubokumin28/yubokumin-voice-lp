import { ReactNode } from "react";

export function GlassButton({
  children, href = "#", primary = false, className = "",
}: { children: ReactNode; href?: string; primary?: boolean; className?: string }) {
  const base = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold transition-transform duration-300 will-change-transform hover:-translate-y-0.5";
  const style = primary
    ? "text-white shadow-[0_18px_50px_rgba(255,122,89,.4)] bg-gradient-to-br from-sun via-[#ff9b76] to-coral"
    : "text-ink bg-white/70 backdrop-blur-md border border-white/70 shadow-[0_2px_8px_rgba(7,59,76,.08)] hover:bg-white";
  return (
    <a href={href} className={`${base} ${style} ${className}`}>
      {children}
    </a>
  );
}
