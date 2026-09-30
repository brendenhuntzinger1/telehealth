import Link from "next/link";
import { tiers } from "@/lib/site";
import { Check } from "./ui";

export function TierCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.id}
          className={`relative flex flex-col rounded-[28px] p-7 md:p-8 ${
            t.featured ? "bg-ink text-bone shadow-2xl shadow-ink/20 lg:-my-4 lg:py-12" : "border border-line bg-white/60"
          }`}
        >
          {t.featured && (
            <span className="absolute -top-3 left-7 rounded-full bg-volt px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-semibold">{t.name}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${t.featured ? "text-bone/65" : "text-ink/60"}`}>{t.blurb}</p>
          <p className="mt-6 flex items-baseline gap-1">
            <span className="font-display text-6xl">${t.price}</span>
            <span className={t.featured ? "text-bone/50" : "text-ink/50"}>/mo</span>
          </p>
          <p className={`mt-1 text-xs ${t.featured ? "text-bone/45" : "text-ink/45"}`}>Membership. Medication billed separately.</p>
          <ul className="mt-7 flex-1 space-y-3.5 text-[15px]">
            {t.features.map((f) => (
              <li key={f} className="flex gap-3">
                <Check className={t.featured ? "text-volt" : "text-ink"} />
                <span className={t.featured ? "text-bone/85" : "text-ink/80"}>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/start?tier=${t.id}`}
            className={`mt-9 rounded-full py-3.5 text-center text-[15px] font-medium transition-all active:scale-[0.98] ${
              t.featured ? "bg-volt text-ink hover:bg-volt-dim" : "bg-ink text-bone hover:bg-ink-2"
            }`}
          >
            Start with {t.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
