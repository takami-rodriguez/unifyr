"use client";

import { LandingPageProps } from "@/data/landingPages";
import { gradientText } from "@/data/styleHelpers";
import React from "react";
import { renderToString } from "react-dom/server";

const LPPageTitle =  ({ data }: { data: LandingPageProps }) => {
  return (
    <h1
      className="font-heading text-5xl leading-[3.5rem] md:pt-20 md:text-center md:text-7xl md:leading-[5rem] font-bold  text-grey-900"
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
