"use client";

import useSWR from "swr";
import { ButtonGroup } from "@heroui/button";

import SearchInput from "@/components/utils/SearchInput";
import PaginateComponent from "@/components/utils/PaginateComponent";
import ButtonSetDetails from "@/components/common/details/ButtonSetDetails";
import TableList from "@/components/common/TableList";
import { ProductInterface } from "@/types/products";
import { PaginationInterface } from "@/types/responses";
import usePaginationQueryParams from "@/hooks/utils/usePaginationQueryParams";
import { useSearchQueryParams } from "@/hooks/utils/useSearchQueryParams";
import DeleteModal from "@/components/common/DeleteModal";
import useIDParam from "@/hooks/common/details/useIDSearchParam";

function ProductsList() {
  const { search } = useSearchQueryParams();
  const { offset, limit } = usePaginationQueryParams();
  const { setID } = useIDParam();

  const { data, isLoading } = useSWR<PaginationInterface<ProductInterface>>(
    `/api/inventory/products?limit=${limit}&offset=${offset}&${search ? `search=${search}` : ""}`,
    {
      keepPreviousData: true,
    },
  );
  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;

  const columns = [
    { key: "name", label: "PRODUCTO", className: "capitalize" },
    {
      key: "variants",
      label: "VARIANTES",
      align: "center" as const,
      className: "hidden md:table-cell",
    },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      className: "hidden md:table-cell",
      render: (item: ProductInterface) =>
        new Date(item.updated_at).toLocaleDateString(),
    },
    { key: "stock", label: "STOCK BASE", align: "center" as const },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item: ProductInterface) => (
        <ButtonGroup size="sm">
          <DeleteModal
            description="Esta accion eliminara todo lo referente con este Producto Base"
            secondarySegurityText="Eliminar Mi Producto"
            segurityText={`Producto Base/${item.name}`}
            title="Eliminar Producto"
            toastProps={{
              title: "Producto Eliminado",
              description: "El producto se ha eliminado correctamente.",
              color: "success",
            }}
            url={`/api/inventory/products?id=${item.id}`}
          />
          <ButtonSetDetails callBack={setID} value={item.id} />
        </ButtonGroup>
      ),
    },
  ];

  return (
    <TableList
      columns={columns}
      data={data ? data.results : []}
      emptyContent="No se encontraron productos"
      loading={isLoading}
      topContent={
        <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
          <SearchInput />
          <PaginateComponent page={page} totalPages={totalPages} />
        </div>
      }
    />
  );
}

export default ProductsList;
