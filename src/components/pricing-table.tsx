import Link from "next/link";
import { billingRules, coachingOnlyOffered, costs, formatMembership, launch, programs, treatmentCosts, treatments, type ProgramId, type TreatmentSlug } from "@/lib/site";
import { CheckItem, Pill } from "./ui";

const TBC = "To be confirmed";

export function costRows(id: ProgramId) {
  const c = costs[id];
  const membership = formatMembership(id);
  return [
    { label: "Membership fee", value: membership ? `${membership} / month` : TBC, pending: !membership },
    { label: "Billing frequency", value: c.billing ?? TBC, pending: !c.billing },
    { label: "Medication", value: c.medication },
    { label: "Lab work", value: c.labs },
    { label: "Personal coaching", value: c.coaching },
    { label: "Insurance", value: billingRules.insurance ?? "Not yet confirmed — plan on self-pay", pending: !billingRules.insurance },
  ];
}

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const shown = programs.filter((p) => p.id !== "coaching" || coachingOnlyOffered);
  return (
    <div>
      <div className={`grid gap-5 ${shown.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        {shown.map((p) => (
          <article
            key={p.id}
            className={`flex flex-col rounded-[28px] p-7 ${
              p.highlight ? "bg-teal text-white ring-4 ring-sky-mid/60" : "border border-line bg-white"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              {p.id === "coaching" ? (
                <Pill tone="coral">No medication</Pill>
              ) : (
                <Pill tone={p.highlight ? "sky" : "teal"}>Medical care</Pill>
              )}
              {p.highlight && <Pill tone="coral">+ Coaching</Pill>}
            </div>
            <h3 className="font-display mt-4 text-2xl font-extrabold">{p.name}</h3>
            <p className={`mt-2 ${p.highlight ? "text-white/85" : "text-muted"}`}>{p.forWho}</p>

            <dl className={`mt-6 divide-y rounded-2xl ${p.highlight ? "divide-white/15 bg-white/10" : "divide-line bg-shell"}`}>
              {costRows(p.id).map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4 px-4 py-3">
                  <dt className={`text-sm font-semibold ${p.highlight ? "text-white/85" : "text-muted"}`}>{r.label}</dt>
                  <dd
                    className={`text-right text-sm ${
                      r.pending ? (p.highlight ? "italic text-white/80" : "italic text-muted") : "font-semibold"
                    }`}
                  >
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>

            {!compact && (
              <ul className="mt-6 flex-1 space-y-2.5 text-[15px]">
                {p.includes.map((i) => (
                  <CheckItem key={i} tone={p.highlight ? "light" : "teal"}>
                    {i}
                  </CheckItem>
                ))}
              </ul>
            )}
            <Link
              href={p.id === "coaching" ? "/coaching" : "/weight-loss"}
              className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold ${
                p.highlight ? "bg-white text-teal-deep hover:bg-sky" : "border-2 border-teal text-teal hover:bg-teal-soft"
              }`}
            >
              Learn more
            </Link>
          </article>
        ))}
      </div>
      {!launch.pricingConfirmed && (
        <p className="mt-6 rounded-2xl bg-sky px-5 py-4 text-sky-deep">
          <strong>Prices are being finalized.</strong> We&apos;ll publish membership fees, billing frequency and lab costs
          before we open. No payments are being collected yet.
        </p>
      )}
    </div>
  );
}

export function TreatmentCosts({ slug }: { slug?: TreatmentSlug }) {
  const list = (Object.keys(treatmentCosts) as Exclude<TreatmentSlug, "weight-loss">[]).filter((k) => !slug || k === slug);
  return (
    <div className={`grid gap-5 ${list.length > 1 ? "lg:grid-cols-3" : "max-w-xl"}`}>
      {list.map((k) => {
        const c = treatmentCosts[k];
        const rows = [
          { label: "Membership fee", value: launch.pricingConfirmed && c.membership !== null ? `$${c.membership} / month` : TBC, pending: !(launch.pricingConfirmed && c.membership !== null) },
          { label: "Billing frequency", value: c.billing ?? TBC, pending: !c.billing },
          { label: "Medication", value: c.medication },
          { label: "Lab work", value: c.labs },
          { label: "Personal coaching", value: "Optional add-on" },
          { label: "Insurance", value: billingRules.insurance ?? "Not yet confirmed — plan on self-pay", pending: !billingRules.insurance },
        ];
        return (
          <article key={k} className="rounded-[28px] border border-line bg-white p-7">
            <h3 className="font-display text-2xl font-extrabold">{treatments[k].name}</h3>
            <dl className="mt-5 divide-y divide-line rounded-2xl bg-shell">
              {rows.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4 px-4 py-3">
                  <dt className="text-sm font-semibold text-muted">{r.label}</dt>
                  <dd className={`text-right text-sm ${r.pending ? "italic text-muted" : "font-semibold"}`}>{r.value}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/${k}`} className="mt-5 inline-flex min-h-11 items-center font-semibold text-teal hover:underline">
              Learn more
            </Link>
          </article>
        );
      })}
    </div>
  );
}
