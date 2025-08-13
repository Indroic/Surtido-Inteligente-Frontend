"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateDocumentType from "@/components/ui/legal/documentsTypes/CreateDocumentType";
import DocumentTypesList from "@/components/ui/legal/documentsTypes/DocumentsTypesList";
import DocumentTypeDetails from "@/components/ui/legal/documentsTypes/DocumentTypeDetails";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/legal", label: "Legal" },
        {
          id: "3",
          href: "/dashboard/legal/documents-types",
          label: "Tipos de Documento",
        },
      ]),
    );
    setActions([<CreateDocumentType key={"1"} />]);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <DocumentTypesList />
      <DocumentTypeDetails />
    </main>
  );
}
