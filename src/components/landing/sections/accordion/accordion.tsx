import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/cn";

import type { AccordionSingleProps } from "@radix-ui/react-accordion";

type AccordionProps = Partial<AccordionSingleProps> & {
  children: React.ReactNode[];
};

export default function AccordionBase({
  children,
  className,
  ...props
}: AccordionProps) {
  return (
    <Accordion className={cn('space-y-16 w-full', className)} {...props} type="single" collapsible>
      {children}
    </Accordion>
  );
}
