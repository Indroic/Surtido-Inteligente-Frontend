"use client";

import { DateInput, Form, Input, Select, SelectItem } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";

import useBuyBillForm from "@/hooks/entries/useBuyBillForm";
import { ProveedorInterface } from "@/types/proveedores";
import { BuyPayType } from "@/types/finanzas";
import useDateFormat from "@/hooks/utils/useDateFormat";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useBuyBillForm>;

function BuyBillForm({
  control,
  loading,
  deactivated = false,
  proveedoresData: { proveedores, proveedoresLoading, scrollRefProveedores },
  payTypesData: { payTypes, payTypesLoading, scrollRefPayTypes },
  setOpenProveedor,
  setOpenPayType,
}: Props) {
  const [disabled, setDisabled] = useState(deactivated);
  const { formatYYMMDD } = useDateFormat();

  useEffect(() => {
    setDisabled(deactivated);
  }, [deactivated, control]);

  return (
    <Form className="flex flex-col gap-4 min-h-full min-w-full">
      <Controller
        control={control}
        name="date"
        render={({ field, fieldState: { invalid, error } }) => (
          <DateInput
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Fecha"
            name={field.name}
            validationBehavior="aria"
            value={(field.value ? parseDate(field.value) : null) as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={(value) =>
              field.onChange(value ? formatYYMMDD(value as any) : "")
            }
          />
        )}
      />
      <section className="flex flex-row w-full items-start justify-center gap-2">
        <Controller
          control={control}
          name="proveedor"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              ref={field.ref as any}
              isRequired
              className="w-1/2 h-full"
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={proveedoresLoading}
              items={proveedores ? proveedores : []}
              label="Proveedor"
              name={field.name}
              scrollRef={scrollRefProveedores}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenProveedor}
            >
              {(item: ProveedorInterface) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              )}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="pay_type"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              ref={field.ref as any}
              isRequired
              className="w-1/2 h-full"
              defaultSelectedKeys={
                control._defaultValues.pay_type
                  ? [control._defaultValues.pay_type as string]
                  : []
              }
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={payTypesLoading}
              items={payTypes ? payTypes : []}
              label="Tipo de Pago"
              name={field.name}
              scrollRef={scrollRefPayTypes}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenPayType}
            >
              {(item: BuyPayType) => (
                <SelectItem key={item.id}>{item.name}</SelectItem>
              )}
            </Select>
          )}
        />
      </section>
      <Controller
        control={control}
        name="num_control"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Numero de Control"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="num_factura"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Numero de Factura"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="subtotal"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Subtotal"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="iva"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="IVA"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="total"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Total"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="tasaCambio"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Tasa de Cambio"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="total_reference"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            ref={field.ref as any}
            isRequired
            errorMessage={error?.message}
            isDisabled={disabled && !loading}
            isInvalid={invalid}
            label="Total Referencia"
            name={field.name}
            type="number"
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="photo"
        render={({ field }) => (
          <Input
            ref={field.ref as any}
            label="Foto (URL)"
            name={field.name}
            validationBehavior="aria"
            value={field.value as any}
            variant="bordered"
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
    </Form>
  );
}

export default BuyBillForm;
