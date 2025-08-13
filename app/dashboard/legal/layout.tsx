"use client";

import { useEffect } from "react";
import { IconFileCertificate, IconPercentage } from "@tabler/icons-react";

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
        href: "/dashboard/legal/impuestos",
        label: "Impuestos",
        Icon: IconPercentage,
      },
      {
        href: "/dashboard/legal/documents-types",
        label: "Tipos de Documento",
        Icon: IconFileCertificate,
      },
    ];

    setItems(inventoryItems);
    dispatch(addBread([{ id: "2", href: "/dashboard/legal", label: "Legal" }]));
  }, []);

  return <>{children}</>;
}
