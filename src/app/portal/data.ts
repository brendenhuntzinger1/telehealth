// Demo data for the member portal. Replace with real member data from the
// backend once auth + a HIPAA-compliant datastore are connected.

export const member = {
  name: "Sam",
  week: 6,
  tier: "Coached",
  program: "Medical Weight Loss",
  startWeight: 224,
  goalWeight: 185,
  proteinTarget: 140,
  medication: { name: "GLP-1 (weekly)", nextDose: "Sunday", doseWeek: 6 },
};

export const weights = [224, 222.4, 220.8, 219.6, 217.2, 215.4, 213.8, 212.6, 211.0, 209.8];

export const strength = [
  { lift: "Goblet squat", start: 35, now: 55, unit: "lb × 10" },
  { lift: "Romanian deadlift", start: 65, now: 95, unit: "lb × 8" },
  { lift: "DB bench press", start: 30, now: 40, unit: "lb × 10" },
];

export type Exercise = { name: string; sets: number; reps: string; rest: string; cue: string };

export const workouts: { id: string; name: string; day: string; focus: string; minutes: number; exercises: Exercise[] }[] = [
  {
    id: "lower-a",
    name: "Lower A",
    day: "Mon",
    focus: "Squat pattern + hinge",
    minutes: 45,
    exercises: [
      { name: "Goblet squat", sets: 3, reps: "8–10", rest: "90s", cue: "Elbows inside knees, sit between your heels." },
      { name: "Romanian deadlift", sets: 3, reps: "8", rest: "90s", cue: "Push hips back, soft knees, bar close." },
      { name: "Split squat", sets: 3, reps: "8 / leg", rest: "60s", cue: "Front shin vertical, drop the back knee." },
      { name: "Standing calf raise", sets: 2, reps: "12–15", rest: "45s", cue: "Full stretch at the bottom, pause at top." },
    ],
  },
  {
    id: "upper-a",
    name: "Upper A",
    day: "Wed",
    focus: "Push + pull",
    minutes: 40,
    exercises: [
      { name: "DB bench press", sets: 3, reps: "8–10", rest: "90s", cue: "Shoulder blades pinched, feet planted." },
      { name: "Chest-supported row", sets: 3, reps: "10", rest: "75s", cue: "Drive elbows to hips, pause." },
      { name: "Lat pulldown", sets: 3, reps: "10–12", rest: "75s", cue: "Chest up, pull to collarbone." },
      { name: "Lateral raise", sets: 2, reps: "12–15", rest: "45s", cue: "Lead with elbows, slow down." },
    ],
  },
  {
    id: "lower-b",
    name: "Lower B",
    day: "Fri",
    focus: "Deadlift + single leg",
    minutes: 45,
    exercises: [
      { name: "Trap-bar deadlift", sets: 3, reps: "6", rest: "2 min", cue: "Brace, push the floor away." },
      { name: "Step-up", sets: 3, reps: "8 / leg", rest: "60s", cue: "Drive through the whole foot on the box." },
      { name: "Hamstring curl", sets: 3, reps: "10–12", rest: "60s", cue: "Control the lowering for 3 seconds." },
    ],
  },
  {
    id: "upper-b",
    name: "Upper B",
    day: "Sat",
    focus: "Upper + conditioning",
    minutes: 45,
    exercises: [
      { name: "Incline DB press", sets: 3, reps: "8–10", rest: "90s", cue: "30° bench, elbows at 45°." },
      { name: "Seated cable row", sets: 3, reps: "10–12", rest: "75s", cue: "Tall chest, squeeze shoulder blades." },
      { name: "Bike intervals", sets: 8, reps: "30s hard / 60s easy", rest: "—", cue: "Hard but repeatable." },
    ],
  },
];

export const meals = [
  { time: "Breakfast", name: "Greek yogurt bowl, berries, whey", protein: 42, kcal: 380 },
  { time: "Lunch", name: "Chicken rice bowl, greens", protein: 40, kcal: 520 },
  { time: "Snack", name: "Protein shake + banana", protein: 30, kcal: 260 },
  { time: "Dinner", name: "Salmon, potatoes, roasted veg", protein: 38, kcal: 560 },
];

export const lessons = [
  { day: 1, title: "Why protein comes first on a GLP-1", minutes: 3, done: true },
  { day: 2, title: "Eating when you're not hungry: small meals that work", minutes: 4, done: true },
  { day: 3, title: "Progressive overload, explained simply", minutes: 3, done: true },
  { day: 4, title: "Handling nausea on dose-increase weeks", minutes: 4, done: false },
  { day: 5, title: "Sleep, steps and the 'hidden' fat-loss levers", minutes: 3, done: false },
  { day: 6, title: "Planning for maintenance from day one", minutes: 5, done: false },
];

export const initialMessages = [
  { from: "coach", text: "Welcome to week 6! Your squat video looked great — depth is right where we want it.", time: "Mon 8:02am" },
  { from: "coach", text: "Dose goes up this week, so I dropped one set from Lower B. Keep protein at 140g even if meals are small.", time: "Mon 8:03am" },
  { from: "me", text: "Thanks! Appetite has been really low since Sunday. Shakes are helping.", time: "Mon 12:41pm" },
  { from: "coach", text: "Perfect — that's exactly what they're for. Log how you feel in Thursday's check-in.", time: "Mon 1:15pm" },
] as const;
