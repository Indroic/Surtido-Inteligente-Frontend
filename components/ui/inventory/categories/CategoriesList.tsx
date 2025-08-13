"use client";

import { CATEGORY_API_URL } from "../../UrlPaths";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import { ProductInterface } from "@/types/products";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";

export default function CategoriesList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search } =
    useList<ProductInterface>({
      apiPath: "/api/inventory/products/categories",
    });

  const columns: ColumnConfig<ProductInterface>[] = [
    { key: "name", label: "PRODUCTO", className: "capitalize" },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      render: (item) => new Date(item.updated_at).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con esta Categoria",
            secondarySegurityText: "Eliminar Mi Categoria",
            segurityText: `Categoria/${item.name}`,
            title: "Eliminar Categoria",
            toastProps: {
              title: "Categoria Eliminada",
              description: "La catagoria se ha eliminado correctamente.",
              color: "success",
            },
            url: CATEGORY_API_URL,
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
        search ? "No se encontraron categorias" : "No hay categorias"
      }
      loading={isLoading}
      topContent={<TableTopContent page={page} totalPages={totalPages} />}
    />
  );
}
