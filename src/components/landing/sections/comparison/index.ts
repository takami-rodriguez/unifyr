import { default as ComparsionBase } from "./base";
import { default as Table } from "./table";
import { default as TwoSide } from "./twoSide";
import { default as TwoImages } from "./twoImages";

const Comparison = ComparsionBase as typeof ComparsionBase & {
  Table: typeof Table;
  TwoSide: typeof TwoSide;
  TwoImages: typeof TwoImages;
};
Comparison.Table = Table;
Comparison.TwoSide = TwoSide;
Comparison.TwoImages = TwoImages;

export default Comparison;
