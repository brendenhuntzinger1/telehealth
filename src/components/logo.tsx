import Link from "next/link";
import { brand } from "@/lib/site";

export function Logo({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${tone === "bone" ? "text-bone" : "text-ink"}`}
      aria-label={`${brand.name} home`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="6" className="fill-current" />
        <path d="M8.5 18V6h4.5a3.5 3.5 0 010 7H8.5M12.5 13l4 5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" className={tone === "bone" ? "stroke-ink" : "stroke-volt"} />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight">{brand.name}</span>
    </Link>
  );
}
