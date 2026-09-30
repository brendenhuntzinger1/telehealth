import Image from "next/image";
import Link from "next/link";
import { CareRoles } from "@/components/care-roles";
import { DashboardPreview } from "@/components/dashboard-preview";
import { Faq } from "@/components/faq";
import { PricingTable } from "@/components/pricing-table";
import { ProgramPaths } from "@/components/program-paths";
import { ButtonLink, CheckItem, Container, Eyebrow, Heading, Icon, Pill, SectionIntro, TextLink } from "@/components/ui";
import { billingRules, brand, clinical, coaching, faqs, primaryCta, steps, supportTopics, typicalDay } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 2. Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-8 pb-14 pt-8 sm:pt-12 lg:min-h-[640px] lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-20">
          <div className="animate-fade">
            <Pill tone="sky">Medical weight loss · Nutrition · Optional coaching</Pill>
            <Heading as="h1" className="mt-5 text-ink">
              Weight-loss care <span className="text-teal">built around you.</span>
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Personalized medical care from an authorized clinician, practical guidance on food and movement, and a
              personal coach if you want one. Medication is prescribed only when it&apos;s appropriate for you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                How it works
              </ButtonLink>
            </div>
            <ul className="mt-8 grid gap-2 text-[15px] text-muted sm:grid-cols-3">
              <CheckItem>No gym needed</CheckItem>
              <CheckItem>See costs up front</CheckItem>
              <CheckItem>Choose your support</CheckItem>
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-shell sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/img/hero-kitchen.webp"
                alt="Woman laughing while packing a healthy lunch in her kitchen"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-3 bottom-6 hidden w-64 rounded-2xl bg-white p-4 shadow-xl shadow-teal-deep/10 ring-1 ring-line sm:block lg:-left-10">
              <p className="flex items-center gap-2 text-sm font-bold text-teal">
                <Icon name="stethoscope" className="h-4 w-4" /> Clinician-guided
              </p>
              <p className="mt-1 text-sm text-muted">Your plan is built with an authorized clinician — around your life.</p>
            </div>
            <span className="absolute -right-2 top-8 hidden h-16 w-16 rounded-full bg-coral/90 lg:block" aria-hidden />
          </div>
        </Container>
      </section>

      {/* 3. Two ways to get support */}
      <section id="options" className="scroll-mt-24 bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Your options"
            title="Two ways to get support"
            sub="Start with medical care — adding a personal coach if you like — or choose coaching on its own."
          />
          <div className="mt-10">
            <ProgramPaths />
          </div>
        </Container>
      </section>

      {/* 4. How it works */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionIntro eyebrow="How it works" title="Four clear steps" />
            <TextLink href="/how-it-works">More about how it works</TextLink>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="font-display grid h-12 w-12 place-items-center rounded-full bg-teal text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-4 rounded-[28px] bg-sky p-6 sm:p-8 md:grid-cols-3">
            <div>
              <p className="font-display font-bold text-sky-deep">Eligibility</p>
              <p className="mt-1 text-ink">
                An authorized clinician decides whether medication is appropriate. Not everyone qualifies.
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-sky-deep">When you pay</p>
              <p className="mt-1 text-ink">
                {billingRules.paymentTiming ??
                  "You'll see the full cost breakdown before paying anything. Exact billing timing will be published before we open."}
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-sky-deep">If you&apos;re not eligible</p>
              <p className="mt-1 text-ink">
                {billingRules.ifNotEligible ??
                  "Your clinician can discuss other options, and coaching without medication is available. Billing rules will be published before we open."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Support beyond the prescription */}
      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Beyond the prescription"
            title="Everyday support for real life"
            sub="Medication can help, but it's the everyday habits that carry you forward. Here's what support looks like — even if you're starting from zero."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {supportTopics.map((t) => (
              <article key={t.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                  <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold">{t.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{t.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid items-center gap-10 overflow-hidden rounded-[32px] bg-white lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <Image
                src="/img/shoes-steps.webp"
                alt="Man tying his walking shoes on his front steps"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 pb-8 sm:px-10 lg:py-10 lg:pl-0">
              <Eyebrow tone="coral">A real weekday</Eyebrow>
              <Heading className="mt-3 text-ink">Consistency, not perfection</Heading>
              <p className="mt-4 text-lg text-muted">
                Small, repeatable steps build momentum. Here&apos;s an example of how support can fit a busy day.
              </p>
              <ol className="mt-7 space-y-4">
                {typicalDay.map((d) => (
                  <li key={d.time} className="grid grid-cols-[84px_1fr] gap-4">
                    <span className="pt-0.5 text-sm font-bold text-teal">{d.time}</span>
                    <div>
                      <p className="font-semibold">{d.title}</p>
                      <p className="text-muted">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] bg-teal-soft p-7">
              <h3 className="font-display text-xl font-bold text-teal-deep">Why strength matters</h3>
              <p className="mt-2 leading-relaxed text-teal-deep">
                When you lose weight, some of what you lose can be muscle. Regular strength training — even simple moves at
                home — can help support muscle while you lose weight.
              </p>
            </div>
            <div className="rounded-[28px] bg-sky p-7">
              <h3 className="font-display text-xl font-bold text-sky-deep">Support for the long term</h3>
              <p className="mt-2 leading-relaxed text-ink">
                Maintenance is personal. Decisions about continuing, adjusting or stopping medication are made with your
                clinician, and habit support stays with you along the way.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Optional personal coaching */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Optional personal coaching"
            title="A coach who knows your name — and your schedule"
            sub="Add one-on-one coaching to medical care, or choose it on its own. Plans are matched to your experience, equipment and time."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] bg-coral-soft p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-coral-deep/40 text-coral-deep" aria-hidden>
                  <Icon name="person" className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold">Your coach</p>
                  <p className="text-sm text-muted">{coaching.assignedCoachLabel}</p>
                </div>
              </div>
              <h3 className="font-display mt-8 text-xl font-bold">
                {coaching.scheduleConfirmed ? "Your coaching schedule" : "Example coaching schedule"}
              </h3>
              <ul className="mt-4 space-y-4">
                {coaching.exampleSchedule.map((s) => (
                  <li key={s.label} className="flex gap-4">
                    <span className="w-28 shrink-0 font-bold text-coral-deep">{s.label}</span>
                    <span className="text-ink">{s.detail}</span>
                  </li>
                ))}
              </ul>
              {!coaching.scheduleConfirmed && (
                <p className="mt-5 text-sm text-muted">Example only — the exact check-in schedule will be confirmed before launch.</p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[28px] border border-line bg-white p-7">
                <Pill tone="teal">Included for every member</Pill>
                <ul className="mt-5 space-y-3">
                  {coaching.included.map((i) => (
                    <CheckItem key={i}>{i}</CheckItem>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] bg-teal p-7 text-white">
                <Pill tone="coral">Paid personal coaching</Pill>
                <ul className="mt-5 space-y-3">
                  {coaching.paid.map((i) => (
                    <CheckItem key={i} tone="light">
                      {i}
                    </CheckItem>
                  ))}
                </ul>
              </div>
              <p className="rounded-2xl bg-shell p-5 text-[15px] text-muted sm:col-span-2">
                <strong className="text-ink">Coaches are not dietitians or clinicians.</strong> Medication and medical
                questions always go to your clinical team.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <TextLink href="/coaching">Learn about coaching</TextLink>
          </div>
        </Container>
      </section>

      {/* 7. Member experience preview */}
      <section className="bg-sky py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Member experience</Eyebrow>
            <Heading className="mt-3 text-ink">Everything in one calm place</Heading>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              See upcoming appointments, weekly goals and progress over time — with clinical and coaching messages kept
              clearly apart.
            </p>
            <ul className="mt-6 space-y-3 text-ink">
              <CheckItem>Clinical messages stay in a secure patient system</CheckItem>
              <CheckItem>Coaching messages about habits and movement</CheckItem>
              <CheckItem>Optional workouts and nutrition ideas</CheckItem>
            </ul>
            <p className="mt-6 text-sm text-sky-deep">This is a design preview with sample data. Member accounts aren&apos;t live yet.</p>
            <div className="mt-6">
              <ButtonLink href="/portal" variant="secondary">
                Explore the preview
              </ButtonLink>
            </div>
          </div>
          <DashboardPreview />
        </Container>
      </section>

      {/* 8. Pricing */}
      <section id="pricing" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Pricing"
            title="Clear costs, before you commit"
            sub="Every cost is listed on its own line — membership, medication, labs and coaching — so there are no surprises."
          />
          <div className="mt-10">
            <PricingTable compact />
          </div>
          <div className="mt-6">
            <TextLink href="/pricing">Full pricing details</TextLink>
          </div>
        </Container>
      </section>

      {/* 9. Trust and FAQs */}
      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Who provides your care" title="Clear roles, from day one" />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-[28px] bg-white p-7">
              <h3 className="font-display text-xl font-bold">Medical care</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {clinical.practiceName
                  ? `Medical care is provided by licensed clinicians at ${clinical.practiceName}.`
                  : "Medical care will be provided by independently licensed clinicians. We'll name our clinical practice and publish clinician credentials before we open."}
              </p>
              {clinical.clinicians.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {clinical.clinicians.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}</strong>, {c.credentials} — {c.role}
                    </li>
                  ))}
                </ul>
              )}
              <h3 className="font-display mt-7 text-xl font-bold">Coaching</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Led by our founder{brand.founder.name ? `, ${brand.founder.name}` : ""}.{" "}
                {brand.founder.credentials ?? "Coaching credentials will be listed here once confirmed."}
              </p>
              <h3 className="font-display mt-7 text-xl font-bold">Contact</h3>
              <p className="mt-3 text-muted">
                {brand.supportEmail ?? "Contact details will be published before we open."}
              </p>
            </div>
            <CareRoles />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>FAQs</Eyebrow>
              <Heading className="mt-3 text-ink">Questions, answered</Heading>
              <p className="mt-4 text-lg text-muted">
                Still wondering about something?{" "}
                <Link href="/how-it-works" className="font-semibold text-teal underline underline-offset-4">
                  See how it works
                </Link>
                .
              </p>
            </div>
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-8 overflow-hidden rounded-[36px] bg-teal text-white lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <Heading className="text-white">Start where you are.</Heading>
              <p className="mt-4 max-w-md text-lg text-white/85">
                Compare your options, see every cost, and choose the support that fits your life.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primaryCta.href} variant="inverse">
                  {primaryCta.label}
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="inverse-outline">
                  How it works
                </ButtonLink>
              </div>
            </div>
            <div className="relative aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[360px]">
              <Image src="/img/stroller-walk.webp" alt="Father walking with a stroller and his daughter" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
