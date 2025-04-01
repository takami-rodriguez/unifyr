"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/cn";
import React, { useEffect } from "react";

type WistiaVideoProps = { id: string; className?: string };

const WistiaVideo = ({ id, className }: WistiaVideoProps) => {
  useEffect(() => {
    // Wistia embed code
    const script1 = document.createElement("script");
    script1.src = `https://fast.wistia.com/embed/medias/${id}.jsonp`;
    script1.async = true;
    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;
    const div = document.createElement("div");
    div.innerHTML = `<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_${id} seo=false videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/${id}/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>`;
    const container = document.getElementById("video-wrapper");
    console.log({ container });
    container?.appendChild(script1);
    container?.appendChild(script2);
    container?.appendChild(div);

    return () => {
      // Cleanup code
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [id]);
  return (
    <div className={cn("mx-auto my-12 max-w-[800px]", className)}>
      <AspectRatio
        className="relative rounded-2xl border border-gray-100 bg-grey-100 p-1"
        ratio={16 / 9}
      >
        <div id={"video-wrapper"}></div>
      </AspectRatio>
    </div>
  );
};

export default WistiaVideo;
