"use client";

import { useEffect } from "react";
import { IconBuilding } from "@tabler/icons-react";

import { useNavBar } from "@/context/NavBarContext";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";

export default function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { setItems } = useNavBar();

  useEffect(() => {
    const inventoryItems = [
      {
        href: "/dashboard/entries/providers",
        label: "Proveedores",
        Icon: IconBuilding,
      },
    ];

    setItems(inventoryItems);
    dispatch(
      addBread([{ id: "2", href: "/dashboard/entries", label: "Entradas" }]),
    );
  }, []);

  return <>{children}</>;
}
