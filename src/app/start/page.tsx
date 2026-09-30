import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { Quiz } from "./quiz";
import Link from "next/link";

export const metadata: Metadata = {
  title: "See if you qualify",
  description: "A 3-minute assessment to match you with the right program.",
};

export default async function StartPage(props: PageProps<"/start">) {
  const sp = await props.searchParams;
  const program = typeof sp.program === "string" ? sp.program : undefined;
  const tier = typeof sp.tier === "string" ? sp.tier : undefined;
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex h-16 items-center justify-between px-5 md:px-8">
        <Logo />
        <Link href="/" className="text-sm text-ink/60 hover:text-ink">
          Exit
        </Link>
      </header>
      <Quiz initialProgram={program} initialTier={tier} />
    </div>
  );
}
