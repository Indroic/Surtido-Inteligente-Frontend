import React from "react";
import { IconPlus } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { Input, SelectItem, Select, DateInput } from "@heroui/react";
import { DateValue } from "@internationalized/date";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { BuyBillInterface, ProveedorInterface } from "@/types/proveedores";
import useBuyBillForm from "@/hooks/entries/useBuyBillForm";
import { BUY_BILLS_API_URL } from "@/UrlPaths";
import MultiStepWizard, {
  WizardStepDefinition,
} from "@/components/bases/MultiStepWizard";
import useWizardController from "@/hooks/wizard/useWizardController";
import { BuyPayType } from "@/types/finanzas";
import FileUploadDropzone from "@/components/common/FileUploadDropzone";
import useDateFormat from "@/hooks/utils/useDateFormat";
import WizardControllers from "@/components/bases/WizardControllers";

function StepDatosBasicos(formHook: ReturnType<typeof useBuyBillForm>) {
  const {
    formState: { errors },
    control,
    proveedoresData: { proveedores, proveedoresLoading, scrollRefProveedores },
    setOpenProveedor,
  } = formHook;
  const { formatYYMMDD } = useDateFormat();

  return (
    <div className="grid gap-4">
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DateInput
            errorMessage={errors.date?.message as string | undefined}
            isInvalid={!!errors.date}
            label="Fecha de la factura"
            size="sm"
            variant="bordered"
            onChange={(e) => {
              if (e)
                return field.onChange(formatYYMMDD(e as unknown as DateValue));

              return field.onChange("");
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="num_factura"
        render={({ field }) => (
          <Input
            errorMessage={errors.num_factura?.message as string | undefined}
            isInvalid={!!errors.num_factura}
            label="Número factura"
            size="sm"
            type="number"
            value={
              field.value === undefined || field.value === null
                ? ""
                : String(field.value)
            }
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="proveedor"
        render={({ field, fieldState: { invalid, error } }) => (
          <Select
            ref={field.ref as any}
            isRequired
            className="w-full"
            defaultSelectedKeys={
              control._defaultValues.proveedor
                ? [control._defaultValues.proveedor as string]
                : []
            }
            errorMessage={error?.message}
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
        name="photo"
        render={({ field }) => (
          <FileUploadDropzone
            allowMultiple={false}
            label="Adjuntar Factura"
            uploadFieldName="photo"
            uploadUrl={`${BUY_BILLS_API_URL}?uploadBillImage=true`}
            onSuccess={(res) => field.onChange(res.id)}
          />
        )}
      />
    </div>
  );
}

function StepGastado(formHook: ReturnType<typeof useBuyBillForm>) {
  const {
    control,
    formState: { errors },
    payTypesData: { payTypes, payTypesLoading, scrollRefPayTypes },
    setOpenPayType,
  } = formHook;

  return (
    <div className="grid gap-4">
      <Controller
        control={control}
        name="subtotal"
        render={({ field }) => (
          <Input
            errorMessage={errors.subtotal?.message as string | undefined}
            isInvalid={!!errors.subtotal}
            label="Subtotal"
            size="sm"
            type="number"
            value={field.value === undefined ? "" : String(field.value)}
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="iva"
        render={({ field }) => (
          <Input
            errorMessage={errors.iva?.message as string | undefined}
            isInvalid={!!errors.iva}
            label="IVA"
            size="sm"
            type="number"
            value={field.value === undefined ? "" : String(field.value)}
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="total"
        render={({ field }) => (
          <Input
            errorMessage={errors.total?.message as string | undefined}
            isInvalid={!!errors.total}
            label="Total"
            size="sm"
            type="number"
            value={field.value === undefined ? "" : String(field.value)}
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="tasaCambio"
        render={({ field }) => (
          <Input
            errorMessage={errors.tasaCambio?.message as string | undefined}
            isInvalid={!!errors.tasaCambio}
            label="Tasa de Cambio"
            size="sm"
            type="number"
            value={field.value === undefined ? "" : String(field.value)}
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="total_reference"
        render={({ field }) => (
          <Input
            errorMessage={errors.total_reference?.message as string | undefined}
            isInvalid={!!errors.total_reference}
            label="Total Referencia"
            size="sm"
            type="number"
            value={field.value === undefined ? "" : String(field.value)}
            variant="bordered"
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="pay_type"
        render={({ field, fieldState: { invalid, error } }) => (
          <Select
            ref={field.ref as any}
            isRequired
            className="w-full"
            defaultSelectedKeys={
              control._defaultValues.pay_type
                ? [control._defaultValues.pay_type as string]
                : []
            }
            errorMessage={error?.message}
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
    </div>
  );
}

function StepResumen(formHook: ReturnType<typeof useBuyBillForm>) {
  const values = formHook.getValues();
  const proveedorValue: any = values.proveedor;
  const proveedorDisplay =
    typeof proveedorValue === "object"
      ? proveedorValue?.nombre ||
        proveedorValue?.name ||
        proveedorValue?.descripcion ||
        "-"
      : proveedorValue || "-";
  const payTypeValue: any = values.pay_type;
  const payTypeDisplay =
    typeof payTypeValue === "object"
      ? payTypeValue?.description ||
        payTypeValue?.nombre ||
        payTypeValue?.name ||
        "-"
      : payTypeValue || "-";

  return (
    <div className="space-y-3 text-sm">
      <h2 className="font-semibold">Resumen</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="opacity-70">Fecha de la Factura:</span>{" "}
          {values.date ?? "-"}
        </div>
        <div>
          <span className="opacity-70">Número Factura:</span>{" "}
          {values.num_factura ?? "-"}
        </div>
        <div>
          <span className="opacity-70">Proveedor:</span> {proveedorDisplay}
        </div>
        <div>
          <span className="opacity-70">Subtotal:</span> {values.subtotal ?? 0}
        </div>
        <div>
          <span className="opacity-70">IVA:</span> {values.iva ?? 0}
        </div>
        <div>
          <span className="opacity-70">Total:</span> {values.total ?? 0}
        </div>
        <div>
          <span className="opacity-70">Tipo Pago:</span> {payTypeDisplay}
        </div>
        <div>
          <span className="opacity-70">Foto:</span>{" "}
          {(values.photo as string) ?? "-"}
        </div>
      </div>
    </div>
  );
}

const steps: WizardStepDefinition<ReturnType<typeof useBuyBillForm>>[] = [
  {
    id: "datos",
    title: "Datos Básicos",
    component: StepDatosBasicos,
    fields: ["date", "num_factura", "proveedor", "photo"],

    validate: async (fh) => {
      const proveedor = fh.getValues("proveedor");

      if (!proveedor) {
        fh.setError("proveedor", {
          type: "required",
          message: "Proveedor requerido",
        });

        return false;
      }

      return true;
    },
  },
  {
    id: "productos",
    title: "Productos",
    component: StepGastado,
    fields: [
      "subtotal",
      "iva",
      "total",
      "tasaCambio",
      "total_reference",
      "pay_type",
    ],
  },
  {
    id: "resumen",
    title: "Resumen",
    component: StepResumen,
  },
];

export default function CreateBuyBillWizard() {
  const formHook = useBuyBillForm();

  const onFinish = async (data: BuyBillInterface) => {
    formHook.setLoading(true);
    try {
      await handleSubmitApi<BuyBillInterface>({
        form: data,
        url: BUY_BILLS_API_URL,
        toast: {
          title: "Compra Creada",
          description: "La compra se ha creado correctamente.",
          color: "success",
        },
        type: "create",
        reset: formHook.reset,
        setError: formHook.setError,
        successFunction: () => {},
      });
    } finally {
      formHook.setLoading(false);
    }
  };

  const controller = useWizardController<
    ReturnType<typeof useBuyBillForm>,
    BuyBillInterface
  >({
    steps,
    formHook,
    onFinish,
    labels: { next: "Siguiente", prev: "Anterior", finish: "Finalizar" },
    syncWithQueryParam: false,
  });

  return (
    <CustomModal
      footer={<WizardControllers controller={controller} formHook={formHook} />}
      modalprops={{
        scrollBehavior: "inside",
        size: "4xl",
      }}
      title="Nueva Compra"
      triggerLabel="Nueva Compra"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
    >
      <MultiStepWizard
        hideDefaultNav
        controller={controller}
        navigationPosition="bottom"
      />
    </CustomModal>
  );
}
