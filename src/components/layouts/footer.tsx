import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { NavLink } from "@/data/navLinks";
import { socialLinks } from "@/data/config";

const Footer = () => {
  return (
    <footer className="bg-white px-4 py-16 md:px-5">
      <div className="mx-auto flex max-w-5xl flex-col flex-wrap justify-between space-y-8 border-b border-gray-200 pb-8 sm:flex-row sm:space-y-0">
        <div className="col-span-1 flex h-full min-h-32 flex-col justify-between">
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
        <div className="flex flex-col space-y-8 sm:flex-row sm:space-x-16 sm:space-y-0">
          <div className="col-span-1">
            <h4 className="pb-2 text-lg font-bold">Company</h4>
            <p className="text-grey-900/80">
              Zift Solutions dba Unifyr
              <br />
              964 High House Rd #3330
              <br />
              Cary, NC 27513
              <br />
              United States
            </p>
          </div>
          <div className="col-span-1">
            <h4 className="pb-2 text-lg font-bold">Resources</h4>
            <ul className="space-y-2">
              <li className="text-grey-900/80">
                <Link href={NavLink.Blog}>Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-between space-y-4 pt-4 sm:flex-row sm:space-y-0">
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
        <div className="w-full">
          <p className="text-grey-900/80">
            © {new Date().getFullYear()} Unifyr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
