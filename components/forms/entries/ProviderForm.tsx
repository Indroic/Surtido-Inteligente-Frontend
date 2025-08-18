"use client";

import { Form, Input, Select, SelectItem } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import useProviderForm from "@/hooks/entries/useProviderForm";
import { DocumentTypeInterface } from "@/types/legal";

type Props = {
  deactivated?: boolean;
} & ReturnType<typeof useProviderForm>;

function ProviderForm({
  control,
  loading,
  deactivated = false,
  documentTypesData: {
    documentTypes,
    documentsTypeLoading,
    scrollRefDocumentTypes,
  },
  setOpenDocumentType,
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

      <section className="flex flex-row w-full items-start justify-center gap-2">
        <Controller
          control={control}
          name="document_type"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              ref={field.ref}
              isRequired
              className="w-1/5 h-full"
              defaultSelectedKeys={
                control._defaultValues.document_type
                  ? [control._defaultValues.document_type as string]
                  : []
              }
              errorMessage={error?.message}
              isDisabled={disabled && !loading}
              isInvalid={invalid}
              isLoading={documentsTypeLoading}
              items={documentTypes ? documentTypes : []}
              label="Tipo"
              name={field.name}
              scrollRef={scrollRefDocumentTypes}
              validationBehavior="aria"
              value={field.value as string}
              variant="bordered"
              onBlur={field.onBlur}
              onChange={field.onChange}
              onOpenChange={setOpenDocumentType}
            >
              {(item: DocumentTypeInterface) => (
                <SelectItem key={item.id}>{item.codigo}</SelectItem>
              )}
            </Select>
          )}
          rules={{
            required: "El Tipo de Documento de Identidad es Requerido",
          }}
        />
        <Controller
          control={control}
          name="document"
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
              label="Documento de Identidad"
              name={name}
              validationBehavior="aria"
              value={value}
              variant="bordered"
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={{ required: "El Documento de Identidad es Requerido" }}
        />
      </section>
      <Controller
        control={control}
        name="email"
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
            label="Email"
            name={name}
            type="email"
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        rules={{ required: "El Email es Requerido" }}
      />
      <Controller
        control={control}
        name="phone"
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
            label="Numero de Telefono"
            name={name}
            validationBehavior="aria"
            value={value}
            variant="bordered"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
        rules={{ required: "El Numero de Telefono es Requerido" }}
      />
      <Controller
        control={control}
        name="direction"
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
            label="Direccion"
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

export default ProviderForm;
