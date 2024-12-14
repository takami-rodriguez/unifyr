import { cn } from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";

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
    <div className="grid grid-cols-2 py-24 gap-8 items-center max-w-7xl mx-auto">
      <div className="col-span-1 space-y-10 flex flex-col items-start">
        <Badge variant="primary">
          <div
          className="uppercase"
            style={{
              background:
                "radial-gradient(330.41% 146% at 12.59% -31.25%, #D70E86 0%, #703B96 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
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
      <div
        className={cn("col-span-1", {
          "order-first": imageLeft,
        })}
      >
        <AspectRatio ratio={16 / 9} className="relative">
          <Image
            src="/images/image.png"
            alt="hero"
            className="object-cover object-center rounded-xl"
            fill
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default ImageText;
