"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateProductModal from "@/components/ui/inventory/productsBase/CreateProduct";
import ProductsList from "@/components/ui/inventory/productsBase/ProductsList";
import StatsComponent from "@/components/ui/inventory/productsBase/ProductsStats";
import ProductDetails from "@/components/ui/inventory/productsBase/ProductDetails";

export default function ProductsBase() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        {
          id: "3",
          href: "/dashboard/inventory/products",
          label: "Productos Base",
        },
      ]),
    );
    setActions([<CreateProductModal key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <StatsComponent />
      <ProductsList />
      <ProductDetails />
    </main>
  );
}
