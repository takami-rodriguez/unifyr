import * as React from "react";
import { Cycle, motion } from "framer-motion";
import { navLinks, NavLink } from "@/data/navLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4, delay: 0.5 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const childVariants = {
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

const Navigation = ({
  isOpen,
  toggleOpen,
}: {
  toggleOpen: Cycle;
  isOpen: boolean;
}) => {
  const [value, setValue] = React.useState("");
  const toggleAccordion = () => {
    toggleOpen();
    setValue("");
  };

  React.useEffect(() => {
    if (!isOpen) {
      setValue("");
    }
  }, [isOpen]);

  return (
    <motion.ul
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className="relative z-50 mt-10 px-5 text-black"
    >
      {navLinks.map((i) => (
        <motion.li
          key={i.label + "mobile"}
          variants={childVariants}
          className="border-grey mb-5 flex w-full items-center border-b py-3 text-xl font-bold text-blue-900"
        >
          {i.subMenu ? (
            <Accordion
              type="single"
              collapsible
              onValueChange={setValue}
              value={value}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {" "}
                  <p className="text-xl">{i.label}</p>
                </AccordionTrigger>
                {i.subMenu && (
                  <AccordionContent className="space-y-8 pt-8">
                    {i.subMenu.map((link) => (
                      <div key={link.label} className="group">
                        <Link
                          onClick={() => toggleAccordion()}
                          href={link.link}
                          className="flex h-full w-full space-x-6 rounded-xl px-5 py-2 group-hover:bg-violet-50"
                        >
                          <p className="text-xl font-bold">{link.label}</p>
                        </Link>
                      </div>
                    ))}
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          ) : (
            <Link onClick={() => toggleAccordion()} href={i.link}>
              {i.label}
            </Link>
          )}
        </motion.li>
      ))}
      <motion.div variants={childVariants} className="mt-4 ">
        <Link onClick={() => toggleAccordion()} href={NavLink.BookACall}>
          <Button
            variant="primary"
            className="w-full text-lg lg:w-auto"
          >
            Book a Call
          </Button>
        </Link>
      </motion.div>
    </motion.ul>
  );
};

export default Navigation;
