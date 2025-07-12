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
import { Pagination } from "@heroui/pagination";
import useSWR from "swr";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { ProductInterface } from "@/types/products";
import { PaginationInterface } from "@/types/responses";
import createQueryString from "@/helpers/createQueryString";

function ProductsList() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const limit = searchParams.get("limit") || "10";
  const offset = searchParams.get("offset") || "0";
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useSWR<
    PaginationInterface<ProductInterface>
  >(
    `/api/inventory/products/list?limit=${limit}&offset=${offset}&${search ? `search=${search}` : null}`,
  );
  const totalPages = data?.totalPages || 0;
  const page = data?.page || 1;
  const handlePageChange = (page: number) => {
    let offset = (page - 1) * 10;
    const newQuery = createQueryString({
      limit,
      offset: offset.toString(),
      search,
    });

    router.push(`${pathName}?${newQuery}`);
  };

  return (
    <Table
      removeWrapper
      aria-label="Lista de productos"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        ) : null
      }
      className="flex max-w-screen"
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
        className="flex min-h-full max-w-screen"
        emptyContent={
          isLoading ? (
            <Spinner label="Cargando..." variant="wave" />
          ) : error ? (
            "Error al cargar"
          ) : (
            "No Hay Nada que Mostrar"
          )
        }
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
