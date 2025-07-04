import { createContext, useContext, useState, ReactNode } from "react";

import { NavBarItemType } from "@/types/navbar";
import { defaultSiteConfig } from "@/config/site";

type NavBarContextType = {
  statics: NavBarItemType[];
  items?: NavBarItemType[];
  setItems: (items: NavBarItemType[]) => void;
};

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export const NavBarProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<NavBarItemType[] | undefined>(
    defaultSiteConfig.navItems,
  );
  //Esta funcion se encarga de establecer los items por defecto en caso de que se llame a la funcion sin pasarle nada
  const customSetItems = (items?: NavBarItemType[]) =>
    items ? setItems(items) : setItems(defaultSiteConfig.navItems);

  return (
    <NavBarContext.Provider
      value={{
        items,
        setItems: customSetItems,
        statics: defaultSiteConfig.staticNavItems,
      }}
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
