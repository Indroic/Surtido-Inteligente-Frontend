"use client";

import { Form, Input } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useBuyPayTypeForm from "@/hooks/accouting/useBuyPayTypeForm";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useBuyPayTypeForm>;

function BuyPayTypeForm({ control, loading, deactivated = false }: Props) {
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
        name="description"
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
            label="Descripción"
            name={name}
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
    </Form>
  );
}

export default BuyPayTypeForm;
