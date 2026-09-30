// SAMPLE data for the member portal preview. Nothing here is a real member.
// Replace with real data only after secure auth and a HIPAA-eligible datastore
// (with a signed BAA) are in place.

export const member = {
  name: "Alex",
  week: 4,
  plan: "Medical care + coaching",
};

export const today = {
  movement: { title: "Home strength, 15 min", detail: "Chair squats · wall push-ups · band rows" },
  walkMinutes: { done: 12, goal: 20 },
  habits: [
    { label: "Protein at breakfast", done: true },
    { label: "Water bottle refilled twice", done: true },
    { label: "10-minute walk after dinner", done: false },
  ],
};

export const weeklyWalks = [10, 12, 15, 15, 18, 20, 20, 22];

export const sessions: {
  id: string;
  name: string;
  minutes: number;
  moves: { name: string; amount: string; tip: string }[];
}[] = [
  {
    id: "home-a",
    name: "Home strength A",
    minutes: 15,
    moves: [
      { name: "Chair squat (sit-to-stand)", amount: "2 × 8", tip: "Use your hands on your thighs if you need a boost." },
      { name: "Wall push-up", amount: "2 × 8", tip: "Step your feet farther back to make it harder." },
      { name: "Band row", amount: "2 × 10", tip: "Squeeze your shoulder blades together gently." },
      { name: "Standing march", amount: "1 minute", tip: "Hold a counter for balance if you like." },
    ],
  },
  {
    id: "walk",
    name: "Easy walk",
    minutes: 20,
    moves: [
      { name: "Warm-up stroll", amount: "3 min", tip: "Start slow." },
      { name: "Comfortable pace", amount: "15 min", tip: "You should be able to hold a conversation." },
      { name: "Cool-down", amount: "2 min", tip: "Ease back down." },
    ],
  },
  {
    id: "home-b",
    name: "Home strength B",
    minutes: 15,
    moves: [
      { name: "Step-up on a low step", amount: "2 × 6 each leg", tip: "Hold a rail or wall for balance." },
      { name: "Glute bridge", amount: "2 × 10", tip: "Press through your heels." },
      { name: "Band pull-apart", amount: "2 × 10", tip: "Keep your arms soft." },
    ],
  },
];

export const meals = [
  { time: "Breakfast", name: "Greek yogurt with berries and oats" },
  { time: "Lunch", name: "Chicken and veggie wrap" },
  { time: "Snack", name: "Cheese stick and an apple" },
  { time: "Dinner", name: "Salmon, rice and roasted vegetables" },
];

export const lessons = [
  { title: "Eating well when your appetite is smaller", minutes: 3, done: true },
  { title: "Why a little strength work matters", minutes: 3, done: true },
  { title: "Building a walking habit that sticks", minutes: 4, done: false },
  { title: "Planning for the long term", minutes: 4, done: false },
];

export const coachMessages = [
  { from: "coach", text: "Nice work on your walks this week! Want to try adding 2 minutes to each one?", time: "Mon" },
  { from: "me", text: "Yes — I'll try after dinner.", time: "Mon" },
  { from: "coach", text: "Perfect. Your home strength plan is updated with one extra set of chair squats.", time: "Tue" },
];
