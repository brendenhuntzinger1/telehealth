import Link from "next/link";
import { brand } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-ink" aria-label={`${brand.name} home`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden className="shrink-0">
        <circle cx="16" cy="16" r="16" className="fill-teal" />
        <path
          d="M12 23V9.5h5a4 4 0 010 8h-5M16.5 17.5L21 23"
          fill="none"
          stroke="#fbf8f3"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight">
        {brand.shortName} <span className="font-normal text-muted">Clinic</span>
      </span>
    </Link>
  );
}
