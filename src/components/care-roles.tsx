import { CheckItem, Icon } from "./ui";

export function CareRoles() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-[28px] bg-teal-soft p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal text-white">
            <Icon name="stethoscope" />
          </span>
          <h3 className="font-display text-xl font-extrabold text-teal-deep">Your clinical team handles</h3>
        </div>
        <ul className="mt-5 space-y-3 text-teal-deep">
          <CheckItem>Medical evaluation and eligibility</CheckItem>
          <CheckItem>Prescriptions and dosing</CheckItem>
          <CheckItem>Side effects and medical questions</CheckItem>
          <CheckItem>Decisions about continuing or stopping medication</CheckItem>
        </ul>
      </div>
      <div className="rounded-[28px] bg-coral-soft p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-teal-deep">
            <Icon name="person" />
          </span>
          <h3 className="font-display text-xl font-extrabold text-coral-deep">Your coach helps with</h3>
        </div>
        <ul className="mt-5 space-y-3 text-ink">
          <CheckItem>Exercise plans, at home or in a gym</CheckItem>
          <CheckItem>Everyday nutrition habits</CheckItem>
          <CheckItem>Check-ins, motivation and accountability</CheckItem>
          <CheckItem>Tracking progress and adjusting your plan</CheckItem>
        </ul>
        <p className="mt-5 text-sm text-muted">Coaches aren&apos;t dietitians or clinicians and don&apos;t give medical advice.</p>
      </div>
    </div>
  );
}
