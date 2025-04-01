import { cn } from "@/lib/cn";
import Image from "next/image";
import { BlockDataWithIcon } from "@/components/landing/types";

type FeatureProps = {
  className?: string;
} & BlockDataWithIcon;

const Feature = ({ icon, title, description, className }: FeatureProps) => {
  return (
    <div className={cn("flex space-x-4", className)}>
      <div className="relative h-10 w-10">
        <Image src={icon} fill alt={title} className="object-top md:-mt-1" />
      </div>
      <div className="max-w-sm space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
