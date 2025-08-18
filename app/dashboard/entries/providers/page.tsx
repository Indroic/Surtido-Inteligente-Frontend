"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import ProvidersList from "@/components/ui/entries/providers/ProvidersList";
import ProviderDetails from "@/components/ui/entries/providers/ProviderDetails";
import CreateProvider from "@/components/ui/entries/providers/CreateProvider";

export default function ProductsBase() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/entries", label: "Entradas" },
        {
          id: "3",
          href: "/dashboard/inventory/providers",
          label: "Proveedores",
        },
      ]),
    );
    setActions([<CreateProvider key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ProvidersList />
      <ProviderDetails />
    </main>
  );
}
