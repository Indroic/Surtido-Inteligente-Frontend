"use client";
import { motion } from "framer-motion";
import { useState } from "react";

import NavItem from "./NavItem";
import User from "./User";

import { useNavBar } from "@/context/NavBarContext";

export default function NavBar() {
  const { items } = useNavBar();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <motion.nav
      layout
      animate={{
        height: hovered ? "3.5rem" : "1rem",
      }}
      className="absolute mx-0 px-4 bottom-[2%] left-1/2 flex flex-row bg-content1/20 border-1 border-divider z-50 rounded-full items-center justify-between min-w-[15rem] overflow-hidden"
      style={{
        margin: "0 auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.section
        animate={{
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
        className="flex flex-1 mx-8 w-full justify-between gap-2"
      >
        {items.map((item, i) => (
          <NavItem key={i} {...item} />
        ))}
      </motion.section>
      <motion.section
        animate={{
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
        className="px-8 border-l-divider border-l-1"
      >
        <User />
      </motion.section>
    </motion.nav>
  );
}
