"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import PayTypeList from "@/components/ui/accouting/paytypes/PayTypesList";
import PayTypeDetails from "@/components/ui/accouting/paytypes/PayTypeDetails";
import CreatePayType from "@/components/ui/accouting/paytypes/CreatePayType";

export default function ProductsBase() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/accouting", label: "Finanzas" },
        {
          id: "3",
          href: "/dashboard/accouting/paytypes",
          label: "Tipos de Pago",
        },
      ]),
    );
    setActions([<CreatePayType key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <PayTypeList />
      <PayTypeDetails />
    </main>
  );
}
