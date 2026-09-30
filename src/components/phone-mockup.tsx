// A lightweight HTML "screenshot" of the member portal — no images, loads instantly.
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[300px] md:w-[330px]" aria-hidden>
      <div className="absolute -inset-10 -z-10 rounded-full bg-volt/20 blur-3xl" />
      <div className="rounded-[46px] border border-bone/15 bg-ink-2 p-2.5 shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[38px] bg-bone text-ink">
          <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-ink" />
            <span>100%</span>
          </div>
          <div className="px-5 pb-5 pt-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">Thursday · Week 6</p>
            <p className="font-display mt-1 text-[28px] leading-none">Good morning, Sam.</p>

            <div className="mt-4 rounded-2xl bg-ink p-4 text-bone">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-wider text-bone/50">Today&apos;s training</p>
                <span className="rounded-full bg-volt px-2 py-0.5 text-[10px] font-semibold text-ink">Lower A</span>
              </div>
              <p className="mt-2 text-[15px] font-medium">Goblet squat · RDL · Split squat</p>
              <div className="mt-3 flex gap-1">
                {[1, 1, 1, 0, 0].map((d, i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full ${d ? "bg-volt" : "bg-bone/15"}`} />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-bone/50">3 of 5 sessions this week · 42 min</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-white p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-ink/50">Protein</p>
                <div className="relative mx-auto mt-2 h-16 w-16">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="4" className="stroke-bone-2" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      strokeWidth="4"
                      strokeDasharray="97.4"
                      strokeDashoffset="29"
                      strokeLinecap="round"
                      className="stroke-ink"
                    />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-[13px] font-semibold">98g</span>
                </div>
                <p className="mt-1 text-center text-[10px] text-ink/50">of 140g target</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-3.5">
                <p className="text-[10px] uppercase tracking-wider text-ink/50">Weight</p>
                <p className="mt-1 text-xl font-semibold">
                  −14.2<span className="text-xs font-normal text-ink/50"> lb</span>
                </p>
                <svg viewBox="0 0 100 40" className="mt-1 h-10 w-full">
                  <polyline
                    points="0,6 14,9 28,12 42,16 56,19 70,25 84,28 100,33"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-clay"
                  />
                </svg>
                <p className="text-[10px] text-ink/50">Lean mass: held</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-volt">
                CB
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold">Coach · 8:02am</p>
                <p className="truncate text-[12px] text-ink/60">Great squat depth on your video. Add 5 lb next week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
