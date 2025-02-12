"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./menuToggle";
import Navigation from "./navigation";
import { IoClose } from "react-icons/io5";
import { NavLink } from "@/data/navLinks";
import Link from "next/link";
import Logo from "../../logo";
import { DURATION } from "@/data/config";
import { useDimensions } from "@/lib/hooks/useDimensions";

const sidebar = {
  open: {
    transition: {
      type: "spring",
      damping: 40,
      stiffness: 400,
      duration: DURATION,
    },
    transform: "translateX(0)",
    opacity: 1,
    zIndex: 9999,
  },
  closed: {
    transform: "translateX(100%)",
    opacity: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
    zIndex: 0,
  },
};

export const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  React.useEffect(() => {
    const $body = document.querySelector("body")!;

    function disableScroll() {
      document.body.classList.add("overflow-y-hidden");

      // Below is for safari and ios
      $body.style.overflow = "hidden";
      $body.style.position = "fixed";
      $body.style.width = "100%";
    }
    function enableScroll() {
      document.body.classList.remove("overflow-y-hidden");

      // Below is for safari and ios
      $body.style.removeProperty("overflow");
      $body.style.removeProperty("position");
      $body.style.removeProperty("top");
      $body.style.removeProperty("width");
    }

    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      custom={height}
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <motion.div
        className="fixed bottom-0 right-0 top-0 z-50 h-full w-full transform overflow-hidden bg-purple text-sm text-white bg-white shadow-2xl "
        initial={false}
        variants={sidebar}
      >
        <div className="flex justify-between items-center px-5 py-6">
          <div
            style={{
              width: "172px",
              height: "28px",
            }}
          >
            <Link href={NavLink.Home} onClick={() => toggleOpen()}>
              <Logo />
            </Link>
          </div>
          <div className="">
            <IoClose
              onClick={() => toggleOpen()}
              className="text-blue-900 w-9 h-9"
            />
          </div>
        </div>
        <Navigation isOpen={isOpen} toggleOpen={toggleOpen} />
      </motion.div>
    </motion.div>
  );
};
