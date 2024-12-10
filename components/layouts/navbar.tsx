import Logo from "./logo";
import { Button } from "../ui/button";
import { NavLink, navLinks } from "@/data/navLinks";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-2.5 max-w-7xl mx-auto">
      <Link href={NavLink.Home} className="h-[60px]">
        <Logo />
      </Link>
      <div className="flex items-center space-x-16">
        <ul className="flex items-center space-x-8">
          {navLinks.map((l) => (
            <li
              key={l.label + "navlink"}
              className="font-normal text-lg group relative"
            >
              <Link href={l.href} className="py-2 block">
                {l.label}
              </Link>
              <div className="hidden absolute -bottom-2 w-full group-hover:block border-b-2 border-black"></div>
            </li>
          ))}
        </ul>
        <Button variant={"primary"}>Primary action</Button>
      </div>
    </nav>
  );
}
