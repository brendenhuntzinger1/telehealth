import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold tracking-wide text-teal">{children}</p>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const styles = {
    primary: "bg-teal text-white hover:bg-teal-deep",
    secondary: "border border-ink/20 bg-white/60 text-ink hover:border-ink/50",
    light: "bg-white text-teal-deep hover:bg-mist",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <As
        className={`font-display mt-3 text-balance text-ink ${
          As === "h1" ? "text-4xl leading-[1.1] md:text-6xl" : "text-3xl leading-[1.15] md:text-[42px]"
        }`}
      >
        {title}
      </As>
      {sub && <p className="mt-4 text-lg leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

export function Tag({ children, tone = "mist" }: { children: ReactNode; tone?: "mist" | "peach" | "line" }) {
  const styles = {
    mist: "bg-mist text-teal-deep",
    peach: "bg-peach text-clay",
    line: "border border-line bg-white text-muted",
  }[tone];
  return <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>{children}</span>;
}

const iconPaths: Record<string, ReactNode> = {
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
  strength: (
    <>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
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
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {iconPaths[name] ?? iconPaths.check}
    </svg>
  );
}

export function IconBadge({ name }: { name: string }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mist text-teal">
      <Icon name={name} />
    </span>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
      <span>{children}</span>
    </li>
  );
}
