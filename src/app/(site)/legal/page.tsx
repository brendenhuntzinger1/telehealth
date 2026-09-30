import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { brand } from "@/lib/site";

export const metadata: Metadata = { title: "Legal" };

const sections = [
  { id: "terms", title: "Terms of Service" },
  { id: "privacy", title: "Privacy Policy" },
  { id: "hipaa", title: "Notice of Privacy Practices (HIPAA)" },
  { id: "telehealth", title: "Telehealth Informed Consent" },
];

// Placeholder — final documents must come from a healthcare attorney and your clinical partner.
export default function LegalPage() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-5xl">Legal</h1>
        <p className="mt-4 text-ink/60">
          These documents are placeholders and will be replaced with versions reviewed by counsel and {brand.name}&apos;s
          clinical partner before launch.
        </p>
        <div className="mt-12 space-y-12">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24 border-t border-line pt-8">
              <h2 className="text-2xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-ink/60">Coming soon.</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
