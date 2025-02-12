"use client";
import React from "react";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { Button, ButtonVariant } from "@/components/ui/button";
import Link from "next/link";
import { NavLink } from "@/data/navLinks";

export interface ButtonTypeProps {
  label: string;
  variant: ButtonVariant;
  link: NavLink | string;
}

type DualButtonsProps = {
  button1: ButtonTypeProps;
  button2: ButtonTypeProps;
};

const DualButtons = ({ button1, button2 }: DualButtonsProps) => {
  const { mobile, tablet } = useWindowSize();
  return (
    <div className="flex w-full">
      <Link href={button1.link} className="w-full">
        <Button variant={button1.variant} fullWidth={tablet || mobile}className="w-full">
          {button1.label}
        </Button>
      </Link>
      <Link href={button2.link} className="w-full">
        <Button variant={button2.variant} fullWidth={tablet || mobile} className="w-full">
          {button2.label}
        </Button>
      </Link>
    </div>
  );
};

export default DualButtons;
