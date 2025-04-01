import { ReactNode } from "react";

// TODO: Move to types once it's mature enough

export type BlockData = {
  description: ReactNode;
  title: ReactNode;
};

export type BlockDataWithIcon = BlockData & {
  icon: string;
};
