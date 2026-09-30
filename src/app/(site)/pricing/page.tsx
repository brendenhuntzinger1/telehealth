import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { TierCards } from "@/components/tier-cards";
import { Check, Container, SectionHeading } from "@/components/ui";
import { addOns, disclaimer, faqs, tiers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Membership tiers for clinical care and coaching. Same price at every dose. Medication billed separately.",
};

const matrix: { label: string; tiers: [boolean, boolean, boolean] }[] = [
  { label: "Clinician visit & prescription, if appropriate", tiers: [true, true, true] },
  { label: "Unlimited clinician messaging", tiers: [true, true, true] },
  { label: "Workout library & meal plans", tiers: [true, true, true] },
  { label: "Custom training program", tiers: [false, true, true] },
  { label: "Personal macro & protein targets", tiers: [false, true, true] },
  { label: "Monthly 1:1 coach video check-in", tiers: [false, true, true] },
  { label: "Progress-photo reviews", tiers: [false, true, true] },
  { label: "Weekly 1:1 coach video check-in", tiers: [false, false, true] },
  { label: "Exercise form reviews", tiers: [false, false, true] },
  { label: "Quarterly lab panel", tiers: [false, false, true] },
  { label: "Custom maintenance program", tiers: [false, false, true] },
];

const medPrices = [
  ["Oral GLP-1 pill (starting doses)", "from $149/mo"],
  ["Semaglutide pen (Wegovy®)", "from $199/mo"],
  ["Tirzepatide (Zepbound®)", "from $299/mo"],
  ["Hormone therapy (TRT / HRT)", "pharmacy price"],
];

export default function PricingPage() {
  return (
    <>
      <section className="pb-20 pt-16 md:pt-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={
              <>
                Clear pricing. <em>No surprises.</em>
              </>
            }
            sub="Your membership covers clinical care and coaching, and stays the same at every dose. Medication is billed separately at pharmacy price. You're never charged if a clinician finds treatment isn't right for you."
          />
          <div className="mt-16">
            <TierCards />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-24">
        <Container>
          <h2 className="font-display text-4xl md:text-5xl">Compare every feature</h2>
          <div className="mt-10 overflow-x-auto rounded-[24px] border border-line bg-white/60">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink/50">
                  <th className="px-6 py-4 font-medium" scope="col">
                    Feature
                  </th>
                  {tiers.map((t) => (
                    <th key={t.id} className="px-4 py-4 text-center font-medium" scope="col">
                      {t.name}
                      <span className="block font-mono normal-case text-ink">${t.price}/mo</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.label} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="px-6 py-4 font-normal">
                      {row.label}
                    </th>
                    {row.tiers.map((on, i) => (
                      <td key={i} className="px-4 py-4">
                        <span className="grid place-items-center">
                          {on ? <Check className="text-clay" /> : <span className="text-ink/25">—</span>}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-bone-2/50 py-24">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Medication, billed separately</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink/60">
              Typical self-pay prices for FDA-approved medications. Your clinician decides what&apos;s appropriate. If you have
              insurance, we&apos;ll help you check your coverage.
            </p>
            <dl className="mt-8 divide-y divide-line rounded-[24px] border border-line bg-bone">
              {medPrices.map(([name, price]) => (
                <div key={name} className="flex items-center justify-between px-6 py-4">
                  <dt>{name}</dt>
                  <dd className="font-mono text-sm text-clay">{price}*</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Add-ons</h2>
            <div className="mt-8 space-y-4">
              {addOns.map((a) => (
                <div key={a.name} className="rounded-[24px] border border-line bg-bone p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold">{a.name}</h3>
                    <span className="shrink-0 font-mono text-sm text-clay">{a.price}</span>
                  </div>
                  <p className="mt-2 text-ink/60">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <Container>
          <p className="mt-12 text-[11px] leading-relaxed text-ink/45">{disclaimer}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Billing questions." />
          <Faq items={faqs.slice(0, 3)} />
        </Container>
      </section>
    </>
  );
}
