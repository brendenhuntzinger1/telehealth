import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { Plans } from "@/components/plans";
import { ButtonLink, Container, IconBadge, SectionHeading, Tag } from "@/components/ui";
import {
  assessmentCta,
  brand,
  careIncludes,
  coachingFeatures,
  faqs,
  otherCare,
  steps,
  supportPillars,
} from "@/lib/site";

const commitments = [
  {
    icon: "stethoscope",
    title: "Clinician-directed",
    body: "Treatment decisions are made by an authorized clinician. Medication is prescribed only when it's appropriate.",
  },
  {
    icon: "receipt",
    title: "Clear about costs",
    body: "We'll show what membership includes and what's billed separately — like medication and labs — before you sign up.",
  },
  {
    icon: "shield",
    title: "Careful with your information",
    body: "This website doesn't collect health information. Health details will only be gathered through secure intake once care launches.",
  },
  {
    icon: "heart",
    title: "At your pace",
    body: "No gym required and no judgment. Start with where you are today.",
  },
];

const homeFaqs = faqs.filter((f) =>
  [
    "How much does medication cost?",
    "Will I qualify for medication?",
    "Is coaching required?",
    "I'm a beginner and don't like gyms. Is this for me?",
    "What do follow-ups look like?",
    "What happens when I reach my goal?",
  ].includes(f.q),
);

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="pb-16 pt-8 md:pb-24 md:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="animate-fade">
            <Tag>Medical weight-loss care</Tag>
            <h1 className="font-display mt-5 text-balance text-[40px] leading-[1.08] text-ink md:text-6xl">
              Personalized weight-loss care, with support that lasts.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              Work with an authorized clinician on a plan made for you — including GLP-1 medication when it&apos;s
              appropriate. Practical nutrition and movement support, plus optional personal coaching, help you build
              habits you can keep.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/weight-loss">Explore weight-loss care</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                How it works
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">No gym or fitness experience needed.</p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-sand sm:aspect-[4/5]">
              <Image
                src="/img/walk-morning.webp"
                alt="Woman walking on a tree-lined street in the morning"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lg shadow-ink/5 ring-1 ring-line sm:left-auto sm:right-6 sm:w-72">
              <p className="text-sm font-semibold">Care that goes beyond a prescription</p>
              <p className="mt-1 text-sm text-muted">Clinical follow-up, everyday habit support and optional coaching.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. What your care includes */}
      <section className="border-t border-line bg-white/60 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="What your care includes"
            title="Medical care first. Extra support when you want it."
            sub="Every member gets clinical care and everyday resources. Personal coaching is an optional add-on."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careIncludes.map((c) => (
              <div
                key={c.title}
                className={`flex flex-col rounded-3xl p-5 md:p-6 ${
                  c.tag === "Optional add-on" ? "border-2 border-dashed border-sage bg-cream" : "border border-line bg-cream"
                }`}
              >
                <div className="flex items-center gap-4 lg:block">
                  <IconBadge name={c.icon} />
                  <h3 className="text-lg font-semibold lg:mt-5">{c.title}</h3>
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{c.body}</p>
                <div className="mt-4">
                  <Tag tone={c.tag === "Optional add-on" ? "peach" : c.tag === "Clinical care" ? "mist" : "line"}>{c.tag}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. How it works */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="How it works" title="Getting started is simple" />
            <Link href="/how-it-works" className="inline-flex min-h-11 items-center font-medium text-teal-deep underline underline-offset-4">
              See the details
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl border border-line bg-white p-5 md:block md:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold md:mt-5">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted md:mt-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">Not everyone qualifies for medication. Your clinician will talk through what&apos;s right for you.</p>
        </Container>
      </section>

      {/* 4. Support beyond medication */}
      <section className="border-t border-line bg-sand py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-[28px]">
              <Image
                src="/img/couple-cooking.webp"
                alt="Couple cooking a healthy dinner together"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <Image src="/img/band-row.webp" alt="Woman doing a seated resistance band exercise at home" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <Image src="/img/friends-walk.webp" alt="Two friends walking in a park" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Support beyond medication"
              title="Small, steady habits make the difference."
              sub="Medication can help, but everyday habits matter too. Our resources are made for real life — including if you're starting from zero."
            />
            <ul className="mt-8 space-y-5">
              {supportPillars.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <IconBadge name={p.icon} />
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 5. Optional coaching */}
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Tag tone="peach">Optional add-on</Tag>
            <SectionHeading
              title="Want a coach in your corner?"
              sub="Add personal coaching for a plan built around you and someone checking in along the way."
            />
            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {coachingFeatures.map((f) => (
                <li key={f.title}>
                  <p className="font-semibold">{f.title}</p>
                  <p className="mt-1 text-muted">{f.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-mist p-5 text-[15px] leading-relaxed text-teal-deep">
              <strong>Coaching isn&apos;t medical care.</strong> Questions about medication, side effects, dosing or other
              medical concerns always go to your clinical team.
            </div>
            <div className="mt-8">
              <ButtonLink href="/coaching" variant="secondary">
                Learn about coaching
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-sand lg:aspect-[4/5]">
            <Image
              src="/img/home-chair-squat.webp"
              alt="Man doing a chair squat exercise in his living room"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* 6. Other care options */}
      <section className="border-t border-line bg-white/60 py-16 md:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Other care" title="More ways we can help" />
            <Link href="/other-care" className="inline-flex min-h-11 items-center font-medium text-teal-deep underline underline-offset-4">
              View all care
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {otherCare.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-line bg-cream p-4 transition-colors hover:border-teal"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand">
                  <Image src={c.image} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{c.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {c.status === "coming-soon" ? <span className="font-medium text-clay">Coming soon</span> : c.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Plans and pricing */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Plans & pricing"
            title="Start with medical care. Add coaching if you like."
            sub="One base plan for clinical care, with personal coaching as an optional add-on."
          />
          <div className="mt-10">
            <Plans />
          </div>
        </Container>
      </section>

      {/* 8. Trust and FAQs */}
      <section className="border-t border-line bg-sand py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our commitments" title="What you can expect from us" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c) => (
              <div key={c.title} className="rounded-3xl bg-cream p-5 md:p-6">
                <div className="flex items-center gap-4 lg:block">
                  <IconBadge name={c.icon} />
                  <h3 className="font-semibold lg:mt-4">{c.title}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>

          <figure className="mt-12 rounded-3xl bg-white p-7 md:p-10">
            <p className="text-sm font-semibold text-teal">A note from our founder</p>
            <blockquote className="font-display mt-4 text-2xl leading-snug md:text-3xl">&ldquo;{brand.founder.note}&rdquo;</blockquote>
            <figcaption className="mt-5 text-muted">
              {brand.founder.name ? `${brand.founder.name}, ` : ""}
              {brand.founder.role}, {brand.name}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions, answered" />
            <p className="mt-6 text-muted">
              More answers on{" "}
              <Link href="/how-it-works" className="inline-flex min-h-11 items-center text-teal-deep underline underline-offset-4">
                How it works
              </Link>
            </p>
          </div>
          <Faq items={homeFaqs} />
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-6xl rounded-[36px] bg-teal-deep px-6 py-14 text-center text-white md:py-20">
          <h2 className="font-display text-balance text-3xl md:text-5xl">Ready to learn more?</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
            See how our weight-loss care works, or take a quick look at the assessment we&apos;re building.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/weight-loss" variant="light">
              Explore weight-loss care
            </ButtonLink>
            <Link
              href={assessmentCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 font-medium text-white hover:border-white"
            >
              {assessmentCta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
