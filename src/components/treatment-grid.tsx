import Image from "next/image";
import Link from "next/link";
import { treatments, type TreatmentSlug } from "@/lib/site";

const items: { slug: TreatmentSlug; goal: string; image: string; tag: string }[] = [
  { slug: "weight-loss", goal: "lose-20", image: "/img/sheetpan-dinner.webp", tag: "Weight loss & GLP-1" },
  { slug: "men", goal: "trt", image: "/img/trt-dad.webp", tag: "Testosterone (TRT)" },
  { slug: "hair-loss", goal: "hair", image: "/img/hair-mirror.webp", tag: "Hair loss" },
  { slug: "women", goal: "menopause", image: "/img/woman-tea.webp", tag: "Menopause" },
];

export function TreatmentGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => {
        const t = treatments[it.slug];
        return (
          <article key={it.slug} className="group flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
            <Link href={`/${it.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-shell" tabIndex={-1} aria-hidden>
              <Image
                src={it.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-deep">{it.tag}</span>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-extrabold">
                <Link href={`/${it.slug}`} className="hover:text-teal">
                  {t.name}
                </Link>
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{t.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/start?goal=${it.goal}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 font-semibold text-white hover:bg-teal-deep"
                >
                  Build my plan
                </Link>
                <Link
                  href={`/${it.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full px-3 font-semibold text-teal hover:underline"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
