"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import useSWR from "swr";
import { ButtonGroup } from "@heroui/button";

import SearchInput from "../../../utils/SearchInput";
import PaginateComponent from "../../../utils/PaginateComponent";
import ButtonSetDetails from "../../../common/details/ButtonSetDetails";

import { ProductInterface } from "@/types/products";
import { PaginationInterface } from "@/types/responses";
import usePaginationQueryParams from "@/hooks/utils/usePaginationQueryParams";
import { useSearchQueryParams } from "@/hooks/utils/useSearchQueryParams";
import DeleteModal from "@/components/common/DeleteModal";
import useProductDetails from "@/hooks/inventory/products/useProductDetails";

function ProductsList() {
  const { search } = useSearchQueryParams();
  const { offset, limit } = usePaginationQueryParams();
  const { setProductId } = useProductDetails();

  const { data, isLoading } = useSWR<PaginationInterface<ProductInterface>>(
    `/api/inventory/products?limit=${limit}&offset=${offset}&${search ? `search=${search}` : ""}`,
    {
      keepPreviousData: true,
    },
  );
  const loadingState =
    isLoading || data?.results.length === 0 ? "loading" : "idle";
  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;

  return (
    <Table
      removeWrapper
      aria-label="Lista de productos"
      classNames={{
        wrapper: "max-w-full border-1 border-divider",
      }}
      maxTableHeight={100}
      topContent={
        <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
          <SearchInput />
          <PaginateComponent page={page} totalPages={totalPages} />
        </div>
      }
      topContentPlacement="outside"
    >
      <TableHeader>
        <TableColumn>PRODUCTO</TableColumn>
        <TableColumn align="center" className="hidden md:table-cell">
          VARIANTES
        </TableColumn>
        <TableColumn className="hidden md:table-cell">
          ULT. ACTUALIZACION
        </TableColumn>
        <TableColumn align="center">STOCK BASE</TableColumn>
        <TableColumn align="end">{""}</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron productos"}
        items={data ? data.results : []}
        loadingContent={<Spinner variant="wave" />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow>
            <TableCell className="capitalize">{item.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.variants}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(item.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>
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
                  url={`/api/inventory/products?productID=${item.id}`}
                />
                <ButtonSetDetails callBack={setProductId} value={item.id} />
              </ButtonGroup>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default ProductsList;
