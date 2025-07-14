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
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ProductInterface } from "@/types/products";
import { PaginationInterface } from "@/types/responses";
import SearchInput from "../utils/SearchInput";
import PaginateComponent from "../utils/PaginateComponent";

function ProductsList() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || "10";
  const offset = searchParams.get("offset") || "0";
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useSWR<
    PaginationInterface<ProductInterface>
  >(
    `/api/inventory/products/list?limit=${limit}&offset=${offset}&${search ? `search=${search}` : ""}`,
    {
      keepPreviousData: true,
    }
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
      topContent={
        <div className="flex flex-col md:flex-row  max-w-full gap-2 items-center justify-between">
          <SearchInput />
          <PaginateComponent page={page} totalPages={totalPages} />
        </div>
      }
      topContentPlacement="outside"
      maxTableHeight={100}
    >
      <TableHeader>
        <TableColumn>PRODUCTO</TableColumn>
        <TableColumn className="hidden md:table-cell">VARIANTES</TableColumn>
        <TableColumn className="hidden md:table-cell">
          ULT. ACTUALIZACION
        </TableColumn>
        <TableColumn>STOCK BASE</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron productos"}
        loadingState={loadingState}
        loadingContent={<Spinner variant="wave" />}
        items={data ? data.results : []}
      >
        {(item) => (
          <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.variants}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(item.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>acciones</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default ProductsList;
