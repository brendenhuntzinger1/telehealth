import { Icon } from "./ui";

// Illustrative member dashboard. SAMPLE DATA ONLY — not connected to any system.
// In the live product, clinical messages and records must stay in the approved
// secure patient system.

const activity = [55, 70, 65, 90, 85, 110, 120, 125];

export function DashboardPreview() {
  const max = Math.max(...activity);
  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-xl shadow-teal-deep/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-shell px-5 py-3">
        <p className="font-display font-bold">Hi, Jordan</p>
        <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-bold text-coral-deep">Preview · sample data</span>
      </div>
      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
        {/* Upcoming */}
        <section className="rounded-2xl border border-line p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-muted">
            <Icon name="calendar" className="h-4 w-4" /> Upcoming
          </h4>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center justify-between gap-3 rounded-xl bg-teal-soft px-3 py-2.5">
              <span className="text-sm font-semibold text-teal-deep">Clinical follow-up</span>
              <span className="text-xs text-teal-deep">Thu · 10:00</span>
            </li>
            <li className="flex items-center justify-between gap-3 rounded-xl bg-coral-soft px-3 py-2.5">
              <span className="text-sm font-semibold text-coral-deep">Coach check-in</span>
              <span className="text-xs text-coral-deep">Sun</span>
            </li>
          </ul>
        </section>

        {/* Weekly goals */}
        <section className="rounded-2xl border border-line p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-muted">
            <Icon name="check" className="h-4 w-4" /> This week
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["Walk 20 minutes, 4 days", true],
              ["Two home strength sessions", true],
              ["Protein with breakfast", false],
            ].map(([t, d]) => (
              <li key={t as string} className="flex items-center gap-2.5">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${d ? "bg-teal text-white" : "border-2 border-line"}`}
                  aria-hidden
                >
                  {d ? "✓" : ""}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Messages — clearly separated */}
        <section className="rounded-2xl border-2 border-teal/30 p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-teal-deep">
            <Icon name="stethoscope" className="h-4 w-4" /> Care team · clinical
          </h4>
          <p className="mt-2 text-sm text-muted">Medication, side effects and medical questions.</p>
          <p className="mt-3 flex items-center gap-2 rounded-xl bg-teal-soft px-3 py-2 text-xs font-semibold text-teal-deep">
            <Icon name="shield" className="h-4 w-4" /> Opens in the secure patient system
          </p>
        </section>
        <section className="rounded-2xl border-2 border-coral/40 p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-coral-deep">
            <Icon name="person" className="h-4 w-4" /> Coach · habits & movement
          </h4>
          <p className="mt-3 rounded-xl bg-coral-soft px-3 py-2 text-sm text-ink">
            &ldquo;Great week of walks! Want to add one more strength day?&rdquo;
          </p>
        </section>

        {/* Progress */}
        <section className="rounded-2xl border border-line p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-muted">
            <Icon name="chart" className="h-4 w-4" /> Active minutes per week
          </h4>
          <div className="mt-4 flex h-24 items-end gap-1.5" role="img" aria-label="Sample chart: weekly active minutes rising over eight weeks">
            {activity.map((v, i) => (
              <div key={i} className={`flex-1 rounded-t-md ${i === activity.length - 1 ? "bg-teal" : "bg-sky-mid"}`} style={{ height: `${(v / max) * 100}%` }} />
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="rounded-2xl border border-line p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-muted">
            <Icon name="leaf" className="h-4 w-4" /> Optional for today
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-shell px-3 py-2.5">
              <span>15-min home strength</span>
              <Icon name="dumbbell" className="h-4 w-4 text-muted" />
            </li>
            <li className="flex items-center justify-between rounded-xl bg-shell px-3 py-2.5">
              <span>Sheet-pan chicken & veg</span>
              <Icon name="leaf" className="h-4 w-4 text-muted" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
