import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: "Build your plan",
  description: "Answer a few questions and get a personalized plan for weight loss, TRT, hair loss or menopause care.",
  robots: { index: false },
};

const legacy: Record<string, string> = { "weight-loss": "unsure", men: "trt", women: "menopause", "hair-loss": "hair" };

export default async function StartPage(props: PageProps<"/start">) {
  const sp = await props.searchParams;
  const raw = typeof sp.goal === "string" ? sp.goal : typeof sp.program === "string" ? legacy[sp.program] : undefined;
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-18 items-center justify-between px-5 sm:px-8 print:hidden">
        <Logo />
        <Link href="/" className="inline-flex min-h-11 items-center rounded-full px-3 font-semibold text-muted hover:text-ink">
          Exit
        </Link>
      </header>
      <Quiz initialGoal={raw} />
    </div>
  );
}
