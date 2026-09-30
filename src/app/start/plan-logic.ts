// Plan-builder questions and the logic that turns answers into a plan.
// Everything runs in the browser. Nothing is stored or transmitted, and no
// medical screening happens here — that belongs in secure clinical intake.

import { goals, type GoalId, type Track } from "@/lib/site";

export type Answers = Record<string, string | string[] | number | undefined>;

export type Question =
  | { id: string; kind: "single"; title: string; sub?: string; options: { value: string; label: string; hint?: string }[] }
  | { id: string; kind: "multi"; title: string; sub?: string; options: { value: string; label: string }[] }
  | { id: "body"; kind: "body"; title: string; sub?: string };

const sex: Question = {
  id: "sex",
  kind: "single",
  title: "Which best describes you?",
  sub: "This helps us tailor your plan.",
  options: [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Another identity / prefer not to say" },
  ],
};

const age: Question = {
  id: "age",
  kind: "single",
  title: "What's your age range?",
  options: ["18–29", "30–39", "40–49", "50–59", "60+"].map((v) => ({ value: v, label: v })),
};

const activity: Question = {
  id: "activity",
  kind: "single",
  title: "How active are you right now?",
  sub: "No wrong answers — your plan starts where you are.",
  options: [
    { value: "none", label: "Not very active", hint: "Most days are pretty still" },
    { value: "light", label: "Lightly active", hint: "Walks here and there" },
    { value: "moderate", label: "Moderately active", hint: "Exercise a few days a week" },
    { value: "very", label: "Very active", hint: "Train most days" },
  ],
};

const place: Question = {
  id: "place",
  kind: "single",
  title: "Where would you like to work out?",
  options: [
    { value: "home-none", label: "At home, no equipment" },
    { value: "home-some", label: "At home, with bands or dumbbells" },
    { value: "gym", label: "At a gym" },
    { value: "outdoors", label: "Outdoors — walks and parks" },
  ],
};

const days: Question = {
  id: "days",
  kind: "single",
  title: "How many days a week can you move with intention?",
  sub: "Even 20 minutes counts.",
  options: [
    { value: "2", label: "2 days" },
    { value: "3", label: "3 days" },
    { value: "4", label: "4 days" },
    { value: "5", label: "5+ days" },
  ],
};

const challenges: Question = {
  id: "challenges",
  kind: "multi",
  title: "What gets in the way most?",
  sub: "Choose all that apply.",
  options: [
    { value: "snacking", label: "Snacking between meals" },
    { value: "portions", label: "Portion sizes" },
    { value: "late", label: "Late-night eating" },
    { value: "busy", label: "Busy schedule" },
    { value: "emotional", label: "Stress or emotional eating" },
    { value: "eatingout", label: "Eating out or takeout" },
    { value: "unsure", label: "Not sure what to eat" },
    { value: "energy", label: "Low energy" },
  ],
};

const meds: Question = {
  id: "meds",
  kind: "single",
  title: "Are you interested in weight-loss medication, like a GLP-1?",
  sub: "Medication is only prescribed if an authorized clinician decides it's appropriate for you.",
  options: [
    { value: "yes", label: "Yes, I'd like to explore it" },
    { value: "open", label: "I'm open to it — help me decide" },
    { value: "no", label: "No, I'd rather not use medication" },
  ],
};

const weightSupport: Question = {
  id: "support",
  kind: "single",
  title: "How much support would you like?",
  sub: "You can change this later.",
  options: [
    { value: "medical", label: "Medical weight loss", hint: "Clinician-guided care + included resources" },
    { value: "medical-coaching", label: "Medical + personal coaching", hint: "Adds a one-on-one coach and check-ins" },
    { value: "coaching", label: "Coaching only", hint: "No medical care or medication" },
  ],
};

const careSupport = (careName: string): Question => ({
  id: "support",
  kind: "single",
  title: "Would you like a personal coach too?",
  sub: "Optional — for training, habits and accountability.",
  options: [
    { value: "care", label: `${careName} only` },
    { value: "care-coaching", label: `${careName} + personal coaching` },
  ],
});

