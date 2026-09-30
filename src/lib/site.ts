// Remade Clinic — central brand, launch-status and offer config.
//
// Anything set to `null` below is an UNCONFIRMED business detail. The site hides
// or softens that content until the owner fills it in. Do not replace a null
// with a guess — see README "Before launch" for the confirmation checklist.

export const brand = {
  name: "Remade Clinic",
  shortName: "Remade",
  domain: "remadeclinic.com",
  // Contracting / legal entity name. Needs owner + counsel confirmation.
  legalName: null as string | null,
  // Patient support contact. Needs a real, monitored address before launch.
  supportEmail: null as string | null,
  supportPhone: null as string | null,
  founder: {
    // Display name and credentials must be confirmed by the owner.
    name: null as string | null,
    role: "Founder & Head Coach",
    note: "I started Remade because weight loss is hard to do alone — and medication works best alongside everyday habits you can actually keep. Whether you're brand new to exercise or getting back into it, you'll have support at your pace.",
  },
};

// Launch switches. Flip these only when the real services are live.
export const launch = {
  // Real, secure intake connected to the clinical partner?
  assessmentLive: false,
  // Membership and coaching prices confirmed by the owner?
  pricingConfirmed: false,
  // Clinic currently accepting patients?
  acceptingPatients: false,
};

export const assessmentCta = launch.assessmentLive
  ? { label: "Start your assessment", href: "/start" }
  : { label: "Preview the assessment", href: "/start" };

export type ServiceStatus = "offered" | "coming-soon";

export type TreatmentSlug = "weight-loss" | "men" | "women" | "hair-loss";

