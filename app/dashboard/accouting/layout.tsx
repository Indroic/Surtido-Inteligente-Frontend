"use client";

import { useEffect } from "react";
import { IconBox, IconTags } from "@tabler/icons-react";

import { useNavBar } from "@/context/NavBarContext";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { setItems } = useNavBar();

  useEffect(() => {
    const inventoryItems = [
      {
        href: "/dashboard/accouting/paytypes",
        label: "Tipos de Pago",
        Icon: IconBox,
      },
      {
        href: "/dashboard/accouting/buypaytypes",
        label: "Tipos de Pago de Compra",
        Icon: IconTags,
      },
    ];

    setItems(inventoryItems);
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
      ]),
    );
  }, []);

  return <>{children}</>;
}
