"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { ProveedorInterface } from "@/types/proveedores";
import { PROVIDERS_API_URL } from "@/UrlPaths";
import { DocumentTypeInterface } from "@/types/legal";

function ProvidersList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<ProveedorInterface>({
      apiPath: PROVIDERS_API_URL,
    });

  const columns: ColumnConfig<ProveedorInterface>[] = [
    { key: "name", label: "PROVEEDOR", className: "capitalize" },
    {
      key: "document",
      label: "Documento",
      className: "capitalize",
      align: "center",
      render: (item) =>
        `${(item.document_type as DocumentTypeInterface).codigo}-${item.document}`,
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
              "Esta accion eliminara todo lo referente con este Proveedor",
            secondarySegurityText: "Eliminar Mi Proveedor",
            segurityText: `Proveedor/${item.name}`,
            title: "Eliminar Proveedor",
            toastProps: {
              title: "Proveedor Eliminado",
              description: "El Proveedor se ha eliminado correctamente.",
              color: "success",
            },
            url: PROVIDERS_API_URL,
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
        search ? "No se encontraron Proveedores" : "No hay Proveedores"
      }
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Impuesto"
          totalPages={totalPages}
        />
      }
    />
  );
}

export default ProvidersList;
