import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";

export const metadata: Metadata = {
  title: "Women's Hormones",
  description: "Perimenopause and menopause care from licensed clinicians, with strength-first coaching.",
};

const faqs = [
  {
    q: "Is hormone therapy right for me?",
    a: "It depends on your symptoms, health history and preferences. A licensed clinician will review everything with you and recommend hormonal or non-hormonal options.",
  },
  {
    q: "Why strength training during menopause?",
    a: "Declining estrogen affects bone density, muscle and metabolism. Progressive strength training and adequate protein are among the most effective tools to protect all three.",
  },
  {
    q: "Can I combine this with medical weight loss?",
    a: "Yes. Your clinician can review both, and your coach will build one plan that fits everything you're doing.",
  },
];

export default function Page() {
  return (
    <ProgramPage
      slug="women"
      symptoms={["Hot flashes", "Poor sleep", "Mood swings", "Midsection weight gain", "Brain fog", "Low libido", "Achy joints"]}
      faqs={faqs}
    />
  );
}
