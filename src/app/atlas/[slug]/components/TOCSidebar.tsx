"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MarkdownTocItem } from "@/lib/markdown";

type TOCSidebarProps = {
  items: MarkdownTocItem[];
};

const TOCSidebar: React.FC<TOCSidebarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={cn(
          "fixed -left-3 top-1/2 z-50 h-24 -translate-y-1/2 rounded-r-lg bg-primary p-2 text-white transition-transform duration-300 hover:left-0 md:hidden",
          {
            "left-0 translate-x-[240px]": isOpen,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight
          className={cn("h-6 w-6 transition-transform duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-[240px] transform bg-white p-6 shadow-lg transition-transform md:h-fit " +
            "duration-300 md:sticky md:top-24 md:block md:translate-x-0 md:shadow-none",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          },
        )}
      >
        <div className="mb-4 font-heading text-xl font-bold">Contents</div>
        <nav className="space-y-2">
          {items.map((item) => (
            <button
              key={item.anchor}
              onClick={() => scrollToSection(item.anchor)}
              className="block w-full text-left font-sans text-sm text-grey-900/80 hover:text-primary"
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TOCSidebar;
