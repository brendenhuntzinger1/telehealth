"use client";

import { Analytics } from "@vercel/analytics/next";

// Page-view analytics only. Skip the signed-in member portal and strip query
// strings so no health-related details ever leave the browser.
export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);
        if (url.pathname.startsWith("/portal")) return null;
        url.search = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
