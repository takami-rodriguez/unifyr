import React from "react";
import { Button } from "./ui/button";
import { bgGradient, gradientText } from "@/data/styleHelpers";

const Banner = async () => {
  return (
    <section className="px-5 max-w-[1400px] mx-auto">
      <div
        className="text-center space-y-6 py-10 sm:py-20 rounded-2xl"
        style={bgGradient}
      >
        <div className="flex flex-col items-center space-y-10 px-2 lg:px-0">
          <h2 className="text-4xl sm:text-6xl font-bold font-heading max-w-5xl mx-auto">
            Scalable and profitable channel partnerships start with{" "}
            <span style={gradientText}>Unifyr</span>
          </h2>
          <Button variant="outline"  className="max-w-xl">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
