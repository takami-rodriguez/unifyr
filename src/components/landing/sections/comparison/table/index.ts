import { default as ComparisonTableBase } from './table';
import { default as Row } from './row';

const ComparisonTable = ComparisonTableBase as typeof ComparisonTableBase & {
  Row: typeof Row;
};
ComparisonTable.Row = Row;
export default ComparisonTable;
