import { FC, ReactNode } from "react";
import "./table.css";
import { useTableBaseContext } from "./table";

type ComparisonTableRowProps = {
  feature: string;
  children: [ReactNode, ReactNode];
};
const ComparisonTableRow: FC<ComparisonTableRowProps> = ({
  feature,
  children,
}) => {
  const { left, right } = useTableBaseContext();
  return (
    <div className="row">
      <div className="heading">{feature}</div>
      <div className="left">
        <div className="header">{left}</div>
        {children[0]}
      </div>
      <div className="right">
        <div className="header">{right}</div>
        {children[1]}
      </div>
    </div>
  );
};
export default ComparisonTableRow;
