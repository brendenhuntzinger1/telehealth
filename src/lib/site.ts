// Central brand + offer config. Rename the brand or change prices here and the
// whole site updates.

export const brand = {
  name: "Halden",
  legalName: "Halden Health, LLC",
  tagline: "Lose fat. Keep muscle.",
  coach: {
    name: "Coach Brenden",
    title: "Founder & Head Coach",
    bio: "I built Halden because medication alone doesn't build a body you're proud of. Every member gets a plan designed around their medication, their schedule and their goals — and a coach who actually reads their check-ins.",
  },
  supportEmail: "care@halden.health",
};

export type ProgramSlug = "weight-loss" | "men" | "women";

export const programs: Record<
  ProgramSlug,
  {
    slug: ProgramSlug;
    name: string;
    short: string;
    headline: string;
    sub: string;
    treatments: { name: string; detail: string; price: string }[];
    outcomes: string[];
  }
> = {
  "weight-loss": {
    slug: "weight-loss",
    name: "Medical Weight Loss",
    short: "GLP-1 medication + a training plan built to protect muscle.",
    headline: "Weight loss that keeps the muscle.",
    sub: "Clinician-prescribed GLP-1 treatment paired with strength training, protein-first nutrition and a real coach — so the weight you lose is fat, not muscle.",
    treatments: [
      {
        name: "Oral GLP-1 pill",
        detail: "FDA-approved once-daily tablet. No needles.",
        price: "from $149/mo*",
      },
      {
        name: "Semaglutide (Wegovy®)",
        detail: "FDA-approved weekly injection, filled via manufacturer pharmacy.",
        price: "from $199/mo*",
      },
      {
        name: "Tirzepatide (Zepbound®)",
        detail: "FDA-approved weekly injection, filled via manufacturer pharmacy.",
        price: "from $299/mo*",
      },
    ],
    outcomes: [
      "Clinician visit & prescription, if appropriate",
      "Dose-aware training plan (adjusts on low-appetite weeks)",
      "Protein & macro targets to preserve lean mass",
      "Maintenance plan for when you taper off",
    ],
  },
  men: {
    slug: "men",
    name: "Men's Hormones",
    short: "Testosterone optimization with labs, a clinician and a coach.",
    headline: "Energy, drive and strength — measured, not guessed.",
    sub: "At-home or local labs, a licensed clinician reviews your results, and your training plan is built around your treatment so you actually see the difference in the gym.",
    treatments: [
      {
        name: "Comprehensive hormone labs",
        detail: "Total & free T, estradiol, CBC, PSA, lipids and more.",
        price: "$99 one-time",
      },
      {
        name: "Testosterone therapy",
        detail: "Prescribed only when labs and symptoms support it.",
        price: "pharmacy price*",
      },
      {
        name: "Ongoing monitoring",
        detail: "Follow-up labs and dose adjustments by your clinician.",
        price: "included",
      },
    ],
    outcomes: [
      "Lab-guided treatment decisions",
      "Hypertrophy-focused training blocks",
      "Body-composition tracking",
      "Recovery, sleep & nutrition coaching",
    ],
  },
  women: {
    slug: "women",
    name: "Women's Hormones",
    short: "Perimenopause & menopause care with strength-first coaching.",
    headline: "Menopause care that treats the whole you.",
    sub: "Clinicians who specialize in perimenopause and menopause, evidence-based hormone therapy when appropriate, and strength training to protect bone, muscle and metabolism.",
    treatments: [
      {
        name: "Menopause consultation",
        detail: "Symptom review and a personalized plan from a clinician.",
        price: "included",
      },
      {
        name: "Hormone therapy (HRT)",
        detail: "Estradiol, progesterone and more — prescribed when appropriate.",
        price: "pharmacy price*",
      },
      {
        name: "Non-hormonal options",
        detail: "For members who can't or prefer not to use hormones.",
        price: "pharmacy price*",
      },
    ],
    outcomes: [
      "Symptom relief plan from a clinician",
      "Strength training for bone density & muscle",
      "Protein-forward nutrition for midlife metabolism",
      "Monthly progress reviews",
    ],
  },
};

