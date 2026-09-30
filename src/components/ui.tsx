import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "light" | "coral" }) {
  const color = { teal: "text-teal", light: "text-sky-mid", coral: "text-coral-deep" }[tone];
  return <p className={`text-sm font-bold uppercase tracking-[0.12em] ${color}`}>{children}</p>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "inverse-outline";
  className?: string;
}) {
  const styles = {
    primary: "bg-teal text-white hover:bg-teal-deep",
    secondary: "border-2 border-teal text-teal hover:bg-teal-soft",
    inverse: "bg-white text-teal-deep hover:bg-sky",
    "inverse-outline": "border-2 border-white/70 text-white hover:bg-white/10",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Heading({
  as: As = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  const size = {
    h1: "text-[40px] leading-[1.05] sm:text-6xl lg:text-[68px]",
    h2: "text-3xl leading-[1.1] sm:text-[44px]",
    h3: "text-2xl leading-tight",
  }[As];
  return <As className={`font-display text-balance font-extrabold ${size} ${className}`}>{children}</As>;
}

export function SectionIntro({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "teal"}>{eyebrow}</Eyebrow>}
      <Heading className={`mt-3 ${tone === "light" ? "text-white" : "text-ink"}`}>{title}</Heading>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${tone === "light" ? "text-white/85" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

export function Pill({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "sky" | "coral" | "outline" }) {
  const styles = {
    teal: "bg-teal-soft text-teal-deep",
    sky: "bg-sky text-sky-deep",
    coral: "bg-coral-soft text-coral-deep",
    outline: "border border-line bg-white text-muted",
  }[tone];
  return <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${styles}`}>{children}</span>;
}

const paths: Record<string, ReactNode> = {
  stethoscope: (
    <>
      <path d="M6 3v5a4 4 0 008 0V3" />
      <path d="M10 12v3a4 4 0 008 0v-2" />
      <circle cx="18" cy="11" r="2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
      <path d="M5 19l7-7" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-4 3.5-6 7-6s6 2 7 6" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4.5" r="2" />
      <path d="M10 21l2-6 3 3v3M9 11l3-3 3 2 3 1M12 8l-2 7" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />,
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chart: <path d="M4 19h16M7 15l4-4 3 3 5-6" />,
  dumbbell: <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />,
};

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name] ?? paths.check}
    </svg>
  );
}

export function CheckItem({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "light" }) {
  return (
    <li className="flex gap-3">
      <Icon name="check" className={`mt-0.5 h-5 w-5 shrink-0 ${tone === "light" ? "text-sky-mid" : "text-teal"}`} />
      <span>{children}</span>
    </li>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-teal underline-offset-4 hover:underline">
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}
