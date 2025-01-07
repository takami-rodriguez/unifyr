import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";
import G2Leaders from "@/app/(home)/components/g2Leaders";

const Footer = () => {
  return (
    <footer className="py-16">
      <div className="md:grid space-y-6 md:space-y-6  md:grid-cols-6 max-w-5xl mx-auto ">
        <div className="col-span-1 ">
          <Link href={NavLink.Home}>
            <div className="h-[40px] w-[121px]">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Company</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href={NavLink.About}>About</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Leadership}>Leadership</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Careers}>Careers</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Resources}>Blog</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Product</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Product}>Product</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Solutions</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href={NavLink.Solutions}>Solutions</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Solutions}>Solutions</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Solutions}>Solutions</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <G2Leaders />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
