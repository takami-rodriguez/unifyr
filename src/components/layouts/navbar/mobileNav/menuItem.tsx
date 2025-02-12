import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";
import NavDropdown from "../navDropdown";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  link,
}: {
  link:
    | {
        label: string;
        subMenu: {
          label: string;
          subTitle: string;
          link: NavLink;
          icon: React.JSX.Element;
        }[];
        link: string;
      }
    | {
        label: string;
        link: NavLink;
        subMenu?: undefined;
      };
}) => {
  return (
    <motion.li
      variants={variants}
      className="mb-5 flex w-full items-center text-lg text-blue-900 font-bold py-3 border-b border-grey"
    >
      {link.subMenu ? (
        <NavDropdown link={link.link} label={link.label} menu={link.subMenu} />
      ) : (
        <div className="flex flex-col items-center">
          <Link href={link.link}>{link.label}</Link>
        </div>
      )}
    </motion.li>
  );
};

