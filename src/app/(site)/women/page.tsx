import type { Metadata } from "next";
import { TreatmentPage } from "@/components/treatment-page";
import { treatments } from "@/lib/site";

const t = treatments["women"];

export const metadata: Metadata = {
  title: "Menopause & women's health",
  description: t.summary,
};

export default function Page() {
  return <TreatmentPage t={t} />;
}
