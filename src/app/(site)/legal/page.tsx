import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { brand } from "@/lib/site";

export const metadata: Metadata = { title: "Legal", robots: { index: false } };

const sections = [
  { id: "terms", title: "Terms of Service" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "hipaa", title: "Notice of Privacy Practices" },
  { id: "telehealth", title: "Telehealth Informed Consent" },
];

// Placeholders only. Final documents — including the contracting entity name —
// must come from counsel and the clinical partner before launch.
export default function LegalPage() {
  return (
    <section className="py-12 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl">Legal</h1>
        <p className="mt-4 text-lg text-muted">
          {brand.name}&apos;s legal documents are being prepared and will be published here before we begin accepting
          patients.
        </p>
        <div className="mt-10 space-y-4">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24 rounded-3xl border border-line bg-white p-6">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted">Coming before launch.</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
