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
  return (
    <div className={cn({ "bg-grey-200": formPages })}>
      <div
        className={cn({ "bg-grey-100": !formPages })}
        style={
          formPages
            ? {
                background:
                  "linear-gradient(140deg, rgba(215, 14, 134, 0.04) 2.08%, rgba(36, 56, 139, 0.05) 91.51%)",
              }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
