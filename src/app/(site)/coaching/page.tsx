import type { Metadata } from "next";
import { ButtonLink, Check, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { addOns, brand } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coaching",
  description: "Custom strength training, nutrition and weekly check-ins from a real coach, built around your medication.",
};

const principles = [
  {
    title: "Strength first",
    body: "Two to four full-body or split sessions a week. Progressive overload you can track — because muscle is what makes the result last.",
  },
  {
    title: "Protein floor, not a crash diet",
    body: "When appetite is low, what you eat matters more. You get a daily protein target and meals that are easy to finish.",
  },
  {
    title: "Adjusted to your medication",
    body: "Titration weeks, side effects and energy dips are planned for. Your volume and nutrition flex so you keep training through them.",
  },
  {
    title: "Measured beyond the scale",
    body: "Waist, strength numbers, photos and how your clothes fit. The scale is one data point, not the scoreboard.",
  },
];

const week = [
  { day: "Mon", session: "Lower A", detail: "Goblet squat, RDL, split squat, calf raise", tag: "45 min" },
  { day: "Tue", session: "Walk + mobility", detail: "8–10k steps, 10 min hips & t-spine", tag: "Recovery" },
  { day: "Wed", session: "Upper A", detail: "DB press, row, pulldown, lateral raise", tag: "40 min" },
  { day: "Thu", session: "Check-in", detail: "Weight, waist, photos, energy & appetite", tag: "5 min" },
  { day: "Fri", session: "Lower B", detail: "Trap-bar deadlift, step-up, hamstring curl", tag: "45 min" },
  { day: "Sat", session: "Upper B + conditioning", detail: "Incline press, cable row, 10 min intervals", tag: "45 min" },
  { day: "Sun", session: "Rest", detail: "Meal prep with the protein playbook", tag: "Off" },
];

export default function CoachingPage() {
  return (
    <>
      <section className="grain relative -mt-16 overflow-hidden bg-ink pt-16 text-bone">
        <Container className="relative grid gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="animate-rise">
            <Eyebrow tone="bone">Coaching</Eyebrow>
            <h1 className="font-display mt-6 text-5xl leading-[0.98] md:text-8xl">
              Medication changes the scale.
              <br />
              <em className="text-volt">Coaching changes you.</em>
            </h1>
          </div>
          <p className="animate-rise text-lg leading-relaxed text-bone/70 [animation-delay:120ms]">
            {brand.coach.bio}
          </p>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <SectionHeading eyebrow="The method" title="Four principles. No gimmicks." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="rounded-[24px] border border-line bg-white/60 p-8">
                <span className="font-mono text-sm text-clay">0{i + 1}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-bone-2/50 py-24 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="A sample week"
            title="What a real week looks like."
            sub="Every plan is built around your schedule, equipment and medication. Here's an example for a Coached member training at a gym."
          />
          <ol className="overflow-hidden rounded-[28px] border border-line bg-bone">
            {week.map((d) => (
              <li
                key={d.day}
                className="grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-line/70 px-6 py-5 last:border-0"
              >
                <span className="font-mono text-sm text-ink/45">{d.day}</span>
                <div>
                  <p className="font-semibold">{d.session}</p>
                  <p className="text-sm text-ink/55">{d.detail}</p>
                </div>
                <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/60">{d.tag}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Progress photos"
              title="See the change the scale can't."
              sub="Guided poses and a consistent routine make your photos comparable week to week. Side-by-sides are private to you and your coach."
            />
            <ul className="mt-8 space-y-3 text-[15px]">
              {[
                "Private by default — only you and your care team can see them",
                "Pose guide & lighting tips for consistent shots",
                "Side-by-side slider in your portal",
                "Never used in marketing without your separate written permission",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 text-clay" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Week 1", "Week 12"].map((w, i) => (
              <div key={w} className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-ink-3">
                <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full" aria-hidden>
                  <ellipse cx="50" cy="26" rx="11" ry="13" className="fill-bone/15" />
                  <path
                    d={
                      i === 0
                        ? "M26 140 C24 100 22 70 30 52 C38 44 62 44 70 52 C78 70 76 100 74 140 Z"
                        : "M30 140 C29 100 27 72 33 54 C40 45 60 45 67 54 C73 72 71 100 70 140 Z"
                    }
                    className="fill-bone/15"
                  />
                </svg>
                <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-xs font-medium">{w}</span>
              </div>
            ))}
            <p className="col-span-2 text-center text-xs text-ink/45">Illustration of the portal&apos;s side-by-side view.</p>
          </div>
        </Container>
      </section>

      <section className="grain relative bg-ink py-24 text-bone md:py-28">
        <Container>
          <SectionHeading tone="bone" eyebrow="Add-ons" title="Go further." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {addOns.map((a) => (
              <div key={a.name} className="flex flex-col rounded-[24px] border border-bone/10 bg-ink-2 p-7">
                <h3 className="text-xl font-semibold">{a.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-bone/60">{a.detail}</p>
                <p className="mt-6 font-mono text-sm text-volt">{a.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/start" variant="volt">
              Start your assessment
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
