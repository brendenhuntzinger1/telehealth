import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/faq";
import { ButtonLink, CheckItem, Container, SectionHeading, Tag } from "@/components/ui";
import { coachingFeatures, launch, plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personal coaching",
  description: "Optional one-on-one coaching for movement, habits and accountability — beginner-friendly, at home or in the gym.",
};

const sampleWeek = [
  { day: "Mon", plan: "20-minute walk", note: "Any pace that feels comfortable" },
  { day: "Tue", plan: "Home strength, 15 min", note: "Chair squats, wall push-ups, band rows" },
  { day: "Wed", plan: "Rest or gentle stretch", note: "" },
  { day: "Thu", plan: "20-minute walk", note: "Try adding a few minutes" },
  { day: "Fri", plan: "Home strength, 15 min", note: "Same moves — a few more reps if it feels good" },
  { day: "Sat", plan: "Something you enjoy", note: "A bike ride, gardening, a walk with a friend" },
  { day: "Sun", plan: "Weekly check-in", note: "How you felt, what worked, what to adjust" },
];

const coachingFaqs = [
  {
    q: "Do I need a gym?",
    a: "No. Most beginners start at home with walking and simple exercises using a chair, a wall or a resistance band. If you have a gym, your plan can use it.",
  },
  {
    q: "What if I've never exercised?",
    a: "That's okay — plans start where you are. Your coach begins with short, manageable sessions and builds up gradually.",
  },
  {
    q: "Can my coach help with medication or side effects?",
    a: "No. Coaches don't give medical advice. Medication, dosing, side effects and medical concerns always go to your clinical team.",
  },
  {
    q: "Is coaching included in the base plan?",
    a: "No. Every member gets general nutrition and movement resources. One-on-one coaching is an optional add-on.",
  },
];

export default function CoachingPage() {
  return (
    <>
      <section className="pb-16 pt-10 md:pb-24 md:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="animate-fade">
            <div className="flex flex-wrap gap-2">
              <Tag>Personal coaching</Tag>
              <Tag tone="peach">Optional add-on</Tag>
            </div>
            <h1 className="font-display mt-5 text-balance text-4xl leading-[1.1] md:text-6xl">
              Support at your pace, from someone in your corner.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              Add one-on-one coaching to your care for a plan that fits your body, your schedule and your space — plus
              regular check-ins to keep you going. Beginners very welcome.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pricing">See plans</ButtonLink>
              <ButtonLink href="/weight-loss" variant="secondary">
                Explore weight-loss care
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-sand">
            <Image
              src="/img/band-row.webp"
              alt="Woman doing a seated resistance band exercise at home"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white/60 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="What coaching includes" title="A plan made for you — and someone to check in" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coachingFeatures.map((f) => (
              <div key={f.title} className="rounded-3xl border border-line bg-cream p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Starting from zero?"
              title="An example beginner week"
              sub="Every plan is personal. Here's what a first week might look like for someone new to exercise, at home."
            />
            <p className="mt-6 leading-relaxed text-muted">
              Over time, strength work can help support muscle as you lose weight. Your coach adds it gradually — no
              heavy weights or gym required.
            </p>
          </div>
          <ol className="overflow-hidden rounded-3xl border border-line bg-white">
            {sampleWeek.map((d) => (
              <li key={d.day} className="grid grid-cols-[52px_1fr] gap-3 border-b border-line px-5 py-4 last:border-0 md:px-6">
                <span className="pt-0.5 text-sm font-semibold text-teal">{d.day}</span>
                <div>
                  <p className="font-medium">{d.plan}</p>
                  {d.note && <p className="text-sm text-muted">{d.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line bg-sand py-16 md:py-24">
        <Container className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-cream p-7">
            <Tag>Your coach helps with</Tag>
            <ul className="mt-5 space-y-3">
              {["Exercise plans and progression", "Everyday nutrition habits", "Motivation, check-ins and accountability", "Tracking habits and progress"].map((i) => (
                <CheckItem key={i}>{i}</CheckItem>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-cream p-7">
            <Tag tone="peach">Your clinical team handles</Tag>
            <ul className="mt-5 space-y-3">
              {["Medication and prescriptions", "Dosing and side effects", "Medical questions and concerns", "Changes to your treatment plan"].map((i) => (
                <CheckItem key={i}>{i}</CheckItem>
              ))}
            </ul>
          </div>
          <p className="text-muted md:col-span-2">
            Nutrition support from coaches is general habit guidance within their qualifications — not medical nutrition
            therapy.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Questions" title="About coaching" />
            <p className="mt-6 text-muted">
              {launch.pricingConfirmed && plans.coaching.price !== null
                ? `Coaching is $${plans.coaching.price}/${plans.coaching.period}, added to your medical care plan.`
                : "Coaching pricing will be published before launch."}
            </p>
          </div>
          <Faq items={coachingFaqs} />
        </Container>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[36px] bg-mist md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="font-display text-3xl md:text-4xl">Not sure you need a coach?</h2>
            <p className="mt-4 text-lg text-teal-deep/90">
              You can start with medical care and our included resources, and add coaching any time.
            </p>
            <div className="mt-6">
              <ButtonLink href="/how-it-works">How it works</ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[3/2] md:h-full">
            <Image src="/img/friends-walk.webp" alt="Two friends walking in a park" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
