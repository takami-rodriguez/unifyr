"use client";

import WistiaVideo from "@/components/wistiaVideo";
import { Suspense, type PropsWithChildren } from "react";
import { BlockData } from "@/components/landing/types";

export type VideoSectionProps = {
  wistiaVideoId: string;
} & Partial<BlockData>;

const VideoSection = ({
  title,
  description,
  wistiaVideoId,
}: PropsWithChildren<VideoSectionProps>) => {
  return (
    <section className="mx-auto w-full max-w-screen-md">
      {title && (
        <h2 className="pb-6 text-center font-heading text-4xl font-extrabold md:text-5xl md:leading-[3.5rem]">
          {title}
        </h2>
      )}
      {description && (
        <p className="mx-auto max-w-[800px] text-center md:text-[1.375rem]">
          {description}
        </p>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <WistiaVideo id={wistiaVideoId} className="max-w-6xl" />
      </Suspense>
    </section>
  );
};

export default VideoSection;
