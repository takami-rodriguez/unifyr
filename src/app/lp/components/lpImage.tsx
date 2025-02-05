import React from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { VisuallyHidden } from "radix-ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const LPImage = async ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="h-full w-full">
      <Dialog>
        <DialogTrigger className="h-full w-full">
          <AspectRatio
            ratio={2.9 / 2}
            className="relative -mx-3 overflow-hidden rounded-3xl border-[8px] border-[#F5F3FB]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="rounded-2xl border-[8px] border-white object-cover object-center"
            />
          </AspectRatio>
        </DialogTrigger>
        <DialogContent image>
          <VisuallyHidden.Root>
            <DialogTitle></DialogTitle>
          </VisuallyHidden.Root>
          <AspectRatio
            ratio={2.9 / 2}
            className="relative h-full w-full overflow-hidden"
          >
            <Image src={src} alt={alt} fill />
          </AspectRatio>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LPImage;
