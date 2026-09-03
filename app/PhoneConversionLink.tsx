"use client";

import type { MouseEvent, ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function PhoneConversionLink({ phone, children }: { phone: string; children: ReactNode }) {
  const href = `tel:${phone.replace(/-/g, "")}`;

  function reportConversion(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.gtag) return;

    event.preventDefault();
    let navigated = false;
    const openDialer = () => {
      if (navigated) return;
      navigated = true;
      window.location.href = href;
    };

    window.gtag("event", "conversion", {
      send_to: "AW-18398280638/DDfRCJ6cru0cEL73_cRE",
      value: 1.0,
      currency: "TWD",
      event_callback: openDialer,
    });
    window.setTimeout(openDialer, 1000);
  }

  return <a href={href} onClick={reportConversion}>{children}</a>;
}
