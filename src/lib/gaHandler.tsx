"use client";
import React, { useEffect } from "react";

const GAHandler = () => {
  const GTM_ID = process.env.GTM_ID!;
  const [consent, setConsent] = React.useState<string | undefined>();
// 
  useEffect(() => {
    const cookieConsent = document.cookie
    .split("; ")
    .find((row) => row.startsWith("unifyr-accept-cookie="))
    ?.split("=")[1];
    setConsent(cookieConsent);
  },[])
 
  return (
    <>
      {consent === "true" && (
        <>
          <script
            defer
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID || ""}`}
          />
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID || ""}', {
                page_path: window.location.pathname,
                debug_mode: true,
              });`,
            }}
          />
        </>
      )}
    </>
  );
};

export default GAHandler;
