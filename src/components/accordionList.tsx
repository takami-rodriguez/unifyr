"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type AccrodionListProps = {
  items: {
    trigger: string;
    content: string;
  }[];
};

export default function AccordionList({ items }: AccrodionListProps) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={items[0].trigger}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.trigger + i}
          value={item.trigger}
          className={cn("py-8",{"border-b-[2px] border-[#EBEAED]": i !== items.length - 1})}
        >
          <AccordionTrigger className="hover:no-underline" >
            <div className="flex items-center gap-2">
              <span className="text-base uppercase font-semibold tracking-[2px]">
                {item.trigger}
              </span>
              {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
            </div>
          </AccordionTrigger>
          <AccordionContent >
            <p className="text-muted-foreground text-lg pt-2 text-grey-900/80">{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
