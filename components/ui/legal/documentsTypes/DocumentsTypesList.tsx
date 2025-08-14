"use client";

import { DOCUMENTS_TYPES_API_URL } from "@/components/ui/UrlPaths";
import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { DocumentTypeInterface } from "@/types/legal";

export default function DocumentTypesList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<DocumentTypeInterface>({
      apiPath: DOCUMENTS_TYPES_API_URL,
    });

  const columns: ColumnConfig<DocumentTypeInterface>[] = [
    { key: "nombre", label: "TIPO DE DOCUMENTO", className: "capitalize" },
    {
      key: "codigo",
      label: "CODIGO",
      className: "capitalize",
      align: "center",
    },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      className: "hidden md:table-cell",
      render: (item) => item.created_at,
    },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con este Tipo de Documento",
            secondarySegurityText: "Eliminar Mi Tipo De Documento",
            segurityText: `Tipo de Documento/${item.nombre}`,
            title: "Eliminar Tipo de Documento",
            toastProps: {
              title: "Tipo de Documento Eliminado",
              description:
                "El Tipo de Documento se ha eliminado correctamente.",
              color: "success",
            },
            url: DOCUMENTS_TYPES_API_URL,
            successFunction: () => mutate(),
          }}
          item={item}
          setID={setID}
        />
      ),
    },
  ];

  return (
    <TableList
      columns={columns}
      data={data ? data.results : []}
      emptyContent={
        search
          ? "No se encontraron Tipos de Documento"
          : "No hay Tipos de Documento"
      }
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Tipo de Documento"
          totalPages={totalPages}
        />
      }
    />
  );
}
