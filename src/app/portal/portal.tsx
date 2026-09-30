"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/ui";
import { coachMessages, lessons, meals, member, sessions, today, weeklyWalks } from "./data";

const tabs = [
  { id: "today", label: "Today", icon: "heart" },
  { id: "move", label: "Movement", icon: "walk" },
  { id: "food", label: "Nutrition", icon: "leaf" },
  { id: "progress", label: "Progress", icon: "check" },
  { id: "messages", label: "Messages", icon: "chat" },
  { id: "learn", label: "Learn", icon: "calendar" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function Portal() {
  const [tab, setTab] = useState<Tab>("today");
  return (
    <div className="min-h-dvh bg-paper">
      <div className="bg-coral-soft px-5 py-2.5 text-center text-sm text-coral-deep">
        <strong>Portal preview with sample data.</strong> Member accounts aren&apos;t live yet. Nothing here is saved.
      </div>
      <div className="md:grid md:grid-cols-[240px_1fr]">
        <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-shell p-5 md:flex">
          <Logo />
          <nav className="mt-8 space-y-1" aria-label="Portal">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-[15px] transition-colors ${
                  tab === t.id ? "bg-teal text-white" : "text-muted hover:bg-teal-soft hover:text-ink"
                }`}
              >
                <Icon name={t.icon} className="h-5 w-5" />
                {t.label}
              </button>
            ))}
          </nav>
          <Link href="/" className="mt-auto text-sm text-muted underline underline-offset-4">
            Back to website
          </Link>
        </aside>

        <div className="pb-28 md:pb-10">
          <header className="flex items-center justify-between border-b border-line px-5 py-3 md:px-10">
            <div className="md:hidden">
              <Logo />
            </div>
            <p className="hidden text-muted md:block">
              Week {member.week} · {member.plan}
            </p>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-soft font-semibold text-teal-deep" aria-label="Sample member">
              {member.name[0]}
            </span>
          </header>
          <main key={tab} className="animate-fade mx-auto max-w-4xl px-5 py-8 md:px-10">
            {tab === "today" && <Today go={setTab} />}
            {tab === "move" && <Move />}
            {tab === "food" && <Food />}
            {tab === "progress" && <Progress />}
            {tab === "messages" && <Messages />}
            {tab === "learn" && <Learn />}
          </main>
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-line bg-paper/95 px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-1 backdrop-blur md:hidden"
        aria-label="Portal"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] ${tab === t.id ? "text-teal-deep" : "text-muted"}`}
          >
            <Icon name={t.icon} className="h-5 w-5" />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function H({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display font-extrabold text-3xl md:text-4xl">{title}</h1>
      {sub && <p className="mt-2 text-muted">{sub}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-line bg-white p-6 ${className}`}>{children}</div>;
}

function Today({ go }: { go: (t: Tab) => void }) {
  const pct = Math.round((today.walkMinutes.done / today.walkMinutes.goal) * 100);
  return (
    <>
      <H title={`Good morning, ${member.name}`} sub="Here's your plan for today. Small steps count." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-teal-soft">
          <p className="text-sm font-semibold text-teal-deep">Today&apos;s movement</p>
          <p className="mt-2 text-xl font-semibold">{today.movement.title}</p>
          <p className="mt-1 text-muted">{today.movement.detail}</p>
          <button type="button" onClick={() => go("move")} className="mt-5 min-h-11 rounded-full bg-teal px-5 font-medium text-white">
            Open session
          </button>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-muted">Walking today</p>
          <p className="mt-2 text-3xl font-semibold">
            {today.walkMinutes.done} <span className="text-lg font-normal text-muted">of {today.walkMinutes.goal} min</span>
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-teal-soft">
            <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
          </div>
        </Card>
        <Card className="md:col-span-2">
          <p className="text-sm font-semibold text-muted">Today&apos;s habits</p>
          <ul className="mt-3 divide-y divide-line">
            {today.habits.map((h) => (
              <li key={h.label} className="flex min-h-12 items-center gap-3">
                <span className={`grid h-6 w-6 place-items-center rounded-full ${h.done ? "bg-teal text-white" : "border-2 border-line"}`} aria-hidden>
                  {h.done && "✓"}
                </span>
                <span className={h.done ? "text-muted line-through" : ""}>{h.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <p className="mt-6 text-sm text-muted">
        Questions about medication or side effects? Message your care team in Messages. In an emergency, call 911.
      </p>
    </>
  );
}

function Move() {
  const [active, setActive] = useState(sessions[0].id);
  const s = sessions.find((x) => x.id === active)!;
  return (
    <>
      <H title="Movement" sub="Your coach adjusts these as you go. Stop if anything hurts." />
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {sessions.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setActive(x.id)}
            className={`min-h-11 shrink-0 rounded-full border px-4 ${active === x.id ? "border-teal bg-teal text-white" : "border-line bg-white"}`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-muted">About {s.minutes} minutes</p>
      <ol className="mt-4 space-y-3">
        {s.moves.map((m) => (
          <li key={m.name} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-semibold">{m.name}</p>
              <p className="shrink-0 text-teal-deep">{m.amount}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{m.tip}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Food() {
  return (
    <>
      <H title="Nutrition" sub="Simple, filling meals. Include some protein each time you eat." />
      <ul className="divide-y divide-line rounded-3xl border border-line bg-white">
        {meals.map((m) => (
          <li key={m.time} className="px-6 py-4">
            <p className="text-sm font-semibold text-teal">{m.time}</p>
            <p className="mt-1">{m.name}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">General guidance, not medical nutrition therapy. Ask your clinician about any dietary restrictions.</p>
    </>
  );
}

function Progress() {
  const max = Math.max(...weeklyWalks);
  return (
    <>
      <H title="Progress" sub="Progress is more than a number. Here's how your walking has grown." />
      <Card>
        <p className="font-semibold">Average daily walk (minutes)</p>
        <div className="mt-6 flex h-40 items-end gap-2" role="img" aria-label={`Walking minutes grew from ${weeklyWalks[0]} to ${weeklyWalks[weeklyWalks.length - 1]} over ${weeklyWalks.length} weeks`}>
          {weeklyWalks.map((v, n) => (
            <div key={n} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-sky-mid" style={{ height: `${(v / max) * 100}%` }} />
              <span className="text-xs text-muted">W{n + 1}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          ["Strength sessions", "7"],
          ["Habits completed", "31"],
          ["Check-ins", "4"],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 text-3xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function Messages() {
  const [box, setBox] = useState<"coach" | "care">("coach");
  const [msgs, setMsgs] = useState<{ from: string; text: string; time: string }[]>([...coachMessages]);
  const [text, setText] = useState("");
  return (
    <>
      <H title="Messages" />
      <div className="flex gap-2">
        <button type="button" onClick={() => setBox("coach")} className={`min-h-11 rounded-full px-4 ${box === "coach" ? "bg-teal text-white" : "border border-line bg-white"}`}>
          Coach
        </button>
        <button type="button" onClick={() => setBox("care")} className={`min-h-11 rounded-full px-4 ${box === "care" ? "bg-teal text-white" : "border border-line bg-white"}`}>
          Care team
        </button>
      </div>
      {box === "care" ? (
        <Card className="mt-4">
          <p className="font-semibold">Care team messaging</p>
          <p className="mt-2 text-muted">
            In the live portal, this is where you&apos;ll message your clinical team about medication, side effects and
            medical questions, through a secure system. It isn&apos;t available in this preview.
          </p>
        </Card>
      ) : (
        <div className="mt-4 rounded-3xl border border-line bg-white p-4 md:p-6">
          <div className="space-y-3">
            {msgs.map((m, n) => (
              <div key={n} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${m.from === "me" ? "bg-teal text-white" : "bg-teal-soft"}`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-xs ${m.from === "me" ? "text-white/75" : "text-muted"}`}>{m.time}</p>
                </div>
              </div>
            ))}
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
            <label className="sr-only" htmlFor="coach-msg">
              Message your coach
            </label>
            <input
              id="coach-msg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Say hi to your coach (preview)"
              className="min-h-12 flex-1 rounded-full border border-line bg-paper px-5 outline-none focus:border-teal"
            />
            <button type="submit" className="min-h-12 rounded-full bg-teal px-5 font-medium text-white">
              Send
            </button>
          </form>
          <p className="mt-3 text-xs text-muted">Coaches don&apos;t answer medical questions. Use Care team for anything medical.</p>
        </div>
      )}
    </>
  );
}

function Learn() {
  return (
    <>
      <H title="Learn" sub="Short reads for everyday habits." />
      <ul className="space-y-3">
        {lessons.map((l) => (
          <li key={l.title} className="flex min-h-16 items-center gap-4 rounded-2xl border border-line bg-white p-5">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${l.done ? "bg-teal text-white" : "bg-teal-soft text-teal-deep"}`} aria-hidden>
              {l.done ? "✓" : "•"}
            </span>
            <div>
              <p className="font-medium">{l.title}</p>
              <p className="text-sm text-muted">{l.minutes} min read</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
