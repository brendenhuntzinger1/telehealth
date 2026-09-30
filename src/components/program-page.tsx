import { Faq } from "@/components/faq";
import { TierCards } from "@/components/tier-cards";
import { ButtonLink, Check, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { disclaimer, programs, type ProgramSlug } from "@/lib/site";

export function ProgramPage({
  slug,
  symptoms,
  faqs,
}: {
  slug: ProgramSlug;
  symptoms: string[];
  faqs?: { q: string; a: string }[];
}) {
  const p = programs[slug];
  return (
    <>
      <section className="grain relative -mt-16 overflow-hidden bg-ink pt-16 text-bone">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(212,255,79,0.10),transparent_70%)]" />
        <Container className="relative pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="animate-rise max-w-3xl">
            <Eyebrow tone="bone">{p.name}</Eyebrow>
            <h1 className="font-display mt-6 text-5xl leading-[0.98] md:text-8xl">{p.headline}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-bone/70 md:text-xl">{p.sub}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/start?program=${p.slug}`} variant="volt">
                See if you qualify
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost-bone">
                View pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Sound familiar?" title="You're not imagining it." />
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {symptoms.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/60 px-4 py-2 text-[15px]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-ink p-8 text-bone md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-bone/50">What you get</p>
            <ul className="mt-6 space-y-4">
              {p.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-lg">
                  <Check className="mt-1 text-volt" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-bone-2/50 py-24 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Treatment options"
            title="Prescribed only when it's right for you."
            sub="Your clinician recommends a treatment based on your history, goals and — when needed — labs. Medication is billed at pharmacy price, separate from membership."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {p.treatments.map((t) => (
              <div key={t.name} className="flex flex-col rounded-[24px] bg-bone p-7">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink/60">{t.detail}</p>
                <p className="mt-6 font-mono text-sm text-clay">{t.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-[11px] leading-relaxed text-ink/45">{disclaimer}</p>
        </Container>
      </section>

      <section className="py-24 md:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title="Pick your level of coaching."
            sub="Same membership price at every dose. Upgrade or downgrade anytime."
          />
          <div className="mt-16">
            <TierCards />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-24 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Good questions." />
          <Faq items={faqs} />
        </Container>
      </section>
    </>
  );
}
