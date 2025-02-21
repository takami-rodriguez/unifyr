import React from "react";
import { Button } from "./ui/button";
import { bgGradient, gradientText } from "@/data/styleHelpers";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";

const Banner = () => {
  return (
    <section className="mx-auto max-w-[1400px] lg:px-5">
      <div
        className="space-y-6 rounded-2xl py-10 text-center sm:py-20"
        style={bgGradient}
      >
        <div className="flex flex-col items-center space-y-10 px-2 lg:px-0">
          <h2 className="mx-auto max-w-5xl font-heading text-4xl font-bold sm:text-6xl">
            Scalable and profitable channel partnerships start with{" "}
            <span style={gradientText}>Unifyr</span>
          </h2>
          <Link href={NavLink.BookACall}>
            <Button variant="outline" className="max-w-xl">
              Book a call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
