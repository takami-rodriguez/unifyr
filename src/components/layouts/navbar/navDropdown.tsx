"use client";
import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown";
import { FaChevronDown } from "react-icons/fa6";
import clsx from "clsx";
import { NavLink } from "@/data/navLinks";

type NavDropdownProps = {
  menu: {
    label: string;
    subTitle?: string;
    link: NavLink;
  }[];
  label: string;
  link: string;
};

const NavDropdown = ({ menu, label }: NavDropdownProps): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="group">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div>{label}</div>
           
          </div>
          <FaChevronDown
            className={clsx(" w-4 h-4 hover: ", {
              "transform rotate-180 text-primary": open,
            })}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white rounded-2xl shadow-2xl "
        align="start"
      >
        {menu.map((subLink) => (
          <DropdownMenuItem
            key={subLink.label}
            className="group"
            onClick={() => setOpen((o) => !o)}
          >
            <Link
              href={subLink.link}
              className="w-full h-full  group-hover:underline flex space-x-6 py-5 group-hover:bg-grey-200  px-4 rounded-xl"
            >
              <div className="space-y-2 text-grey-900/80">
                <p className="font-bold text-xl">{subLink.label}</p>
               {subLink.subTitle && <p className="">{subLink.subTitle}</p>}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown;
