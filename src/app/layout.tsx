import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import { brand } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Clinician-led weight loss and hormone care, paired with a real coach, custom training and nutrition. Lose fat, keep muscle.",
};

export const viewport: Viewport = {
  themeColor: "#0f1110",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
