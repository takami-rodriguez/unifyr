import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

type TimelineProps = {
  block: {
    badge: string;
    years: {
      year: string;
      months: {
        month: string;
        colour: string;
        content: string;
      }[];
    }[];
  };
};
const Timeline = ({ block }: TimelineProps): JSX.Element => {
  return (
    <div className="relative bg-white pb-10 md:pb-20">
      <div className="absolute -top-4 w-full pl-4 sm:pl-12 md:pl-10 lg:pl-20 2xl:pl-0">
        <div className="max-w-5xl mx-auto">
          <Badge variant="primary">
            <div className={cn("uppercase tracking-[0.7px] text-primary")}>
              {block.badge}
            </div>
          </Badge>
        </div>
      </div>
      <div className="scrollbar-hide active:scrollbar-default hover:scrollbar-default touch:scrollbar-default scrollbar scrollbar-thumb-blue-900 scrollbar-track-grey overflow-x-scroll">
        <div className="bg-white py-10 pl-4 sm:pl-12 md:py-20 md:pl-10 lg:pl-20 2xl:pl-0">
          <div className="max-w-5xl mx-auto flex space-x-6">
            {block.years.map((year) => (
              <div
                key={year.year + year.months[0].month}
                className="flex min-w-[330px] flex-col space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <h4 className="text-6xl !leading-[1.2]">
                    {year.year}
                  </h4>
                  <div className="w-full border-b-2 border-dashed border-black"></div>
                </div>
                <div className="flex flex-col items-start space-y-6 pr-5">
                  {year.months.map((month) => (
                    <div
                      key={month.month + month.content}
                      className="flex flex-col space-y-4"
                    >
                      <div className="flex">
                        <div
                          className={clsx(
                            "rounded-md px-2 font-bold",
                            // getBGColor(month.colour),
                          )}
                        >
                          {month.month}
                        </div>
                      </div>
                      <div className="text-base font-medium text-grey-900/80 sm:text-lg">
                        {month.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
