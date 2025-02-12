import * as React from "react";

export const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <svg
    width="23"
    height="23"
    className=" cursor-pointer "
    viewBox="0 0 23 23"
    onClick={toggle}
  >
    <path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      d="M 2 2.5 L 20 2.5"
    />
    <path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      d="M 2 9.423 L 20 9.423"
    />
    <path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      d="M 2 16.346 L 20 16.346"
    />
  </svg>
);
