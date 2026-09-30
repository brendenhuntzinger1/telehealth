"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { brand } from "@/lib/site";
import { initialMessages, lessons, meals, member, strength, weights, workouts } from "./data";

const tabs = [
  { id: "today", label: "Today", icon: "M3 10.5L10 4l7 6.5V17H3z" },
  { id: "training", label: "Training", icon: "M2 10h2M16 10h2M4 7v6M16 7v6M6 5v10M14 5v10M6 10h8" },
  { id: "nutrition", label: "Nutrition", icon: "M10 3c3 0 6 3 6 7s-3 7-6 7-6-3-6-7 3-7 6-7zM10 3v4" },
  { id: "progress", label: "Progress", icon: "M3 16l4-5 3 3 7-9" },
  { id: "checkin", label: "Check-in", icon: "M4 4h12v12H4zM7 10l2 2 4-4" },
  { id: "coach", label: "Coach", icon: "M3 5h14v9H8l-4 3v-3H3z" },
  { id: "learn", label: "Learn", icon: "M3 5l7-2 7 2v10l-7 2-7-2zM10 3v14" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function Portal() {
  const [tab, setTab] = useState<Tab>("today");
  return (
    <div className="min-h-dvh bg-bone md:grid md:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-bone-2/40 p-5 md:flex">
        <Logo />
        <nav className="mt-10 space-y-1" aria-label="Portal">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                tab === t.id ? "bg-ink text-bone" : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              <Icon d={t.icon} />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-ink p-4 text-bone">
          <p className="text-xs text-bone/50">{member.tier} member</p>
          <p className="mt-1 text-sm font-medium">{member.program}</p>
          <Link href="/pricing" className="mt-3 inline-block text-xs text-volt">
            Upgrade to Elite →
          </Link>
        </div>
      </aside>

      <div className="pb-28 md:pb-0">
        <header className="flex items-center justify-between border-b border-line px-5 py-4 md:px-10">
          <div className="md:hidden">
            <Logo />
          </div>
          <p className="hidden text-sm text-ink/50 md:block">
            Week {member.week} · {member.program}
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-volt/30 px-3 py-1 text-xs font-medium">Demo data</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-bone">S</span>
          </div>
        </header>

        <main key={tab} className="animate-rise mx-auto max-w-5xl px-5 py-8 md:px-10 md:py-12">
          {tab === "today" && <Today go={setTab} />}
          {tab === "training" && <Training />}
          {tab === "nutrition" && <Nutrition />}
          {tab === "progress" && <Progress />}
          {tab === "checkin" && <CheckIn />}
          {tab === "coach" && <Coach />}
          {tab === "learn" && <Learn />}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-7 border-t border-line bg-bone/95 px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-xl md:hidden"
        aria-label="Portal"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] ${tab === t.id ? "text-ink" : "text-ink/40"}`}
          >
            <Icon d={t.icon} />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function H({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{eyebrow}</p>}
      <h1 className="font-display mt-2 text-4xl md:text-5xl">{title}</h1>
    </div>
  );
}

function Card({ children, className = "", dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={`rounded-[24px] p-6 ${dark ? "bg-ink text-bone" : "border border-line bg-white/70"} ${className}`}>
      {children}
    </div>
  );
}

function Today({ go }: { go: (t: Tab) => void }) {
  const lost = Math.round((member.startWeight - weights[weights.length - 1]) * 10) / 10;
  const pct = Math.round((lost / (member.startWeight - member.goalWeight)) * 100);
  const w = workouts[0];
  return (
    <>
      <H eyebrow={`Week ${member.week} · Thursday`} title={`Good morning, ${member.name}.`} />
      <div className="grid gap-4 md:grid-cols-3">
        <Card dark className="md:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-bone/50">Today&apos;s training</p>
            <span className="rounded-full bg-volt px-2.5 py-0.5 text-xs font-semibold text-ink">{w.name}</span>
          </div>
          <p className="font-display mt-4 text-3xl">{w.focus}</p>
          <p className="mt-2 text-bone/60">
            {w.exercises.length} exercises · {w.minutes} min
          </p>
          <button
            type="button"
            onClick={() => go("training")}
            className="mt-6 rounded-full bg-volt px-5 py-2.5 text-sm font-medium text-ink hover:bg-volt-dim"
          >
            Start workout →
          </button>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Goal progress</p>
          <p className="font-display mt-3 text-5xl">−{lost} lb</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-bone-2">
            <div className="h-full rounded-full bg-clay" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink/50">{pct}% of the way to {member.goalWeight} lb</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Protein today</p>
          <p className="font-display mt-3 text-5xl">
            98<span className="text-2xl text-ink/40">/{member.proteinTarget}g</span>
          </p>
          <button type="button" onClick={() => go("nutrition")} className="mt-3 text-sm underline underline-offset-4">
            See meal plan
          </button>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Medication</p>
          <p className="mt-3 text-xl font-semibold">{member.medication.name}</p>
          <p className="mt-1 text-sm text-ink/55">Next dose: {member.medication.nextDose}</p>
          <p className="mt-3 text-xs text-ink/45">Dosing questions go to your clinician, not your coach.</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Weekly check-in</p>
          <p className="mt-3 text-xl font-semibold">Due today</p>
          <button
            type="button"
            onClick={() => go("checkin")}
            className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone"
          >
            Check in (5 min)
          </button>
        </Card>
      </div>
      <Card className="mt-4 flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-volt">CB</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{brand.coach.name}</p>
          <p className="truncate text-ink/60">{initialMessages[initialMessages.length - 1].text}</p>
        </div>
        <button type="button" onClick={() => go("coach")} className="shrink-0 text-sm underline underline-offset-4">
          Reply
        </button>
      </Card>
    </>
  );
}

function Training() {
  const [active, setActive] = useState(workouts[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const w = workouts.find((x) => x.id === active)!;
  return (
    <>
      <H eyebrow="Your program · Block 2 of 4" title="Training" />
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {workouts.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            className={`shrink-0 rounded-2xl border px-5 py-3 text-left transition-colors ${
              active === x.id ? "border-ink bg-ink text-bone" : "border-line bg-white/70"
            }`}
          >
            <span className="block text-xs opacity-60">{x.day}</span>
            <span className="font-medium">{x.name}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-ink/60">
        {w.focus} · {w.minutes} min · Coach note: dose week — stop 2 reps shy of failure.
      </p>
      <ol className="mt-6 space-y-3">
        {w.exercises.map((e, n) => {
          const key = `${w.id}-${n}`;
          return (
            <li key={key} className={`rounded-[20px] border p-5 transition-colors ${done[key] ? "border-clay/40 bg-clay/5" : "border-line bg-white/70"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-clay">0{n + 1}</p>
                  <p className="mt-1 text-lg font-semibold">{e.name}</p>
                  <p className="text-ink/60">
                    {e.sets} sets × {e.reps} · rest {e.rest}
                  </p>
                  <p className="mt-2 text-sm text-ink/50">Cue: {e.cue}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDone((d) => ({ ...d, [key]: !d[key] }))}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${done[key] ? "bg-clay text-bone" : "bg-ink text-bone"}`}
                >
                  {done[key] ? "Done ✓" : "Log"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <Card className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Form check</p>
          <p className="text-sm text-ink/60">Film a set and send it to your coach for feedback (Elite).</p>
        </div>
        <label className="cursor-pointer rounded-full border border-ink/20 px-5 py-2.5 text-center text-sm hover:border-ink/50">
          Upload video
          <input type="file" accept="video/*" className="sr-only" />
        </label>
      </Card>
    </>
  );
}

function Nutrition() {
  const protein = meals.reduce((s, m) => s + m.protein, 0);
  const kcal = meals.reduce((s, m) => s + m.kcal, 0);
  return (
    <>
      <H eyebrow="Built for a smaller appetite" title="Nutrition" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Card dark>
          <p className="text-xs uppercase tracking-wider text-bone/50">Protein target</p>
          <p className="font-display mt-2 text-5xl text-volt">{member.proteinTarget}g</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Plan total</p>
          <p className="font-display mt-2 text-5xl">{protein}g</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-ink/50">Calories</p>
          <p className="font-display mt-2 text-5xl">{kcal}</p>
        </Card>
      </div>
      <h2 className="mt-10 text-lg font-semibold">Today&apos;s meals</h2>
      <ul className="mt-4 divide-y divide-line rounded-[24px] border border-line bg-white/70">
        {meals.map((m) => (
          <li key={m.time} className="flex items-center justify-between gap-4 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink/45">{m.time}</p>
              <p className="mt-1 font-medium">{m.name}</p>
            </div>
            <div className="text-right font-mono text-sm">
              <p>{m.protein}g P</p>
              <p className="text-ink/45">{m.kcal} kcal</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-ink/55">
        Low appetite day? Swap any meal for a shake + fruit and hit protein first. Nutrition guidance is general and not
        medical advice.
      </p>
    </>
  );
}

function Progress() {
  const max = Math.max(...weights);
  const min = Math.min(...weights);
  const points = weights
    .map((v, n) => `${(n / (weights.length - 1)) * 100},${8 + ((max - v) / (max - min)) * 84}`)
    .join(" ");
  return (
    <>
      <H eyebrow="Beyond the scale" title="Progress" />
      <Card>
        <div className="flex items-baseline justify-between">
          <p className="font-semibold">Weight</p>
          <p className="text-sm text-ink/50">
            {member.startWeight} → {weights[weights.length - 1]} lb
          </p>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-4 h-48 w-full" aria-label="Weight trend">
          <polyline points={points} fill="none" strokeWidth="1.2" vectorEffect="non-scaling-stroke" className="stroke-clay" style={{ strokeWidth: 3 }} />
        </svg>
      </Card>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {strength.map((s) => (
          <Card key={s.lift}>
            <p className="text-sm text-ink/55">{s.lift}</p>
            <p className="font-display mt-2 text-4xl">
              {s.now}
              <span className="ml-1 text-base text-ink/45">{s.unit}</span>
            </p>
            <p className="mt-1 text-sm text-clay">+{s.now - s.start} lb since week 1</p>
          </Card>
        ))}
      </div>
      <PhotoCompare />
    </>
  );
}

function PhotoCompare() {
  const [before, setBefore] = useState<string>();
  const [after, setAfter] = useState<string>();
  const [pos, setPos] = useState(50);
  const pick = (prev: string | undefined, setter: (u: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (prev) URL.revokeObjectURL(prev);
    setter(URL.createObjectURL(f));
  };
  return (
    <Card className="mt-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Progress photos</p>
          <p className="text-sm text-ink/55">Private to you and your coach. In this demo, photos stay on your device.</p>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink/50">
            Week 1
            <input type="file" accept="image/*" className="sr-only" onChange={pick(before, setBefore)} />
          </label>
          <label className="cursor-pointer rounded-full bg-ink px-4 py-2 text-sm text-bone">
            This week
            <input type="file" accept="image/*" className="sr-only" onChange={pick(after, setAfter)} />
          </label>
        </div>
      </div>
      <div className="relative mt-5 aspect-[4/3] select-none overflow-hidden rounded-2xl bg-ink-3 md:aspect-[16/9]">
        {after ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={after} alt="This week" className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <Placeholder label="This week" />
        )}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <div className="absolute inset-0 bg-ink-2">
            {before ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={before} alt="Week 1" className="absolute inset-0 h-full w-full object-contain" />
            ) : (
              <Placeholder label="Week 1" />
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-volt" style={{ left: `${pos}%` }} />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-3 mx-auto w-2/3 accent-[#d4ff4f]"
          aria-label="Compare photos"
        />
      </div>
    </Card>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center text-sm text-bone/40">
      <span>{label} — upload a photo</span>
    </div>
  );
}

function CheckIn() {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="py-16 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-volt text-xl">✓</span>
        <h1 className="font-display mt-6 text-4xl">Check-in sent.</h1>
        <p className="mt-3 text-ink/60">Your coach will review it and update your plan within 24 hours.</p>
      </div>
    );
  return (
    <>
      <H eyebrow={`Week ${member.week}`} title="Weekly check-in" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Field label="Morning weight (lb)" type="number" />
        <Field label="Waist at navel (in)" type="number" />
        <Scale label="Energy" />
        <Scale label="Appetite" />
        <Scale label="Sleep quality" />
        <Scale label="Training adherence" />
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm text-ink/60">Side effects or anything your coach should know?</span>
          <textarea rows={4} className="w-full rounded-2xl border border-line bg-white px-5 py-4 outline-none focus:border-ink" />
          <span className="mt-2 block text-xs text-ink/45">
            Medical concerns (new or severe symptoms) go to your clinician. If it&apos;s an emergency, call 911.
          </span>
        </label>
        <button type="submit" className="rounded-full bg-ink py-4 font-medium text-bone md:col-span-2">
          Send check-in
        </button>
      </form>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm text-ink/60">{label}</span>
      <input type={type} step="0.1" className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink" />
    </label>
  );
}

function Scale({ label }: { label: string }) {
  const [v, setV] = useState<number>();
  return (
    <div>
      <p className="mb-2 text-sm text-ink/60">{label}</p>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setV(n)}
            className={`rounded-xl border py-3 ${v === n ? "border-ink bg-ink text-bone" : "border-line bg-white"}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function Coach() {
  const [msgs, setMsgs] = useState<{ from: string; text: string; time: string }[]>([...initialMessages]);
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), [msgs]);
  return (
    <>
      <H eyebrow="Replies within 24h · Elite same day" title={brand.coach.name} />
      <div className="rounded-[24px] border border-line bg-white/70 p-4 md:p-6">
        <div className="max-h-[50vh] space-y-3 overflow-y-auto">
          {msgs.map((m, n) => (
            <div key={n} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.from === "me" ? "bg-ink text-bone" : "bg-bone-2"}`}>
                <p>{m.text}</p>
                <p className={`mt-1 text-[11px] ${m.from === "me" ? "text-bone/45" : "text-ink/40"}`}>{m.time}</p>
              </div>
            </div>
          ))}
          <div ref={end} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setMsgs((m) => [...m, { from: "me", text, time: "Now" }]);
            setText("");
          }}
          className="mt-4 flex gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message your coach…"
            className="flex-1 rounded-full border border-line bg-white px-5 py-3 outline-none focus:border-ink"
          />
          <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-bone">
            Send
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-ink/50">
        Questions about medication, dosing or side effects? Message your clinician in the Care Team inbox.
      </p>
    </>
  );
}

function Learn() {
  const done = lessons.filter((l) => l.done).length;
  return (
    <>
      <H eyebrow={`${done} of ${lessons.length} complete`} title="Daily lessons" />
      <p className="-mt-4 mb-8 max-w-xl text-ink/60">Three-minute reads that build the habits that keep results after medication.</p>
      <ol className="space-y-3">
        {lessons.map((l) => (
          <li key={l.day} className="flex items-center gap-4 rounded-[20px] border border-line bg-white/70 p-5">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-sm ${
                l.done ? "bg-volt text-ink" : "bg-bone-2 text-ink/50"
              }`}
            >
              {l.done ? "✓" : l.day}
            </span>
            <div className="flex-1">
              <p className="font-medium">{l.title}</p>
              <p className="text-sm text-ink/50">{l.minutes} min read</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
