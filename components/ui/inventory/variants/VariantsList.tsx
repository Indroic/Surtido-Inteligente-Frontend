"use client";

import { KeyedMutator } from "swr";

import { VARIANTS_API_URL } from "@/UrlPaths";
import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { ProductInterface, ProductVariantInterface } from "@/types/products";
import useVariantIDParam from "@/hooks/inventory/variants/useVariantIDQueryParam";
import useVariantSearchController from "@/hooks/controllers/inventory/useVariantSearchController";
import useVariantPaginationController from "@/hooks/controllers/inventory/useVariantPaginationController";
import useVariantDetailsStateController from "@/hooks/controllers/inventory/useVariantDetailsStateController";

export type Props = {
  items: ProductVariantInterface[];
  productBaseMutate: KeyedMutator<ProductInterface>;
};

export default function VariantsList({ items, productBaseMutate }: Props) {
  const { setVariantID: setID } = useVariantIDParam();
  const { data, isLoading, page, totalPages, search } =
    useList<ProductVariantInterface>({
      items: items,
      searchController: useVariantSearchController,
      paginationController: useVariantPaginationController,
    });

  const columns: ColumnConfig<ProductVariantInterface>[] = [
    { key: "name", label: "VARIANTE", className: "capitalize" },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      render: (item) => new Date(item.updated_at).toLocaleDateString(),
    },
    {
      key: "stock",
      label: "STOCK",
      render: (item) => `${item.stock}`,
    },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con esta Variante",
            secondarySegurityText: "Eliminar Mi Variante",
            segurityText: `Variante/${item.name}`,
            title: "Eliminar Variante",
            toastProps: {
              title: "Variante Eliminada",
              description: "La Variante se ha eliminado correctamente.",
              color: "success",
            },
            url: VARIANTS_API_URL,
            successFunction: () => productBaseMutate(),
          }}
          detailsDrawerStateController={useVariantDetailsStateController}
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
      emptyContent={search ? "No se encontraron Variantes" : "No hay Variantes"}
      loading={isLoading}
      topContent={
        <TableTopContent
          page={page}
          paginationController={useVariantPaginationController}
          searchController={useVariantSearchController}
          searchPlaceholder="Buscar Variante"
          totalPages={totalPages}
        />
      }
    />
  );
}
