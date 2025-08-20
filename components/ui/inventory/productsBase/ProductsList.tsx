"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import { ProductInterface } from "@/types/products";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { PRODUCT_BASE_API_URL } from "@/UrlPaths";

function ProductsList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search, mutate } =
    useList<ProductInterface>({
      apiPath: PRODUCT_BASE_API_URL,
    });

  const columns: ColumnConfig<ProductInterface>[] = [
    { key: "name", label: "PRODUCTO", className: "capitalize" },
    {
      key: "variants",
      label: "VARIANTES",
      align: "center" as const,
      render: (item) => item.variants?.length || 0,
      className: "hidden md:table-cell",
    },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      className: "hidden md:table-cell",
    },
    { key: "stock", label: "STOCK BASE", align: "center" as const },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con este Producto Base",
            secondarySegurityText: "Eliminar Mi Producto",
            segurityText: `Producto Base/${item.name}`,
            title: "Eliminar Producto",
            toastProps: {
              title: "Producto Eliminado",
              description: "El producto se ha eliminado correctamente.",
              color: "success",
            },
            url: PRODUCT_BASE_API_URL,
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
      emptyContent={search ? "No se encontraron productos" : "No hay productos"}
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Producto por Nombre y Categoria"
          totalPages={totalPages}
        />
      }
    />
  );
}

export default ProductsList;
