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
      <div className="flex items-center justify-between space-x-64">
        <div className="w-full">
          <AccordionList items={block.items} />
        </div>
        {/* CTA Section */}
        <div className="max-w-[225px] space-y-5">
          <h4 className="font-semibold uppercase tracking-wide text-[#151439]/40">
            {block.cta.title}
          </h4>
          <p className="text-muted-foreground text-[1.25rem] leading-[33px]">
            {block.cta.content}
          </p>
          <div className="w-full">
            <Link href={block.cta.button.link}>
              <Button variant={block.cta.button.variant} className="w-full">
                {block.cta.button.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
