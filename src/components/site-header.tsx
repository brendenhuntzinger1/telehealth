"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const darkHeroPages = ["/", "/weight-loss", "/men", "/women", "/coaching"];

const nav = [
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/coaching", label: "Coaching" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = darkHeroPages.includes(pathname) && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-bone/85 backdrop-blur-xl border-b border-line/70" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo tone={light ? "bone" : "ink"} />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                light
                  ? pathname === item.href
                    ? "bg-bone/10 text-bone"
                    : "text-bone/70 hover:text-bone"
                  : pathname === item.href
                    ? "bg-ink/5 text-ink"
                    : "text-ink/70 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/portal" className={`hidden rounded-full px-3.5 py-2 text-sm sm:block ${light ? "text-bone/70 hover:text-bone" : "text-ink/70 hover:text-ink"}`}>
            Log in
          </Link>
          <Link
            href="/start"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98] ${
              light ? "bg-volt text-ink" : "bg-ink text-bone"
            }`}
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`ml-1 grid h-10 w-10 place-items-center rounded-full md:hidden ${light ? "text-bone" : "text-ink"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line/70 px-5 pb-6 pt-2 md:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-4 text-lg"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/portal" onClick={() => setOpen(false)} className="block py-4 text-lg text-ink/70">
            Log in
          </Link>
        </nav>
      )}
    </header>
  );
}
