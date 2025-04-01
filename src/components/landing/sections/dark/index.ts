import { default as DarkBase } from './base';
import { default as Stats } from './stats';

const Dark = DarkBase as typeof DarkBase & {
  Stats: typeof Stats;
}
Dark.Stats = Stats;
export default Dark;
