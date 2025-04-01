import { default as CardBase, type CardProps } from "./card";
import {
  default as Rainbow,
  type RainbowCardProps,
  GradientType,
} from "./rainbow";

const Card = CardBase as typeof CardBase & {
  Rainbow: typeof Rainbow;
};
Card.Rainbow = Rainbow;

export type { CardProps, RainbowCardProps };
export default Card;
export { GradientType };
