"use client";

import { IconPlus } from "@tabler/icons-react";
import { Form } from "@heroui/form";
import useSWR from "swr";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Controller, useForm } from "react-hook-form";

import CustomModal from "@/components/bases/modal";
import { PaginationInterface } from "@/types/responses";
import { CategoryInterface, ProductTypeInterface } from "@/types/products";

export default function CreateProductModal() {
  const { data: categoriesData, isLoading: categoriesLoading } = useSWR<
    PaginationInterface<CategoryInterface>
  >("/api/inventory/products/categories/list");
  const { data: productTypesData, isLoading: productTypesLoading } = useSWR<
    PaginationInterface<ProductTypeInterface>
  >("/api/inventory/products/productTypes/list");

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      category: "",
      product_type: "",
      description: "",
    },
  });

  return (
    <CustomModal
      modalprops={{ size: "xl" }}
      title="Nuevo Producto"
      triggerLabel="Nuevo Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => {
        handleSubmit((data) => {
          fetch("/api/inventory/products/create", {
            method: "POST",
            body: JSON.stringify(data),
          })
            .then((res) => {
              if (res.ok) {
                console.log(res);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })();
      }}
    >
      <Form className="flex flex-col gap-4">
        <Controller
          control={control}
          name="name"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Input
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              label="Nombre"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={{ required: "El Nombre es Requerido" }}
        />
        <Controller
          control={control}
          name="category"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              isLoading={categoriesLoading}
              items={categoriesData?.results}
              label="Categoría"
              labelPlacement="outside"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            >
              {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
            </Select>
          )}
          rules={{ required: "La Categoría es Requerida" }}
        />
        <Controller
          control={control}
          name="product_type"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              isLoading={productTypesLoading}
              items={productTypesData?.results}
              label="Tipo de Producto"
              labelPlacement="outside"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            >
              {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
            </Select>
          )}
          rules={{ required: "El Tipo de Producto es Requerido" }}
        />
        <Controller
          control={control}
          name="description"
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Textarea
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isInvalid={invalid}
              label="Descripción"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              // Let React Hook Form handle validation instead of the browser.
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={{ required: "La Descripción es Requerida" }}
        />
      </Form>
    </CustomModal>
  );
}
