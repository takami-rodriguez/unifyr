"use client";

import { LandingPageProps } from "@/data/landingPages";
import { gradientText } from "@/data/styleHelpers";
import React from "react";
import { renderToString } from "react-dom/server";

const LPPageTitle =  ({ data }: { data: LandingPageProps }) => {
  return (
    <h1
      className="font-heading text-[4.375rem] font-bold leading-[5rem]"
      dangerouslySetInnerHTML={{
        __html: data.title.replace(
          new RegExp(`\\b${data.titleHighlight}\\b`, "i"),
         (match) => renderToString(<span style={gradientText}>{match}</span>),
        ),
      }}
    />
  );
};

export default LPPageTitle;