export type TierId = "essentials" | "coached" | "elite";

export const tiers: {
  id: TierId;
  name: string;
  price: number;
  blurb: string;
  featured?: boolean;
  features: string[];
}[] = [
  {
    id: "essentials",
    name: "Essentials",
    price: 99,
    blurb: "Clinical care plus a proven plan to follow on your own.",
    features: [
      "Licensed clinician visit & prescription, if appropriate",
      "Unlimited clinician messaging",
      "Member app: workout library & meal plans",
      "Weekly weight & measurement tracking",
      "Medication reminders",
    ],
  },
  {
    id: "coached",
    name: "Coached",
    price: 199,
    blurb: "A personalized plan and a coach who adjusts it every month.",
    featured: true,
    features: [
      "Everything in Essentials",
      "Custom training program built around your medication",
      "Personal macro & protein targets",
      "Monthly 1:1 video check-in with your coach",
      "Progress-photo reviews with private side-by-sides",
      "Members-only community",
    ],
  },
  {
    id: "elite",
    name: "Elite 1:1",
    price: 399,
    blurb: "Hands-on coaching for people who want the fastest, cleanest result.",
    features: [
      "Everything in Coached",
      "Weekly 1:1 video check-ins",
      "Exercise form reviews (send a video, get feedback)",
      "Quarterly lab panel",
      "Priority messaging — replies same day",
      "Custom maintenance program when you taper off medication",
    ],
  },
];

export const addOns = [
  {
    name: "12-Week Transformation Challenge",
    price: "$149 one-time",
    detail: "Structured 12-week block, weekly photo check-ins and a final review.",
  },
  {
    name: "Maintenance Membership",
    price: "$49/mo",
    detail: "For members tapering off medication: training, nutrition and monthly check-ins to keep the results.",
  },
  {
    name: "Meal-Prep Playbook",
    price: "$29 one-time",
    detail: "High-protein recipes and grocery lists designed for reduced appetite.",
  },
];

export const faqs = [
  {
    q: "Is the medication included in the membership price?",
    a: "No. Your membership covers clinical care and coaching. Medication is billed separately at the pharmacy's price — for FDA-approved GLP-1s that's typically the manufacturer's self-pay price. If you have insurance coverage, we'll help you check it.",
  },
  {
    q: "Do I have to get a prescription to join coaching?",
    a: "No. Every tier includes a clinician visit, but if you're not a candidate for medication — or don't want it — you can still join for the training, nutrition and coaching.",
  },
  {
    q: "Who prescribes my medication?",
    a: "A licensed clinician in your state, through our clinical partner. Your coach never makes medical or dosing decisions — those stay with your clinician.",
  },
  {
    q: "Why does muscle matter on GLP-1s?",
    a: "Rapid weight loss can include a meaningful amount of lean mass. Resistance training and adequate protein help preserve muscle, which supports strength, metabolism and how you look and feel at your goal weight.",
  },
  {
    q: "What happens when I stop medication?",
    a: "You'll move into a maintenance plan built by your coach: progressive training, nutrition habits and regular check-ins designed to help you hold your results.",
  },
  {
    q: "Are my progress photos private?",
    a: "Yes. Photos are visible only to you and your care team. We never use a member's photos or story in marketing without separate written permission.",
  },
];

export const disclaimer =
  "*Medication prices are set by the dispensing pharmacy and may change; shown prices are typical self-pay prices and are not included in membership. Prescriptions are issued only if a licensed clinician determines treatment is medically appropriate. Individual results vary. Wegovy® and Zepbound® are registered trademarks of their respective owners; we are not affiliated with or endorsed by them. Coaching is not medical care.";
