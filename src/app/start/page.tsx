import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { launch } from "@/lib/site";
import { Quiz } from "./quiz";

export const metadata: Metadata = {
  title: launch.assessmentLive ? "Start your assessment" : "Assessment preview",
  description: "A short preview of how getting started with Remade Clinic will work.",
  robots: { index: false },
};

export default async function StartPage(props: PageProps<"/start">) {
  const sp = await props.searchParams;
  const program = typeof sp.program === "string" ? sp.program : undefined;
  return (
    <div className="flex min-h-dvh flex-col">
      {!launch.assessmentLive && (
        <div className="bg-peach px-5 py-2.5 text-center text-sm text-clay">
          <strong>Preview only.</strong> This demo doesn&apos;t ask for health information, and nothing you choose is
          saved or sent.
        </div>
      )}
      <header className="flex h-16 items-center justify-between px-5 md:px-8">
        <Logo />
        <Link href="/" className="inline-flex min-h-11 items-center rounded-full px-3 text-muted hover:text-ink">
          Exit
        </Link>
      </header>
      <Quiz initialProgram={program} />
    </div>
  );
}
