import React, { ReactNode } from "react";
import Testimonial from "@/components/testimonial";

const LPLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="pb-24 md:pb-20">
      {children}
      <div className="mx-auto mt-10 max-w-5xl lg:mt-20">
        <Testimonial />
      </div>
    </main>
  );
};

export default LPLayout;
