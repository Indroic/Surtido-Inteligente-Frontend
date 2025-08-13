"use client";

import { Form, Input, Select, SelectItem, Skeleton } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useProductTypeForm from "@/hooks/inventory/useProductTypeForm";
import { ImpuestoInterface } from "@/types/legal";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useProductTypeForm>;

export default function ProductTypeForm({
  control,
  loading,
  deactivated = false,
  impuestosData: { impuestos, impuestosLoading, scrollerRefImpuestos },
  setOpenImpuestos,
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
        name="impuesto"
        render={({ field, fieldState: { invalid, error } }) =>
          impuestosLoading && impuestos.length === 0 ? (
            <Skeleton className="h-10 w-full rounded-sm" />
          ) : (
            <Select
              ref={field.ref}
              isRequired
              defaultSelectedKeys={
                control._defaultValues.impuesto
                  ? [control._defaultValues.impuesto as string]
                  : []
              }
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={impuestosLoading}
              items={impuestos ? impuestos : []}
              label="Impuesto"
              name={field.name}
              scrollRef={scrollerRefImpuestos}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenImpuestos}
            >
              {(item: ImpuestoInterface) => (
                <SelectItem key={item.id}>{item.nombre}</SelectItem>
              )}
            </Select>
          )
        }
        rules={{ required: "El Impuesto es requerido" }}
      />
    </Form>
  );
}
