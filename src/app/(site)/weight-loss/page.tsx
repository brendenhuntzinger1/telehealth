import type { Metadata } from "next";
import { TreatmentPage } from "@/components/treatment-page";
import { treatments } from "@/lib/site";

const t = treatments["weight-loss"];

export const metadata: Metadata = {
  title: "Medical weight loss",
  description: t.summary,
};

export default function Page() {
  return <TreatmentPage t={t} />;
}
