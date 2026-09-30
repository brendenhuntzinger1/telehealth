"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { launch, mainNav, primaryCta } from "@/lib/site";
import { Logo } from "./logo";

const otherCareLinks = [
  { href: "/men", label: "Men's health & testosterone" },
  { href: "/women", label: "Menopause & perimenopause" },
  { href: "/hair-loss", label: "Hair loss" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    pathname === href || (href === "/other-care" && ["/men", "/women", "/hair-loss"].includes(pathname));

  return (
    <>
      {!launch.acceptingPatients && (
        <p className="bg-sky px-5 py-2 text-center text-sm text-sky-deep">
          We&apos;re preparing to open and aren&apos;t accepting patients yet.{" "}
          <Link href="/how-it-works#launch" className="font-semibold underline underline-offset-2">
            What this means
          </Link>
        </p>
      )}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2.5 font-semibold transition-colors ${
                  active(item.href) ? "text-teal" : "text-ink hover:text-teal"
                }`}
              >
                {item.label}
                {active(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-coral" aria-hidden />}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/portal" className="hidden min-h-11 items-center px-3 font-semibold text-ink hover:text-teal sm:inline-flex">
              Member login
            </Link>
            <Link
              href={primaryCta.href}
              className="hidden min-h-11 items-center rounded-full bg-teal px-5 font-semibold text-white transition-colors hover:bg-teal-deep md:inline-flex"
            >
              {primaryCta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-shell lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            <ul>
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-15 items-center font-display text-xl font-bold">
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
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="flex min-h-13 items-center justify-center rounded-full bg-teal font-semibold text-white"
              >
                {primaryCta.label}
              </Link>
              <Link
                href="/portal"
                onClick={() => setOpen(false)}
                className="flex min-h-13 items-center justify-center rounded-full border-2 border-teal font-semibold text-teal"
              >
                Member login
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
