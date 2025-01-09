import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";
import { socialLinks } from "@/data/config";

const Footer = () => {
  return (
    <footer className="py-16">
      <div className="flex justify-between max-w-5xl mx-auto ">
        <div className="col-span-1 ">
          <Link href={NavLink.Home}>
            <div className="h-[40px] w-[121px]">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Company</h4>
          <p>
            10 Times Square Building <br />
            1441 Broadway
            <br />
            New York, <br />
            NY 10018
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Product</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href={NavLink.Privacy}>Privacy Policy</Link>
            </li>
            <li className="text-lg">
              <Link href={NavLink.Terms}>Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-bold pb-2">Contact</h4>
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href="mailto:contact@unifyr.com">contact@unifyr.com</Link>
            </li>
          </ul>
        </div>
        <div className="cols-span-1">
          <div className="flex space-x-3">
            {socialLinks.map((l) => (
              <Link
                key={l.name}
                href={l.url}
                className="text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
