import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/faq";
import { ButtonLink, CheckItem, Container, IconBadge, SectionHeading, Tag } from "@/components/ui";
import { assessmentCta, careIncludes, faqs, launch, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "How clinician-guided weight-loss care, follow-ups, maintenance and optional coaching work at Remade Clinic.",
};

const roles = [
  {
    title: "Your clinical team",
    tag: "Medical care",
    items: [
      "Medical evaluation and treatment decisions",
      "Prescriptions, when appropriate",
      "Dosing, side effects and medical questions",
      "Follow-ups and plan changes",
      "Decisions about continuing, adjusting or stopping medication",
    ],
  },
  {
    title: "Your coach (optional)",
    tag: "Coaching add-on",
    items: [
      "Home or gym exercise plans",
      "Beginner-friendly progression",
      "Everyday nutrition habits",
      "Check-ins and accountability",
      "Progress tracking and plan adjustments",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="pb-12 pt-10 md:pb-16 md:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            as="h1"
            eyebrow="How it works"
            title="Care that starts with you — and keeps going."
            sub="Here's what to expect, from your first conversation to long-term support."
          />
          <div className="relative aspect-[3/2] overflow-hidden rounded-[32px] bg-sand">
            <Image src="/img/phone-habits.webp" alt="Phone, walking shoes and water bottle on a kitchen table" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white/60 py-16 md:py-24">
        <Container>
          <ol className="grid gap-4 md:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-3xl border border-line bg-cream p-6 md:p-8">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal text-lg font-semibold text-white">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted">
            Not everyone qualifies for medication. Timelines for review and follow-up depend on your clinician and
            your treatment.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="What's included" title="What your care includes" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careIncludes.map((c) => (
              <div key={c.title} className="rounded-3xl border border-line bg-white p-6">
                <IconBadge name={c.icon} />
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted">{c.body}</p>
                <div className="mt-4">
                  <Tag tone={c.tag === "Optional add-on" ? "peach" : c.tag === "Clinical care" ? "mist" : "line"}>{c.tag}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-sand py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Who does what" title="Clinical care and coaching, clearly separated" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roles.map((r) => (
              <div key={r.title} className="rounded-3xl bg-cream p-7">
                <Tag tone={r.tag === "Medical care" ? "mist" : "peach"}>{r.tag}</Tag>
                <h3 className="mt-4 text-xl font-semibold">{r.title}</h3>
                <ul className="mt-5 space-y-3">
                  {r.items.map((i) => (
                    <CheckItem key={i}>{i}</CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Follow-ups" title="Ongoing clinical follow-up" />
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Your clinical team checks in on how you&apos;re doing — progress, side effects and how the plan fits your
              life — and makes changes when needed. How often you meet depends on your treatment.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Maintenance" title="Planning for the long term" />
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Maintenance looks different for everyone. Any decision to continue, adjust or stop medication is made with
              your treating clinician. Everyday habits — eating well, staying active and doing some strength work — can
              help you maintain your progress, though weight changes over time are common and your plan can adjust.
            </p>
          </div>
        </Container>
      </section>

      <section id="launch" className="scroll-mt-24 border-t border-line bg-white/60 py-16 md:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Launch status" title={launch.acceptingPatients ? "We're accepting patients" : "We're getting ready to launch"} />
          {!launch.acceptingPatients && (
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Remade Clinic isn&apos;t accepting patients yet. We&apos;re finalizing our clinical partners, the states
                we&apos;ll serve and our pricing, and we&apos;ll publish those details here before launch.
              </p>
              <p>
                You can preview our online assessment to see how it will work. The preview doesn&apos;t ask for health
                information, and nothing you enter is saved or sent.
              </p>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/weight-loss">Explore weight-loss care</ButtonLink>
            <ButtonLink href={assessmentCta.href} variant="secondary">
              {assessmentCta.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQs" title="Questions, answered" />
          <Faq items={faqs} />
        </Container>
      </section>
    </>
  );
}
