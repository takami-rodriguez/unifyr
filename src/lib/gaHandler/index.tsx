"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const pageview = (url: string) => {
  window.dataLayer?.push({
    event: "pageview",
    page: url,
  });
};
import Script from "next/script";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const GTM_ID = process.env.GTM_ID!;
    if (pathname) {
      pageview(pathname);
    }

    // Function to load GTM dynamically
    const loadGTM = () => {
      const script = document.createElement("script");
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: (script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', "GTM-M7FXHB83");
      `),
        }}
      />;
      document.body.appendChild(script);
    };

    // Load GTM immediately
    loadGTM();
    // Declare dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    function gtag(
      p0: string,
      p1: string,
      p2: {
        ad_storage: string;
        analytics_storage: string;
        functionality_storage: string;
        personalization_storage: string;
        security_storage: string;
      }
    ) {
      window.dataLayer?.push({ p0, p1, p2 });
    }

    // Check if consent cookie exists
    const consentGiven = document.cookie
      .split("; ")
      .find((row) => row.startsWith("unifyr-accept-cookie="))
      ?.split("=")[1];

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
      if (typeof window.dataLayer !== "undefined") {
        gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          functionality_storage: "granted",
          personalization_storage: "granted",
          security_storage: "granted",
        });
        window.dataLayer.push({
          event: "cookie_consent_given",
        });
      }
    });
  }, [pathname, searchParams]);

  return <></>;
}
