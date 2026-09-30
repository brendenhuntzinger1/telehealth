"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tiers, type TierId } from "@/lib/site";

// Demo intake: answers live only in this component's state and are never sent
// anywhere. In production, submit to the clinical partner's HIPAA-compliant intake.

type Goal = "weight-loss" | "men" | "women" | "coaching";
type Answers = {
  goal?: Goal;
  meds?: "yes" | "open" | "no";
  state?: string;
  feet?: number;
  inches?: number;
  pounds?: number;
  experience?: "new" | "some" | "experienced";
  equipment?: "gym" | "home" | "none";
  days?: number;
  sex?: "female" | "male";
  age?: number;
  pregnant?: boolean;
  screen: string[];
  symptoms: string[];
  support?: TierId;
  name?: string;
  email?: string;
};

const STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " ",
  );

const SCREEN = [
  "Personal or family history of medullary thyroid cancer or MEN2",
  "History of pancreatitis",
  "Gallbladder disease",
  "Current or past eating disorder",
  "Type 1 diabetes",
  "Taking insulin or sulfonylureas",
];

const SYMPTOMS: Record<"men" | "women", string[]> = {
  men: ["Low energy", "Low libido", "Poor recovery", "Brain fog", "Loss of strength", "Poor sleep"],
  women: ["Hot flashes", "Night sweats", "Poor sleep", "Mood changes", "Brain fog", "Low libido", "Joint aches"],
};

const SECTIONS = ["Goals", "Body", "Health", "Plan"] as const;

function bmiOf(a: Answers) {
  const h = (a.feet ?? 0) * 12 + (a.inches ?? 0);
  if (!h || !a.pounds) return undefined;
  return Math.round(((a.pounds / (h * h)) * 703) * 10) / 10;
}

