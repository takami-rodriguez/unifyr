"use client";

import { Button } from "@/components/ui/button";
import AccordionList from "@/components/accordionList";
import { ButtonTypeProps } from "./platformHero/buttons";
import Link from "next/link";

type PlatformAccordionProps = {
  block: {
    items: {
      trigger: string;
      content: string;
    }[];
    cta: {
      title: string;
      content: string;
      button: ButtonTypeProps;
    };
  };
};

export default function PlatformAccordion({ block }: PlatformAccordionProps) {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="flex justify-between items-center space-x-64">
        <div className="w-full">
          <AccordionList items={block.items} />
        </div>
        {/* CTA Section */}
        <div className="space-y-5 max-w-[225px]">
          <h4 className="text-[#151439]/40 font-semibold tracking-wide uppercase">
            {block.cta.title}
          </h4>
          <p className="text-muted-foreground text-[1.25rem] leading-[33px]">{block.cta.content}</p>
          <div>

          <Link href={block.cta.button.link}>
            <Button variant={block.cta.button.variant}>
              {block.cta.button.label}
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
