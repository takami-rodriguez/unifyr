import Logo from "../logo";
import { NavLink } from "@/data/navLinks";
import Link from "next/link";
import Navigation from "./navigation";

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between py-2.5">
      <Link href={`${NavLink.Home}`} className="h-[32px]">
        <Logo />
      </Link>
      <Navigation />
    </nav>
  );
}