export const questions: Record<Track, Question[]> = {
  weight: [
    sex,
    age,
    { id: "body", kind: "body", title: "Your height and weight", sub: "Used only to shape your plan on this device." },
    activity,
    place,
    days,
    challenges,
    meds,
    weightSupport,
  ],
  trt: [
    age,
    {
      id: "symptoms",
      kind: "multi",
      title: "What have you been noticing?",
      sub: "Choose all that apply.",
      options: [
        { value: "energy", label: "Low energy or fatigue" },
        { value: "libido", label: "Low libido" },
        { value: "strength", label: "Harder to build or keep muscle" },
        { value: "mood", label: "Mood or focus changes" },
        { value: "sleep", label: "Poor sleep" },
        { value: "weight", label: "Weight gain around the middle" },
      ],
    },
    {
      id: "labs",
      kind: "single",
      title: "Have you had testosterone labs recently?",
      options: [
        { value: "recent", label: "Yes, in the last 6 months" },
        { value: "older", label: "Yes, but a while ago" },
        { value: "never", label: "No / not sure" },
      ],
    },
    activity,
    place,
    days,
    careSupport("TRT care"),
  ],
  hair: [
    sex,
    {
      id: "area",
      kind: "single",
      title: "Where are you noticing thinning?",
      options: [
        { value: "hairline", label: "Receding hairline" },
        { value: "crown", label: "Thinning at the crown" },
        { value: "part", label: "Wider part" },
        { value: "overall", label: "Overall thinning or shedding" },
      ],
    },
    {
      id: "duration",
      kind: "single",
      title: "How long has it been happening?",
      options: [
        { value: "lt1", label: "Less than a year" },
        { value: "1to3", label: "1–3 years" },
        { value: "gt3", label: "More than 3 years" },
      ],
    },
    {
      id: "tried",
      kind: "multi",
      title: "What have you tried?",
      sub: "Choose all that apply.",
      options: [
        { value: "nothing", label: "Nothing yet" },
        { value: "otc", label: "Over-the-counter topical" },
        { value: "supplements", label: "Supplements or special shampoos" },
        { value: "rx", label: "A prescription treatment" },
      ],
    },
  ],
  menopause: [
    age,
    {
      id: "stage",
      kind: "single",
      title: "Which sounds most like you?",
      options: [
        { value: "irregular", label: "My periods have become irregular" },
        { value: "stopped", label: "No period for 12 months or more" },
        { value: "unsure", label: "I'm not sure" },
      ],
    },
    {
      id: "symptoms",
      kind: "multi",
      title: "What symptoms are you dealing with?",
      sub: "Choose all that apply.",
      options: [
        { value: "hot", label: "Hot flashes" },
        { value: "night", label: "Night sweats" },
        { value: "sleep", label: "Trouble sleeping" },
        { value: "mood", label: "Mood changes" },
        { value: "fog", label: "Brain fog" },
        { value: "weight", label: "Weight changes" },
        { value: "joints", label: "Joint aches" },
      ],
    },
    activity,
    careSupport("Menopause care"),
  ],
};

export function trackFor(goal?: GoalId): Track {
  return goals.find((g) => g.id === goal)?.track ?? "weight";
}

// ─── Plan generation ─────────────────────────────────────────────────────────

export type Plan = {
  title: string;
  program: { name: string; programId?: "medical" | "medical-coaching" | "coaching"; coaching: boolean; medical: boolean };
  treatment?: "men" | "hair-loss" | "women";
  targets: { label: string; value: string; note?: string }[];
  week: { day: string; plan: string; detail?: string }[];
  nutrition: string[];
  nextSteps: string[];
  focus: string[];
};

const strengthMoves: Record<string, string> = {
  "home-none": "Chair squats, wall push-ups, glute bridges",
  "home-some": "Goblet squats, band or dumbbell rows, presses",
  gym: "Leg press, cable rows, chest press, step-ups",
  outdoors: "Park-bench step-ups, incline push-ups, lunges",
};

