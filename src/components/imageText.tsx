import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { gradientText } from "@/data/styleHelpers";

type ImageTextProps = {
  imageLeft?: boolean;
  badge: string;
  title: string;
  content: string;
  button?: {
    text: string;
    href: string;
  };
};

const ImageText = ({
  imageLeft,
  badge,
  title,
  content,
  button,
}: ImageTextProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 py-24 gap-8 items-center max-w-7xl mx-auto  bg-radial-elipse bg-contain bg-no-repeat bg-opacity-5",
        {
          "bg-right": imageLeft,
          "bg-left": !imageLeft,
        }
      )}
    >
      <div
        className={cn("col-span-1", {
          "lg:order-last": !imageLeft,
        })}
      >
        <AspectRatio ratio={16 / 9} className="relative ">
          <Image
            src="/images/image.png"
            alt="hero"
            className="object-cover object-center rounded-xl"
            fill
          />
        </AspectRatio>
      </div>
      <div className="col-span-1 space-y-10 flex flex-col items-start">
        <Badge variant="primary">
          <div className="uppercase" style={gradientText}>
            {badge}
          </div>
        </Badge>
        <h3 className="text-4xl font-heading">{title}</h3>
        <p className="text-xl font-light text-grey-900/80">{content}</p>
        {button && (
          <Link href={button.href}>
            <Button variant="primary">{button.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageText;
