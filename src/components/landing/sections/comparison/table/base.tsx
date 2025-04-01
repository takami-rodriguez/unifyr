import { FC, PropsWithChildren, ReactNode } from "react";

type ComparisonTableProps = PropsWithChildren<{
  left: ReactNode;
  right: ReactNode;
}>;
// TODO: Use <table> here for sake of keeping things semantic?
const ComparisonTable: FC<ComparisonTableProps> = ({
  left,
  right,
  children,
}) => {
  return (
    <div className="comparison grid grid-cols-3 gap-2">
      <div className="contents">
        <div />
        <div className="text-2xl p-8">{left}</div>
        <div className="text-2xl p-8">{right}</div>
      </div>
      <div className="contents">{children}</div>
    </div>
  );
};

export default ComparisonTable;
