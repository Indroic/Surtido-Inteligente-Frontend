"use client"

import { Button, ButtonGroup } from "@heroui/button";
import { Icon123, IconSearch } from "@tabler/icons-react";
import { Divider } from "@heroui/divider";
import {Input} from "@heroui/input"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/table";


export default function Inventory() {
  return (
    <main className="flex flex-1 flex-col gap-6">
      <section className="flex flex-row items-center justify-between">
        <section>
          <h1 className="text-2xl font-bold">Productos Base</h1> 
          <p>Manejo de Productos Base y sus Variantes</p>  
        </section>
        <section>
          <ButtonGroup>
            <Button>Categorias</Button>
            <Button>Añadir Producto</Button>
          </ButtonGroup>
        </section>
      </section>
      <ul className="flex w-full bg-content1 rounded-lg border-1 border-divider">
        <li className="flex flex-col justify-start items-start px-12 py-7 w-1/5">
          <section className="flex-1 flex flex-row w-full justify-between items-center"><span className="text-lg font-semibold">Titulo</span><Icon123></Icon123></section>
          <section className="font-bold text-xl flex-1 justify-start">Contenido</section>
        </li>
        <Divider orientation="vertical"/>
      </ul>

      <section className="flex flex-row w-full gap-12">
        <Input variant="bordered" endContent={<IconSearch className="text-default-300" />} placeholder="Buscar Producto"/>
        <ButtonGroup>
          <Button>Filtrar</Button>
        </ButtonGroup>
      </section>
    <Table removeWrapper className="flex flex-1" aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody className="flex-1" emptyContent={"No Hay Nada que Mostrar"}>
        {[]}
      </TableBody>
    </Table>
    </main>
  );
}