function buildWeek(a: Answers, emphasis: "weight" | "recomp" | "trt" | "menopause") {
  const level = (a.activity as string) ?? "light";
  const n = Math.min(5, Number(a.days ?? (emphasis === "menopause" ? 3 : 3)));
  const beginner = level === "none" || level === "light";
  const strengthCount = emphasis === "recomp" || emphasis === "trt" ? Math.min(n, beginner ? 2 : 3) : n >= 3 ? 2 : 1;
  const walkMin = beginner ? "15–20 min" : "30 min";
  const strengthMin = beginner ? "15 min" : emphasis === "recomp" || emphasis === "trt" ? "40 min" : "30 min";
  const moves = strengthMoves[(a.place as string) ?? "home-none"] ?? strengthMoves["home-none"];

  const plan: ("strength" | "walk" | "rest")[] = [];
  const slots = [0, 2, 4, 1, 3]; // Mon, Wed, Fri, Tue, Thu
  const week: ("strength" | "walk" | "rest")[] = Array(7).fill("rest");
  let s = strengthCount;
  slots.slice(0, n).forEach((d) => {
    week[d] = s-- > 0 ? "strength" : "walk";
  });
  plan.push(...week);

  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return plan.map((kind, i) => {
    if (kind === "strength") return { day: names[i], plan: `Strength · ${strengthMin}`, detail: moves };
    if (kind === "walk") return { day: names[i], plan: `Walk · ${walkMin}`, detail: "Comfortable pace — you can hold a conversation" };
    if (i === 6) return { day: names[i], plan: "Rest & check in", detail: "Two minutes: what worked, what to adjust" };
    if (i === 5) return { day: names[i], plan: "Something you enjoy", detail: "A family walk, a bike ride, gardening" };
    return { day: names[i], plan: "Rest", detail: "Light stretching if you like" };
  });
}

const nutritionTips: Record<string, string> = {
  snacking: "Plan one or two protein-rich snacks (Greek yogurt, a cheese stick, hard-boiled eggs) so grazing doesn't take over.",
  portions: "Build your plate: half vegetables, a quarter protein, a quarter carbs.",
  late: "Pick a 'kitchen closed' time, with a planned evening snack if you need one.",
  busy: "Keep three go-to meals on repeat and batch-cook a protein once a week.",
  emotional: "When a craving hits, pause for five minutes and try a non-food reset first — a short walk, a call, a glass of water.",
  eatingout: "Look at the menu ahead of time and choose a protein-and-vegetable base.",
  unsure: "Start simple: protein at every meal, plenty of vegetables, and water most of the time.",
  energy: "Eat regular meals with protein and fiber, and stay hydrated through the day.",
};

