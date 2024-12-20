import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";
import G2Leaders from "@/app/(home)/components/g2Leaders";

const Footer = () => {
  return (
    <footer className="py-16">
      <div className="grid grid-cols-6 max-w-7xl mx-auto ">
        <div className="col-span-1 ">
          <Link href={NavLink.Home}>
            <div className="h-[40px] w-[121px]">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href={NavLink.About}>About</Link>
            </li>
            <li>
              <Link href={NavLink.Leadership}>Leadership</Link>
            </li>
            <li>
              <Link href={NavLink.Careers}>Careers</Link>
            </li>
            <li>
              <Link href={NavLink.Resources}>Blog</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li>
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li>
              <Link href={NavLink.Product}>Product</Link>
            </li>
            <li>
              <Link href={NavLink.Product}>Product</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold">Solutions</h4>
          <ul className="space-y-2">
            <li>
              <Link href={NavLink.Solutions}>Solutions</Link>
            </li>
            <li>
              <Link href={NavLink.Solutions}>Solutions</Link>
            </li>
            <li>
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
