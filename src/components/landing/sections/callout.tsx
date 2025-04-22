import { cn } from "@/lib/cn";

type CalloutProps = React.HTMLAttributes<HTMLDivElement>;

export default function Callout({ className, ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-12 rounded-lg bg-slate-300 px-20 py-14 text-center font-heading text-5xl font-bold leading-[3.5rem] text-grey-900 md:rounded-3xl",
        className,
      )}
      {...props}
    />
  );
}
