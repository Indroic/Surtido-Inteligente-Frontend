"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateCategory from "@/components/ui/inventory/categories/CreateCategory";
import CategoriesList from "@/components/ui/inventory/categories/CategoriesList";
import CategoryDetails from "@/components/ui/inventory/categories/CategoryDetails";

export default function Categories() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        {
          id: "3",
          href: "/dashboard/inventory/categories",
          label: "Categorias",
        },
      ]),
    );
    setActions([<CreateCategory key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <CategoryDetails />
      <CategoriesList />
    </main>
  );
}
