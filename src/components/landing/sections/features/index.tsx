import { default as FeaturesBase } from "./base";
import { default as Feature } from "./feature";

const FeaturesVertical = FeaturesBase as typeof FeaturesBase & {
  Feature: typeof Feature;
};
FeaturesVertical.Feature = Feature;

export default FeaturesVertical;
