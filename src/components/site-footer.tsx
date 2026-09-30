import Link from "next/link";
import { brand, disclaimer } from "@/lib/site";
import { Logo } from "./logo";

const cols = [
  {
    title: "Programs",
    links: [
      { href: "/weight-loss", label: "Medical Weight Loss" },
      { href: "/men", label: "Men's Hormones" },
      { href: "/women", label: "Women's Hormones" },
      { href: "/coaching", label: "Coaching" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/start", label: "Get started" },
      { href: "/portal", label: "Member login" },
      { href: `mailto:${brand.supportEmail}`, label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal#terms", label: "Terms" },
      { href: "/legal#privacy", label: "Privacy" },
      { href: "/legal#hipaa", label: "HIPAA notice" },
      { href: "/legal#telehealth", label: "Telehealth consent" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="bone" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
              Clinician-led care. Coach-led results. {brand.tagline}
            </p>
            <p className="mt-6 text-xs text-bone/40">
              In an emergency, call 911. {brand.name} is not for urgent care.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.18em] text-bone/40">{col.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-bone/80 hover:text-volt">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 border-t border-bone/10 pt-6 text-[11px] leading-relaxed text-bone/40">{disclaimer}</p>
        <p className="mt-4 text-[11px] text-bone/40">
          © {new Date().getFullYear()} {brand.legalName}. Medical services are provided by independent licensed clinicians
          through our clinical partner.
        </p>
      </div>
    </footer>
  );
}
