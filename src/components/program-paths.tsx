import Image from "next/image";
import Link from "next/link";
import { coachingOnlyOffered } from "@/lib/site";
import { CheckItem, Icon, Pill } from "./ui";

export function ProgramPaths() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
      {/* Primary path: medical weight loss */}
      <article className="overflow-hidden rounded-[32px] bg-teal text-white">
        <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-9">
            <Pill tone="sky">Most people start here</Pill>
            <h3 className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">Medical weight loss</h3>
            <p className="mt-3 text-lg text-white/85">Clinician-guided care, with medication only when it&apos;s appropriate for you.</p>
            <ul className="mt-6 space-y-3 text-[17px]">
              <CheckItem tone="light">Evaluation by an authorized clinician</CheckItem>
              <CheckItem tone="light">Treatment when appropriate, such as a GLP-1</CheckItem>
              <CheckItem tone="light">Follow-up care with your clinical team</CheckItem>
              <CheckItem tone="light">Nutrition and movement resources</CheckItem>
            </ul>
            <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-[15px] text-white/90">
              <strong className="text-white">Cost at a glance:</strong> monthly membership, plus medication if prescribed
              (billed separately). <Link href="/pricing" className="underline underline-offset-2">See the breakdown</Link>
            </p>
          </div>
          <div className="relative min-h-56 sm:min-h-full">
            <Image
              src="/img/sheetpan-dinner.webp"
              alt="Man preparing a sheet-pan dinner at home"
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/15 bg-teal-deep p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coral text-teal-deep">
              <Icon name="person" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Optional upgrade: add personal coaching</p>
              <p className="text-white/80">A one-on-one coach for movement, habits and accountability.</p>
            </div>
          </div>
          <Link
            href="/weight-loss"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 font-semibold text-teal-deep hover:bg-sky"
          >
            Explore medical weight loss
          </Link>
        </div>
      </article>

      {/* Secondary path: coaching without medication */}
      {coachingOnlyOffered && (
        <article className="flex flex-col overflow-hidden rounded-[32px] bg-shell">
          <div className="relative aspect-[16/10]">
            <Image
              src="/img/living-room-squat.webp"
              alt="Woman doing a bodyweight squat in her living room"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <Pill tone="coral">No medication</Pill>
            <h3 className="font-display mt-4 text-2xl font-extrabold sm:text-3xl">Coaching without medication</h3>
            <p className="mt-3 text-muted">For people who want structure and accountability without medical treatment.</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              <CheckItem>Exercise plans for home or gym</CheckItem>
              <CheckItem>Nutrition habit support</CheckItem>
              <CheckItem>Check-ins and accountability</CheckItem>
            </ul>
            <Link
              href="/coaching"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-teal px-6 font-semibold text-teal hover:bg-teal-soft"
            >
              Explore coaching
            </Link>
          </div>
        </article>
      )}
    </div>
  );
}
