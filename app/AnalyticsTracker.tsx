"use client";

import { useEffect } from "react";

type GeoResponse = {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
};

export default function AnalyticsTracker() {
  useEffect(() => {
    async function recordPublicLocation() {
      try {
        // This request is made by the visitor's browser, so it sees the
        // visitor's public IP even when the app is tested on localhost.
        const geoResponse = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!geoResponse.ok) return;
        const geo = await geoResponse.json() as GeoResponse;
        if (!geo.ip) return;

        await fetch("/api/analytics/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ip: geo.ip,
            city: geo.city,
            region: geo.region,
            country: geo.country_name,
          }),
        });
      } catch {
        // Analytics must never affect the visitor's landing-page experience.
      }
    }

    void recordPublicLocation();
  }, []);

  return null;
}
