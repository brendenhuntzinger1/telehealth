import Image from "next/image";
import Link from "next/link";
import { CareRoles } from "@/components/care-roles";
import { Faq } from "@/components/faq";
import { PricingTable } from "@/components/pricing-table";
import { ButtonLink, CheckItem, Container, Heading, Icon, Pill, SectionIntro } from "@/components/ui";
import { assessmentCta, otherCare, steps, treatments, type Treatment } from "@/lib/site";

const careIcons = ["stethoscope", "check", "calendar", "leaf"];

export function TreatmentPage({ t }: { t: Treatment }) {
  const soon = t.status === "coming-soon";
  const related = [treatments["weight-loss"], ...otherCare].filter((o) => o.slug !== t.slug);

  return (
    <>
      <section className={soon ? "bg-shell" : ""}>
        <Container className="grid items-center gap-8 pb-14 pt-8 sm:pt-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:pb-20">
          <div className="animate-fade">
            <div className="flex flex-wrap gap-2">
              <Pill tone="sky">{t.name}</Pill>
              {soon && <Pill tone="coral">Coming soon</Pill>}
            </div>
            <Heading as="h1" className="mt-5 text-ink">
              {t.headline}
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {soon ? (
                <>
                  <ButtonLink href="/weight-loss">Explore medical weight loss</ButtonLink>
                  <ButtonLink href="/other-care" variant="secondary">
                    See other care
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href="/#options">Compare your options</ButtonLink>
                  <ButtonLink href={assessmentCta.href} variant="secondary">
                    {assessmentCta.label}
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-shell lg:aspect-[4/5]">
            <Image src={t.image} alt={t.imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className={`py-16 sm:py-24 ${soon ? "" : "bg-shell"}`}>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro eyebrow="Is this for you?" title={soon ? "Who we're building this for" : "This may be a good fit if…"} />
            <ul className="mt-8 space-y-4 text-lg">
              {t.forYou.map((f) => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </ul>
          </div>
          <div>
            <SectionIntro eyebrow={soon ? "What we're planning" : "What your care includes"} title={soon ? "Planned care" : "Your care"} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.care.map((c, i) => (
                <div key={c.title} className="rounded-[24px] bg-white p-6 ring-1 ring-line">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-soft text-teal">
                    <Icon name={careIcons[i % careIcons.length]} />
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {!soon && t.options.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Treatment options"
              title="Options your clinician may discuss"
              sub="Your clinician recommends what's appropriate for you. Not everyone qualifies for prescription treatment."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.options.map((o) => (
                <div key={o.name} className="rounded-[24px] border-t-4 border-teal bg-white p-7 ring-1 ring-line">
                  <h3 className="font-display text-xl font-bold">{o.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{o.detail}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {!soon && (
        <>
          <section className="bg-teal py-16 text-white sm:py-24">
            <Container>
              <SectionIntro tone="light" eyebrow="How it works" title="From first step to ongoing support" />
              <ol className="mt-10 grid gap-8 md:grid-cols-4">
                {steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="font-display grid h-12 w-12 place-items-center rounded-full bg-white text-lg font-extrabold text-teal-deep">
                      {i + 1}
                    </span>
                    <h3 className="font-display mt-4 text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/85">{s.body}</p>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
          <section className="py-16 sm:py-24">
            <Container>
              <SectionIntro eyebrow="Who does what" title="Clinicians for medical care. Coaches for everyday habits." />
              <div className="mt-10">
                <CareRoles />
              </div>
            </Container>
          </section>
          <section className="bg-shell py-16 sm:py-24">
            <Container>
              <SectionIntro eyebrow="Costs" title="What you'll pay for" sub="Membership, medication, labs and coaching are each listed separately." />
              <div className="mt-10">
                <PricingTable compact />
              </div>
            </Container>
          </section>
        </>
      )}

      {soon && (
        <section className="bg-sky py-14">
          <Container className="max-w-3xl text-center">
            <Heading className="text-ink">Not available yet</Heading>
            <p className="mt-4 text-lg text-ink/80">
              We&apos;re not accepting patients or payments for this service. We&apos;ll update this page once it&apos;s
              ready. In the meantime, you can explore medical weight loss.
            </p>
          </Container>
        </section>
      )}

      {t.faqs.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionIntro eyebrow="Questions" title="Common questions" />
            <Faq items={t.faqs} />
          </Container>
        </section>
      )}

      <section className="pb-16 sm:pb-24">
        <Container>
          <h2 className="font-display text-xl font-bold">More from Remade Clinic</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="group rounded-[24px] bg-white p-6 ring-1 ring-line hover:ring-teal">
                <p className="font-display text-lg font-bold group-hover:text-teal">{r.name}</p>
                <p className="mt-1 text-muted">{r.status === "coming-soon" ? "Coming soon" : r.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
