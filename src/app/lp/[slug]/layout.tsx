import React, { ReactNode } from "react";
import Partners from "@/components/partners";
import { boxShadow } from "@/data/styleHelpers";
import Testimonial from "@/components/testimonial";

const LPLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto max-w-5xl pb-24 pt-12 md:pb-20">
      {children}
      <div
        className="mt-10 space-y-6 rounded-2xl border-[1.5px] border-white bg-white/30 px-4 lg:-mx-2 lg:mt-20 lg:px-14"
        style={boxShadow}
      >
        <Partners />
      </div>
      <div className="mt-10 lg:mt-20">
        <Testimonial />
      </div>
    </main>
  );
};

export default LPLayout;
