import type { Metadata } from "next";
import { TreatmentPage } from "@/components/treatment-page";
import { treatments } from "@/lib/site";

const t = treatments["hair-loss"];

export const metadata: Metadata = {
  title: "Hair loss & thinning",
  description: t.summary,
};

export default function Page() {
  return <TreatmentPage t={t} />;
}
