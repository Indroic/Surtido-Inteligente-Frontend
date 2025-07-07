"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { IconCategory, IconPlus, IconSearch } from "@tabler/icons-react";
import { Input } from "@heroui/input";
import { Table, TableHeader, TableColumn, TableBody } from "@heroui/table";
import { useEffect } from "react";

import ResumeComponent from "@/components/inventory/ResumeComponent";
import ResumeItem from "@/components/inventory/ResumeItem";
import { useAppDispatch } from "@/store/hooks";
import { addBread } from "@/store/features/breadcrump/BreadCrumpSlice";
import { useBreadActions } from "@/context/ActionsContext";
import { ProductsAdapter } from "@/adapters/inventory";
import useSWR from 'swr'
import { useSession } from "next-auth/react";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { setActions } = useBreadActions();
  const {data: session, status} = useSession();
  
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
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-6">
      <ResumeComponent>
        <ResumeItem Icon={IconSearch} content="0" title="Productos" />
        <ResumeItem Icon={IconSearch} content="0" title="Productos" />
        <ResumeItem Icon={IconSearch} content="0" title="Productos" />
        <ResumeItem Icon={IconSearch} content="0" title="Productos" />
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
        aria-label="Example static collection table"
        className="flex flex-1"
      >
        <TableHeader>
          <TableColumn>PRODUCTO</TableColumn>
          <TableColumn>VARIANTES</TableColumn>
          <TableColumn>ULT. ACTUALIZACION</TableColumn>
          <TableColumn>STOCK BASE</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody className="flex-1" emptyContent={"No Hay Nada que Mostrar"}>
          {[]}
        </TableBody>
      </Table>
    </main>
  );
}
