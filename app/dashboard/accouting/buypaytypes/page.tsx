"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import BuyPayTypeList from "@/components/ui/accouting/buypaytypes/BuyPayTypesList";
import BuyPayTypeDetails from "@/components/ui/accouting/buypaytypes/BuyPayTypeDetails";
import CreateBuyPayType from "@/components/ui/accouting/buypaytypes/CreateBuyPayType";

export default function BuyPayTypesPage() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/accouting", label: "Finanzas" },
        {
          id: "3",
          href: "/dashboard/accouting/buypaytypes",
          label: "Tipos de Pago de Compra",
        },
      ]),
    );
    setActions([<CreateBuyPayType key="1" />]);
  }, [dispatch, setActions]);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <BuyPayTypeList />
      <BuyPayTypeDetails />
    </main>
  );
}
