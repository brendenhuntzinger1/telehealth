import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "bone" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] ${
        tone === "bone" ? "text-bone/60" : "text-ink/55"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-volt ring-2 ring-volt/30" />
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "volt" | "ghost" | "ghost-bone";
  className?: string;
}) {
  const styles = {
    primary: "bg-ink text-bone hover:bg-ink-2",
    volt: "bg-volt text-ink hover:bg-volt-dim",
    ghost: "border border-ink/15 text-ink hover:border-ink/40",
    "ghost-bone": "border border-bone/20 text-bone hover:border-bone/50",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-all active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
      {variant !== "ghost" && variant !== "ghost-bone" && (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="transition-transform group-hover:translate-x-0.5">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className={`shrink-0 ${className}`}>
      <circle cx="9" cy="9" r="9" className="fill-current opacity-15" />
      <path d="M5.5 9.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "ink",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  tone?: "ink" | "bone";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display mt-4 text-4xl leading-[1.05] md:text-6xl ${tone === "bone" ? "text-bone" : "text-ink"}`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "bone" ? "text-bone/65" : "text-ink/65"}`}>{sub}</p>
      )}
    </div>
  );
}
