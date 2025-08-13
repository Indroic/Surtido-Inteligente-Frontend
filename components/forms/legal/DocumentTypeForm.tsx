"use client";

import { Form, Input } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useDocumentTypeForm from "@/hooks/legal/useDocumentTypeForm";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useDocumentTypeForm>;

export default function DocumentTypeForm({
  control,
  loading,
  deactivated = false,
}: Props) {
  const [disabled, setDisabled] = useState(deactivated);

  useEffect(() => {
    setDisabled(deactivated);
  }, [deactivated, control]);

  return (
    <Form className="flex flex-col gap-4 min-h-full min-w-full">
      <Controller
        control={control}
        name="nombre"
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
        name="codigo"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Codigo de Documento"
            name={field.name}
            validationBehavior="aria"
            value={field.value}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
        rules={{ required: "El Codigo es Requerido" }}
      />
    </Form>
  );
}
