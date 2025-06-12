import { IconTestPipe } from "@tabler/icons-react";

import { NavBarItemType } from "@/types";

export type DefaultSiteConfigType = {
  name: string;
  description: string;
  navItems: NavBarItemType[];
  secondaryNavItems?: NavBarItemType[];
};

export const defaultSiteConfig: DefaultSiteConfigType = {
  name: "Surtido Inteligente",
  description: "Sistema de Inventario Surtido Inteligente",
  //Estos elementos son de prueba, IMPORTANTE CAMBIARLOS
  navItems: [
    {
      label: "Esto es un Test",
      Icon: IconTestPipe,
    },
  ],
  secondaryNavItems: [
    {
      label: "Esto es un Test",
      Icon: IconTestPipe,
    },
  ],
};
