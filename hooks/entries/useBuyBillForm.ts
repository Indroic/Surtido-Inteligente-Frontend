import { DefaultValues } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import useInfiniteScroll from "../useInfiniteScroll";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { BuyBillInterface, ProveedorInterface } from "@/types/proveedores";
import { BuyPayType } from "@/types/finanzas";
import { PROVIDERS_API_URL, BUY_PAY_TYPES_API_URL } from "@/UrlPaths";

const defaultValuesBuyBill: DefaultValues<BuyBillInterface<string>> = {
  date: "",
  proveedor: "",
  num_control: 0,
  num_factura: 0,
  subtotal: 0,
  iva: 0,
  total: 0,
  tasaCambio: 0,
  total_reference: 0,
  pay_type: "",
  photo: "",
};

export default function useBuyBillForm(
  {
    defaultValues = defaultValuesBuyBill,
  }: BaseFormHookProps<BuyBillInterface> = {
    defaultValues: undefined,
  },
) {
  const [openProveedor, setOpenProveedor] = useState<boolean>(false);
  const [openPayType, setOpenPayType] = useState<boolean>(false);

  const validator_schema = yup.object<BuyBillInterface>({
    date: yup.string().required("La Fecha es Requerida"),
    proveedor: yup.string().required("El Proveedor es Requerido"),
    num_control: yup
      .number()
      .typeError("El Numero de Control es Requerido")
      .required("El Numero de Control es Requerido"),
    num_factura: yup
      .number()
      .typeError("El Numero de Factura es Requerido")
      .required("El Numero de Factura es Requerido"),
    subtotal: yup
      .number()
      .typeError("El Subtotal es Requerido")
      .required("El Subtotal es Requerido"),
    iva: yup
      .number()
      .typeError("El IVA es Requerido")
      .required("El IVA es Requerido"),
    total: yup
      .number()
      .typeError("El Total es Requerido")
      .required("El Total es Requerido"),
    tasaCambio: yup
      .number()
      .typeError("La Tasa de Cambio es Requerida")
      .required("La Tasa de Cambio es Requerida"),
    total_reference: yup
      .number()
      .typeError("El Total Referencia es Requerido")
      .required("El Total Referencia es Requerido"),
    pay_type: yup.string().required("El Tipo de Pago es Requerido"),
    photo: yup.string().optional(),
  });

  const baseHook = useBaseFormHook<BuyBillInterface>({
    defaultValues,
    validator_schema,
  });

  const {
    items: proveedores,
    loading: proveedoresLoading,
    scrollerRef: scrollRefProveedores,
  } = useInfiniteScroll<ProveedorInterface>({
    Enabled: openProveedor,
    url: PROVIDERS_API_URL,
  });

  const {
    items: payTypes,
    loading: payTypesLoading,
    scrollerRef: scrollRefPayTypes,
  } = useInfiniteScroll<BuyPayType>({
    Enabled: openPayType,
    url: BUY_PAY_TYPES_API_URL,
  });

  return {
    ...baseHook,
    openProveedor,
    setOpenProveedor,
    openPayType,
    setOpenPayType,
    proveedoresData: {
      proveedores,
      proveedoresLoading,
      scrollRefProveedores,
    },
    payTypesData: {
      payTypes,
      payTypesLoading,
      scrollRefPayTypes,
    },
  };
}
