// Remade Clinic — brand, launch status, offers and copy that depends on business rules.
//
// RULE: every `null` below is an UNCONFIRMED business detail. The UI shows
// "To be confirmed" (or hides the item) until the owner fills it in. Never
// replace a null with a guess. See README → "Launch dependencies".

export const brand = {
  name: "Remade Clinic",
  shortName: "Remade",
  domain: "remadeclinic.com",
  legalName: null as string | null, // contracting entity — confirm with counsel
  supportEmail: null as string | null, // real, monitored inbox needed
  supportPhone: null as string | null,
  founder: {
    name: null as string | null, // display name — owner to confirm
    role: "Founder & Head Coach",
    credentials: null as string | null, // e.g. coaching certifications — owner to confirm
  },
};

// Who provides medical care. Nothing here is confirmed yet.
export const clinical = {
  practiceName: null as string | null, // the clinical practice / partner that employs clinicians
  clinicians: [] as { name: string; credentials: string; role: string }[], // publish only verified people
  statesServed: null as string[] | null,
};

// Launch switches — flip only when the real thing is live.
export const launch = {
  acceptingPatients: false,
  assessmentLive: false, // true only when /start hands off to secure clinical intake
  pricingConfirmed: false,
  memberPortalLive: false,
  // Secure clinical intake URL (from the clinical partner). When set and
  // assessmentLive is true, the plan builder hands off here.
  intakeUrl: null as string | null,
};

// Billing rules. Unconfirmed → shown as "to be confirmed".
export const billingRules = {
  paymentTiming: null as string | null, // e.g. when a card is charged relative to clinician review
  ifNotEligible: null as string | null, // e.g. refund / no-charge policy
  cancellation: null as string | null,
  insurance: null as string | null, // exactly which services/plans, if any — never say "accepted" until confirmed
};

export const primaryCta = { label: "Build my plan", href: "/start" };
// The plan builder works today (in the browser). The secure medical intake it
// hands off to is only linked once `launch.assessmentLive` and `intakeUrl` are set.
export const assessmentCta = { label: "Build my plan", href: "/start" };

// Goals shown in the homepage picker and the first step of the plan builder.
export type GoalId = "lose-20" | "lose-50" | "lose-50plus" | "recomp" | "trt" | "hair" | "menopause" | "unsure";
export type Track = "weight" | "trt" | "hair" | "menopause";

export const goals: { id: GoalId; label: string; hint: string; track: Track }[] = [
  { id: "lose-20", label: "Lose 1–20 lbs", hint: "Build steady habits that last", track: "weight" },
  { id: "lose-50", label: "Lose 21–50 lbs", hint: "Medical support and a real plan", track: "weight" },
  { id: "lose-50plus", label: "Lose over 50 lbs", hint: "Clinician-guided, long-term care", track: "weight" },
  { id: "recomp", label: "Lose fat & build muscle", hint: "Strength-focused plan", track: "weight" },
  { id: "trt", label: "Boost energy & testosterone", hint: "Lab-based TRT care", track: "trt" },
  { id: "hair", label: "Treat thinning hair", hint: "Hair-loss treatment options", track: "hair" },
  { id: "menopause", label: "Manage menopause symptoms", hint: "Hormonal & non-hormonal care", track: "menopause" },
  { id: "unsure", label: "I'm not sure yet", hint: "We'll help you figure it out", track: "weight" },
];

export const mainNav = [
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/men", label: "TRT" },
  { href: "/hair-loss", label: "Hair Loss" },
  { href: "/women", label: "Menopause" },
  { href: "/coaching", label: "Coaching" },
  { href: "/pricing", label: "Pricing" },
];

export const secondaryNav = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/other-care", label: "All treatments" },
];

// ─── Treatments ──────────────────────────────────────────────────────────────

export type ServiceStatus = "available" | "coming-soon";
export type TreatmentSlug = "weight-loss" | "men" | "women" | "hair-loss";

