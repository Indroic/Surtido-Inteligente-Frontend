import { createContext, useContext, useState, ReactNode } from "react";

import { NavBarItemType } from "@/types";
import { defaultSiteConfig } from "@/config/site";

type NavBarContextType = {
  items: NavBarItemType[];
  setItems: (items: NavBarItemType[]) => void;
  secondaryItems?: NavBarItemType[];
  setSecondaryItems: (items: NavBarItemType[]) => void;
};

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export const NavBarProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<NavBarItemType[]>(
    defaultSiteConfig.navItems,
  );
  const [secondaryItems, setSecondaryItems] = useState<
    NavBarItemType[] | undefined
  >(defaultSiteConfig.secondaryNavItems);

  return (
    <NavBarContext.Provider
      value={{ items, setItems, secondaryItems, setSecondaryItems }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = () => {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error("useNavBar must be used within a NavBarProvider");
  }

  return context;
};
