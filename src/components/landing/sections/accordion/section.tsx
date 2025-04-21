"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useId } from "react";

type AccordionSectionProps = React.PropsWithChildren<{
  title: React.ReactNode;
}>;

export default function AccordionSection({
  title,
  children,
}: AccordionSectionProps) {
  const id = useId();
  return (
    <AccordionItem value={id} className="mx-auto max-w-6xl">
      <AccordionTrigger className="text-base text-left font-semibold uppercase tracking-[3px]">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-0 pt-10 text-lg text-gray-700">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
