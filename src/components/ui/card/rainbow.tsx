import { cn } from "@/lib/cn";
import Card from "./card";

export enum GradientType {
  Red = "red",
  Green = "green",
  Purple = "purple",
}

export type RainbowCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  innerClassName?: string;
  type?: GradientType;
};

export default function RainbowCard({
  className,
  children,
  innerClassName,
  type = GradientType.Green,
  ...props
}: RainbowCardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-white p-[5px] shadow-md",
        {
          "bg-gradient-to-br from-[#0ED77940] to-[#703B9640]":
            type === GradientType.Green,
          "bg-gradient-to-br from-[#703B9640] to-[#703B9650]":
            type === GradientType.Purple,
          "bg-gradient-to-br from-[#D70E8640] to-[#FF492C40]":
            type === GradientType.Red,
        },
        className,
      )}
      {...props}
    >
      <Card className={cn("size-full border-none bg-white/90", innerClassName)}>
        {children}
      </Card>
    </div>
  );
}

RainbowCard.displayName = "Card.Rainbow";
