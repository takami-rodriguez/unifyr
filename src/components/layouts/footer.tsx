import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";
import { socialLinks } from "@/data/config";

const Footer = () => {
  return (
    <footer className="py-16 bg-white px-4 md:px-5">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between max-w-5xl mx-auto border-b border-gray-200 pb-8 space-y-8 sm:space-y-0">
        <div className="col-span-1 flex flex-col justify-between h-full min-h-32">
          <Link href={NavLink.Home}>
            <div className="h-[40px] w-[121px]">
              <Logo />
            </div>
          </Link>
          <div className="flex space-x-3">
            {socialLinks.map((l) => (
              <Link
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex sm:space-x-16 flex-col sm:flex-row space-y-8 sm:space-y-0">
          <div className="col-span-1">
            <h4 className="text-lg font-bold pb-2">Company</h4>
            <p className="text-grey-900/80">
              6501 Weston Parkway, <br />
               Suite 200 Cary, <br />
               NC 27513
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="text-lg font-bold pb-2">Resources</h4>
            <ul className="space-y-2">
              <li className="text-grey-900/80">
                <Link href={NavLink.Resources}>Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto w-full justify-between flex pt-4 flex-col sm:flex-row space-y-4 sm:space-y-0">
        <div className="sm:order-last">
          <ul className="flex space-x-6 text-grey-900/80">
            <li className="min-w-28 sm:text-right">
              <Link href={NavLink.Privacy}>Privacy Policy</Link>
            </li>
            <li className="min-w-28 sm:text-right">
              <Link href={NavLink.Terms}>Terms of Use</Link>
            </li>
          </ul>
        </div>
        <div className="w-full ">
          <p className=" text-grey-900/80">
            © {new Date().getFullYear()} Unifyr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
