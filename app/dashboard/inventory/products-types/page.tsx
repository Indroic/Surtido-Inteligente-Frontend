"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateProductType from "@/components/ui/inventory/productsTypes/CreateProductType";
import ProductTypeDetails from "@/components/ui/inventory/productsTypes/ProductTypeDetails";
import ProductsTypesList from "@/components/ui/inventory/productsTypes/ProductsTypesList";

export default function ProductsTypes() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        {
          id: "3",
          href: "/dashboard/inventory/product-types",
          label: "Tipos de Producto",
        },
      ]),
    );
    setActions([<CreateProductType key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ProductTypeDetails />
      <ProductsTypesList />
    </main>
  );
}
