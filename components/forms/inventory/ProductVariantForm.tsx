"use client";

import { Checkbox, Form, Input, NumberInput, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useProductVariantForm from "@/hooks/inventory/variants/useProductVariantForm";

type Props = {
  deactivated?: boolean;
  update?: boolean;
} & ReturnType<typeof useProductVariantForm>;

export default function ProductVariantForm({
  control,
  loading,
  deactivated = false,
  update = false,
}: Props) {
  const [disabled, setDisabled] = useState(deactivated);

  useEffect(() => {
    setDisabled(deactivated);
  }, [deactivated, control]);

  return (
    <Form className="flex flex-col gap-4 min-h-full min-w-full">
      <Controller
        control={control}
        name="product"
        render={({
          field: { name, onChange, onBlur, ref, value },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            isRequired
            className="hidden"
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Nombre"
            name={name}
            validationBehavior="aria"
            value={value as string}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
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
        name="bar_code"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Codigo de Barras"
            name={name}
            validationBehavior="aria"
            value={value ? value : ""}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="weight"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <NumberInput
            ref={ref}
            isRequired
            defaultValue={1}
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Unidades Base"
            min={1}
            name={name}
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        rules={{ required: "Las Unidades Bases son Requeridas" }}
      />
      <Controller
        control={control}
        name="separate_stock"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid },
        }) => (
          <Checkbox
            ref={ref}
            isRequired
            className={update ? "hidden" : ""}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            name={name}
            validationBehavior="aria"
            value={value ? "true" : "false"}
            onBlur={onBlur}
            onChange={onChange}
          >
            Stock Separado
          </Checkbox>
        )}
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
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Descripcion"
            name={name}
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        rules={{ required: "La Descripcion es Requerida" }}
      />
    </Form>
  );
}
