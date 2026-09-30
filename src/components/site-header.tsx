"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { launch } from "@/lib/site";
import { Logo } from "./logo";

export const mainNav = [
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/other-care", label: "Other Care" },
  { href: "/coaching", label: "Coaching" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
];

const otherCareLinks = [
  { href: "/men", label: "Men's health & testosterone" },
  { href: "/women", label: "Menopause care" },
  { href: "/hair-loss", label: "Hair loss (coming soon)" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href === "/other-care" && ["/men", "/women", "/hair-loss"].includes(pathname));

  return (
    <>
      {!launch.acceptingPatients && (
        <div className="bg-teal-deep px-5 py-2.5 text-center text-sm text-white">
          Remade Clinic is preparing to launch and isn&apos;t accepting patients yet.{" "}
          <Link href="/how-it-works#launch" className="font-medium underline underline-offset-4">
            Learn more
          </Link>
        </div>
      )}
      <header
        className={`sticky top-0 z-50 border-b bg-cream/90 backdrop-blur-md transition-colors ${
          scrolled || open ? "border-line" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-18 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[15px] transition-colors ${
                  isActive(item.href) ? "bg-mist font-medium text-teal-deep" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="hidden min-h-11 items-center rounded-full px-3.5 text-[15px] text-muted hover:text-ink sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/weight-loss"
              className="hidden min-h-11 items-center rounded-full bg-teal px-5 text-[15px] font-medium text-white transition-colors hover:bg-teal-deep sm:inline-flex"
            >
              Explore care
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-mist lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                {open ? (
                  <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line px-5 pb-8 pt-2 lg:hidden" aria-label="Mobile">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center text-lg">
                    {item.label}
                  </Link>
                  {item.href === "/other-care" && (
                    <ul className="pb-3 pl-4">
                      {otherCareLinks.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-muted">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <Link
                href="/weight-loss"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-teal font-medium text-white"
              >
                Explore weight-loss care
              </Link>
              <Link
                href="/portal"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full border border-ink/20"
              >
                Log in
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
