"use client";
import { motion } from "framer-motion";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState } from "react";

import NavItem from "./NavItem";
import User from "./User";

import { useNavBar } from "@/context/NavBarContext";

export default function NavBar() {
  const { items } = useNavBar();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className="block w-full md:relative md:inset-x-0 bottom-0 md:bottom-4 justify-center items-center z-50">
      <motion.nav
        layout
        animate={{
          height: hovered ? "3.5rem" : "1rem",
        }}
        className="px-4 flex flex-row w-full gap-3  bg-content1/20 border-t-1 md:border-1 border-divider md:rounded-full items-center justify-between"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.section
          animate={{
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="flex w-full basis-0 md:mx-0"
        >
          <ScrollShadow
            hideScrollBar
            className="flex w-full overflow-x-scroll"
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
          className="border-l-divider border-l-1"
        >
          <User />
        </motion.section>
      </motion.nav>
    </div>
  );
}