export type Treatment = {
  slug: TreatmentSlug;
  name: string;
  shortName: string;
  status: ServiceStatus;
  summary: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  forYou: string[];
  care: { title: string; body: string }[];
  options: { name: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const treatments: Record<TreatmentSlug, Treatment> = {
  "weight-loss": {
    slug: "weight-loss",
    name: "Medical weight loss",
    shortName: "Weight loss",
    status: "available",
    summary: "Clinician-guided care, GLP-1 treatment when appropriate, and support for everyday habits.",
    headline: "Medical weight loss, made personal.",
    intro:
      "An authorized clinician gets to know your health and goals, then builds a plan with you — which may include GLP-1 medication when it's appropriate. Practical nutrition and movement support help the plan fit your real life.",
    image: "/img/sheetpan-dinner.webp",
    imageAlt: "Man preparing a sheet-pan dinner in his kitchen",
    forYou: [
      "You've tried to lose weight on your own and want medical support",
      "You want to know whether medication could be right for you",
      "You'd like a plan that works at your fitness level — including none",
      "You want support for keeping weight off over time",
    ],
    care: [
      { title: "Clinical evaluation", body: "An authorized clinician reviews your health history, medications and goals." },
      { title: "Treatment when appropriate", body: "Medication, such as a GLP-1, is prescribed only if it's medically appropriate for you." },
      { title: "Follow-up care", body: "Your clinical team checks on progress and side effects and adjusts your plan." },
      { title: "Supporting resources", body: "Guides for everyday eating, walking and beginner strength — included for every member." },
    ],
    options: [
      {
        name: "GLP-1 medication",
        detail: "Such as semaglutide or tirzepatide — weekly injections or, for some medications, a daily pill. Only if appropriate for you.",
      },
      { name: "Care without medication", detail: "Clinical guidance and habit support if medication isn't right for you, or you'd rather not." },
      { name: "Maintenance planning", detail: "Any decision to continue, adjust or taper medication is made with your clinician." },
    ],
    faqs: [
      {
        q: "Will I be prescribed a GLP-1?",
        a: "Not everyone qualifies. An authorized clinician decides whether medication is appropriate based on your health history, current medications and goals.",
      },
      {
        q: "What if I have side effects?",
        a: "Contact your clinical team. Medication, dosing and side-effect questions always go to clinicians — never to a coach. In an emergency, call 911.",
      },
    ],
  },
  men: {
    slug: "men",
    name: "Testosterone (TRT) & men's health",
    shortName: "TRT",
    status: "available",
    summary: "Lab-based care for low energy, low drive and other symptoms of low testosterone.",
    headline: "Testosterone care, guided by your labs.",
    intro:
      "Feeling run down, low on drive or not like yourself? An authorized clinician reviews your symptoms and lab results, and testosterone therapy is prescribed only when your labs and health history support it — with ongoing monitoring.",
    image: "/img/trt-dad.webp",
    imageAlt: "Man playing catch with his son in a sunny backyard",
    forYou: [
      "Low energy, low libido, or changes in mood or focus",
      "Harder to build or keep strength than it used to be",
      "You want answers based on lab work, not guesswork",
      "You'd like ongoing monitoring if you start treatment",
    ],
    care: [
      { title: "Symptom & history review", body: "A clinician reviews your symptoms, health history and goals." },
      { title: "Lab testing", body: "Labs are ordered to check testosterone and related markers. Lab costs will be published before we open." },
      { title: "Treatment when appropriate", body: "Testosterone therapy is prescribed only if your labs and history support it." },
      { title: "Ongoing monitoring", body: "Follow-up visits and repeat labs as your clinician directs." },
    ],
    options: [
      { name: "Testosterone therapy", detail: "Prescribed and monitored by a clinician when labs and symptoms support it." },
      { name: "Lab monitoring", detail: "Regular labs to keep treatment safe and on track." },
      { name: "Strength & lifestyle support", detail: "Training, sleep and nutrition habits — with optional personal coaching." },
    ],
    faqs: [
      {
        q: "Will I definitely get testosterone?",
        a: "No. Treatment is prescribed only when your labs, symptoms and health history support it and it's safe for you.",
      },
      {
        q: "Is testosterone available in my state?",
        a: "Testosterone is a controlled medication with specific state and federal prescribing rules. We'll confirm availability for your state during intake.",
      },
    ],
  },
  women: {
    slug: "women",
    name: "Menopause & women's health",
    shortName: "Menopause",
    status: "available",
    summary: "Care for hot flashes, sleep changes and other symptoms, with hormonal and non-hormonal options.",
    headline: "Menopause care, on your terms.",
    intro:
      "Talk with an authorized clinician about perimenopause and menopause symptoms — and your options, including hormone therapy when it's appropriate and non-hormonal approaches when it isn't.",
    image: "/img/woman-tea.webp",
    imageAlt: "Woman relaxing on a sofa with a cup of tea",
    forYou: [
      "Hot flashes, night sweats or trouble sleeping",
      "Mood changes, brain fog or changes in your body",
      "Weight changes that feel harder to manage",
      "You want a clinician who takes your symptoms seriously",
    ],
    care: [
      { title: "Symptom review", body: "A clinician reviews your symptoms, history and preferences." },
      { title: "Personalized options", body: "Hormonal and non-hormonal options, prescribed only when appropriate." },
      { title: "Follow-up care", body: "Adjustments over time with your clinician." },
      { title: "Strength & nutrition support", body: "Guidance to support bone, muscle and overall health." },
    ],
    options: [
      { name: "Hormone therapy", detail: "Such as estradiol and progesterone, when appropriate for you." },
      { name: "Non-hormonal options", detail: "For people who can't or prefer not to use hormones." },
      { name: "Weight & strength support", detail: "Pair with medical weight loss or personal coaching if you like." },
    ],
    faqs: [
      {
        q: "Is hormone therapy right for me?",
        a: "It depends on your symptoms, health history and preferences. Your clinician will explain the benefits and risks of each option.",
      },
    ],
  },
  "hair-loss": {
    slug: "hair-loss",
    name: "Hair loss & thinning",
    shortName: "Hair loss",
    status: "available",
    summary: "Clinician-guided treatment options for thinning hair and hair loss.",
    headline: "Treatment for thinning hair.",
    intro:
      "Share how your hair has changed and an authorized clinician will recommend options that fit you — including prescription treatments when they're appropriate.",
    image: "/img/hair-mirror.webp",
    imageAlt: "Man running a hand through his hair in a bathroom mirror",
    forYou: [
      "Thinning at the hairline or crown",
      "More shedding or a wider part",
      "You want to understand your options early",
    ],
    care: [
      { title: "Clinician review", body: "A review of your hair-loss pattern, history and goals." },
      { title: "Personalized options", body: "Topical and oral treatments, prescribed only when appropriate." },
      { title: "Follow-up", body: "Check-ins to see how treatment is working and adjust as needed." },
    ],
    options: [
      { name: "Topical treatments", detail: "Applied to the scalp. Your clinician explains how and how often to use them." },
      { name: "Oral prescription options", detail: "Available for some people when appropriate, after a clinician review." },
    ],
    faqs: [
      {
        q: "How long before I see a difference?",
        a: "Hair grows slowly, so changes usually take months, and results vary from person to person. Your clinician will explain what to expect for your options.",
      },
    ],
  },
};

export const otherCare = [treatments.men, treatments.women, treatments["hair-loss"]];

// ─── Programs & pricing ─────────────────────────────────────────────────────

export type ProgramId = "medical" | "medical-coaching" | "coaching";

// Coaching-only is part of the owner's plan but not yet confirmed as a launch offer.
export const coachingOnlyOffered = true;

export const programs: {
  id: ProgramId;
  name: string;
  forWho: string;
  highlight?: boolean;
  includes: string[];
}[] = [
  {
    id: "medical",
    name: "Medical weight loss",
    forWho: "Clinician-guided care, with or without medication.",
    includes: [
      "Clinical evaluation",
      "Treatment when appropriate",
      "Follow-up care with your clinical team",
      "Nutrition & movement resources",
    ],
  },
  {
    id: "medical-coaching",
    name: "Medical + personal coaching",
    forWho: "Everything in medical care, plus a one-on-one coach.",
    highlight: true,
    includes: [
      "Everything in Medical weight loss",
      "A personal coach",
      "Plan matched to your experience, equipment and schedule",
      "Regular check-ins and plan adjustments",
    ],
  },
  {
    id: "coaching",
    name: "Coaching only",
    forWho: "Exercise, nutrition habits and accountability — no medical care or medication.",
    includes: ["A personal coach", "Home or gym plan", "Nutrition habit support", "Check-ins and progress tracking"],
  },
];

// Cost rows. `null` → "To be confirmed". Strings are confirmed facts about HOW things are billed.
export const costs: Record<
  ProgramId,
  { membership: number | null; billing: string | null; medication: string; labs: string; coaching: string }
> = {
  medical: {
    membership: null,
    billing: null,
    medication: "Billed separately, if prescribed",
    labs: "If ordered — cost to be confirmed",
    coaching: "Not included (optional add-on)",
  },
  "medical-coaching": {
    membership: null,
    billing: null,
    medication: "Billed separately, if prescribed",
    labs: "If ordered — cost to be confirmed",
    coaching: "Included",
  },
  coaching: {
    membership: null,
    billing: null,
    medication: "Not applicable",
    labs: "Not applicable",
    coaching: "Included",
  },
};

// Cost lines for the other treatments. null → "To be confirmed".
export const treatmentCosts: Record<
  Exclude<TreatmentSlug, "weight-loss">,
  { membership: number | null; billing: string | null; medication: string; labs: string }
> = {
  men: { membership: null, billing: null, medication: "Billed separately, if prescribed", labs: "Required — cost to be confirmed" },
  "hair-loss": { membership: null, billing: null, medication: "Billed separately, if prescribed", labs: "Not usually needed" },
  women: { membership: null, billing: null, medication: "Billed separately, if prescribed", labs: "If ordered — cost to be confirmed" },
};

export function formatMembership(id: ProgramId) {
  const c = costs[id];
  if (launch.pricingConfirmed && c.membership !== null) return `$${c.membership}`;
  return null;
}

// ─── Coaching ────────────────────────────────────────────────────────────────

export const coaching = {
  // Shown only once a coach is assigned in the live product.
  assignedCoachLabel: "Your coach's name and photo appear here once you're matched.",
  // Example structure — label as example until confirmed.
  exampleSchedule: [
    { label: "Weekly", detail: "A short check-in: how the week went, what felt hard, what to try next." },
    { label: "Every few weeks", detail: "A plan review, with changes to workouts and habits as needed." },
    { label: "Any time", detail: "Message your coach about workouts, habits and motivation." },
  ],
  scheduleConfirmed: false,
  included: [
    "Nutrition & movement guides",
    "Beginner walking and strength plans",
    "Habit-building lessons",
    "Progress tracking in your portal",
  ],
  paid: [
    "A named, one-on-one coach",
    "Plan matched to your experience, equipment and schedule",
    "Home or gym options",
    "Scheduled check-ins and plan adjustments",
    "Accountability between check-ins",
  ],
};

// ─── Supporting content ─────────────────────────────────────────────────────

export const steps = [
  { title: "Tell us about your goals", body: "Share what you'd like help with and how you like to move, eat and live." },
  {
    title: "Complete a clinical evaluation",
    body: "If you're seeking medical care, you'll share your health history through secure intake for an authorized clinician to review.",
  },
  { title: "Get an individualized plan", body: "With or without medication — plus the level of coaching support you choose." },
  { title: "Get ongoing support", body: "Follow-ups with your clinical team, and check-ins with your coach if you add coaching." },
];

export const supportTopics = [
  {
    title: "Food that works for your life",
    body: "Simple, filling meals with enough protein — including ideas for smaller appetites and busy weeknights.",
    image: "/img/farmers-market.webp",
    alt: "Couple choosing vegetables at a farmers market",
  },
  {
    title: "Movement that fits your day",
    body: "Walking counts. Short sessions count. We help you find what you can keep doing.",
    image: "/img/stroller-walk.webp",
    alt: "Father walking with a stroller and his daughter",
  },
  {
    title: "Beginner-friendly strength",
    body: "Chair squats, wall push-ups and resistance bands at home. Strength training can help support muscle while you lose weight.",
    image: "/img/living-room-squat.webp",
    alt: "Woman doing a bodyweight squat in her living room",
  },
];

export const typicalDay = [
  { time: "7:30 am", title: "Protein-first breakfast", body: "Greek yogurt and fruit, eaten while packing lunches." },
  { time: "12:30 pm", title: "A 10-minute walk", body: "Around the block after lunch. It all adds up." },
  { time: "6:45 pm", title: "15 minutes of home strength", body: "Chair squats and band rows while dinner's in the oven." },
  { time: "Sunday", title: "Weekly check-in", body: "Two minutes in the portal: what worked, what to adjust." },
];

export const faqs = [
  {
    q: "Is medication included?",
    a: "No. Medication is billed separately from membership, and only if an authorized clinician prescribes it. The cost depends on the medication, dose and pharmacy. Your clinician will go over options before anything is prescribed.",
  },
  {
    q: "Do I need medication to join coaching?",
    a: "No. You can choose coaching without medication, or add personal coaching to medical care. Medication is never required.",
  },
  {
    q: "Can beginners participate?",
    a: "Yes. Plans start where you are — many people begin with short walks and simple home exercises, and build up gradually.",
  },
  {
    q: "Can I work out at home?",
    a: "Yes. Home plans use a chair, a wall or a resistance band. If you have gym access, your plan can use it — but it's never required.",
  },
  {
    q: "How do follow-ups work?",
    a: "Your clinical team checks in on your progress, side effects and plan. How often depends on your treatment and is set by your clinician. If you add coaching, your coach checks in separately about habits and movement.",
  },
  {
    q: "What happens if I'm not eligible?",
    a: "An authorized clinician decides whether medication is appropriate. If it isn't, they can talk through other options — and coaching without medication is available. How billing works in this case will be published before launch.",
  },
  {
    q: "How do insurance and self-pay work?",
    a: "We haven't confirmed insurance coverage for any service yet, so please plan on self-pay for now. We'll publish exactly which services and plans are supported, if any, before launch.",
  },
  {
    q: "What support is available for maintenance?",
    a: "Maintenance is individual. Decisions about continuing, adjusting or stopping medication are made with your clinician. Ongoing habit support — and coaching if you choose it — can help you maintain your progress, though weight changes over time are common.",
  },
];

export const disclaimer =
  "Prescription treatment is provided only when an authorized clinician determines it is medically appropriate. Not everyone qualifies. Individual results vary. Coaching is not medical care. Photos show models for illustration — not Remade patients, clinicians or coaches.";
