import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading, Tag } from "@/components/ui";
import { otherCare } from "@/lib/site";

export const metadata: Metadata = {
  title: "Other care",
  description: "Men's health and testosterone care, menopause care, and hair-loss care (coming soon) at Remade Clinic.",
};

export default function OtherCarePage() {
  return (
    <>
      <section className="pb-12 pt-10 md:pb-16 md:pt-16">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Other care"
            title="Care for other parts of your health"
            sub="Weight loss is our main focus. We also offer care for a few related needs, each led by an authorized clinician."
          />
        </Container>
      </section>
      <section className="pb-16 md:pb-24">
        <Container className="grid gap-5 md:grid-cols-3">
          {otherCare.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-colors hover:border-teal"
            >
              <div className="relative aspect-[4/3] bg-sand">
                <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div>{c.status === "coming-soon" ? <Tag tone="peach">Coming soon</Tag> : <Tag>Clinician-led</Tag>}</div>
                <h2 className="mt-4 text-xl font-semibold">{c.name}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{c.summary}</p>
                <span className="mt-5 font-medium text-teal-deep">
                  {c.status === "coming-soon" ? "Read more" : "Learn more"} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </Container>
        <Container>
          <div className="mt-10 rounded-3xl bg-mist p-6 md:p-8">
            <p className="text-lg font-semibold text-teal-deep">Looking for weight-loss care?</p>
            <p className="mt-2 text-teal-deep/90">
              Our main service combines clinician-guided treatment with nutrition and movement support.{" "}
              <Link href="/weight-loss" className="font-medium underline underline-offset-4">
                Explore weight-loss care
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
