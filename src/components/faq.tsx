import { faqs } from "@/lib/site";

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold sm:text-xl">
            {f.q}
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-teal text-teal transition-transform group-open:rotate-45">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-lg leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
