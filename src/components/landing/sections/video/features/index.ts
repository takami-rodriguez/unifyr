import { default as FeaturesBase } from "./base";
import { default as Feature } from "./feature";

const VideoVeatures = FeaturesBase as typeof FeaturesBase & {
  Feature: typeof Feature;
};
VideoVeatures.Feature = Feature;

export default VideoVeatures;
