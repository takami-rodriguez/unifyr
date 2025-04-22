// TODO: Move to types once it's mature enough

export type BlockData = {
  description: string;
  title: string;
};

export type BlockDataWithIcon = BlockData & {
  icon: string;
};
