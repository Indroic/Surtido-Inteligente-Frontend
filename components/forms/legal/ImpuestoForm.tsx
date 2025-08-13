"use client";

import { Form, Input, NumberInput } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useImpuestoForm from "@/hooks/legal/useImpuestoForm";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useImpuestoForm>;

function ImpuestoForm({ control, loading, deactivated = false }: Props) {
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
        name="impuesto"
        render={({ field, fieldState: { invalid, error } }) => (
          <NumberInput
            ref={field.ref}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Porcentaje de Impuesto"
            name={field.name}
            validationBehavior="aria"
            value={field.value}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
        rules={{ required: "El Porcentaje de Impuesto es Requerido" }}
      />
    </Form>
  );
}

export default ImpuestoForm;
