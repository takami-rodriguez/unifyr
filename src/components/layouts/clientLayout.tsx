"use client";
import { NavLink } from "@/data/navLinks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const formPages =
    pathname.includes(NavLink.BookACall) || pathname.includes("/lp/");

  const bgStyles = () => {
    if (formPages) {
      return {
        background:
          "linear-gradient(110deg, rgba(215, 14, 134, 0.05) 20%, rgb(36, 56, 139,  0.05) 100%)",
      };
    }
    if (pathname.includes("/atlas")) {
      return {
        background:
          "background: radial-gradient(346.77% 164.16% at -14.13% 0.67%, rgba(215, 14, 134, 0.04) 1.65%, rgba(36, 56, 139, 0.05) 99.68%), #FFF",
      };
    } else {
      return {};
    }
  };

  return (
    <div className={cn({ "bg-grey-200/60": formPages })}>
      <div className={cn({ "bg-grey-100": !formPages })} style={bgStyles()}>
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
