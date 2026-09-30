# Remade Clinic website

The marketing site, assessment preview and member-portal preview for **Remade Clinic**, a medical weight-loss and wellness clinic. Weight loss is the primary service. Coaching is an optional add-on. Men's health, menopause and hair-loss care (coming soon) are secondary services.

Brand, launch switches, services, pricing and FAQs all live in **`src/lib/site.ts`**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/weight-loss` | Primary treatment page |
| `/other-care` | Hub for secondary services |
| `/men`, `/women`, `/hair-loss` | Treatment pages; hair loss is marked "coming soon" |
| `/coaching` | Optional personal coaching |
| `/pricing` | Base medical plan, optional coaching add-on, and what's billed separately |
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

- `acceptingPatients: false` shows the "preparing to launch" banner.
- `assessmentLive: false` labels `/start` as a preview.
  - Set it to `true` only after `/start` hands off to the clinical partner's secure intake.
- `pricingConfirmed: false` shows "Pricing coming soon".
  - Set real prices in `plans` before flipping it.

## Before launch: details the owner must confirm

These are intentionally **not** filled in on the site.

- **Legal entity name** (`brand.legalName`). The earlier "Remade Health, LLC" was never confirmed, so the footer shows the brand name only.
- **Support email and phone** (`brand.supportEmail`, `brand.supportPhone`). The earlier `care@remade.health` was a placeholder on a domain we don't own.
- **Founder name and credentials** (`brand.founder.name`).
- **Clinical partner** (e.g. Beluga Health or OpenLoop), plus clinician names and credentials to publish.
- **States served**, and for men's health, how testosterone (a controlled substance) will be prescribed under current DEA and state rules.
- **Prices**:
  - Membership and coaching prices.
  - Whether labs are included.
  - Cancellation and refund terms.
  - Messaging and response-time commitments.
  - The earlier $99 / $199 / $399 tiers are unconfirmed and no longer shown.
- **Hair-loss care**: still "coming soon". No patients or payments are accepted.
- **Legal documents**: Terms, Privacy Policy, Notice of Privacy Practices and Telehealth Consent, from counsel.
- **Secure systems**:
  - Real intake and member accounts must run on HIPAA-eligible systems with signed BAAs, for example the partner's platform, Healthie, or Supabase on a HIPAA plan.
  - Don't add health questions to site forms or marketing tools.
- **Photography**: current images are AI-generated illustrations (Higgsfield). The footer says they show models, not patients, clinicians or coaches. Confirm your Higgsfield plan's commercial-use terms, or replace them with licensed or original photos.
