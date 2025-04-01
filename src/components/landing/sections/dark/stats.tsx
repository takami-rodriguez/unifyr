import { PropsWithChildren, FC } from "react";

export const StatsBase = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-between gap-4 w-full">{children}</div>;
};

type StatProps = { title: string; percent: number };
const Stat: FC<StatProps> = ({ title, percent }) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="text-6xl text-yellow-400">{percent}%</div>
      <div>{title}</div>
    </div>
  );
};

const Stats = StatsBase as typeof StatsBase & {
  Stat: typeof Stat;
};
Stats.Stat = Stat;
export default Stats;
