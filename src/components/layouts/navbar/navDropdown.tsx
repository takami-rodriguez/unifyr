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
    link: NavLink | string;
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
            className={clsx("hover: h-4 w-4", {
              "rotate-180 transform": open,
            })}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-2xl bg-white shadow-2xl"
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
              target={subLink.link.includes("http") ? "_blank" : "_self"}
              className="flex h-full w-full space-x-6 rounded-xl px-4 py-5 group-hover:bg-grey-200"
            >
              <div className="space-y-2 text-grey-900/80">
                <p className="text-xl">{subLink.label}</p>
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
