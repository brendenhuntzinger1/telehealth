import Link from "next/link";
import { goals } from "@/lib/site";
import { Icon } from "./ui";

// WeightWatchers-style entry point: pick a goal, jump straight into the plan builder.
export function GoalPicker() {
  const weight = goals.filter((g) => g.track === "weight");
  const other = goals.filter((g) => g.track !== "weight");
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-xl shadow-teal-deep/10 ring-1 ring-line sm:p-7">
      <p className="font-display text-xl font-extrabold sm:text-2xl">What&apos;s your goal?</p>
      <p className="mt-1 text-muted">Pick one to start building your plan.</p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {weight.map((g) => (
          <li key={g.id}>
            <Link
              href={`/start?goal=${g.id}`}
              className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border-2 border-line px-4 py-3 font-semibold transition-colors hover:border-teal hover:bg-teal-soft"
            >
              {g.label}
              <Icon name="arrow" className="h-5 w-5 shrink-0 text-teal transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm font-semibold text-muted">Or start with</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {other.map((g) => (
          <li key={g.id}>
            <Link
              href={`/start?goal=${g.id}`}
              className="inline-flex min-h-11 items-center rounded-full bg-sky px-4 text-[15px] font-semibold text-sky-deep hover:bg-sky-mid"
            >
              {g.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
