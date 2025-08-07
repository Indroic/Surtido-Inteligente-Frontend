"use client";

import {
  Textarea,
  Skeleton,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useProductBaseForm from "@/hooks/inventory/products/useProductBaseForm";
import { CategoryInterface } from "@/types/products";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useProductBaseForm>;

function ProductBaseForm({
  control,
  loading,
  deactivated = false,
  categoriesData: { categories, categoriesLoading, scrollerCategoriesRef },
  productTypesData: {
    productTypes,
    productTypesLoading,
    scrollerProductTypesRef,
  },
  setOpenCategories,
  setOpenProductTypes,
}: Props) {
  const [disabled, setDisabled] = useState(deactivated);

  useEffect(() => {
    setDisabled(deactivated);
  }, [deactivated, control]);

  return (
    <Form className="flex flex-col gap-4 min-h-full min-w-full">
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
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Nombre"
            name={name}
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        rules={{ required: "El Nombre es Requerido" }}
      />
      <Controller
        control={control}
        name="category"
        render={({ field, fieldState: { invalid, error } }) =>
          categoriesLoading && categories.length === 0 ? (
            <Skeleton className="h-10 w-full rounded-sm" />
          ) : (
            <Select
              ref={field.ref}
              isRequired
              defaultSelectedKeys={
                control._defaultValues.category
                  ? [control._defaultValues.category as string]
                  : []
              }
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={categoriesLoading}
              items={categories ? categories : []}
              label="Categoría"
              name={field.name}
              scrollRef={scrollerCategoriesRef}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenCategories}
            >
              {(item: CategoryInterface) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              )}
            </Select>
          )
        }
        rules={{ required: "La Categoría es Requerida" }}
      />
      <Controller
        control={control}
        name="product_type"
        render={({ field, fieldState: { invalid, error } }) => (
          <Skeleton
            className="w-full h-full rounded-md"
            isLoaded={!productTypesLoading}
          >
            <Select
              ref={field.ref}
              isRequired
              className="w-full h-full"
              defaultSelectedKeys={
                control._defaultValues.product_type
                  ? [control._defaultValues.product_type as string]
                  : []
              }
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={productTypesLoading}
              items={productTypes ? productTypes : []}
              label="Tipo de Producto"
              name={field.name}
              scrollRef={scrollerProductTypesRef}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenProductTypes}
            >
              {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
            </Select>
          </Skeleton>
        )}
        rules={{ required: "El Tipo de Producto es Requerido" }}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { invalid, error } }) => (
          <Textarea
            ref={field.ref}
            isRequired
            className="min-h-24"
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Descripción"
            name={field.name}
            validationBehavior="aria"
            value={field.value}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
        rules={{ required: "La Descripción es Requerida" }}
      />
    </Form>
  );
}

export default ProductBaseForm;
