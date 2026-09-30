import type { Metadata } from "next";
import { TreatmentPage } from "@/components/treatment-page";
import { treatments } from "@/lib/site";

const t = treatments["men"];

export const metadata: Metadata = {
  title: "Testosterone (TRT) & men's health",
  description: t.summary,
};

export default function Page() {
  return <TreatmentPage t={t} />;
}
