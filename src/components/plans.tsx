import { launch, plans } from "@/lib/site";
import { CheckItem, Icon, Tag } from "./ui";

function Price({ value, period }: { value: number | null; period: string }) {
  if (launch.pricingConfirmed && value !== null) {
    return (
      <p className="flex items-baseline gap-1">
        <span className="font-display text-5xl text-ink">${value}</span>
        <span className="text-muted">/{period}</span>
      </p>
    );
  }
  return <p className="font-display text-3xl text-ink">Pricing coming soon</p>;
}

export function Plans() {
  const { medical, coaching, billedSeparately } = plans;
  return (
    <div>
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        <article className="flex flex-col rounded-3xl border-2 border-teal bg-white p-7 md:p-8">
          <Tag>Base plan</Tag>
          <h3 className="mt-4 text-2xl font-semibold">{medical.name}</h3>
          <p className="mt-2 text-muted">{medical.description}</p>
          <div className="mt-6">
            <Price value={medical.price} period={medical.period} />
          </div>
          <ul className="mt-6 space-y-3 text-[17px]">
            {medical.includes.map((i) => (
              <CheckItem key={i}>{i}</CheckItem>
            ))}
          </ul>
        </article>

        <div className="flex items-center justify-center" aria-hidden>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-2xl text-teal">+</span>
        </div>

        <article className="flex flex-col rounded-3xl border border-line bg-white p-7 md:p-8">
          <Tag tone="peach">Optional add-on</Tag>
          <h3 className="mt-4 text-2xl font-semibold">{coaching.name}</h3>
          <p className="mt-2 text-muted">{coaching.description}</p>
          <div className="mt-6">
            <Price value={coaching.price} period={coaching.period} />
          </div>
          <ul className="mt-6 space-y-3 text-[17px]">
            {coaching.includes.map((i) => (
              <CheckItem key={i}>{i}</CheckItem>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-4 rounded-3xl bg-sand p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Icon name="receipt" className="text-clay" />
          <h3 className="text-lg font-semibold">Billed separately</h3>
        </div>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {billedSeparately.map((b) => (
            <div key={b.item}>
              <dt className="font-medium">{b.item}</dt>
              <dd className="mt-1 text-muted">{b.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      {!launch.pricingConfirmed && (
        <p className="mt-4 text-sm text-muted">
          We&apos;re finalizing membership and coaching prices and will publish them here before we begin accepting
          patients. No payments are being collected yet.
        </p>
      )}
    </div>
  );
}
