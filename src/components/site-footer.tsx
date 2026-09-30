import Link from "next/link";
import { brand, disclaimer } from "@/lib/site";
import { Logo } from "./logo";

const cols = [
  {
    title: "Programs",
    links: [
      { href: "/start", label: "Build my plan" },
      { href: "/coaching", label: "Personal coaching" },
      { href: "/pricing", label: "Pricing" },
      { href: "/how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Treatments",
    links: [
      { href: "/weight-loss", label: "Weight loss & GLP-1" },
      { href: "/men", label: "Testosterone (TRT)" },
      { href: "/hair-loss", label: "Hair loss" },
      { href: "/women", label: "Menopause" },
    ],
  },
  {
    title: "Members",
    links: [
      { href: "/portal", label: "Member portal preview" },
      { href: "/legal#terms", label: "Terms" },
      { href: "/legal#privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-teal-deep text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs leading-relaxed text-white/80">Weight-loss care built around you.</p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              {brand.supportEmail ? (
                <a href={`mailto:${brand.supportEmail}`} className="underline underline-offset-4">
                  {brand.supportEmail}
                </a>
              ) : (
                <p>Contact details will be published before we open.</p>
              )}
              <p>For a medical emergency, call 911.</p>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="font-display font-bold">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-10 items-center text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/70">{disclaimer}</p>
        <p className="mt-3 text-xs text-white/70">
          © {new Date().getFullYear()} {brand.legalName ?? brand.name}
        </p>
      </div>
    </footer>
  );
}
