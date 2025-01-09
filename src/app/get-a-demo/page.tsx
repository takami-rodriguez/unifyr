import React from "react";
import G2Leaders from "../(home)/components/g2Leaders";
import GetInTouch from "@/components/forms/getInTouch";
import { gradientText } from "@/data/styleHelpers";

const GetADemo = async () => {
  return (
    <div
      className="max-w-5xl mx-auto py-12"
     
    >
      <div className="grid grid-cols-1 lg:grid-cols-7 items-center gap-16">
        <div className="space-y-8 col-span-4">
          <h3 className="font-heading text-[4.375rem] leading-[5rem] font-bold">
            <span style={gradientText}>Lorem</span> ipsum dolor sit amet
          </h3>
          <p>
            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
            ultricies sed, dolor. Cras elementum ultrices diam et faucibus
            auctor. Curabitur a nisi eu lacus tempor blandit. Integer convallis
            vehicula nisi, vel tincidunt nunc viverra nec.
          </p>
          <G2Leaders />
        </div>
        <div className="col-span-3">
          <GetInTouch />
        </div>
      </div>
    </div>
  );
};

export default GetADemo;
