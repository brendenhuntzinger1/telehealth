import type { Metadata } from "next";
import { Container, Heading } from "@/components/ui";
import { brand } from "@/lib/site";

export const metadata: Metadata = { title: "Legal", robots: { index: false } };

const sections = [
  { id: "terms", title: "Terms of Service" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "hipaa", title: "Notice of Privacy Practices" },
  { id: "telehealth", title: "Telehealth Informed Consent" },
];

// Placeholders only. Final documents — including the contracting entity — come
// from counsel and the clinical practice before launch.
export default function LegalPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container className="max-w-3xl">
        <Heading as="h1" className="text-ink">
          Legal
        </Heading>
        <p className="mt-4 text-lg text-muted">
          {brand.name}&apos;s legal documents are being prepared and will be published here before we open.
        </p>
        <div className="mt-10 space-y-4">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-28 rounded-[24px] bg-white p-6 ring-1 ring-line">
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-muted">Coming before launch.</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
