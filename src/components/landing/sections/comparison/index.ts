import { default as ComparsionBase } from "./base";
import { default as Table } from "./table";

const Comparison = ComparsionBase as typeof ComparsionBase & {
  Table: typeof Table;
};
Comparison.Table = Table;

export default Comparison;
