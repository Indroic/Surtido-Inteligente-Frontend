import { Table, TableHeader, TableColumn, TableBody } from "@heroui/table";
import { GetServerSideProps } from "next";

import { ProductsAdapter } from "@/adapters/inventory";
import { ProductPaginationInterface } from "@/types/products";

export const getServerSideProps = (async ({ req }) => {
  const adapter = new ProductsAdapter(req);

  return await adapter.list();
}) satisfies GetServerSideProps<ProductPaginationInterface>;

export default function ProductsList() {
  return (
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
  );
}
