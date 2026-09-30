import { faqs } from "@/lib/site";

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 md:px-7 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-teal transition-transform group-open:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
