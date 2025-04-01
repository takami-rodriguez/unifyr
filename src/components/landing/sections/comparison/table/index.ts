import { default as ComparisonTableBase } from './base';
import { default as Row } from './row';

const ComparisonTable = ComparisonTableBase as typeof ComparisonTableBase & {
  Row: typeof Row;
};
ComparisonTable.Row = Row;
export default ComparisonTable;
