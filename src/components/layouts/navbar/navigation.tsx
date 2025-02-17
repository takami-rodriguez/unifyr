"use client";
import { Button, ButtonVariant } from "@/components/ui/button";
import { NavLink, navLinks } from "@/data/navLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavDropdown from "./navDropdown";
import { MobileNav } from "./mobileNav";

const Navigation = () => {
  const pathname = usePathname();
  if (!pathname.includes("/lp/")) {

    const getButtonColor = ():ButtonVariant => {
      switch (pathname) {
        case `${NavLink.PlatformZift}`:
          return "secondary";
        case `${NavLink.PlatformZift}`:
          return "secondary";
        case `${NavLink.PlatformUnifryPlus}`:
          return "unifyrPlus";
        default:
        return "primary";
      }

    }

    return (
      <>
        <div className="hidden items-center space-x-11 md:flex">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={cn("group relative text-lg leading-6 text-grey-900")}
              >
                {link.subMenu ? (
                  <NavDropdown
                    link={link.link}
                    label={link.label}
                    menu={link.subMenu}
                  />
                ) : (
                  <Link href={link.link} className="py-2">
                    {link.label}
                  </Link>
                )}
                <div className="absolute -bottom-2 hidden w-full border-b-2 border-black group-hover:block"></div>
              </li>
            ))}
          </ul>
          <div className="hidden sm:block">
            <Link href={NavLink.BookACall}>
              <Button variant={getButtonColor()}>Book a call</Button>
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </>
    );
  } else {
    return <div className="h-[40px] lg:h-[62px]"></div>;
  }
};

export default Navigation;
