import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";

export interface ColumnConfig<T> {
  key: keyof T | "actions";
  label: string;
  align?: "start" | "center" | "end";
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  emptyContent?: string;
  topContent?: React.ReactNode;
  loadingContent?: React.ReactNode;
}

function TableList<T>({
  columns,
  data,
  loading = false,
  emptyContent = "No hay datos",
  topContent,
  loadingContent = <Spinner variant="wave" />,
}: GenericTableProps<T>) {
  const loadingState = loading ? "loading" : "idle";

  return (
    <Table
      removeWrapper
      aria-label="Tabla genérica"
      classNames={{ wrapper: "max-w-full border-1 border-divider" }}
      maxTableHeight={100}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn
            key={col.key as string}
            align={col.align}
            className={col.className}
          >
            {col.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={data}
        loadingContent={loadingContent}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={(item as any).id}>
            {columns.map((col) => (
              <TableCell key={col.key as string} className={col.className}>
                {col.render ? col.render(item) : (item as any)[col.key]}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableList;
