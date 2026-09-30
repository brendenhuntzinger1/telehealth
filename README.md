# Remade Clinic website

The marketing site, assessment preview and member-portal preview for **Remade Clinic**, a medical weight-loss and wellness clinic. Medical weight loss is the primary service. Personal coaching is an optional upgrade, or a standalone no-medication option. Men's health, menopause and hair-loss care are secondary and marked "coming soon".

Brand, launch switches, services, pricing and FAQs all live in **`src/lib/site.ts`**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/weight-loss` | Primary treatment page |
| `/other-care` | Hub for secondary services |
| `/men`, `/women`, `/hair-loss` | Secondary treatment pages, all marked "coming soon" |
| `/coaching` | Personal coaching: added to medical care or on its own |
| `/pricing` | Medical, Medical + coaching and Coaching only, each with its own cost lines |
| `/how-it-works` | Steps, roles, follow-ups, maintenance, launch status |
| `/start` | Assessment **preview**. Collects no health info and sends nothing |
| `/portal` | Member portal **preview** with sample data |
| `/legal` | Legal placeholders |

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Next.js 16, React 19, Tailwind CSS v4 and TypeScript. Vercel Web Analytics records page views only: the portal is excluded and query strings are stripped.

## Launch switches (`launch` in `src/lib/site.ts`)

- `acceptingPatients: false` shows the "preparing to open" notice.
- `assessmentLive: false` labels `/start` as a preview.
  - Set it to `true` only after `/start` hands off to secure clinical intake.
- `pricingConfirmed: false` shows "To be confirmed" in every price cell.
  - Fill in `costs` first.
- `memberPortalLive: false` keeps `/portal` as a sample-data preview.
- Other care: `treatments.men / women / hair-loss` have `status: "coming-soon"`.
  - Change a service to `"available"` only once it's confirmed.
- `coachingOnlyOffered`: shows or hides the coaching-without-medication option.

## Launch dependencies (owner must confirm; nothing here is invented on the site)

| Item | Where | Status |
|---|---|---|
| Legal entity name | `brand.legalName` | Unconfirmed. The earlier "Remade Health, LLC" was never verified and has been removed |
| Support email & phone | `brand.supportEmail/Phone` | Unconfirmed. The earlier `care@remade.health` was a placeholder on a domain we don't own |
| Founder name & coaching credentials | `brand.founder` | Unconfirmed |
| Clinical practice / partner, clinician names & credentials | `clinical` | Unconfirmed |
| States served | `clinical.statesServed` | Unconfirmed |
| Membership fees & billing frequency (3 programs) | `costs` | Unconfirmed |
| Lab costs | `costs.*.labs` | Unconfirmed |
| When patients are charged; policy if not eligible; cancellation | `billingRules` | Unconfirmed |
| Insurance (which services and plans, if any) | `billingRules.insurance` | Unconfirmed. The site says "plan on self-pay" |
| Coaching check-in schedule | `coaching.scheduleConfirmed` | Shown as an example only |
| Coaching-only offering | `coachingOnlyOffered` | Planned. Confirm before launch |
| Men's health / TRT, menopause, hair loss | `treatments` | Shown as "coming soon". TRT also needs a DEA/state prescribing plan |
| Legal documents | `/legal` | Placeholders |
| Secure intake, patient portal and messaging | `/start`, `/portal` | Previews only. Real versions must run on HIPAA-eligible systems with signed BAAs |
| Photography | `public/img` | AI-generated illustrations (Higgsfield). Captioned site-wide as models. Confirm commercial-use rights, or replace with licensed or original photos |
