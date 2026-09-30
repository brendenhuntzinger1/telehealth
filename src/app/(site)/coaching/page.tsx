import type { Metadata } from "next";
import Image from "next/image";
import { CareRoles } from "@/components/care-roles";
import { Faq } from "@/components/faq";
import { ButtonLink, CheckItem, Container, Heading, Icon, Pill, SectionIntro } from "@/components/ui";
import { coaching, coachingOnlyOffered } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personal coaching",
  description: "One-on-one coaching for movement, nutrition habits and accountability — at home or in the gym, beginners welcome.",
};

const matched = [
  { title: "Your experience", body: "Never exercised? Coming back after a break? Plans start where you are.", icon: "heart" },
  { title: "Your equipment", body: "A chair and a wall, a resistance band, a home setup or a full gym.", icon: "dumbbell" },
  { title: "Your schedule", body: "Ten free minutes or forty — your plan fits the time you actually have.", icon: "calendar" },
];

const beginnerWeek = [
  ["Mon", "20-minute walk", "Any comfortable pace"],
  ["Tue", "Home strength · 15 min", "Chair squats, wall push-ups, band rows"],
  ["Wed", "Rest or gentle stretching", ""],
  ["Thu", "20-minute walk", "Add a couple of minutes if it feels good"],
  ["Fri", "Home strength · 15 min", "Same moves, a few more reps"],
  ["Sat", "Something you enjoy", "A bike ride, gardening, a walk with family"],
  ["Sun", "Weekly check-in", "What worked, what felt hard, what to adjust"],
];

const coachingFaqs = [
  { q: "Do I need a gym?", a: "No. Most beginners start at home. If you have gym access, your plan can use it." },
  { q: "What if I've never exercised?", a: "That's okay. Your coach starts with short, manageable sessions and builds up gradually." },
  { q: "Is my coach a dietitian?", a: "No. Coaches offer general nutrition habit support within their qualifications — not medical nutrition therapy." },
  { q: "Can my coach help with medication?", a: "No. Medication, dosing, side effects and medical questions always go to your clinical team." },
];

export default function CoachingPage() {
  return (
    <>
      <section>
        <Container className="grid items-center gap-8 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:pb-20">
          <div className="animate-fade">
            <div className="flex flex-wrap gap-2">
              <Pill tone="coral">Personal coaching</Pill>
              <Pill tone="sky">With or without medication</Pill>
            </div>
            <Heading as="h1" className="mt-5 text-ink">
              Support from a coach who fits your life.
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              A one-on-one plan for movement and everyday habits, regular check-ins, and someone in your corner. Add it to
              medical care{coachingOnlyOffered ? ", or choose coaching on its own" : ""}. Beginners very welcome.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pricing">See pricing</ButtonLink>
              <ButtonLink href="/weight-loss" variant="secondary">
                Pair with medical care
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-shell lg:aspect-[4/5]">
            <Image src="/img/living-room-squat.webp" alt="Woman doing a bodyweight squat in her living room" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Made for you" title="Matched to you — not the other way around" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {matched.map((m) => (
              <div key={m.title} className="rounded-[28px] bg-white p-7 ring-1 ring-line">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral-soft text-coral-deep">
                  <Icon name={m.icon} />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro
              eyebrow="Starting from zero?"
              title="An example beginner week"
              sub="Every plan is personal. Here's what a first week at home might look like."
            />
            <p className="mt-6 leading-relaxed text-muted">
              Strength work is added gradually — it can help support muscle while you lose weight. No heavy weights or gym
              required.
            </p>
          </div>
          <ol className="overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
            {beginnerWeek.map(([day, plan, note]) => (
              <li key={day} className="grid grid-cols-[56px_1fr] gap-3 border-b border-line px-5 py-4 last:border-0 sm:px-7">
                <span className="font-display pt-0.5 font-bold text-teal">{day}</span>
                <div>
                  <p className="font-semibold">{plan}</p>
                  {note && <p className="text-sm text-muted">{note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-teal py-16 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionIntro tone="light" eyebrow="Check-ins" title={coaching.scheduleConfirmed ? "Your coaching rhythm" : "An example coaching rhythm"} />
            <ul className="mt-8 space-y-5">
              {coaching.exampleSchedule.map((s) => (
                <li key={s.label} className="flex gap-4">
                  <span className="w-32 shrink-0 font-display font-bold text-sky-mid">{s.label}</span>
                  <span className="text-white/90">{s.detail}</span>
                </li>
              ))}
            </ul>
            {!coaching.scheduleConfirmed && <p className="mt-6 text-sm text-white/75">Example only — exact schedule confirmed before launch.</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/10 p-6">
              <Pill tone="sky">Included for every member</Pill>
              <ul className="mt-4 space-y-2.5">
                {coaching.included.map((i) => (
                  <CheckItem key={i} tone="light">
                    {i}
                  </CheckItem>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] bg-white p-6 text-ink">
              <Pill tone="coral">Paid personal coaching</Pill>
              <ul className="mt-4 space-y-2.5">
                {coaching.paid.map((i) => (
                  <CheckItem key={i}>{i}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionIntro eyebrow="Who does what" title="Your coach and your clinicians work side by side" />
          <div className="mt-10">
            <CareRoles />
          </div>
        </Container>
      </section>

      <section className="bg-shell py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro eyebrow="Questions" title="About coaching" />
          <Faq items={coachingFaqs} />
        </Container>
      </section>
    </>
  );
}
