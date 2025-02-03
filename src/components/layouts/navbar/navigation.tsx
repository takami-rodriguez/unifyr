"use client";
import { Button } from "@/components/ui/button";
import { NavLink, navLinks } from "@/data/navLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathname = usePathname();
  if (!pathname.includes("/lp/")) {
    return (
      <div className="flex items-center space-x-11">
        <ul className="flex items-center space-x-8">
          {navLinks.map((l) => (
            <li
              key={l.label + "navLink"}
              className="group relative text-lg leading-6 text-grey-900"
            >
              <Link href={l.href} className="block py-2">
                {l.label}
              </Link>
              <div className="absolute -bottom-2 hidden w-full border-b-2 border-black group-hover:block"></div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          <Link href={NavLink.BookACall}>
            <Button variant={"primary"}>Book a call</Button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Navigation;
