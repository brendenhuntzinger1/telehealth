import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import { brand } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Personalized medical weight-loss care`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Clinician-guided weight-loss care, with nutrition and movement support and optional personal coaching. Care for men's health and menopause, too.",
  openGraph: {
    siteName: brand.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
