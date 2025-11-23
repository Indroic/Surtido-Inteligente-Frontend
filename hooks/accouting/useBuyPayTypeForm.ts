import { DefaultValues } from "react-hook-form";
import * as yup from "yup";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { BuyPayType } from "@/types/finanzas";

const defaultBuyPayTypeValues: DefaultValues<BuyPayType> = {
  name: "",
  description: "",
};

export default function useBuyPayTypeForm(
  { defaultValues = defaultBuyPayTypeValues }: BaseFormHookProps<BuyPayType> = {
    defaultValues: undefined,
  },
) {
  const validator_schema = yup.object<BuyPayType>({
    name: yup.string().required("El Nombre es Requerido"),
    description: yup.string().required("La Descripción es Requerida"),
  });

  const baseHook = useBaseFormHook<BuyPayType>({
    defaultValues,
    validator_schema,
  });

  return baseHook;
}
