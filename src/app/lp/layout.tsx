import React, { ReactNode } from "react";
import Partners from "@/components/partners";
import { boxShadow } from "@/data/styleHelpers";
import Testimonial from "@/components/testimonial";

const LPLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="pb-24 pt-12 md:pb-20">
      {children}
      <div
        className="mx-auto mt-10 max-w-5xl space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-4 lg:mt-20 lg:px-14"
        style={boxShadow}
      >
        <div className="lg:-mx-2">
          <Partners />
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-5xl lg:mt-20">
        <Testimonial />
      </div>
    </main>
  );
};

export default LPLayout;
