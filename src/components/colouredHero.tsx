"use client"
import React, { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type ColouredHeroProps = {
  title: string;
  subTitle?: string;
  children?: ReactNode;
  fullWidth?: boolean;
};

const ColouredHero = ({
  title,
  children,
  subTitle,
  fullWidth = false,
}: ColouredHeroProps) => {
  const pathname = usePathname();
  const isBlog = pathname.split("/").length > 3;

  return (
    <div>
      <div className={"bg-grey-100"}>
        <div className="relative overflow-hidden pt-4">
          <div className="relative z-100  space-y-4 pt-6 sm:pt-24 pb-52 sm:pb-64 ">
            <h3
              className={clsx(
                "  text-blue-900 max-w-4xl mx-auto text-center px-5",
                {
                  " text-3xl sm:text-5xl md:text-6.5xl leading-[48px] sm:leading-[57.6px] md:leading-[80px]":
                    isBlog,
                  " text-5xl sm:text-6.5xl md:text-[88px] leading-[57.6px] sm:leading-[80px] md:leading-[105.6px] ":
                    !isBlog,
                  "pb-20": !subTitle,
                }
              )}
            >
              {title}
            </h3>
            {subTitle && (
              <p className=" text-blue-900 pb-16 lg:pb-10 max-w-2xl mx-auto text-center px-5 ">
                {subTitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {children && (
        <div
          className={clsx("bg-grey h-full w-full relative md:px-10 lg:px-20", {
            "px-5": !fullWidth,
          })}
        >
          <div
            className={clsx(" max-w-7xl mx-auto  bg-grey -mt-20 pt-2 pb-20")}
          >
            <div
              className={clsx(
                "max-w-7xl mx-auto rounded-2xl  bg-white -mt-44",
                {
                  "shadow-2xl": isBlog,
                }
              )}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColouredHero;
