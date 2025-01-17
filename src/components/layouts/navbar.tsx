import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { NavLink, navLinks } from "@/data/navLinks";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-2.5 max-w-5xl mx-auto w-full">
      <Link href={`${NavLink.Home}`} className="h-[32px]">
        <Logo />
      </Link>
      <div className="flex items-center space-x-11">
        <ul className="flex items-center space-x-8">
          {navLinks.map((l) => (
            <li
              key={l.label + "navLink"}
              className=" text-lg group relative leading-6 text-grey-900"
            >
              <Link href={l.href} className="py-2 block">
                {l.label}
              </Link>
              <div className="hidden absolute -bottom-2 w-full group-hover:block border-b-2 border-black"></div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          <Link href={NavLink.BookACall}>
            <Button variant={"primary"}>Book a call</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}