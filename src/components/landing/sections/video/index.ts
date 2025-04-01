import { default as VideoBase } from "./video";
import { default as Features } from "./features";

const Video = VideoBase as typeof VideoBase & {
  Features: typeof Features;
};
Video.Features = Features;

export default Video;
