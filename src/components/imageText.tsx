"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { gradientText } from "@/data/styleHelpers";
import BGRadialSVG from "./bgRadiant";
import { usePathname } from "next/navigation";
import { ButtonTypeProps } from "@/app/platform/components/platformHero/buttons";

type ImageTextProps = {
  imageLeft?: boolean;
  image: string;
  badge: string;
  title: string;
  content: string;
  button?: ButtonTypeProps;
  rounded?: boolean;
};

const ImageText = ({
  imageLeft,
  badge,
  title,
  content,
  button,
  image,
  rounded
}: ImageTextProps) => {
  const pathname = usePathname();
  return (
    <div className="md:py-18 relative z-10 mx-auto max-w-5xl py-16">
      <div
        className={cn(
          "absolute top-10 z-0 w-full md:-top-20 md:h-[120%] lg:w-1/2",
          {
            "left-0": !imageLeft,
            "right-0": imageLeft,
          },
        )}
      >
        <BGRadialSVG />
      </div>
      <div className="relative z-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-11 lg:gap-[52px]">
        <div className="col-span-1 flex flex-col items-start space-y-6 lg:col-span-6">
          <Badge variant="secondary" className="text-sm">
            <div
              className={cn("uppercase tracking-[0.7px]", {
                "text-secondary": pathname !== "/",
              })}
              style={pathname === "/" ? gradientText : {}}
            >
              {badge}
            </div>
          </Badge>
          <h3 className="font-heading text-5xl font-bold">{title}</h3>
          <p className="text-xl font-light text-grey-900/80">{content}</p>
          {button && (
            <Link href={button.link}>
              <Button variant={button.variant}>{button.label}</Button>
            </Link>
          )}
        </div>
        <div
          className={cn(
            "col-span-1 px-6 sm:px-20 md:px-32 lg:col-span-5 lg:px-0",
            {
              "lg:order-first": imageLeft,
            },
          )}
        >
          <AspectRatio ratio={4.5 / 3.5} className="relative">
            <Image
              src={image}
              alt="hero"
              className={cn("object-center",{
                "rounded-xl object-cover": rounded,
                "object-contain": !rounded,
              })}
              fill
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default ImageText;
