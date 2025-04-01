import Card, { type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import Image from "next/image";

type PartnersProps = {
  title: string;
} & CardProps;

export default function Partners({
  title,
  className,
  ...props
}: PartnersProps) {
  return (
    <Card
      className={cn("flex flex-col gap-12 bg-slate-100 py-12", className)}
      {...props}
    >
      <h3 className="text-center text-3xl font-semibold">{title}</h3>
      <div className="mx-20 flex flex-col items-center justify-center gap-14 overflow-hidden lg:flex-row">
        <Image
          width={48}
          height={48}
          className="h-12 w-auto"
          src="/images/partners/Amazon.svg"
          alt="Amazon"
        />
        <Image
          width={48}
          height={48}
          className="h-11 w-auto"
          src="/images/partners/Att.svg"
          alt="AT&T"
        />
        <Image
          width={48}
          height={48}
          className="h-13 w-auto"
          src="/images/partners/LG.svg"
          alt="LG"
        />
        <Image
          width={48}
          height={48}
          className="h-8 w-auto"
          src="/images/partners/DELL.svg"
          alt="DELL"
        />
        <Image
          width={48}
          height={48}
          className="h-12 w-auto"
          src="/images/partners/Cisco.svg"
          alt="Cisco"
        />
      </div>
    </Card>
  );
}
