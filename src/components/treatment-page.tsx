import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { ButtonLink, CheckItem, Container, IconBadge, SectionHeading, Tag } from "@/components/ui";
import { assessmentCta, otherCare, steps, type Treatment } from "@/lib/site";

export function TreatmentPage({ t }: { t: Treatment }) {
  const comingSoon = t.status === "coming-soon";
  const related = otherCare.filter((o) => o.slug !== t.slug);

  return (
    <>
      <section className="pb-16 pt-10 md:pb-24 md:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="animate-fade">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{t.name}</Tag>
              {comingSoon && <Tag tone="peach">Coming soon</Tag>}
            </div>
            <h1 className="font-display mt-5 text-balance text-4xl leading-[1.1] md:text-6xl">{t.headline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{t.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {comingSoon ? (
                <>
                  <ButtonLink href="/weight-loss">Explore weight-loss care</ButtonLink>
                  <ButtonLink href="/other-care" variant="secondary">
                    See other care
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href="/how-it-works">How it works</ButtonLink>
                  <ButtonLink href={assessmentCta.href} variant="secondary">
                    {assessmentCta.label}
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-sand">
            <Image src={t.image} alt={t.imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white/60 py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Who it's for" title={comingSoon ? "Who we're building this for" : "This may be a fit if…"} />
            <ul className="mt-8 space-y-4 text-lg">
              {t.whoFor.map((w) => (
                <CheckItem key={w}>{w}</CheckItem>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={comingSoon ? "What we're planning" : "What's included"} title={comingSoon ? "Planned care" : "Your care"} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.includes.map((inc, i) => (
                <div key={inc.title} className="rounded-3xl border border-line bg-cream p-6">
                  <IconBadge name={["stethoscope", "calendar", "check", "leaf"][i % 4]} />
                  <h3 className="mt-4 text-lg font-semibold">{inc.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{inc.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {!comingSoon && t.options.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeading
              eyebrow="Treatment options"
              title="Options your clinician may discuss"
              sub="Your clinician recommends what's appropriate for you. Not everyone qualifies for prescription treatment."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {t.options.map((o) => (
                <div key={o.name} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-line">
                  <h3 className="text-lg font-semibold">{o.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{o.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">Medication and any lab work are billed separately. See <Link href="/pricing" className="text-teal-deep underline underline-offset-4">pricing</Link>.</p>
          </Container>
        </section>
      )}

      {!comingSoon && (
        <section className="border-t border-line bg-sand py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="How it works" title="Four simple steps" />
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-cream p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-sm font-semibold text-white">{i + 1}</span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-3xl bg-white p-7 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <h3 className="text-xl font-semibold">Want extra support? Add personal coaching.</h3>
                <p className="mt-2 max-w-2xl text-muted">
                  Coaching is optional. A coach helps with movement, habits and accountability — your clinical team
                  handles all medical care.
                </p>
              </div>
              <ButtonLink href="/coaching" variant="secondary" className="mt-5 shrink-0 md:mt-0">
                About coaching
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {comingSoon && (
        <section className="border-t border-line bg-sand py-16">
          <Container className="max-w-3xl text-center">
            <h2 className="font-display text-3xl">Not available yet</h2>
            <p className="mt-4 text-lg text-muted">
              We&apos;re not accepting patients or payments for hair-loss care. We&apos;ll update this page when the
              service is ready. In the meantime, you can learn about our weight-loss care.
            </p>
          </Container>
        </section>
      )}

      {t.faqs.length > 0 && (
        <section className="py-16 md:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="Questions" title="Common questions" />
            <Faq items={t.faqs} />
          </Container>
        </section>
      )}

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="text-sm font-semibold text-muted">Other care at Remade Clinic</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.slug !== "weight-loss" && (
              <Link href="/weight-loss" className="rounded-2xl border border-line bg-white p-5 hover:border-teal">
                <p className="font-semibold">Medical weight loss</p>
                <p className="mt-1 text-sm text-muted">Our primary service</p>
              </Link>
            )}
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="rounded-2xl border border-line bg-white p-5 hover:border-teal">
                <p className="font-semibold">
                  {r.name} {r.status === "coming-soon" && <span className="text-sm font-normal text-clay">· coming soon</span>}
                </p>
                <p className="mt-1 text-sm text-muted">{r.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
