"use client";
import { motion } from "framer-motion";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";

import NavItem from "./NavItem";
import User from "./User";
import ConfigDropDown from "./ConfigDropDown";

import { useNavBar } from "@/context/NavBarContext";

export default function NavBar() {
  const { items } = useNavBar();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className="absolute w-full md:flex md:inset-x-0 bottom-0 md:bottom-4 justify-center items-center z-50 overflow-hidden">
      <motion.nav
        layout
        animate={{
          height: hovered ? "auto" : "1rem",
        }}
        className="px-4 flex flex-row gap-4 py-4 w-full max-w-full md:max-w-[60%] lg:max-w-[30%] shadow-lg  bg-content1/20 border-t-1 md:border-1 border-divider md:rounded-full items-center justify-between"
        transition={{
          duration: 0.4,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.section
          animate={{
            opacity: hovered ? 1 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="flex-1 min-w-0"
        >
          <ScrollShadow
            hideScrollBar
            className="flex min-w-0"
            orientation="horizontal"
          >
            {items.map((item, i) => (
              <NavItem key={i} {...item} />
            ))}
          </ScrollShadow>
        </motion.section>
        <motion.section
          animate={{
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="grid grid-cols-2 gap-2 items-center w-max"
        >
          <ConfigDropDown />
          <User />
        </motion.section>
      </motion.nav>
    </div>
  );
}
