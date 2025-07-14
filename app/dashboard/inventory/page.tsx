"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateProductModal from "@/components/ui/inventory/CreateProduct";
import ProductsList from "@/components/ui/inventory/ProductsList";
import StatsComponent from "@/components/ui/inventory/ProductsStats";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        { id: "3", href: "/dashboard/inventory", label: "Productos Base" },
      ])
    );
    setActions([<CreateProductModal key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <StatsComponent />
      <ProductsList />
    </main>
  );
}
