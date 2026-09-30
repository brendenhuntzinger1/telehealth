import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { PricingTable, TreatmentCosts } from "@/components/pricing-table";
import { Container, Heading, Pill, SectionIntro } from "@/components/ui";
import { billingRules, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare medical weight loss, medical care with coaching, and coaching only — with every cost listed separately.",
};

const pricingFaqs = faqs.filter((f) =>
  ["Is medication included?", "How do insurance and self-pay work?", "What happens if I'm not eligible?", "Do I need medication to join coaching?"].includes(f.q),
);

const TBC = "To be confirmed before we open";

export default function PricingPage() {
  return (
    <>
      <section className="pb-12 pt-10 sm:pt-16">
        <Container>
          <Pill tone="sky">Pricing</Pill>
          <Heading as="h1" className="mt-5 max-w-3xl text-ink">
            See every cost before you choose.
          </Heading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Pick the level of support you want. Membership, medication, lab work and coaching are listed separately so you
            always know what you&apos;re paying for.
          </p>
        </Container>
      </section>
      <section className="pb-16 sm:pb-24">
        <Container>
          <PricingTable />
        </Container>
      </section>
      <section className="pb-16 sm:pb-24">
        <Container>
          <SectionIntro eyebrow="Other treatments" title="TRT, hair loss & menopause" sub="Each treatment has its own membership. Medication and labs are listed separately, and coaching can be added to any of them." />
          <div className="mt-10">
            <TreatmentCosts />
          </div>
        </Container>
      </section>
      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Billing details" title="How billing will work" />
          <dl className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Medication", "Billed separately from membership, and only if an authorized clinician prescribes it. The cost depends on the medication, dose and pharmacy."],
              ["Lab work", "Ordered only if your clinician needs it. Lab costs will be published before we open."],
              ["When you're charged", billingRules.paymentTiming ?? TBC],
              ["If you're not eligible", billingRules.ifNotEligible ?? TBC],
              ["Cancellation", billingRules.cancellation ?? TBC],
              ["Insurance", billingRules.insurance ?? "Not yet confirmed for any service. Please plan on self-pay for now."],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[24px] bg-white p-6 ring-1 ring-line">
                <dt className="font-display text-lg font-bold">{k}</dt>
                <dd className={`mt-2 ${v === TBC ? "italic text-muted" : "text-muted"}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow="Questions" title="About costs" />
          <Faq items={pricingFaqs} />
        </Container>
      </section>
    </>
  );
}
