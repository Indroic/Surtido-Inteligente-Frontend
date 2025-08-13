"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import { ProductTypeInterface } from "@/types/products";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { PRODUCT_TYPE_API_URL } from "@/components/ui/UrlPaths";

export default function ProductsTypesList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search } =
    useList<ProductTypeInterface>({
      apiPath: PRODUCT_TYPE_API_URL,
    });

  const columns: ColumnConfig<ProductTypeInterface>[] = [
    { key: "name", label: "TIPO DE PRODUCTO", className: "capitalize" },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      render: (item) => new Date(item.updated_at).toLocaleDateString(),
    },
    {
      key: "impuesto",
      label: "Impuesto",
      render: (item) => `${item.impuesto}%`, //Aqui hay que obtener el Tipo de Impuesto o establecer en el backend que lo devuelva completo con algun query param
    },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con este Tipo de Producto",
            secondarySegurityText: "Eliminar Mi Tipo de Producto",
            segurityText: `Tipo de Producto/${item.name}`,
            title: "Eliminar Tipo de Producto",
            toastProps: {
              title: "Tipo de Producto Eliminado",
              description: "El Tipo de Producto se ha eliminado correctamente.",
              color: "success",
            },
            url: PRODUCT_TYPE_API_URL,
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
          ? "No se encontraron tipos de producto"
          : "No hay tipos de producto"
      }
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          searchPlaceholder="Buscar Tipo de Producto"
          totalPages={totalPages}
        />
      }
    />
  );
}
