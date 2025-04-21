"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import "./imageCompare.css";

type ImageCompareProps = {
  imageA: string;
  imageB: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export default function ImageCompare({
  imageA,
  imageB,
  ...props
}: ImageCompareProps) {
  return (
    <div {...props}>
      <ReactCompareSlider
        transition=".5s ease-in-out"
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              width: 40,
              height: 40,
              border: "none",
              background: "#3ca7d8",
            }}
            linesStyle={{
              background: "#3ca7d8",
              boxShadow: "none",
            }}
            className="imageCompare__handle"
          />
        }
        itemOne={<ReactCompareSliderImage src={imageA} alt="ImageOne" />}
        itemTwo={<ReactCompareSliderImage src={imageB} alt="ImageTwo" />}
      />
    </div>
  );
}
