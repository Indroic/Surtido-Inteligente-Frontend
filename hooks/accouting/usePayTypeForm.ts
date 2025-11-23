import { DefaultValues } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { PayType } from "@/types/finanzas";

// Interfaz especial para manejo del formulario unificando los radios
export interface PayTypeFormHook
  extends ReturnType<typeof useBaseFormHook<PayType>> {
  pay_type: "bs" | "credit";
  setPayType: (val: "bs" | "credit") => void;
}

const defaultProductValues: DefaultValues<PayType> = {
  name: "",
  description: "",
  is_bs: true,
  is_credit: false,
};

export default function usePayTypeForm(
  { defaultValues = defaultProductValues }: BaseFormHookProps<PayType> = {
    defaultValues: undefined,
  },
): PayTypeFormHook {
  const validator_schema = yup.object<PayType>({
    name: yup.string().required("El Nombre es Requerido"),
    description: yup.string().required("La Descripción es Requerida"),
  });

  const baseHook = useBaseFormHook<PayType>({
    defaultValues,
    validator_schema,
  });

  // pay_type derivado de las dos flags booleanas
  const [payType, setPayType] = useState<"bs" | "credit">(
    defaultValues?.is_bs ? "bs" : "credit",
  );

  // Sincroniza el valor único con los dos campos originales del modelo
  useEffect(() => {
    baseHook.setValue("is_bs", payType === "bs");
    baseHook.setValue("is_credit", payType === "credit");
  }, [payType, baseHook]);

  // Cuando se hace reset desde fuera (por ejemplo detalles), adapta payType
  useEffect(() => {
    const subscription = baseHook.watch((values) => {
      if (values.is_bs) setPayType("bs");
      else if (values.is_credit) setPayType("credit");
    });

    return () => subscription.unsubscribe();
  }, [baseHook]);

  return Object.assign(baseHook, {
    pay_type: payType,
    setPayType,
  });
}