export type Treatment = {
  slug: TreatmentSlug;
  name: string;
  navLabel: string;
  status: ServiceStatus;
  summary: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  whoFor: string[];
  includes: { title: string; body: string }[];
  options: { name: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const treatments: Record<TreatmentSlug, Treatment> = {
  "weight-loss": {
    slug: "weight-loss",
    name: "Medical weight loss",
    navLabel: "Weight loss",
    status: "offered",
    summary: "Clinician-guided care, GLP-1 treatment when appropriate, and everyday habit support.",
    headline: "Weight-loss care that fits your real life.",
    intro:
      "Work with an authorized clinician on a plan made for you — which may include GLP-1 medication when it's appropriate — with practical nutrition and movement support to help you build habits that last.",
    image: "/img/couple-cooking.webp",
    imageAlt: "Couple cooking a healthy dinner together",
    whoFor: [
      "You've tried to lose weight on your own and want medical support",
      "You want a plan that works at your fitness level — including none",
      "You'd like to know whether medication could be right for you",
      "You want help keeping weight off over the long term",
    ],
    includes: [
      {
        title: "A medical evaluation",
        body: "An authorized clinician reviews your health history, current medications and goals.",
      },
      {
        title: "An individualized plan",
        body: "Your clinician explains your options. Medication is prescribed only when it's medically appropriate.",
      },
      {
        title: "Ongoing clinical follow-up",
        body: "Check-ins on progress and side effects, with changes made by your clinician as needed.",
      },
      {
        title: "Nutrition & movement resources",
        body: "Simple guidance on eating well with a smaller appetite, walking, and beginner strength training.",
      },
    ],
    options: [
      {
        name: "GLP-1 medication",
        detail:
          "Such as semaglutide or tirzepatide — weekly injections or, for some medications, a daily pill. Prescribed only if appropriate for you.",
      },
      {
        name: "Care without medication",
        detail: "If medication isn't right for you, or you'd prefer not to use it, you can still get clinical guidance and habit support.",
      },
      {
        name: "Maintenance planning",
        detail: "As you progress, your clinician decides with you whether to continue, adjust or taper treatment.",
      },
    ],
    faqs: [
      {
        q: "Will I be prescribed a GLP-1?",
        a: "Not everyone qualifies. An authorized clinician decides whether medication is appropriate based on your health history, current medications and goals. If it isn't a fit, they'll talk through other options.",
      },
      {
        q: "Do I need to exercise a lot?",
        a: "No. Many people start with short walks and simple home exercises. The goal is steady, manageable movement — and adding some strength work over time to help support muscle while you lose weight.",
      },
      {
        q: "What if I have side effects?",
        a: "Contact the clinical team. Questions about medication, side effects or dosing always go to your clinician, not a coach. In an emergency, call 911.",
      },
    ],
  },
  men: {
    slug: "men",
    name: "Men's health & testosterone",
    navLabel: "Men's health",
    status: "offered",
    summary: "Lab-based evaluation for symptoms of low testosterone, with treatment when appropriate.",
    headline: "Low energy or low drive? Start with the facts.",
    intro:
      "An authorized clinician reviews your symptoms and lab results to understand what's going on. Testosterone therapy is considered only when your labs and history support it.",
    image: "/img/man-coffee.webp",
    imageAlt: "Man pouring coffee in a bright kitchen",
    whoFor: [
      "Low energy, low libido or changes in mood",
      "You want answers based on lab work, not guesswork",
      "You'd like clinical monitoring if you start treatment",
    ],
    includes: [
      { title: "Symptom & history review", body: "A clinician looks at your symptoms, health history and goals." },
      {
        title: "Lab testing",
        body: "Labs are ordered as needed. Whether they're included or billed separately will be confirmed before launch.",
      },
      { title: "Treatment when appropriate", body: "Testosterone therapy is prescribed only if your labs and health history support it." },
      { title: "Ongoing monitoring", body: "Follow-up visits and repeat labs as directed by your clinician." },
    ],
    options: [
      {
        name: "Testosterone therapy",
        detail: "A controlled medication with specific prescribing and monitoring rules. Availability depends on your state and current regulations.",
      },
      { name: "Lifestyle support", detail: "Sleep, activity and nutrition habits that support overall health — with optional coaching." },
    ],
    faqs: [
      {
        q: "Will I definitely get testosterone?",
        a: "No. Treatment is only prescribed when your labs, symptoms and health history support it and it's safe for you.",
      },
      {
        q: "Is this available in my state?",
        a: "Testosterone prescribing through telehealth is regulated at the state and federal level. We'll publish where this service is available before launch.",
      },
    ],
  },
  women: {
    slug: "women",
    name: "Menopause & perimenopause care",
    navLabel: "Menopause",
    status: "offered",
    summary: "Care for hot flashes, sleep changes and other symptoms, with hormonal and non-hormonal options.",
    headline: "Support for menopause, on your terms.",
    intro:
      "Talk with an authorized clinician about your symptoms and your options — including hormone therapy when it's appropriate, and non-hormonal approaches when it isn't.",
    image: "/img/woman-tea.webp",
    imageAlt: "Woman relaxing on a sofa with a cup of tea",
    whoFor: [
      "Hot flashes, night sweats or trouble sleeping",
      "Mood changes, brain fog or changes in your body",
      "You want a clinician who takes your symptoms seriously",
    ],
    includes: [
      { title: "Symptom review", body: "A clinician reviews your symptoms, history and preferences." },
      { title: "Personalized options", body: "Hormonal and non-hormonal options, prescribed only when appropriate." },
      { title: "Follow-up care", body: "Adjustments over time with your clinician." },
      { title: "Strength & nutrition resources", body: "Practical guidance to support bone, muscle and overall health." },
    ],
    options: [
      { name: "Hormone therapy", detail: "Such as estradiol and progesterone, when appropriate for you." },
      { name: "Non-hormonal options", detail: "For people who can't or prefer not to use hormones." },
    ],
    faqs: [
      {
        q: "Is hormone therapy right for me?",
        a: "It depends on your symptoms, health history and preferences. Your clinician will review everything with you and explain the benefits and risks of each option.",
      },
    ],
  },
  "hair-loss": {
    slug: "hair-loss",
    name: "Hair-loss care",
    navLabel: "Hair loss",
    status: "coming-soon",
    summary: "Clinician-guided options for thinning hair. Coming soon.",
    headline: "Hair-loss care is coming soon.",
    intro:
      "We're preparing clinician-guided care for thinning hair and hair loss. We're not accepting patients or payments for this service yet.",
    image: "/img/hair-products.webp",
    imageAlt: "Unlabeled dropper bottle and tablet bottle",
    whoFor: ["Thinning at the crown or hairline", "You want to understand your options early"],
    includes: [
      { title: "Clinician review", body: "Planned: a review of your hair-loss pattern and health history." },
      { title: "Treatment options", body: "Planned: topical and oral options when appropriate." },
    ],
    options: [],
    faqs: [],
  },
};

export const primaryTreatment = treatments["weight-loss"];
export const otherCare = [treatments.men, treatments.women, treatments["hair-loss"]];

// What care includes — keep clinical care, included resources and the optional
// coaching add-on clearly separated.
export const careIncludes = [
  {
    icon: "stethoscope",
    title: "Medical evaluation & treatment",
    body: "An authorized clinician reviews your health history and goals, and directs any treatment.",
    tag: "Clinical care",
  },
  {
    icon: "calendar",
    title: "Ongoing clinical follow-up",
    body: "Check-ins with your clinical team to review progress and side effects and adjust your plan.",
    tag: "Clinical care",
  },
  {
    icon: "leaf",
    title: "Nutrition & movement resources",
    body: "Easy-to-follow guidance on meals, walking and beginner strength, available to every member.",
    tag: "Included resources",
  },
  {
    icon: "person",
    title: "Personal coaching",
    body: "One-on-one plans, check-ins and accountability from a coach, if you want extra support.",
    tag: "Optional add-on",
  },
] as const;

export const steps = [
  { title: "Share your goals and health history", body: "Tell us what you're hoping for and a bit about your health through secure intake." },
  { title: "Clinician review", body: "Meet with, or receive a review from, an authorized clinician." },
  { title: "Discuss your plan", body: "Talk through an individualized plan — with or without medication." },
  { title: "Ongoing support", body: "Follow-ups with your clinical team, plus coaching if you'd like it." },
];

export const supportPillars = [
  {
    icon: "leaf",
    title: "Nutrition habits",
    body: "Simple, filling meals with enough protein — especially helpful when your appetite is smaller.",
  },
  {
    icon: "walk",
    title: "Manageable activity",
    body: "Start with walking. A few more steps each week adds up.",
  },
  {
    icon: "strength",
    title: "Strength, at any level",
    body: "Chair squats, wall push-ups and bands at home. Strength work can help support muscle as you lose weight.",
  },
  {
    icon: "check",
    title: "Accountability",
    body: "Regular check-ins keep you on track — with your clinical team, and with a coach if you choose one.",
  },
  {
    icon: "calendar",
    title: "Maintenance",
    body: "Planning for the long term from the start, with decisions about medication made alongside your clinician.",
  },
];

export const coachingFeatures = [
  { title: "Home or gym plans", body: "Workouts built around the space and equipment you have — even none." },
  { title: "Beginner-friendly progression", body: "Start where you are, from short walks to simple strength moves." },
  { title: "Nutrition & habit support", body: "Practical, everyday eating habits, within your coach's qualifications." },
  { title: "Check-ins & accountability", body: "Regular check-ins so you're not doing this alone." },
  { title: "Progress tracking", body: "Track how you feel, how you move and how your habits are going." },
  { title: "Plan adjustments", body: "Your plan changes as your routine, energy and goals change." },
];

// Pricing: medical care is the base; coaching is an optional add-on.
// Prices stay null until confirmed by the owner. (Earlier drafts used $99 / $199 / $399
// membership tiers — unconfirmed, so they are not shown.)
export const plans = {
  medical: {
    name: "Medical weight-loss care",
    price: null as number | null,
    period: "month",
    description: "Clinician-guided care — the base of every plan.",
    includes: [
      "Medical evaluation by an authorized clinician",
      "Individualized treatment plan",
      "Ongoing clinical follow-up",
      "Nutrition & movement resources",
      "Member portal",
    ],
  },
  coaching: {
    name: "Personal coaching",
    price: null as number | null,
    period: "month",
    description: "An optional add-on for one-on-one support and accountability.",
    includes: [
      "Personalized home or gym plan",
      "Beginner-friendly progression",
      "Nutrition & habit coaching",
      "Regular check-ins",
      "Progress tracking & plan adjustments",
    ],
  },
  billedSeparately: [
    { item: "Medication", note: "Billed separately. Cost depends on the medication, dose, pharmacy and any insurance coverage." },
    { item: "Lab work", note: "If ordered by your clinician. Whether labs are included will be confirmed before launch." },
  ],
};

export const faqs = [
  {
    q: "How much does medication cost?",
    a: "Medication is billed separately from membership. The cost depends on the medication, the dose, the pharmacy and any insurance coverage you have. Your clinician will talk through options and costs with you before anything is prescribed.",
  },
  {
    q: "Will I qualify for medication?",
    a: "Not everyone does. An authorized clinician reviews your health history, current medications and goals to decide whether medication is appropriate. If it isn't, they can discuss other options with you.",
  },
  {
    q: "Is coaching required?",
    a: "No. Coaching is an optional add-on. Every member gets clinical care and general nutrition and movement resources. Coaching adds one-on-one plans, check-ins and accountability.",
  },
  {
    q: "I'm a beginner and don't like gyms. Is this for me?",
    a: "Yes. You don't need a gym or any fitness experience. Many people start with walking and simple home exercises, then build up gradually.",
  },
  {
    q: "What do follow-ups look like?",
    a: "Your clinical team checks in on your progress, side effects and plan. How often depends on your treatment and is set by your clinician.",
  },
  {
    q: "What happens when I reach my goal?",
    a: "Maintenance is individual. Any decision to continue, adjust or stop medication is made with your treating clinician. We focus on habits — eating, movement and strength — that can help you maintain your progress over time.",
  },
  {
    q: "Who do I talk to about side effects?",
    a: "Your clinical team. Coaches help with habits, movement and accountability, but questions about medication, dosing, side effects or other medical concerns always go to your clinician. In an emergency, call 911.",
  },
  {
    q: "Where is Remade Clinic available?",
    a: "We'll publish the states we serve before we begin accepting patients.",
  },
];

export const disclaimer =
  "Prescription treatment is provided only when an authorized clinician determines it is medically appropriate. Not everyone qualifies. Individual results vary. Medication and any lab work are billed separately unless stated otherwise. Coaching is not medical care. Photos show models for illustration only — not our patients, clinicians or coaches.";
