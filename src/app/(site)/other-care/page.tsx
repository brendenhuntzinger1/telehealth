import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Heading, Pill, TextLink } from "@/components/ui";
import { otherCare } from "@/lib/site";

export const metadata: Metadata = {
  title: "Other care",
  description: "Men's health and testosterone, menopause and hair-loss care at Remade Clinic.",
};

export default function OtherCarePage() {
  return (
    <>
      <section className="pb-12 pt-10 sm:pt-16">
        <Container>
          <Pill tone="sky">Other care</Pill>
          <Heading as="h1" className="mt-5 max-w-3xl text-ink">
            More ways we plan to help
          </Heading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Medical weight loss is our main focus. We&apos;re also preparing care for a few related needs — each led by a
            clinician. These services aren&apos;t available yet.
          </p>
        </Container>
      </section>
      <section className="pb-16 sm:pb-24">
        <Container className="grid gap-5 md:grid-cols-3">
          {otherCare.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="group overflow-hidden rounded-[28px] bg-white ring-1 ring-line hover:ring-teal">
              <div className="relative aspect-[4/3] bg-shell">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <Pill tone={c.status === "coming-soon" ? "coral" : "teal"}>{c.status === "coming-soon" ? "Coming soon" : "Available"}</Pill>
                <h2 className="font-display mt-4 text-2xl font-bold group-hover:text-teal">{c.name}</h2>
                <p className="mt-2 leading-relaxed text-muted">{c.summary}</p>
              </div>
            </Link>
          ))}
        </Container>
        <Container>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[28px] bg-sky p-7 sm:flex-row sm:items-center">
            <p className="font-display text-xl font-bold text-ink">Looking for weight-loss care?</p>
            <TextLink href="/weight-loss">Explore medical weight loss</TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