export function Quiz({ initialProgram, initialTier }: { initialProgram?: string; initialTier?: string }) {
  const [a, setA] = useState<Answers>(() => ({
    goal: (["weight-loss", "men", "women", "coaching"] as const).find((g) => g === initialProgram),
    support: tiers.find((t) => t.id === initialTier)?.id,
    screen: [],
    symptoms: [],
  }));
  const [i, setI] = useState(0);
  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));
  const bmi = bmiOf(a);

  const steps = useMemo(() => {
    const list: { id: string; section: (typeof SECTIONS)[number] }[] = [{ id: "goal", section: "Goals" }];
    if (a.goal === "weight-loss") list.push({ id: "meds", section: "Goals" });
    list.push({ id: "state", section: "Goals" });
    list.push({ id: "body", section: "Body" });
    list.push({ id: "training", section: "Body" });
    list.push({ id: "about", section: "Health" });
    if (a.goal === "weight-loss" && a.meds !== "no") list.push({ id: "screen", section: "Health" });
    if (a.goal === "men" || a.goal === "women") list.push({ id: "symptoms", section: "Health" });
    list.push({ id: "support", section: "Plan" });
    list.push({ id: "result", section: "Plan" });
    list.push({ id: "contact", section: "Plan" });
    list.push({ id: "done", section: "Plan" });
    return list;
  }, [a.goal, a.meds]);

  const step = steps[Math.min(i, steps.length - 1)];
  const next = () => setI((n) => Math.min(n + 1, steps.length - 1));
  const back = () => setI((n) => Math.max(n - 1, 0));
  const inSection = steps.filter((s) => s.section === step.section);
  const sectionPct = ((inSection.indexOf(step) + 1) / inSection.length) * 100;

  const canContinue = (() => {
    switch (step.id) {
      case "goal":
        return !!a.goal;
      case "meds":
        return !!a.meds;
      case "state":
        return !!a.state;
      case "body":
        return !!bmi && bmi > 10 && bmi < 90;
      case "training":
        return !!a.experience && !!a.equipment && !!a.days;
      case "about":
        return !!a.sex && !!a.age && a.age >= 18 && a.age < 110 && (a.sex === "male" || a.pregnant !== undefined);
      case "support":
        return !!a.support;
      case "contact":
        return !!a.name && /.+@.+\..+/.test(a.email ?? "");
      default:
        return true;
    }
  })();

  return (
    <div className="flex flex-1 flex-col">
      {step.id !== "done" && (
        <div className="px-5 md:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2">
            {SECTIONS.map((s) => {
              const idx = SECTIONS.indexOf(s);
              const cur = SECTIONS.indexOf(step.section);
              return (
                <div key={s}>
                  <div className="h-1 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full bg-ink transition-all duration-500"
                      style={{ width: idx < cur ? "100%" : idx === cur ? `${sectionPct}%` : "0%" }}
                    />
                  </div>
                  <p className={`mt-2 text-[11px] uppercase tracking-[0.16em] ${idx <= cur ? "text-ink" : "text-ink/35"}`}>{s}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-1 items-start justify-center px-5 pb-32 pt-10 md:px-8 md:pt-16">
        <div key={step.id} className="animate-rise w-full max-w-2xl">
          {step.id === "goal" && (
            <Q title="What brings you here?" sub="Pick the one that matters most right now. You can add more later.">
              <Options
                value={a.goal}
                onChange={(goal) => set({ goal })}
                options={[
                  { value: "weight-loss", label: "Lose weight", hint: "Medical weight loss with coaching" },
                  { value: "men", label: "Men's hormones", hint: "Energy, drive, strength" },
                  { value: "women", label: "Women's hormones", hint: "Perimenopause & menopause" },
                  { value: "coaching", label: "Coaching only", hint: "Training & nutrition, no medication" },
                ]}
              />
            </Q>
          )}

          {step.id === "meds" && (
            <Q title="Are you interested in medication?" sub="Either path gets a full plan and coaching. Medication is only prescribed if a clinician says it's right for you.">
              <Options
                value={a.meds}
                onChange={(meds) => set({ meds })}
                options={[
                  { value: "yes", label: "Yes, I'd like to explore GLP-1 medication" },
                  { value: "open", label: "I'm open to it — help me decide" },
                  { value: "no", label: "No, I want to do it without medication" },
                ]}
              />
            </Q>
          )}

          {step.id === "state" && (
            <Q title="Which state do you live in?" sub="Clinicians must be licensed where you are located.">
              <select
                value={a.state ?? ""}
                onChange={(e) => set({ state: e.target.value })}
                className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
                aria-label="State"
              >
                <option value="" disabled>
                  Select your state
                </option>
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Q>
          )}

          {step.id === "body" && (
            <Q title="Your height and weight" sub="Used by your clinician and to set your starting targets.">
              <div className="grid grid-cols-3 gap-3">
                <Num label="Feet" value={a.feet} onChange={(feet) => set({ feet })} />
                <Num label="Inches" value={a.inches} onChange={(inches) => set({ inches })} />
                <Num label="Pounds" value={a.pounds} onChange={(pounds) => set({ pounds })} />
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-ink px-6 py-5 text-bone">
                <span className="text-sm text-bone/60">Your BMI</span>
                <span className="font-display text-4xl">{bmi ?? "—"}</span>
              </div>
              <p className="mt-3 text-xs text-ink/45">BMI alone doesn&apos;t determine eligibility — a clinician reviews your full history.</p>
            </Q>
          )}

          {step.id === "training" && (
            <Q title="How do you train today?" sub="This is where your coach starts building your program.">
              <Label>Experience</Label>
              <Options
                compact
                value={a.experience}
                onChange={(experience) => set({ experience })}
                options={[
                  { value: "new", label: "New to lifting" },
                  { value: "some", label: "Some experience" },
                  { value: "experienced", label: "Experienced" },
                ]}
              />
              <Label>Where will you train?</Label>
              <Options
                compact
                value={a.equipment}
                onChange={(equipment) => set({ equipment })}
                options={[
                  { value: "gym", label: "Gym" },
                  { value: "home", label: "Home, some equipment" },
                  { value: "none", label: "No equipment" },
                ]}
              />
              <Label>Days per week you can train</Label>
              <div className="grid grid-cols-5 gap-2">
                {[2, 3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set({ days: d })}
                    className={`rounded-2xl border py-4 text-lg transition-colors ${
                      a.days === d ? "border-ink bg-ink text-bone" : "border-line bg-white hover:border-ink/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Q>
          )}

          {step.id === "about" && (
            <Q title="A little about you">
              <Label>Sex assigned at birth</Label>
              <Options
                compact
                value={a.sex}
                onChange={(sex) => set({ sex, pregnant: sex === "male" ? undefined : a.pregnant })}
                options={[
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                ]}
              />
              <Label>Age</Label>
              <Num label="Years" value={a.age} onChange={(age) => set({ age })} />
              {a.age !== undefined && a.age < 18 && <p className="mt-2 text-sm text-clay">You must be 18 or older to join.</p>}
              {a.sex === "female" && (
                <>
                  <Label>Are you pregnant, breastfeeding or planning pregnancy?</Label>
                  <Options
                    compact
                    value={a.pregnant === undefined ? undefined : a.pregnant ? "y" : "n"}
                    onChange={(v) => set({ pregnant: v === "y" })}
                    options={[
                      { value: "n", label: "No" },
                      { value: "y", label: "Yes" },
                    ]}
                  />
                </>
              )}
            </Q>
          )}

          {step.id === "screen" && (
            <Q title="Do any of these apply to you?" sub="Select all that apply. Your clinician will review your full history later.">
              <Multi
                options={SCREEN}
                value={a.screen}
                onChange={(screen) => set({ screen })}
                none="None of these"
              />
            </Q>
          )}

          {step.id === "symptoms" && (a.goal === "men" || a.goal === "women") && (
            <Q title="What are you experiencing?" sub="Select all that apply.">
              <Multi options={SYMPTOMS[a.goal]} value={a.symptoms} onChange={(symptoms) => set({ symptoms })} />
            </Q>
          )}

          {step.id === "support" && (
            <Q title="How much coaching do you want?" sub="You can change this anytime.">
              <Options
                value={a.support}
                onChange={(support) => set({ support })}
                options={tiers.map((t) => ({
                  value: t.id,
                  label: `${t.name} — $${t.price}/mo`,
                  hint: t.blurb,
                }))}
              />
            </Q>
          )}

          {step.id === "result" && <Result a={a} bmi={bmi} />}

          {step.id === "contact" && (
            <Q title="Where should we send your plan?" sub="We'll save your answers and your clinician will pick up from here.">
              <div className="space-y-3">
                <Text label="First name" value={a.name} onChange={(name) => set({ name })} autoComplete="given-name" />
                <Text label="Email" type="email" value={a.email} onChange={(email) => set({ email })} autoComplete="email" />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink/45">
                By continuing you agree to our{" "}
                <Link href="/legal#terms" className="underline">
                  Terms
                </Link>
                ,{" "}
                <Link href="/legal#privacy" className="underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/legal#telehealth" className="underline">
                  Telehealth Consent
                </Link>
                .
              </p>
            </Q>
          )}

          {step.id === "done" && (
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt text-2xl">✓</span>
              <h1 className="font-display mt-8 text-5xl md:text-6xl">You&apos;re in, {a.name}.</h1>
              <p className="mx-auto mt-5 max-w-md text-lg text-ink/60">
                Next: complete your medical history and checkout. You&apos;re only charged if a clinician approves treatment.
              </p>
              <ol className="mx-auto mt-10 max-w-md space-y-3 text-left">
                {["Finish your health history (5 min)", "Clinician review — usually 1–2 days", "Meet your coach & get your first program"].map(
                  (t, n) => (
                    <li key={t} className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4">
                      <span className="font-mono text-sm text-clay">0{n + 1}</span>
                      {t}
                    </li>
                  ),
                )}
              </ol>
              <Link
                href="/portal"
                className="mt-10 inline-flex rounded-full bg-ink px-7 py-4 font-medium text-bone transition-transform hover:scale-[1.02]"
              >
                Preview your member portal →
              </Link>
              <p className="mt-6 text-xs text-ink/40">Demo mode: no answers were saved or sent.</p>
            </div>
          )}
        </div>
      </div>

      {step.id !== "done" && (
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-bone/90 px-5 py-4 backdrop-blur-xl md:px-8">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              disabled={i === 0}
              className="rounded-full px-5 py-3 text-[15px] text-ink/70 hover:text-ink disabled:opacity-0"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-bone transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {step.id === "contact" ? "Create my plan" : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Result({ a, bmi }: { a: Answers; bmi?: number }) {
  const flagged = a.screen.filter((s) => s !== "None of these").length > 0 || a.pregnant;
  const medsPath = a.goal === "weight-loss" && a.meds !== "no";
  const bmiOk = (bmi ?? 0) >= 27;
  const tier = tiers.find((t) => t.id === a.support);

  let headline = "You're a great fit for coaching.";
  let body = "Your coach will build a strength and nutrition plan around your schedule and equipment.";
  if (medsPath && !flagged && bmiOk) {
    headline = "You may be a candidate for GLP-1 treatment.";
    body = "Based on your answers, a clinician will review your history and decide whether medication is right for you. Either way, your coach starts building your plan today.";
  } else if (medsPath && (flagged || !bmiOk)) {
    headline = "Medication may not be the right fit — but you can still get results.";
    body = "Some of your answers mean a clinician will need to take a closer look, or medication may not be appropriate. Our coaching program works with or without medication.";
  } else if (a.goal === "men" || a.goal === "women") {
    headline = "Let's get your hormones checked.";
    body = "A clinician will review your symptoms and order labs so treatment decisions are based on your results.";
  }

  const protein = a.pounds ? Math.round(Math.min(a.pounds, 250) * 0.7) : undefined;

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50">Your preliminary result</p>
      <h1 className="font-display mt-4 text-4xl leading-[1.05] md:text-6xl">{headline}</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">{body}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Training" value={`${a.days ?? 3}×/week`} sub={a.equipment === "gym" ? "Gym program" : a.equipment === "home" ? "Home program" : "Bodyweight"} />
        <Stat label="Protein target" value={protein ? `~${protein}g` : "—"} sub="per day, starting point" />
        <Stat label="Membership" value={tier ? `$${tier.price}/mo` : "—"} sub={tier?.name ?? ""} />
      </div>
      <p className="mt-5 text-xs leading-relaxed text-ink/45">
        This is not a medical decision or diagnosis. A licensed clinician makes all treatment decisions. Starting targets are
        general guidance your coach will personalize.
      </p>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-ink p-5 text-bone">
      <p className="text-[11px] uppercase tracking-wider text-bone/50">{label}</p>
      <p className="font-display mt-2 text-3xl text-volt">{value}</p>
      <p className="mt-1 text-xs text-bone/50">{sub}</p>
    </div>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-4xl leading-[1.05] md:text-5xl">{title}</h1>
      {sub && <p className="mt-4 text-lg text-ink/60">{sub}</p>}
      <div className="mt-9">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 mt-7 text-sm font-medium text-ink/70 first:mt-0">{children}</p>;
}

function Options<T extends string>({
  value,
  onChange,
  options,
  compact,
}: {
  value?: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid gap-3"} role="radiogroup">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-between gap-4 rounded-2xl border text-left transition-all ${
              compact ? "px-5 py-3" : "px-6 py-5"
            } ${on ? "border-ink bg-ink text-bone" : "border-line bg-white hover:border-ink/40"}`}
          >
            <span>
              <span className={compact ? "text-[15px]" : "text-lg font-medium"}>{o.label}</span>
              {o.hint && <span className={`mt-1 block text-sm ${on ? "text-bone/60" : "text-ink/50"}`}>{o.hint}</span>}
            </span>
            {!compact && (
              <span className={`h-5 w-5 shrink-0 rounded-full border-2 ${on ? "border-volt bg-volt" : "border-line"}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Multi({
  options,
  value,
  onChange,
  none,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  none?: string;
}) {
  const toggle = (o: string) => {
    if (o === none) return onChange(value.includes(o) ? [] : [o]);
    const without = value.filter((v) => v !== none);
    onChange(without.includes(o) ? without.filter((v) => v !== o) : [...without, o]);
  };
  return (
    <div className="grid gap-2.5">
      {[...options, ...(none ? [none] : [])].map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            role="checkbox"
            aria-checked={on}
            onClick={() => toggle(o)}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
              on ? "border-ink bg-ink text-bone" : "border-line bg-white hover:border-ink/40"
            }`}
          >
            <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-xs ${on ? "border-volt bg-volt text-ink" : "border-line"}`}>
              {on && "✓"}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Num({ label, value, onChange }: { label: string; value?: number; onChange: (v?: number) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
          className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
        />
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-ink/40">{label}</span>
      </div>
    </label>
  );
}

function Text({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ink/60">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
      />
    </label>
  );
}

