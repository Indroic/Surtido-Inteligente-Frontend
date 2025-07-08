"use client";

import { IconPlus } from "@tabler/icons-react";
import { Form } from "@heroui/form";
import useSWR from "swr";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import CustomModal from "@/components/bases/modal";
import { PaginationInterface } from "@/types/responses";
import { CategoryInterface } from "@/types/products";

export default function CreateProductModal() {
  const { data: categoriesData, isLoading: categoriesLoading } = useSWR<
    PaginationInterface<CategoryInterface>
  >("/api/inventory/products/categories/list");

  return (
    <CustomModal
      title="Nuevo Producto"
      triggerLabel="Nuevo Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
    >
      <Form>
        <Input label="Nombre" name="name" />
        <Select
          isLoading={categoriesLoading}
          items={categoriesData?.results}
          label="Categoría"
        >
          {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
        </Select>
      </Form>
    </CustomModal>
  );
}
