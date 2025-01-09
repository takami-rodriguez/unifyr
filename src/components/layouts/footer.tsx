import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";

const Footer = () => {
  return (
    <footer className="py-16">
      <div className="md:grid space-y-6 md:space-y-0  md:grid-cols-3 max-w-5xl mx-auto ">
        <div className="col-span-1 ">
          <Link href={NavLink.Home}>
            <div className="h-[40px] w-[121px]">
              <Logo />
            </div>
          </Link>
        </div>
       
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Resources</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href={NavLink.Resources}>Blog</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          {/* <G2Leaders /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
