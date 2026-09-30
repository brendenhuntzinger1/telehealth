import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import { brand } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Weight-loss care built around you`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Clinician-guided weight-loss care with practical nutrition and movement support, and optional personal coaching. Medication only when appropriate.",
  openGraph: { siteName: brand.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fffcf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-dvh">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
