"use client";

import { IconPlus } from "@tabler/icons-react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import CustomModal from "@/components/bases/modal";
import {
  CategoryInterface,
  ProductInterface,
  ProductTypeInterface,
} from "@/types/products";
import useInfineScroll from "@/hooks/useInfiniteScroll";
import handleSubmitApi from "@/helpers/handleSubmitApi";

export default function ModalCreate() {
  const [openCategories, setOpenCategories] = useState(false);
  const [openProductTypes, setOpenProductTypes] = useState(false);
  const [loading, setLoading] = useState(false);
  // Usar hooks personalizados
  const {
    items: categories,
    loading: categoriesLoading,
    scrollerRef: scrollerCategoriesRef,
  } = useInfineScroll<CategoryInterface>({
    Enabled: openCategories,
    url: "/api/inventory/products/categories/list",
  });
  const {
    items: productTypes,
    loading: productTypesLoading,
    scrollerRef: scrollerProductTypesRef,
  } = useInfineScroll<ProductTypeInterface>({
    Enabled: openProductTypes,
    url: "/api/inventory/products/productTypes/list",
  });

  const { handleSubmit, control, setError, reset } = useForm<ProductInterface>({
    defaultValues: {
      name: "",
      category: "",
      product_type: "",
      description: "",
    },
  });

  const onSubmit = (closeModal: () => void) => {
    setLoading(true);
    handleSubmit((data) =>
      handleSubmitApi({
        form: data,
        url: "/api/inventory/products/",
        toast: {
          title: "Producto Creado",
          description: "El producto se ha creado correctamente.",
          color: "success",
        },
        type: "create",
        reset,
        setError,
        successFunction: closeModal,
      }),
    )()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  return (
    <CustomModal
      modalprops={{ size: "xl" }}
      title="Nuevo Producto"
      triggerLabel="Nuevo Producto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
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
              isDisabled={loading}
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
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Select
              ref={ref}
              isRequired
              errorMessage={error?.message}
              isDisabled={loading}
              isInvalid={invalid}
              isLoading={categoriesLoading}
              items={categories ? categories : []}
              label="Categoría"
              labelPlacement="outside"
              name={name}
              scrollRef={scrollerCategoriesRef}
              validationBehavior="aria"
              value={value as string}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
              onOpenChange={setOpenCategories}
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
              isDisabled={loading}
              isInvalid={invalid}
              isLoading={productTypesLoading}
              items={productTypes ? productTypes : []}
              label="Tipo de Producto"
              labelPlacement="outside"
              name={name}
              scrollRef={scrollerProductTypesRef}
              validationBehavior="aria"
              value={value as string}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
              onOpenChange={setOpenProductTypes}
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
              isDisabled={loading}
              isInvalid={invalid}
              label="Descripción"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
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
