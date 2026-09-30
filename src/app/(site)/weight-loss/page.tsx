import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medical Weight Loss",
  description: "Clinician-prescribed GLP-1 treatment paired with strength training, protein-first nutrition and a real coach.",
};

export default function Page() {
  return (
    <ProgramPage
      slug="weight-loss"
      symptoms={[
        "Diets that work until they don't",
        "Constant food noise",
        "Plateaus no matter what you try",
        "Worried about losing muscle",
        "Low energy",
        "Weight creeping back",
      ]}
      faqs={faqs}
    />
  );
}
