"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { IconPackage, IconSearch } from "@tabler/icons-react";
import { Input } from "@heroui/input";
import Form from "next/form";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { useEffect, useState } from "react";
import useSWR from "swr";

import ResumeComponent from "@/components/inventory/ResumeComponent";
import ResumeItem from "@/components/inventory/ResumeItem";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import CreateProductModal from "@/components/inventory/ModalCreate";
import { PaginationInterface } from "@/types/responses";
import { ProductInterface } from "@/types/products";

export default function Inventory() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data, isLoading, error } = useSWR<
    PaginationInterface<ProductInterface>
  >(`/api/inventory/products/list?limit=${limit}&offset=${offset}`);
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        { id: "3", href: "/dashboard/inventory", label: "Productos Base" },
      ]),
    );
    setActions([<CreateProductModal key={"1"} />]);
  }, []);

  // Cuando el usuario cambia de página
  const handlePageChange = (newPage: number) => {
    if (data) {
      setOffset((newPage - 1) * data.limit);
      setLimit(data.limit);
    }
  };

  // Usar los datos de la respuesta para la paginación
  const page = data ? data.page : 1;
  const totalPages = data ? data.totalPages : 1;

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ResumeComponent>
        <ResumeItem
          Icon={IconPackage}
          content={data ? `${data.count}` : "0"}
          loading={isLoading}
          title="Productos"
        />
        <ResumeItem
          Icon={IconPackage}
          content={data ? `${data.count}` : "0"}
          loading={isLoading}
          title="Productos"
        />
        <ResumeItem
          Icon={IconPackage}
          content={data ? `${data.count}` : "0"}
          loading={isLoading}
          title="Productos"
        />
        <ResumeItem
          Icon={IconPackage}
          content={data ? `${data.count}` : "0"}
          loading={isLoading}
          title="Productos"
        />
      </ResumeComponent>
      <section className="flex flex-row w-full gap-12">
        <Form action={"/dashboard/inventory"} className="flex flex-1 gap-1">
          <Input name="search" placeholder="Buscar" variant="bordered" />
          <Button
            isIconOnly
            startContent={<IconSearch />}
            type="submit"
            variant="light"
          />
        </Form>
        <ButtonGroup>
          <Button>Filtrar</Button>
        </ButtonGroup>
      </section>
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
        className="flex max-w-full max-h-full"
      >
        <TableHeader>
          <TableColumn>PRODUCTO</TableColumn>
          <TableColumn>VARIANTES</TableColumn>
          <TableColumn>ULT. ACTUALIZACION</TableColumn>
          <TableColumn>STOCK BASE</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          className="flex-1"
          emptyContent={
            isLoading
              ? "Cargando..."
              : error
                ? "Error al cargar"
                : "No Hay Nada que Mostrar"
          }
          items={data ? data.results : []}
        >
          {(item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.variants}</TableCell>
              <TableCell>{item.updated_at}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>acciones</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
