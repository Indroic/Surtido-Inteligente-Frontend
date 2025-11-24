"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { BUY_BILLS_API_URL } from "@/UrlPaths";
import { BuyBillInterface, ProveedorInterface } from "@/types/proveedores";

function BuyBillsList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<BuyBillInterface>({
      apiPath: BUY_BILLS_API_URL,
    });

  const columns: ColumnConfig<BuyBillInterface>[] = [
    {
      key: "proveedor",
      label: "PROVEEDOR",
      className: "capitalize",
      render: (item) =>
        typeof item.proveedor === "string"
          ? item.proveedor
          : (item.proveedor as ProveedorInterface).name,
    },
    {
      key: "num_factura",
      label: "FACTURA",
      align: "center",
    },
    {
      key: "total",
      label: "TOTAL",
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
              "Esta accion eliminara todo lo referente con esta Compra",
            secondarySegurityText: "Eliminar Mi Compra",
            segurityText: `Compra/${item.num_factura}`,
            title: "Eliminar Compra",
            toastProps: {
              title: "Compra Eliminada",
              description: "La compra se ha eliminado correctamente.",
              color: "success",
            },
            url: BUY_BILLS_API_URL,
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
      emptyContent={search ? "No se encontraron Compras" : "No hay Compras"}
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Compra"
          totalPages={totalPages}
        />
      }
    />
  );
}

export default BuyBillsList;
