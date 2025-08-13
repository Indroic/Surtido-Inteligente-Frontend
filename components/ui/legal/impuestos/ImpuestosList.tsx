"use client";

import TableList, { ColumnConfig } from "@/components/common/table/TableList";
import useIDParam from "@/hooks/common/details/useIDSearchParam";
import useList from "@/hooks/common/list/useList";
import TableActions from "@/components/common/table/TableActions";
import TableTopContent from "@/components/common/table/TableTopContent";
import { ImpuestoInterface } from "@/types/legal";

function ImpuestosList() {
  const { setID } = useIDParam();
  const { data, isLoading, page, totalPages, search } =
    useList<ImpuestoInterface>({
      apiPath: "/api/legal/impuestos",
    });

  const columns: ColumnConfig<ImpuestoInterface>[] = [
    { key: "nombre", label: "IMPUESTO", className: "capitalize" },
    {
      key: "impuesto",
      label: "Porcentaje",
      className: "capitalize",
      align: "center",
      render: (item) => `${item.impuesto}%`,
    },
    {
      key: "updated_at",
      label: "ULT. ACTUALIZACION",
      className: "hidden md:table-cell",
      render: (item) => item.created_at,
    },
    {
      key: "actions",
      label: "",
      align: "end" as const,
      render: (item) => (
        <TableActions
          deleteOptions={{
            description:
              "Esta accion eliminara todo lo referente con este Impuesto",
            secondarySegurityText: "Eliminar Mi Impuesto",
            segurityText: `Impuesto/${item.nombre}`,
            title: "Eliminar Impuesto",
            toastProps: {
              title: "Impuesto Eliminado",
              description: "El impuesto se ha eliminado correctamente.",
              color: "success",
            },
            url: "/api/legal/impuestos",
          }}
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
      emptyContent={search ? "No se encontraron Impuestos" : "No hay Impuestos"}
      loading={isLoading}
      topContent={<TableTopContent page={page} totalPages={totalPages} />}
    />
  );
}

export default ImpuestosList;
