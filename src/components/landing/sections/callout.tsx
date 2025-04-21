import { cn } from "@/lib/cn";

type CalloutProps = React.HTMLAttributes<HTMLDivElement>;

export default function Callout({ className, ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        "px-20 py-14 text-center rounded-lg md:rounded-3xl flex-col items-center flex gap-12 bg-slate-300 font-heading text-5xl font-bold leading-[3.5rem] text-grey-900",
        className,
      )}
      {...props}
    />
  );
}
