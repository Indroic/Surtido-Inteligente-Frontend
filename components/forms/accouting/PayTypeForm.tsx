"use client";

import { Form, Input, Radio, RadioGroup } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import usePayTypeForm from "@/hooks/accouting/usePayTypeForm";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof usePayTypeForm>;

function PayTypeForm({
  control,
  loading,
  deactivated = false,
  pay_type,
  setPayType,
}: Props & {
  pay_type: "bs" | "credit";
  setPayType: (v: "bs" | "credit") => void;
}) {
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
      <RadioGroup
        isRequired
        isDisabled={disabled && !loading}
        label="Tipo de Pago"
        orientation="horizontal"
        value={pay_type}
        onValueChange={(val) => setPayType(val as "bs" | "credit")}
      >
        <Radio value="bs">Bs</Radio>
        <Radio value="credit">Credito</Radio>
      </RadioGroup>
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

export default PayTypeForm;
