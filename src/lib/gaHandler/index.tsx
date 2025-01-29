"use client";
import { useEffect } from "react";
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google";

export default function Google() {
  useEffect(() => {
    sendGTMEvent({
      event: "page_view",
      page_location: window.location.href,
      page_referrer: document.referrer,
    });

    // Check if consent cookie exists
    const consentGiven = document.cookie
      .split("; ")
      .find((row) => row.startsWith("unifyr-accept-cookie="))
      ?.split("=")[1];

    // Declare dataLayer if it doesn't exist
    function gtag(
      p0: string,
      p1: string,
      p2: {
        ad_storage: string;
        analytics_storage: string;
        functionality_storage: string;
        personalization_storage: string;
        security_storage: string;
      },
    ) {
      sendGTMEvent({ p0, p1, p2 });
    }

    // If the consent cookie exists and is set to 'true', grant permissions
    if (consentGiven === "true") {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
    } else {
      // Set default settings to 'denied' if no consent cookie is found
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "denied",
      });
    }

    // Listen for the loadGTM event
    window.addEventListener("updateGTMConsent", () => {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
      sendGTMEvent({
        event: "cookie_consent_given",
      });
    });
  });

  return (
    <>
      <GoogleTagManager gtmId="GTM-M7FXHB83" />
    </>
  );
}
