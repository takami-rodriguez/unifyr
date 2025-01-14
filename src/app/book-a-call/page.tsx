import React from "react";
import G2Leaders from "../(home)/components/g2Leaders";
import GetInTouch from "@/components/forms/getInTouch";
import { gradientText } from "@/data/styleHelpers";
import { Check } from "lucide-react";

const listItems = [
  "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
  "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
  "Integer convallis vehicula nisi, vel tincidunt nunc viverra nec. ",
];

const GetADemo = async () => {
  return (
    <div className="max-w-5xl mx-auto pt-12 pb-32 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-7 items-center gap-16 w-full">
        <div className="space-y-10 lg:col-span-4">
          <h3 className="font-heading text-[4.375rem] leading-[5rem] font-bold ">
            <span style={gradientText}>Lorem</span> ipsum dolor sit amet
          </h3>
          <p className="text-grey-900/70 text-lg">
            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
            ultricies sed, dolor. Cras elementum ultrices diam et faucibus
            auctor. Curabitur a nisi eu lacus tempor blandit. Integer convallis
            vehicula nisi, vel tincidunt nunc viverra nec.
          </p>
          <ul className="text-grey-900/70 text-lg space-y-4">
            {listItems.map((item, index) => (
              <li key={item + index} className="flex space-x-3 items-center">
                <div className="bg-gradient p-1 rounded-full text-white h-6 w-6">
                  <Check size={"sm"} />
                </div>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <G2Leaders />
        </div>
        <div className="lg:col-span-3">
          <GetInTouch id="1859"/>
        </div>
      </div>
    </div>
  );
};

export default GetADemo;
