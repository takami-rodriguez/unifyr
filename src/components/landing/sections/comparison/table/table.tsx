import { cn } from "@/lib/cn";
import React from "react";

type BaseProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const BaseContext = React.createContext<BaseProps | null>(null);

export const useTableBaseContext = (): BaseProps => {
  const props = React.use(BaseContext);
  if (!props) {
    throw new Error(
      "Comparison.Table.Row must be used within a Comparison.Table component",
    );
  }
  return props;
};

type ComparisonTableProps = React.HTMLAttributes<HTMLDivElement> & BaseProps;

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  left,
  right,
  className,
  children,
  ...props
}) => {
  return (
    <BaseContext.Provider value={{ left, right }}>
      <div
        className={cn(
          "u-comparison md:grid md:grid-cols-3 md:gap-2",
          className,
        )}
        {...props}
      >
        <div className="u-table-head">
          <div />
          <div className="u-table-head-cell left">{left}</div>
          <div className="u-table-head-cell right">{right}</div>
        </div>
        <div className="u-table">{children}</div>
      </div>
    </BaseContext.Provider>
  );
};

export default ComparisonTable;
