"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { costRows } from "@/components/pricing-table";
import { Icon } from "@/components/ui";
import { billingRules, goals, launch, treatmentCosts, type GoalId } from "@/lib/site";
import { buildPlan, questions, trackFor, type Answers, type Question } from "./plan-logic";

// Plan builder. Runs entirely in the browser: answers are never saved or sent.

export function Quiz({ initialGoal }: { initialGoal?: string }) {
  const startGoal = goals.find((g) => g.id === initialGoal)?.id;
  const [goal, setGoal] = useState<GoalId | undefined>(startGoal);
  const [answers, setAnswers] = useState<Answers>({});
  // step 0 = goal picker; 1..n = questions; n+1 = plan
  const [step, setStep] = useState(startGoal ? 1 : 0);

  const track = trackFor(goal);
  const qs = questions[track];
  const total = qs.length + 1;
  const onPlan = step > qs.length;
  const q: Question | undefined = step >= 1 && !onPlan ? qs[step - 1] : undefined;

  const set = (id: string, v: Answers[string]) => setAnswers((prev) => ({ ...prev, [id]: v }));

  const canContinue = (() => {
    if (step === 0) return !!goal;
    if (!q) return true;
    if (q.kind === "single") return !!answers[q.id];
    if (q.kind === "multi") return ((answers[q.id] as string[]) ?? []).length > 0;
    if (q.kind === "body") return Number(answers.ft) > 0 && Number(answers.lb) > 0;
    return true;
  })();

  const next = () => {
    if (q?.kind === "body" && goal !== "unsure" && !answers.goalLb && Number(answers.lb) > 0) {
      const lb = Number(answers.lb);
      const drops: Partial<Record<GoalId, number>> = { "lose-20": 15, "lose-50": 35, "lose-50plus": 60, recomp: 10 };
      const drop = (goal && drops[goal]) ?? 15;
      set("goalLb", Math.max(100, lb - drop));
    }
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0 });
  };

  const plan = useMemo(() => (onPlan && goal ? buildPlan(goal, answers) : null), [onPlan, goal, answers]);

  return (
    <div className="flex flex-1 flex-col">
      {!onPlan && (
        <div className="px-5 sm:px-8 print:hidden">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>{step === 0 ? "Your goal" : `Question ${step} of ${qs.length}`}</span>
              <span>{Math.round((step / total) * 100)}%</span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={step}
            >
              <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${Math.max(4, (step / total) * 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-1 justify-center px-5 pt-8 sm:px-8 sm:pt-12 ${onPlan ? "pb-16" : "pb-36"}`}>
        <div key={`${step}-${goal}`} className={`animate-fade w-full ${onPlan ? "max-w-5xl" : "max-w-2xl"}`}>
          {step === 0 && (
            <Q title="What's your goal?" sub="Pick the one that matters most right now. We'll build a plan around it.">
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Goal">
                {goals.map((g) => (
                  <Choice
                    key={g.id}
                    selected={goal === g.id}
                    label={g.label}
                    hint={g.hint}
                    onClick={() => {
                      if (goal !== g.id) setAnswers({});
                      setGoal(g.id);
                    }}
                  />
                ))}
              </div>
              <p className="mt-6 flex items-start gap-2 text-sm text-muted">
                <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                Your answers stay on this device — nothing is saved or sent. Medical details are collected later in secure
                intake.
              </p>
            </Q>
          )}

          {q && (
            <Q title={q.title} sub={q.sub}>
              {q.kind === "single" && (
                <div className={`grid gap-3 ${q.options.length > 4 ? "sm:grid-cols-2" : ""}`} role="radiogroup" aria-label={q.title}>
                  {q.options.map((o) => (
                    <Choice key={o.value} selected={answers[q.id] === o.value} label={o.label} hint={o.hint} onClick={() => set(q.id, o.value)} />
                  ))}
                </div>
              )}
              {q.kind === "multi" && (
                <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label={q.title}>
                  {q.options.map((o) => {
                    const cur = (answers[q.id] as string[]) ?? [];
                    const on = cur.includes(o.value);
                    return (
                      <Choice
                        key={o.value}
                        multi
                        selected={on}
                        label={o.label}
                        onClick={() => set(q.id, on ? cur.filter((v) => v !== o.value) : [...cur, o.value])}
                      />
                    );
                  })}
                </div>
              )}
              {q.kind === "body" && <BodyInputs answers={answers} set={set} goal={goal} />}
            </Q>
          )}

          {plan && goal && (
            <PlanView
              plan={plan}
              goalLabel={goals.find((g) => g.id === goal)?.label ?? ""}
              onEdit={() => setStep(qs.length)}
              onRestart={() => {
                setGoal(undefined);
                setAnswers({});
                setStep(0);
              }}
            />
          )}
        </div>
      </div>

      {!onPlan && (
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur sm:px-8 print:hidden">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
            <button type="button" onClick={back} disabled={step === 0} className="min-h-12 rounded-full px-5 font-semibold text-muted hover:text-ink disabled:invisible">
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="min-h-12 rounded-full bg-teal px-8 font-semibold text-white transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === qs.length ? "See my plan" : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BodyInputs({ answers, set, goal }: { answers: Answers; set: (id: string, v: Answers[string]) => void; goal?: GoalId }) {
  const ft = Number(answers.ft ?? 0);
  const inch = Number(answers.in ?? 0);
  const lb = Number(answers.lb ?? 0);
  const h = ft * 12 + inch;
  const bmi = h > 0 && lb > 0 ? Math.round((lb / (h * h)) * 703 * 10) / 10 : null;
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <Num label="Feet" value={answers.ft as number} onChange={(v) => set("ft", v)} />
        <Num label="Inches" value={answers.in as number} onChange={(v) => set("in", v)} />
        <Num label="Pounds" value={answers.lb as number} onChange={(v) => set("lb", v)} />
      </div>
      {goal !== "unsure" && (
        <div className="mt-4">
          <Num label="Goal weight (lb, optional)" value={answers.goalLb as number} onChange={(v) => set("goalLb", v)} wide />
        </div>
      )}
      {bmi && (
        <p className="mt-5 rounded-2xl bg-sky px-5 py-4 text-sky-deep">
          BMI <strong className="font-display text-xl">{bmi}</strong> · for reference only. A clinician looks at your full
          health picture, not just BMI.
        </p>
      )}
    </div>
  );
}

function PlanView({
  plan,
  goalLabel,
  onEdit,
  onRestart,
}: {
  plan: ReturnType<typeof buildPlan>;
  goalLabel: string;
  onEdit: () => void;
  onRestart: () => void;
}) {
  const liveIntake = launch.assessmentLive && launch.intakeUrl;
  const tc = plan.treatment ? treatmentCosts[plan.treatment] : null;
  const rows = plan.program.programId
    ? costRows(plan.program.programId)
    : tc
      ? [
          { label: "Membership fee", value: launch.pricingConfirmed && tc.membership !== null ? `$${tc.membership} / month` : "To be confirmed", pending: !(launch.pricingConfirmed && tc.membership !== null) },
          { label: "Medication", value: tc.medication },
          { label: "Lab work", value: tc.labs },
          { label: "Personal coaching", value: plan.program.coaching ? "Added — price to be confirmed" : "Optional add-on" },
          { label: "Insurance", value: billingRules.insurance ?? "Not yet confirmed — plan on self-pay", pending: !billingRules.insurance },
        ]
      : null;
  return (
    <div>
      <div className="rounded-[32px] bg-teal p-7 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-sky-mid">Goal · {goalLabel}</p>
        <h1 className="font-display mt-3 text-balance text-4xl font-extrabold sm:text-5xl">{plan.title}</h1>
        <p className="mt-4 text-lg text-white/85">
          Recommended program: <strong className="text-white">{plan.program.name}</strong>
        </p>
        {plan.targets.length > 0 && (
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {plan.targets.slice(0, 3).map((t) => (
              <div key={t.label} className="rounded-2xl bg-white/10 p-4">
                <dt className="text-sm text-white/80">{t.label}</dt>
                <dd className="font-display mt-1 text-2xl font-extrabold">{t.value}</dd>
                {t.note && <p className="mt-1 text-xs text-white/75">{t.note}</p>}
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {plan.week.length > 0 && (
            <section className="rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-8">
              <h2 className="font-display text-2xl font-extrabold">Your starting week</h2>
              <p className="mt-1 text-muted">A starting point — your coach or plan adjusts as you go. Stop if anything hurts.</p>
              <ol className="mt-5 divide-y divide-line">
                {plan.week.map((d) => (
                  <li key={d.day} className="grid grid-cols-[48px_1fr] gap-3 py-3">
                    <span className="font-display font-bold text-teal">{d.day}</span>
                    <div>
                      <p className="font-semibold">{d.plan}</p>
                      {d.detail && <p className="text-sm text-muted">{d.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
              {plan.focus.map((f) => (
                <p key={f} className="mt-4 rounded-2xl bg-teal-soft px-4 py-3 text-teal-deep">
                  {f}
                </p>
              ))}
            </section>
          )}
          <section className="rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">{plan.week.length ? "Food & habits to focus on" : "Everyday tips"}</h2>
            <ul className="mt-4 space-y-3">
              {plan.nutrition.map((n) => (
                <li key={n} className="flex gap-3">
                  <Icon name="leaf" className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">General guidance, not medical nutrition therapy.</p>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] bg-coral-soft p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">Next steps</h2>
            <ol className="mt-4 space-y-3">
              {plan.nextSteps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-display grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm font-extrabold text-coral-deep">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            {plan.program.medical && (
              <p className="mt-4 text-sm text-muted">Not everyone qualifies for medication. An authorized clinician decides what&apos;s appropriate.</p>
            )}
          </section>

          <section className="rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">Your costs</h2>
            <dl className="mt-4 divide-y divide-line">
              {(rows ?? [
                { label: "Membership fee", value: "To be confirmed", pending: true },
                { label: "Medication", value: "Billed separately, if prescribed" },
                { label: "Lab work", value: "If ordered — cost to be confirmed" },
                { label: "Personal coaching", value: plan.program.coaching ? "Included" : "Optional add-on" },
              ]).map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-2.5 text-sm">
                  <dt className="font-semibold text-muted">{r.label}</dt>
                  <dd className={`text-right ${"pending" in r && r.pending ? "italic text-muted" : "font-semibold"}`}>{r.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/pricing" className="mt-3 inline-flex min-h-11 items-center font-semibold text-teal underline-offset-4 hover:underline print:hidden">
              See full pricing
            </Link>
          </section>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] bg-sky p-6 sm:p-8 print:hidden">
        {liveIntake ? (
          <a href={launch.intakeUrl!} className="inline-flex min-h-12 items-center rounded-full bg-teal px-7 font-semibold text-white hover:bg-teal-deep">
            Continue to secure intake
          </a>
        ) : (
          <p className="text-ink">
            <strong>We&apos;re not accepting patients yet.</strong> Your plan isn&apos;t saved — print it or save it as a PDF
            to keep it. Secure medical intake opens when we launch.
          </p>
        )}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => window.print()} className="min-h-12 rounded-full bg-teal px-7 font-semibold text-white hover:bg-teal-deep">
            Print or save my plan
          </button>
          <button type="button" onClick={onEdit} className="min-h-12 rounded-full border-2 border-teal px-7 font-semibold text-teal hover:bg-teal-soft">
            Change my answers
          </button>
          <button type="button" onClick={onRestart} className="min-h-12 rounded-full px-5 font-semibold text-muted hover:text-ink">
            Start over
          </button>
        </div>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted">
        This plan is general guidance based on your answers, not a medical diagnosis or prescription. Treatment decisions are
        made by an authorized clinician after secure intake. Individual results vary.
      </p>
    </div>
  );
}

function Q({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-balance text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
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
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`flex min-h-16 items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors ${
        selected ? "border-teal bg-teal-soft" : "border-line bg-white hover:border-sky-mid"
      }`}
    >
      <span>
        <span className="text-lg font-semibold">{label}</span>
        {hint && <span className="mt-0.5 block text-muted">{hint}</span>}
      </span>
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center border-2 ${multi ? "rounded-md" : "rounded-full"} ${
          selected ? "border-teal bg-teal text-white" : "border-line"
        }`}
        aria-hidden
      >
        {selected && (multi ? <span className="text-xs">✓</span> : <span className="h-2 w-2 rounded-full bg-white" />)}
      </span>
    </button>
  );
}

function Num({ label, value, onChange, wide }: { label: string; value?: number; onChange: (v?: number) => void; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "max-w-xs" : ""}`}>
      <span className="mb-2 block text-sm font-semibold text-muted">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
        className="min-h-14 w-full rounded-2xl border-2 border-line bg-white px-4 text-lg outline-none focus:border-teal"
      />
    </label>
  );
}
