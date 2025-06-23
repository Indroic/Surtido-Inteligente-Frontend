"use client";
import { motion } from "framer-motion";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useState, useEffect } from "react";

import NavItem from "./NavItem";
import ConfigDropDown from "./ConfigDropDown";

import { useNavBar } from "@/context/NavBarContext";

// Hook para detectar si la pantalla es md o mayor
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function NavBar() {
  const { items } = useNavBar();
  const [hovered, setHovered] = useState<boolean>(false);
  const isMediumUp = useMediaQuery("(min-width: 768px)");

  // Si es pantalla pequeña, hovered siempre es true
  const effectiveHovered = isMediumUp ? hovered : true;

  return (
    <div className="absolute w-full md:flex md:inset-x-0 bottom-0 md:bottom-4 justify-center items-center z-50 overflow-hidden">
      <motion.nav
        animate={{
          height: isMediumUp ? (effectiveHovered ? "3.5rem" : "1rem") : "auto",
        }}
        className="px-4 flex flex-row gap-4 py-4 w-full max-w-full md:max-w-[60%] lg:max-w-[30%] shadow-lg  bg-content1/20 border-t-1 md:border-1 border-divider md:rounded-full items-center justify-between"
        layout={isMediumUp}
        onMouseEnter={() => isMediumUp && setHovered(true)}
        onMouseLeave={() => isMediumUp && setHovered(false)}
      >
        <motion.section
          animate={{
            opacity: effectiveHovered ? 1 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="flex-1 items-center justify-center min-w-0"
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
            opacity: effectiveHovered ? 1 : 0,
            pointerEvents: effectiveHovered ? "auto" : "none",
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
         
        >
          <ConfigDropDown />
        </motion.section>
      </motion.nav>
    </div>
  );
}
