import Card, { CardGradient } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type TwoSideProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  children: [React.ReactNode, React.ReactNode];
};

export default function TwoSide({
  className,
  children,
  ...props
}: TwoSideProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-8 md:flex-row",
        className,
      )}
      {...props}
    >
      <Card.Rainbow
        className="flex-1"
        innerClassName="flex flex-col gap-4"
        type={CardGradient.Red}
      >
        {children[0]}
      </Card.Rainbow>
      <Card.Rainbow
        className="flex-1"
        innerClassName="flex flex-col gap-4"
        type={CardGradient.Purple}
      >
        {children[1]}
      </Card.Rainbow>
    </div>
  );
}
