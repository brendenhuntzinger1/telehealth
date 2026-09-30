import type { Metadata } from "next";
import Image from "next/image";
import { CareRoles } from "@/components/care-roles";
import { Faq } from "@/components/faq";
import { ButtonLink, Container, Heading, Pill, SectionIntro } from "@/components/ui";
import { assessmentCta, billingRules, faqs, launch, primaryCta, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "How getting started, clinical evaluation, individualized plans, follow-ups and optional coaching work at Remade Clinic.",
};

const pending = "To be confirmed before we open.";

export default function HowItWorksPage() {
  return (
    <>
      <section>
        <Container className="grid items-center gap-8 pb-14 pt-8 sm:pt-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Pill tone="sky">How it works</Pill>
            <Heading as="h1" className="mt-5 text-ink">
              Understand everything before you begin.
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              What happens at each step, who takes care of what, and what you&apos;ll pay for — laid out plainly.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-shell">
            <Image src="/img/farmers-market.webp" alt="Couple choosing vegetables at a farmers market" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Step by step" title="Your path" />
          <ol className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-4 rounded-[28px] bg-white p-6 ring-1 ring-line sm:grid-cols-[64px_1fr] sm:p-8">
                <span className="font-display grid h-14 w-14 place-items-center rounded-full bg-teal text-xl font-extrabold text-white">{i + 1}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold">{s.title}</h2>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Good to know" title="Eligibility, payment and next steps" />
          <dl className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Who decides eligibility?", "An authorized clinician decides whether medication is appropriate for you. Not everyone qualifies."],
              ["When do I pay?", billingRules.paymentTiming ?? `You'll see the full cost breakdown before paying anything. Exact billing timing: ${pending.toLowerCase()}`],
              ["What if I'm not eligible for medication?", billingRules.ifNotEligible ?? `Your clinician can discuss other options, and coaching without medication is available. Billing in this case: ${pending.toLowerCase()}`],
              ["Can I cancel?", billingRules.cancellation ?? `Cancellation terms: ${pending.toLowerCase()}`],
              ["How often are follow-ups?", "Your clinician sets the follow-up schedule based on your treatment."],
              ["What about maintenance?", "Decisions about continuing, adjusting or stopping medication are made with your clinician. Habit support — and coaching, if you choose it — continues."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-[24px] bg-sky p-6">
                <dt className="font-display text-lg font-bold text-sky-deep">{q}</dt>
                <dd className="mt-2 text-ink">{a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Who does what" title="Clinicians for medical care. Coaches for everyday habits." />
          <div className="mt-10">
            <CareRoles />
          </div>
        </Container>
      </section>

      <section id="launch" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionIntro
            eyebrow="Launch status"
            title={launch.acceptingPatients ? "We're accepting patients" : "We're getting ready to open"}
          />
          {!launch.acceptingPatients && (
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Remade Clinic isn&apos;t accepting patients yet. We&apos;re confirming our clinical practice, the states
                we&apos;ll serve and our pricing, and we&apos;ll publish those details here before we open.
              </p>
              <p>
                You can preview the assessment and member portal to see how things will work. The previews use sample
                data, don&apos;t ask for health information, and don&apos;t save anything.
              </p>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={assessmentCta.href} variant="secondary">
              {assessmentCta.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow="FAQs" title="Questions, answered" />
          <Faq items={faqs} />
        </Container>
      </section>
    </>
  );
}
