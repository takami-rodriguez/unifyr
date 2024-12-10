import React from "react";
import { Button } from "./ui/button";

const Banner = async () => {
  return (
    <section className="px-5">
      <div
        className="text-center space-y-6 py-10 rounded-2xl"
        style={{
          background:
            "radial-gradient(461.91% 160.49% at 17.47% -33.36%, rgba(215, 14, 134, 0.04) 0%, rgba(36, 56, 139, 0.05) 99.68%)",
        }}
      >
        <div className="flex flex-col items-center space-y-10">
          <h2 className="text-6xl font-heading max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur.
          </h2>
          <Button variant="outline" size="lg" className="max-w-xl">
            Secondary action
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
