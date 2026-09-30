import Link from "next/link";
import { brand, disclaimer } from "@/lib/site";
import { Logo } from "./logo";

const cols = [
  {
    title: "Care",
    links: [
      { href: "/weight-loss", label: "Medical weight loss" },
      { href: "/men", label: "Men's health & testosterone" },
      { href: "/women", label: "Menopause care" },
      { href: "/hair-loss", label: "Hair loss (coming soon)" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/coaching", label: "Personal coaching" },
      { href: "/pricing", label: "Pricing" },
      { href: "/portal", label: "Member portal preview" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal#terms", label: "Terms" },
      { href: "/legal#privacy", label: "Privacy" },
      { href: "/legal#telehealth", label: "Telehealth consent" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              Personalized weight-loss care, with support for the habits that help it last.
            </p>
            <div className="mt-6 text-sm text-muted">
              {brand.supportEmail ? (
                <a href={`mailto:${brand.supportEmail}`} className="underline underline-offset-4 hover:text-ink">
                  {brand.supportEmail}
                </a>
              ) : (
                <p>Contact details will be posted before launch.</p>
              )}
              <p className="mt-2">In an emergency, call 911. We don&apos;t provide urgent or emergency care.</p>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-ink">{col.title}</h2>
              <ul className="mt-3 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-10 items-center text-muted hover:text-teal-deep">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted">{disclaimer}</p>
        <p className="mt-3 text-xs text-muted">
          © {new Date().getFullYear()} {brand.legalName ?? brand.name}
        </p>
      </div>
    </footer>
  );
}
