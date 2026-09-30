# Halden — telehealth + coaching site

A premium site for a telehealth clinic offering medical weight loss (GLP-1), men's and women's hormone care, and **built-in fitness and nutrition coaching**. The positioning is *"Lose the fat. Keep the muscle."*

> "Halden" is a placeholder brand. To rename it, change prices or edit the coach bio, edit `src/lib/site.ts`; the whole site updates from that file.

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage: hero, the lean-mass problem, medicine + training pillars, programs, coaching features, coach, how it works, comparison, tiers, FAQ |
| `/weight-loss`, `/men`, `/women` | Program pages built from one shared template (`src/components/program-page.tsx`) |
| `/coaching` | Coaching method, sample training week, progress photos, add-ons |
| `/pricing` | Tier cards, full feature matrix, medication price list, add-ons |
| `/start` | 3-minute eligibility quiz: goal, meds yes/no, state, BMI, training, screening, tier, result |
| `/portal` | Member portal demo: Today, Training, Nutrition, Progress (photo slider), Check-in, Coach chat, Lessons |
| `/legal` | Placeholder legal pages |

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript. The brand palette lives in `src/app/globals.css` (`@theme`).

## Demo mode: read before launch

- The quiz and portal run on **demo data only**. Nothing is saved or sent anywhere.
- Before handling real patients:
  - Connect intake and checkout to your clinical partner (e.g. Beluga Health or OpenLoop).
  - Add auth and a HIPAA-compliant datastore, with signed BAAs from each vendor.
- Don't put Meta/Google ad pixels on `/start` or `/portal`.
- All prices are placeholders. Legal pages must come from a healthcare attorney.
- Marketing with member photos or stories requires separate written HIPAA authorization, plus FTC typical-results disclosures.
