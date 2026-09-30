import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";

export const metadata: Metadata = {
  title: "Men's Hormones",
  description: "Lab-guided testosterone care from licensed clinicians, with training built around your treatment.",
};

const faqs = [
  {
    q: "Do I need labs before starting?",
    a: "Yes. Treatment decisions are based on lab results and symptoms reviewed by a licensed clinician. We'll help you order labs at home or at a local lab.",
  },
  {
    q: "Will I definitely be prescribed testosterone?",
    a: "No. Your clinician will only prescribe if your labs and symptoms support it and it's safe for you. If it isn't, you'll get other recommendations — and you can still join for coaching.",
  },
  {
    q: "How does coaching fit with hormone therapy?",
    a: "Treatment can support energy and recovery; training and nutrition are what turn that into strength and body-composition changes. Your coach programs around your treatment timeline.",
  },
  {
    q: "Is testosterone available by telehealth in every state?",
    a: "Testosterone is a controlled substance and telehealth prescribing rules vary by state and federal regulations. Availability and visit requirements are confirmed during your assessment.",
  },
];

export default function Page() {
  return (
    <ProgramPage
      slug="men"
      symptoms={["Low energy", "Low drive", "Stalled strength", "Poor recovery", "Brain fog", "Stubborn belly fat"]}
      faqs={faqs}
    />
  );
}
