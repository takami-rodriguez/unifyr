import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { gradientText } from "@/data/styleHelpers";
import BGRadialSVG from "./bgRadiant";

type ImageTextProps = {
  imageLeft?: boolean;
  image: string;
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
  image,
}: ImageTextProps) => {
  return (
    <div className=" py-10 md:py-24 max-w-5xl mx-auto relative z-10">
      <div
        className={cn("absolute top-10 md:-top-20  md:h-[120%] lg:w-1/2 z-0", {
          "left-0": !imageLeft,
          "right-0": imageLeft,
        })}
      >
        <BGRadialSVG />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-11 relative z-20 gap-8 lg:gap-[52px] items-center ">
        <div className="col-span-1  lg:col-span-6 space-y-6 flex flex-col items-start">
          <Badge variant="primary">
            <div className="uppercase tracking-[0.7px]" style={gradientText}>
              {badge}
            </div>
          </Badge>
          <h3 className="text-5xl font-heading font-bold">{title}</h3>
          <p className="text-xl font-light text-grey-900/80">{content}</p>
          {button && (
            <Link href={button.href}>
              <Button variant="primary">{button.text}</Button>
            </Link>
          )}
        </div>
        <div
          className={cn("col-span-1 lg:col-span-5", {
            "lg:order-first": imageLeft,
          })}
        >
          <AspectRatio ratio={5 / 4} className="relative ">
            <Image
              src={image}
              alt="hero"
              className="object-contain object-center rounded-xl"
              fill
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default ImageText;
