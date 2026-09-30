"use client";

import Link from "next/link";
import { useState } from "react";

// Assessment PREVIEW. It intentionally collects no health information and
// sends nothing anywhere. The real assessment must run on the clinical
// partner's secure intake, not here.

type Goal = "weight-loss" | "coaching" | "men" | "women" | "hair-loss";
type Answers = {
  goal?: Goal;
  start?: "none" | "some" | "regular";
  place?: "home" | "outdoors" | "gym" | "unsure";
  support?: "medical" | "medical-coaching" | "unsure";
};

const goals: { value: Goal; label: string; hint: string; soon?: boolean }[] = [
  { value: "weight-loss", label: "Medical weight loss", hint: "Clinician-guided care, medication only if appropriate" },
  { value: "coaching", label: "Coaching without medication", hint: "Exercise, nutrition habits and accountability" },
  { value: "men", label: "Men's health", hint: "Coming soon", soon: true },
  { value: "women", label: "Menopause", hint: "Coming soon", soon: true },
  { value: "hair-loss", label: "Hair loss", hint: "Coming soon", soon: true },
];

const medicalSteps = [
  "Secure health-history questions (in the live version)",
  "Review by an authorized clinician",
  "A conversation about your individualized plan",
  "Ongoing support — plus coaching if you choose it",
];
const coachingSteps = [
  "Tell your coach about your routine, equipment and schedule",
  "Get a plan matched to your experience",
  "Regular check-ins and plan adjustments",
  "Progress tracking along the way",
];

export function Quiz({ initialProgram }: { initialProgram?: string }) {
  const [a, setA] = useState<Answers>(() => ({
    goal: goals.find((g) => g.value === initialProgram && !g.soon)?.value,
  }));
  const [i, setI] = useState(0);
  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));

  const ids = (a.goal === "coaching" ? ["goal", "start", "place", "summary"] : ["goal", "start", "place", "support", "summary"]) as readonly (
    | "goal"
    | "start"
    | "place"
    | "support"
    | "summary"
  )[];
  const step = ids[Math.min(i, ids.length - 1)];
  const canContinue = step === "goal" ? !!a.goal : step === "start" ? !!a.start : step === "place" ? !!a.place : step === "support" ? !!a.support : true;

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-5 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div
            className="h-2 overflow-hidden rounded-full bg-line"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={ids.length}
            aria-valuenow={i + 1}
            aria-label="Progress"
          >
            <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${((i + 1) / ids.length) * 100}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">
            Step {i + 1} of {ids.length}
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-center px-5 pb-36 pt-8 md:px-8 md:pt-12">
        <div key={step} className="animate-fade w-full max-w-2xl">
          {step === "goal" && (
            <Q title="What would you like help with?">
              <div className="grid gap-3" role="radiogroup" aria-label="Care type">
                {goals.map((g) => (
                  <Choice
                    key={g.value}
                    selected={a.goal === g.value}
                    disabled={g.soon}
                    onClick={() => set({ goal: g.value })}
                    label={g.label}
                    hint={g.hint}
                  />
                ))}
              </div>
            </Q>
          )}

          {step === "start" && (
            <Q title="Where are you starting from with movement?" sub="There's no wrong answer. Plans start where you are.">
              <div className="grid gap-3" role="radiogroup" aria-label="Activity level">
                <Choice selected={a.start === "none"} onClick={() => set({ start: "none" })} label="I'm not very active right now" />
                <Choice selected={a.start === "some"} onClick={() => set({ start: "some" })} label="I move a little — walks here and there" />
                <Choice selected={a.start === "regular"} onClick={() => set({ start: "regular" })} label="I'm active most weeks" />
              </div>
            </Q>
          )}

          {step === "place" && (
            <Q title="Where would you feel most comfortable moving?">
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Preferred place">
                <Choice selected={a.place === "home"} onClick={() => set({ place: "home" })} label="At home" />
                <Choice selected={a.place === "outdoors"} onClick={() => set({ place: "outdoors" })} label="Outdoors, walking" />
                <Choice selected={a.place === "gym"} onClick={() => set({ place: "gym" })} label="At a gym" />
                <Choice selected={a.place === "unsure"} onClick={() => set({ place: "unsure" })} label="Not sure yet" />
              </div>
            </Q>
          )}

          {step === "support" && (
            <Q title="How much support would you like?" sub="You can change this any time.">
              <div className="grid gap-3" role="radiogroup" aria-label="Support level">
                <Choice
                  selected={a.support === "medical"}
                  onClick={() => set({ support: "medical" })}
                  label="Medical care"
                  hint="Clinical care plus included nutrition and movement resources"
                />
                <Choice
                  selected={a.support === "medical-coaching"}
                  onClick={() => set({ support: "medical-coaching" })}
                  label="Medical care + personal coaching"
                  hint="Adds a one-on-one plan, check-ins and accountability"
                />
                <Choice selected={a.support === "unsure"} onClick={() => set({ support: "unsure" })} label="Not sure yet" />
              </div>
            </Q>
          )}

          {step === "summary" && (
            <div>
              <h1 className="font-display text-balance text-3xl leading-tight md:text-5xl">Here&apos;s what would happen next</h1>
              <p className="mt-4 text-lg text-muted">
                {a.goal === "coaching"
                  ? "Your plan would focus on personal coaching, without medication"
                  : "Your plan would focus on medical weight-loss care"}
                {a.goal !== "coaching" && a.support === "medical-coaching" ? ", with personal coaching added" : ""}
                {a.place === "home" || a.start === "none" ? " — starting with simple movement you can do at home." : "."}
              </p>
              <ol className="mt-8 space-y-3">
                {(a.goal === "coaching" ? coachingSteps : medicalSteps).map((s, n) => (
                  <li key={s} className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-soft text-sm font-semibold text-teal-deep">{n + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-8 rounded-2xl bg-coral-soft p-5 text-coral-deep">
                <p className="font-semibold">This is a preview.</p>
                <p className="mt-1">
                  We&apos;re not accepting patients yet, and nothing you selected was saved. Not everyone qualifies for
                  medication — an authorized clinician makes that decision. Personal coaching is always optional.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/#options" className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal px-6 font-semibold text-white hover:bg-teal-deep">
                  Compare your options
                </Link>
                <Link href="/portal" className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-6 font-medium hover:border-ink/50">
                  Preview the member portal
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {step !== "summary" && (
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setI((n) => Math.max(0, n - 1))}
              disabled={i === 0}
              className="min-h-12 rounded-full px-5 text-muted hover:text-ink disabled:invisible"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setI((n) => Math.min(ids.length - 1, n + 1))}
              disabled={!canContinue}
              className="min-h-12 rounded-full bg-teal px-8 font-medium text-white transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-balance text-3xl leading-tight md:text-5xl">{title}</h1>
      {sub && <p className="mt-3 text-lg text-muted">{sub}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Choice({
  selected,
  onClick,
  label,
  hint,
  disabled,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-16 items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        selected ? "border-teal bg-teal-soft" : "border-line bg-white hover:border-sky-mid"
      }`}
    >
      <span>
        <span className="text-lg font-medium">{label}</span>
        {hint && <span className="mt-0.5 block text-muted">{hint}</span>}
      </span>
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-teal bg-teal" : "border-line"}`}
        aria-hidden
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
}
