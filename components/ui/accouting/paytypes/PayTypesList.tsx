"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { PAY_TYPES_API_URL } from "@/UrlPaths";
import { PayType } from "@/types/finanzas";

function PayTypeList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<PayType>({
      apiPath: PAY_TYPES_API_URL,
    });

  const columns: ColumnConfig<PayType>[] = [
    { key: "name", label: "TIPO DE PAGO", className: "capitalize" },
    {
      key: "created_at",
      label: "CREADO EL",
      className: "hidden md:table-cell",
      render: (item) => item.created_at,
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
            secondarySegurityText: "Eliminar Mi Tipo de Pago",
            segurityText: `Tipo de Pago/${item.name}`,
            title: "Eliminar Tipo de Pago",
            toastProps: {
              title: "Tipo de Pago Eliminado",
              description: "El Tipo de Pago se ha eliminado correctamente.",
              color: "success",
            },
            url: PAY_TYPES_API_URL,
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
        search ? "No se encontraron Tipos de Pago" : "No hay Tipos de Pago"
      }
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Tipo de Pago"
          totalPages={totalPages}
        />
      }
    />
  );
}

export default PayTypeList;
