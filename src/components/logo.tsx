import Link from "next/link";
import { brand } from "@/lib/site";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-2.5 ${tone === "light" ? "text-white" : "text-ink"}`}
      aria-label={`${brand.name} home`}
    >
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="shrink-0">
        <rect width="34" height="34" rx="11" fill={tone === "light" ? "#ffffff" : "#0e5e5a"} />
        <path
          d="M12.5 24.5V10h5.2a4.3 4.3 0 010 8.6h-5.2M17.5 18.6l4.8 5.9"
          fill="none"
          stroke={tone === "light" ? "#0e5e5a" : "#ffffff"}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25.5" cy="9" r="2.6" fill="#ef7b62" />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight">
        Remade<span className={`ml-1 font-semibold ${tone === "light" ? "text-white/75" : "text-teal"}`}>Clinic</span>
      </span>
    </Link>
  );
}
