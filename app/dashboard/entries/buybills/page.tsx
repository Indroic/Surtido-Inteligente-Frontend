"use client";

import { useEffect } from "react";

import BuyBillsList from "@/components/ui/entries/buybills/BuyBillsList";
import BuyBillDetails from "@/components/ui/entries/buybills/BuyBillDetails";
import CreateBuyBill from "@/components/ui/entries/buybills/CreateBuyBill";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";

export default function BuyBillsPage() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/entries", label: "Entradas" },
        { id: "3", href: "/dashboard/entries/buybills", label: "Compras" },
      ]),
    );
    setActions([<CreateBuyBill key={"1"} />]);
  }, [dispatch, setActions]);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <BuyBillsList />
      <BuyBillDetails />
    </main>
  );
}
