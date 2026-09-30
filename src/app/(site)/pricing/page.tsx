import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { Plans } from "@/components/plans";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { disclaimer, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Remade Clinic plans: medical weight-loss care as the base, with personal coaching as an optional add-on.",
};

const pricingFaqs = faqs.filter((f) =>
  ["How much does medication cost?", "Is coaching required?", "Will I qualify for medication?"].includes(f.q),
);

export default function PricingPage() {
  return (
    <>
      <section className="pb-12 pt-10 md:pb-16 md:pt-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Simple plans, clearly explained"
            sub="Medical care is the base of every plan. Personal coaching is optional. Medication and any lab work are billed separately."
          />
        </Container>
      </section>
      <section className="pb-16 md:pb-24">
        <Container>
          <Plans />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/weight-loss">Explore weight-loss care</ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary">
              How it works
            </ButtonLink>
          </div>
        </Container>
      </section>
      <section className="border-t border-line bg-sand py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="About costs" />
          <Faq items={pricingFaqs} />
        </Container>
        <Container>
          <p className="mt-10 text-xs leading-relaxed text-muted">{disclaimer}</p>
        </Container>
      </section>
    </>
  );
}
