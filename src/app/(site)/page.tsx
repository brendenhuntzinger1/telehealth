import Link from "next/link";
import { Faq } from "@/components/faq";
import { PhoneMockup } from "@/components/phone-mockup";
import { TierCards } from "@/components/tier-cards";
import { ButtonLink, Check, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { brand, programs } from "@/lib/site";

const trust = [
  "Licensed clinicians in your state",
  "FDA-approved medications",
  "No charge if you're not eligible",
  "Same membership price at every dose",
  "Cancel anytime",
];

const steps = [
  {
    n: "01",
    title: "3-minute assessment",
    body: "Tell us your goals, health history and how you like to train. No commitment.",
  },
  {
    n: "02",
    title: "Clinician review",
    body: "A licensed clinician reviews your intake and prescribes if treatment is right for you — usually within 1–2 days.",
  },
  {
    n: "03",
    title: "Your plan, built by a coach",
    body: "Training, protein targets and meals designed around your medication, equipment and schedule.",
  },
  {
    n: "04",
    title: "Check in. Adjust. Repeat.",
    body: "Weekly check-ins, progress photos and plan updates — so results keep coming after the first month.",
  },
];

const features = [
  {
    title: "Dose-aware training",
    body: "Your program flexes with your titration schedule — lighter volume on low-appetite weeks, progressive overload when you're fueled.",
    span: "md:col-span-2",
  },
  {
    title: "Protein, not just calories",
    body: "Daily protein floor and simple meals that are easy to eat when your appetite is small.",
    span: "",
  },
  {
    title: "Private progress photos",
    body: "Guided poses, consistent lighting tips and side-by-side comparisons only you and your coach can see.",
    span: "",
  },
  {
    title: "Form reviews",
    body: "Film a set, send it to your coach, get feedback. Train with confidence at home or in the gym.",
    span: "",
  },
  {
    title: "A plan for after medication",
    body: "When you and your clinician decide to taper, you move into a maintenance program designed to hold your results.",
    span: "",
  },
];

const compare = [
  ["Clinician visit & prescription", true, true],
  ["Medication delivered", true, true],
  ["Custom strength program", false, true],
  ["Protein & macro targets", false, true],
  ["Named coach who knows you", false, true],
  ["Lean-mass & strength tracking", false, true],
  ["Plan for coming off medication", false, true],
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative -mt-16 overflow-hidden bg-ink pt-16 text-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_30%,rgba(212,255,79,0.10),transparent_70%)]" />
        <Container className="relative grid items-center gap-14 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-rise">
            <Eyebrow tone="bone">Medical weight loss · Hormones · Coaching</Eyebrow>
            <h1 className="font-display mt-6 text-[56px] leading-[0.95] sm:text-7xl md:text-[96px]">
              Lose the fat.
              <br />
              <em className="text-volt">Keep the muscle.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/70 md:text-xl">
              Clinician-prescribed GLP-1 and hormone treatment, plus a real coach who writes your training and nutrition
              — so the body you end up with is stronger, not just smaller.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="volt">
                See if you qualify — 3 min
              </ButtonLink>
              <ButtonLink href="/coaching" variant="ghost-bone">
                Meet your coach
              </ButtonLink>
            </div>
            <ul className="mt-10 grid max-w-lg gap-2.5 text-sm text-bone/70 sm:grid-cols-2">
              {trust.slice(0, 4).map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="text-volt" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <PhoneMockup />
          </div>
        </Container>
      </section>

      {/* Trust marquee */}
      <div className="overflow-hidden border-b border-line bg-bone-2/60 py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm text-ink/60">
          {[...trust, ...trust, ...trust, ...trust].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="h-1 w-1 rounded-full bg-ink/30" />
            </span>
          ))}
        </div>
      </div>

      {/* The problem */}
      <section className="py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="The problem nobody talks about"
            title={
              <>
                Not all weight lost is <em>fat.</em>
              </>
            }
            sub="In clinical trial body-composition studies, a substantial share of the weight lost on GLP-1 medication came from lean mass — muscle that powers your metabolism, strength and shape. Most programs only count pounds. We build a plan to protect what matters."
          />
          <div className="rounded-[28px] border border-line bg-white/70 p-7 md:p-10">
            <p className="text-sm font-medium text-ink/60">What your weight loss is made of</p>
            <div className="mt-8 space-y-7">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Medication alone</span>
                  <span className="text-ink/50">illustrative</span>
                </div>
                <div className="mt-2.5 flex h-4 overflow-hidden rounded-full bg-bone-2">
                  <div className="w-[62%] bg-ink" />
                  <div className="w-[38%] bg-clay" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Medication + strength training + protein</span>
                  <span className="text-ink/50">our goal</span>
                </div>
                <div className="mt-2.5 flex h-4 overflow-hidden rounded-full bg-bone-2">
                  <div className="w-[85%] bg-ink" />
                  <div className="w-[15%] bg-clay" />
                </div>
              </div>
            </div>
            <div className="mt-7 flex gap-6 text-xs text-ink/60">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ink" /> Fat
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-clay" /> Lean mass
              </span>
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-ink/45">
              Illustration only, not a promise of results. Lean-mass share varies by person, medication and study.
              Resistance training and adequate protein are recommended to help preserve muscle during weight loss.
            </p>
          </div>
        </Container>
      </section>

      {/* Two pillars */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] bg-bone-2 p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Pillar one</p>
              <h3 className="font-display mt-3 text-5xl">Medicine</h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink/65">
                Licensed clinicians review your health, order labs when needed and prescribe FDA-approved treatment when
                it&apos;s right for you. Medical questions always go to your clinician.
              </p>
            </div>
            <div className="rounded-[28px] bg-ink p-8 text-bone md:p-12">
              <p className="text-xs uppercase tracking-[0.2em] text-bone/50">Pillar two</p>
              <h3 className="font-display mt-3 text-5xl text-volt">Training</h3>
              <p className="mt-4 max-w-md leading-relaxed text-bone/65">
                A coach builds your strength program and nutrition around your medication, then adjusts it every week
                from your check-ins. This is the part other clinics leave out.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs */}
      <section className="border-t border-line py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Programs" title="Choose where to start." />
            <p className="max-w-sm text-ink/60">Every program includes clinical care and access to coaching.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {Object.values(programs).map((p, i) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-white/60 p-8 transition-all hover:-translate-y-1 hover:border-ink/30 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="font-display text-7xl text-ink/10">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{p.short}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-ink/50">Membership from $99/mo</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bone transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Coaching features */}
      <section className="grain relative bg-ink py-24 text-bone md:py-32">
        <Container>
          <SectionHeading
            tone="bone"
            eyebrow="Built-in coaching"
            title={
              <>
                A coach in your pocket, <em className="text-volt">not a chatbot.</em>
              </>
            }
            sub="Every membership comes with the member portal. Coached and Elite members get a plan written and adjusted by a real person."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className={`rounded-[24px] border border-bone/10 bg-ink-2 p-7 transition-colors hover:border-volt/40 ${f.span}`}
              >
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-bone/60">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/portal" variant="volt">
              Preview the member portal
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Coach */}
      <section className="py-24 md:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink-3">
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#262a27_0%,#0f1110_70%)]" />
            <div className="absolute inset-0 grid place-items-center text-center text-bone/40">
              <div>
                <p className="font-display text-8xl text-bone/15">CB</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em]">Coach photo goes here</p>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-bone/95 p-4 backdrop-blur">
              <p className="font-semibold">{brand.coach.name}</p>
              <p className="text-sm text-ink/60">{brand.coach.title}</p>
            </div>
          </div>
          <div>
            <Eyebrow>Meet your coach</Eyebrow>
            <blockquote className="font-display mt-6 text-4xl leading-[1.1] md:text-5xl">
              &ldquo;{brand.coach.bio}&rdquo;
            </blockquote>
            <div className="mt-10">
              <ButtonLink href="/coaching" variant="ghost">
                How coaching works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-bone-2/50 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="How it works" title="From assessment to results." />
          <ol className="mt-14 grid gap-5 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-[24px] bg-bone p-7">
                <span className="font-mono text-sm text-clay">{s.n}</span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Comparison */}
      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Why us"
            title="Most clinics stop at the prescription."
            sub="Medication gets the scale moving. Training and nutrition decide what you look and feel like when you get there."
          />
          <div className="overflow-hidden rounded-[28px] border border-line bg-white/70">
            <div className="grid grid-cols-[1fr_90px_90px] border-b border-line px-6 py-4 text-xs font-medium uppercase tracking-wider text-ink/50 md:grid-cols-[1fr_120px_120px]">
              <span />
              <span className="text-center">Meds-only apps</span>
              <span className="text-center text-ink">{brand.name}</span>
            </div>
            {compare.map(([label, a, b]) => (
              <div
                key={label}
                className="grid grid-cols-[1fr_90px_90px] items-center border-b border-line/70 px-6 py-4 last:border-0 md:grid-cols-[1fr_120px_120px]"
              >
                <span className="text-[15px]">{label}</span>
                <span className="grid place-items-center">{a ? <Check className="text-ink/40" /> : <span className="text-ink/25">—</span>}</span>
                <span className="grid place-items-center">{b ? <Check className="text-clay" /> : null}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-line py-24 md:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title="Simple tiers. Same price at every dose."
            sub="Membership covers clinical care and coaching. Medication is billed separately at pharmacy self-pay prices — and you're never charged if a clinician finds treatment isn't right for you."
          />
          <div className="mt-16">
            <TierCards />
          </div>
          <p className="mt-10 text-center text-sm text-ink/50">
            Add-ons like the 12-Week Transformation Challenge are available on the{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              pricing page
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <Faq />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-24 md:px-8">
        <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-ink px-8 py-20 text-center text-bone md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(212,255,79,0.16),transparent_70%)]" />
          <h2 className="font-display relative text-5xl leading-[1] md:text-7xl">
            Your strongest body
            <br />
            <em className="text-volt">starts with 3 minutes.</em>
          </h2>
          <p className="relative mx-auto mt-6 max-w-md text-bone/65">
            Free assessment. No charge unless a clinician approves treatment.
          </p>
          <div className="relative mt-9">
            <ButtonLink href="/start" variant="volt">
              Start your assessment
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
