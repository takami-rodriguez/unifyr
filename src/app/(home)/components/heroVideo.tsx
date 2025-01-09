"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { Suspense } from "react";
import ReactPlayer from "react-player";

const HeroVideo = () => {
  return (
    <div className="max-w-4xl my-12 mx-auto px-32">
      {/* <Suspense>
        <AspectRatio className="relative" ratio={16 / 9}>
          <ReactPlayer url="https://zift-solutions.wistia.com/medias/zhjsfv098n" style={{margin: "0 auto"}} />
        </AspectRatio>
      </Suspense> */}
    </div>
  );
};

export default HeroVideo;
