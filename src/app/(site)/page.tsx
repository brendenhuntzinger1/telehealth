import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { PhoneMockup } from "@/components/phone-mockup";
import { TierCards } from "@/components/tier-cards";
import { ButtonLink, Check, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { brand, catalog } from "@/lib/site";

const trust = [
  "Licensed clinicians in your state",
  "FDA-approved medications",
  "No charge if you're not eligible",
  "Same membership price at every dose",
  "Cancel anytime",
];

const categories = [
  { label: "Weight loss", sub: "GLP-1 injections & pills", href: "/weight-loss", image: "/img/glp1-pen.webp" },
  { label: "Testosterone", sub: "Labs, TRT & monitoring", href: "/men", image: "/img/trt.webp" },
  { label: "Menopause", sub: "HRT & symptom relief", href: "/women", image: "/img/hrt.webp" },
  { label: "Coaching", sub: "Training & nutrition", href: "/coaching", image: "/img/coach-session.webp" },
];

const careTeam = [
  {
    role: "Your clinician",
    title: "Licensed, board-certified providers",
    body: "Reviews your history and labs, prescribes when appropriate, adjusts your dose and answers every medical question.",
    image: "/img/telehealth-call.webp",
    alt: "Member on a video visit with a clinician",
  },
  {
    role: "Your coach",
    title: `${brand.coach.name} & team`,
    body: "Writes your training and nutrition around your medication, reviews your check-ins and progress photos, and adjusts your plan every week.",
    image: "/img/coach-desk.webp",
    alt: "Coach reviewing a member's training plan",
  },
  {
    role: "Your plan",
    title: "Built around your life",
    body: "Home or gym, 2 or 6 days a week, big appetite or none. Your program fits your schedule — not the other way around.",
    image: "/img/woman-training.webp",
    alt: "Woman performing a dumbbell Romanian deadlift at home",
  },
];

const steps = [
  { n: "01", title: "3-minute assessment", body: "Tell us your goals, health history and how you like to train. No commitment." },
  {
    n: "02",
    title: "Clinician review",
    body: "A licensed clinician reviews your intake and prescribes if treatment is right for you — usually within 1–2 days.",
  },
  { n: "03", title: "Your kit arrives", body: "Medication ships from a licensed pharmacy. Your coach delivers your first program the same week." },
  { n: "04", title: "Check in. Adjust. Repeat.", body: "Weekly check-ins, progress photos and plan updates — so results keep coming." },
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
        <Container className="relative grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-rise">
            <Eyebrow tone="bone">Weight loss · Hormones · Personal coaching</Eyebrow>
            <h1 className="font-display mt-6 text-[56px] leading-[0.95] sm:text-7xl md:text-[92px]">
              Lose the fat.
              <br />
              <em className="text-volt">Keep the muscle.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/70 md:text-xl">
              A virtual clinic for GLP-1 and hormone treatment — with a personal coach who writes your training and
              nutrition. Clinical care and coaching, together in one plan.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="volt">
                See if you qualify — 3 min
              </ButtonLink>
              <ButtonLink href="#treatments" variant="ghost-bone">
                Browse treatments
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
          <div className="animate-rise relative [animation-delay:150ms]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
              <Image
                src="/img/coach-session.webp"
                alt="Coach guiding a member through a kettlebell squat"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[60%_center]"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 w-56 rounded-2xl bg-bone p-4 text-ink shadow-2xl shadow-black/40 sm:-left-8 sm:w-64">
              <p className="text-[11px] uppercase tracking-wider text-ink/50">This week</p>
              <p className="mt-1 font-semibold">Lower A · 45 min</p>
              <div className="mt-3 flex gap-1">
                {[1, 1, 1, 0, 0].map((d, i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full ${d ? "bg-ink" : "bg-ink/10"}`} />
                ))}
              </div>
              <p className="mt-3 text-xs text-ink/55">Protein 98 / 140g · Next dose Sunday</p>
            </div>
            <div className="absolute -right-2 top-6 hidden rounded-full bg-volt px-4 py-2 text-sm font-semibold text-ink shadow-xl sm:block">
              Lean mass: held ✓
            </div>
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

      {/* What can we help with */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Start here" title="What can we help with?" />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-[24px] bg-ink-3"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-bone md:p-6">
                  <p className="text-lg font-semibold md:text-2xl">{c.label}</p>
                  <p className="mt-1 text-xs text-bone/70 md:text-sm">{c.sub}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-volt md:text-sm">
                    Get started <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Treatment catalog */}
      <section id="treatments" className="scroll-mt-20 border-t border-line bg-bone-2/50 py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Treatments"
              title="Prescribed by clinicians. Paired with a coach."
              sub="Every treatment comes with the member portal and a plan built around it. Medication is prescribed only when a licensed clinician determines it's right for you."
            />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-bone transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bone-2">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    {t.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
                  <p className="mt-2 flex-1 text-ink/60">{t.detail}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-clay">{t.price}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-bone transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[11px] leading-relaxed text-ink/45">
            *Medication billed separately at pharmacy price and prescribed only if appropriate. Product images are
            illustrative and do not depict a specific branded medication.
          </p>
        </Container>
      </section>

      {/* Care team */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Your care team"
            title={
              <>
                A clinic <em>and</em> a coach — working as one.
              </>
            }
            sub="Most telehealth stops at the prescription. Here, your clinician and your coach share one plan, so your medication, training and nutrition all move in the same direction."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {careTeam.map((m) => (
              <article key={m.role} className="overflow-hidden rounded-[24px] border border-line bg-white/60">
                <div className="relative aspect-[3/2]">
                  <Image src={m.image} alt={m.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-clay">{m.role}</p>
                  <h3 className="mt-2 text-xl font-semibold">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* The problem */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Why coaching matters"
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

      {/* The kit */}
      <section className="grain relative overflow-hidden bg-ink py-20 text-bone md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
            <Image
              src="/img/kit.webp"
              alt="Remade welcome kit with injection pen, alcohol swabs, shaker bottle and welcome card"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              tone="bone"
              eyebrow="Delivered to your door"
              title={
                <>
                  Everything arrives <em className="text-volt">in one box.</em>
                </>
              }
              sub="Your medication ships discreetly from a licensed pharmacy. Your welcome kit includes the essentials to start strong — and your coach's first program lands in your portal the same week."
            />
            <ul className="mt-8 grid gap-3 text-bone/80 sm:grid-cols-2">
              {["Prescribed medication", "Supplies & instructions", "Protein shaker", "Your personalized program"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check className="text-volt" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Personalized coaching */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              eyebrow="Personalized coaching"
              title={
                <>
                  A real coach in your pocket. <em>Not a chatbot.</em>
                </>
              }
              sub="Your portal holds your workouts, meal plan, progress photos and check-ins — and a direct line to your coach, who adjusts everything as your body and medication change."
            />
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr_0.9fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-[28px]">
              <Image src="/img/man-training.webp" alt="Man setting up a trap bar deadlift" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 text-bone">
                <p className="text-lg font-semibold">Dose-aware training</p>
                <p className="mt-1 text-sm text-bone/70">Lighter weeks when appetite dips. Progressive overload when you&apos;re fueled.</p>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[28px]">
              <Image src="/img/meal-prep.webp" alt="High-protein meal-prep containers" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 text-bone">
                <p className="text-lg font-semibold">Protein-first meals</p>
                <p className="mt-1 text-sm text-bone/70">Easy to finish on a small appetite. Built around your daily protein target.</p>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-[28px] bg-ink py-10">
              <PhoneMockup />
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/coaching">How coaching works</ButtonLink>
            <ButtonLink href="/portal" variant="ghost">
              Preview the member portal
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Coach */}
      <section className="border-t border-line bg-bone-2/50 py-20 md:py-28">
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
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From assessment to results." />
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="rounded-[24px] border border-line bg-white/60 p-7">
                <span className="font-mono text-sm text-clay">{s.n}</span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Comparison */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow={`Why ${brand.name}`}
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
      <section id="pricing" className="border-t border-line bg-bone-2/50 py-20 md:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title="Simple tiers. Same price at every dose."
            sub="Membership covers clinical care and coaching. Medication is billed separately at pharmacy prices — and you're never charged if a clinician finds treatment isn't right for you."
          />
          <div className="mt-16">
            <TierCards />
          </div>
          <p className="mt-10 text-center text-sm text-ink/50">
            Add-ons like the 12-Week Remade Challenge are available on the{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              pricing page
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
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
            Get <em className="text-volt">Remade.</em>
          </h2>
          <p className="relative mx-auto mt-6 max-w-md text-bone/65">
            Free 3-minute assessment. No charge unless a clinician approves treatment.
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
