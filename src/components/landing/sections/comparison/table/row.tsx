import { FC, ReactNode } from "react";
import './table.css';
import Card from "@/components/ui/card";

type ComparisonTableRowProps = {
  feature: string;
  children: [ReactNode, ReactNode];
};
const ComparisonTableRow: FC<ComparisonTableRowProps> = ({
  feature,
  children,
}) => {
  return (
    <div className="contents">
      <Card className="bg-indigo-400 text-white text-2xl font-semibold rounded-xl">{feature}</Card>
      <Card className="bg-slate-100 rounded-xl prose">{children[0]}</Card>
      <Card className="bg-indigo-200 rounded-xl prose">{children[1]}</Card>
    </div>
  );
};
export default ComparisonTableRow;
