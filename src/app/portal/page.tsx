import type { Metadata } from "next";
import { Portal } from "./portal";

export const metadata: Metadata = {
  title: "Member portal",
  robots: { index: false },
};

export default function PortalPage() {
  return <Portal />;
}
