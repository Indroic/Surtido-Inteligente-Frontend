"use client";

import { useEffect } from "react";
import { IconBox, IconFileInfo, IconTags } from "@tabler/icons-react";

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
        href: "/dashboard/inventory/products",
        label: "Productos",
        Icon: IconBox,
      },
      {
        href: "/dashboard/inventory/categories",
        label: "Categorias",
        Icon: IconTags,
      },
      {
        href: "/dashboard/inventory/products-types",
        label: "Tipos de Productos",
        Icon: IconFileInfo,
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
