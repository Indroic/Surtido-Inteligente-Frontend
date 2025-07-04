import { IconHome, IconPackage } from "@tabler/icons-react";

import { NavBarItemType } from "@/types/navbar";

export type DefaultSiteConfigType = {
  name: string;
  description: string;
  staticNavItems: NavBarItemType[];
  navItems?: NavBarItemType[];
};

export const defaultSiteConfig: DefaultSiteConfigType = {
  name: "Surtido Inteligente",
  description: "Sistema de Inventario Surtido Inteligente",
  //Estos elementos son de prueba, IMPORTANTE CAMBIARLOS
  staticNavItems: [
    {
      label: "Inicio",
      Icon: IconHome,
      href: "/dashboard",
    },
  ],
  navItems: [
    {
      label: "Inventario",
      Icon: IconPackage,
      href: "/dashboard/inventory",
    },
  ],
};
