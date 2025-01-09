"use client";
import React from "react";

const GAHandler = () => {
  const GTM_ID = process.env.GTM_ID!;
  //  get the cookie value
  const consent = document.cookie
    .split("; ")
    .find((row) => row.startsWith("unifyr-accept-cookie="))
    ?.split("=")[1];
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
