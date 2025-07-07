"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { IconCategory, IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useEffect } from "react";
import { useState } from "react";
import { addToast } from "@heroui/toast";

import ResumeComponent from "@/components/inventory/ResumeComponent";
import ResumeItem from "@/components/inventory/ResumeItem";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import { ProductPaginationInterface } from "@/types/products";

export default function Inventory() {
  const [productos, setProductos] = useState<ProductPaginationInterface>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();

  useEffect(() => {
    dispatch(
      addBread([
        { id: "2", href: "/dashboard/inventory", label: "Inventario" },
        { id: "3", href: "/dashboard/inventory", label: "Productos Base" },
      ]),
    );
    setActions([
      {
        Icon: <IconCategory size={16} />,
        label: "Categorias",
        onPress: () => {},
        variant: "light",
        color: "secondary",
      },
      {
        Icon: <IconPlus size={16} />,
        label: "Nuevo Producto",
        onPress: () => {},
        color: "primary",
      },
    ]);

    // Fetch común para obtener productos
    const fetchProductos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/inventory/list");

        if (!res.ok)
          addToast({
            title: "Error",
            description: res.statusText,
            color: "danger",
          });
        const data = await res.json();

        setProductos(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ResumeComponent>
        <ResumeItem
          Icon={IconSearch}
          content={productos ? productos.length : 0}
          title="Productos"
        />
        {/* Puedes agregar más ResumeItem según tus métricas */}
      </ResumeComponent>
      <section className="flex flex-row w-full gap-12">
        <Input
          endContent={<IconSearch className="text-default-300" />}
          placeholder="Buscar Producto"
          variant="bordered"
        />
        <ButtonGroup>
          <Button>Filtrar</Button>
        </ButtonGroup>
      </section>
      <Table
        removeWrapper
        aria-label="Lista de productos"
        className="flex flex-1"
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
          items={productos ? productos.results : []}
        >
          {(item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.updated_at}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