export function buildPlan(goal: GoalId, a: Answers): Plan {
  const goalLabel = goals.find((g) => g.id === goal)?.label ?? "Your goal";
  const track = trackFor(goal);

  if (track === "trt") {
    const coachingOn = a.support === "care-coaching";
    return {
      title: "Your testosterone care plan",
      treatment: "men",
      program: { name: coachingOn ? "TRT care + personal coaching" : "TRT care", coaching: coachingOn, medical: true },
      targets: [
        { label: "Your focus", value: "Energy, drive & strength" },
        { label: "First step", value: a.labs === "recent" ? "Share recent labs" : "Lab testing" },
        { label: "Training days", value: `${Math.min(5, Number(a.days ?? 3))} per week` },
      ],
      week: buildWeek(a, "trt"),
      nutrition: [
        "Protein at every meal to support strength training.",
        "Aim for a consistent sleep schedule — sleep affects energy and hormones.",
        "Limit alcohol, especially close to bedtime.",
      ],
      nextSteps: [
        a.labs === "recent" ? "Upload your recent labs during secure intake" : "Complete lab testing ordered by your clinician",
        "Clinician review of your symptoms, labs and history",
        "Testosterone therapy only if your labs and history support it",
        "Ongoing monitoring and repeat labs",
      ],
      focus: ((a.symptoms as string[]) ?? []).length ? ["Symptoms you mentioned will be reviewed by your clinician."] : [],
    };
  }

  if (track === "hair") {
    const area = { hairline: "Hairline", crown: "Crown", part: "Part line", overall: "Overall thinning" }[(a.area as string) ?? "overall"];
    return {
      title: "Your hair-loss care plan",
      treatment: "hair-loss",
      program: { name: "Hair-loss care", coaching: false, medical: true },
      targets: [
        { label: "Focus area", value: area ?? "Overall thinning" },
        { label: "Timeline", value: "Months, not weeks", note: "Hair grows slowly; results vary." },
        { label: "Check-ins", value: "Set by your clinician" },
      ],
      week: [],
      nutrition: [
        "Eat enough protein — hair is made of protein.",
        "Be gentle: avoid tight hairstyles and high heat when you can.",
        "Take photos in the same light every month to see real change over time.",
      ],
      nextSteps: [
        "Share photos and your history in secure intake",
        "Clinician review of your hair-loss pattern",
        "Topical or oral options only if appropriate",
        "Follow-up to see how treatment is working",
      ],
      focus: [],
    };
  }

  if (track === "menopause") {
    const coachingOn = a.support === "care-coaching";
    return {
      title: "Your menopause care plan",
      treatment: "women",
      program: { name: coachingOn ? "Menopause care + personal coaching" : "Menopause care", coaching: coachingOn, medical: true },
      targets: [
        { label: "Your focus", value: "Symptom relief & feeling like you" },
        { label: "Movement", value: "Strength 2× a week", note: "Supports bone and muscle" },
        { label: "Care", value: "Hormonal & non-hormonal options" },
      ],
      week: buildWeek({ ...a, days: 3 }, "menopause"),
      nutrition: [
        "Include protein and calcium-rich foods to support bone and muscle.",
        "Notice triggers for hot flashes, like alcohol, caffeine or spicy food.",
        "Keep a steady sleep routine and a cool bedroom.",
      ],
      nextSteps: [
        "Share your symptoms and history in secure intake",
        "Consultation with an authorized clinician",
        "Hormonal or non-hormonal options, only if appropriate",
        "Follow-up care as things change",
      ],
      focus: [],
    };
  }

  // Weight track
  const programId = (a.support as "medical" | "medical-coaching" | "coaching") ?? "medical";
  const programNames = {
    medical: a.meds === "no" ? "Medical weight loss (without medication)" : "Medical weight loss",
    "medical-coaching": a.meds === "no" ? "Medical care + personal coaching (without medication)" : "Medical weight loss + personal coaching",
    coaching: "Coaching only",
  };
  const ft = Number(a.ft ?? 0);
  const inch = Number(a.in ?? 0);
  const lb = Number(a.lb ?? 0);
  const goalLb = Number(a.goalLb ?? 0);
  const targets: Plan["targets"] = [];
  if (lb > 0 && goalLb > 0 && goalLb < lb) {
    targets.push({ label: "Your goal", value: `${lb} → ${goalLb} lb` });
    targets.push({
      label: "First milestone",
      value: `About ${Math.round(lb * 0.05)} lb`,
      note: "Around 5% of your current weight — a common first milestone.",
    });
  } else {
    targets.push({ label: "Your goal", value: goalLabel });
  }
  const h = ft * 12 + inch;
  if (h > 0 && lb > 0) {
    const bmi = Math.round((lb / (h * h)) * 703 * 10) / 10;
    targets.push({ label: "BMI (for reference)", value: String(bmi), note: "One of several factors a clinician considers." });
  }
  const recomp = goal === "recomp";
  if (recomp) targets.push({ label: "Strength days", value: `${Math.min(3, Number(a.days ?? 3))} per week` });

  const chosen = ((a.challenges as string[]) ?? []).map((c) => nutritionTips[c]).filter(Boolean);
  const nutrition = [
    recomp || a.meds !== "no" ? "Put protein first at each meal — it helps you feel full and supports muscle, especially if your appetite gets smaller." : "Include protein at each meal to stay full longer.",
    ...chosen.slice(0, 3),
  ];
  if (nutrition.length < 3) nutrition.push(nutritionTips.unsure);

  const medical = programId !== "coaching";
  const nextSteps = medical
    ? [
        "Complete secure medical intake",
        "Clinician review — medication only if appropriate",
        programId === "medical-coaching" ? "Meet your coach and get your first program" : "Get your plan and member resources",
        "Ongoing follow-ups with your clinical team",
      ]
    : ["Tell your coach about your routine and equipment", "Get a plan matched to your experience", "Weekly check-ins and plan adjustments", "Track progress in your portal"];

  return {
    title: recomp ? "Your fat-loss & strength plan" : "Your weight-loss plan",
    program: { name: programNames[programId], programId, coaching: programId !== "medical", medical },
    targets,
    week: buildWeek(a, recomp ? "recomp" : "weight"),
    nutrition,
    nextSteps,
    focus: recomp ? ["Strength training can help support muscle while you lose fat."] : [],
  };
}
