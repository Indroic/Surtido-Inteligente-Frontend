"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateImpuesto from "@/components/ui/legal/impuestos/CreateImpuesto";
import ImpuestosList from "@/components/ui/legal/impuestos/ImpuestosList";
import ImpuestoDetails from "@/components/ui/legal/impuestos/ImpuestoDetails";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/legal", label: "Legal" },
        { id: "3", href: "/dashboard/legal/impuestos", label: "Impuestos" },
      ]),
    );
    setActions([<CreateImpuesto key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ImpuestosList />
      <ImpuestoDetails />
    </main>
  );
}
