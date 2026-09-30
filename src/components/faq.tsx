import { faqs } from "@/lib/site";

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium md:text-xl">
            {f.q}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-transform group-open:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink/65">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
