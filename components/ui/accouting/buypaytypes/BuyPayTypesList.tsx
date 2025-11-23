"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { BUY_PAY_TYPES_API_URL } from "@/UrlPaths";
import { BuyPayType } from "@/types/finanzas";

function BuyPayTypeList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<BuyPayType>({
      apiPath: BUY_PAY_TYPES_API_URL,
    });

  const columns: ColumnConfig<BuyPayType>[] = [
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
              "Esta accion eliminara todo lo referente con este Tipo de Pago de Compra",
            secondarySegurityText: "Eliminar Mi Tipo de Pago de Compra",
            segurityText: `Tipo de Pago de Compra/${item.name}`,
            title: "Eliminar Tipo de Pago de Compra",
            toastProps: {
              title: "Tipo de Pago de Compra Eliminado",
              description:
                "El tipo de pago de compra se ha eliminado correctamente.",
              color: "success",
            },
            url: BUY_PAY_TYPES_API_URL,
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
          ? "No se encontraron Tipos de Pago de Compra"
          : "No hay Tipos de Pago de Compra"
      }
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Tipo de Pago de Compra"
          totalPages={totalPages}
        />
      }
    />
  );
}

export default BuyPayTypeList;
