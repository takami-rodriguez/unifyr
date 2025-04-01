import { cn } from "@/lib/cn";

export type CardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm ring-1 ring-inset ring-white",
        className,
      )}
      {...props}
    />
  );
}
