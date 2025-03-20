"use client";

import { gradientText } from "@/data/styleHelpers";
import React from "react";
import { renderToString } from "react-dom/server";

const LPPageTitle = ({
  title,
  highlightWord,
}: {
  title: string;
  highlightWord: string;
}) => {
  return (
    <h1
      className="font-heading text-5xl font-bold leading-[3.5rem] text-grey-900 md:pt-20 md:text-7xl md:leading-[5rem]"
      dangerouslySetInnerHTML={{
        __html: title.replace(
          new RegExp(`\\b${highlightWord}\\b`, "i"),
          (match) => renderToString(<span style={gradientText}>{match}</span>),
        ),
      }}
    />
  );
};

export default LPPageTitle;
